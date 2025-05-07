'use client'

import Image from 'next/image'
import { ChevronLeft, MessagesSquare, SendHorizonal } from 'lucide-react'
import { FormEvent, JSX, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { getChatByIdThunk, getChatMessagesThunk } from '@/features/chat/api/chatSlice'
import { useSearchParams } from 'next/navigation'
import { format, isSameDay, parseISO } from 'date-fns'
import { cn } from '@/shared/utils'
import { sendMessageThunk } from '@/features/chat/api/messageSlice'

interface ChatInterfaceProps {
    onClickBack?: () => void
}

interface WebSocketMessage {
    type: 'new_message' | 'message_read' | 'auth_error'
    content?: string
    sender_id?: number
    created_at?: string
    chat_id?: number
    id?: number
    message_id?: number
    user_id?: number
    reason?: string
}

interface ChatMessage {
    id: number
    content: string
    sender_id: number
    created_at: string
    chat_id: number
}

export const ChatInterface = ({ onClickBack }: ChatInterfaceProps) => {
    const searchParams = useSearchParams()
    const chatId = Number(searchParams.get('selected_chat'))
    const dispatch = useAppDispatch()

    const { selectedChat, messages: initialMessages, loading: loadingChat } = useAppSelector(state => state.chats)
    const { user } = useAppSelector(state => state.user)
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [inputValue, setInputValue] = useState<string>('')
    const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected')
    const [error, setError] = useState<string | null>(null)

    const messagesEndRef = useRef<HTMLDivElement>(null)
    const wsRef = useRef<WebSocket | null>(null)
    const reconnectAttempts = useRef(0)
    const maxReconnectAttempts = 5

    // Fetch initial messages and chat data
    useEffect(() => {
        if (chatId) {
            dispatch(getChatByIdThunk(chatId))
            dispatch(getChatMessagesThunk(chatId))
        }
    }, [chatId, dispatch])

    // Set initial messages when they're loaded
    useEffect(() => {
        if (initialMessages && initialMessages.length > 0) {
            setMessages(initialMessages)
        }
    }, [initialMessages])

    const getAuthToken = () => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('access_token')
        }
        return null
    }

    const connectWebSocket = () => {
        if (!chatId || !user?.id) return

        const token = getAuthToken()
        if (!token) {
            setError('Authentication required. Please login again.')
            return
        }

        setConnectionStatus('connecting')
        setError(null)

        try {
            const wsUrl = `wss://jumyaste-app-backend-production.up.railway.app/api/ws?chat_id=${chatId}&access_token=${encodeURIComponent(token)}`
            wsRef.current = new WebSocket(wsUrl)

            wsRef.current.onopen = () => {
                console.log('WebSocket connected')
                setConnectionStatus('connected')
                reconnectAttempts.current = 0
            }

            wsRef.current.onmessage = (event) => {
                try {
                    const message: WebSocketMessage = JSON.parse(event.data)
                    console.log('Received message:', message)

                    switch (message.type) {
                        case 'new_message':
                            setMessages(prev => [...prev, {
                                id: message.id || Date.now(),
                                content: message.content || '',
                                sender_id: message.sender_id || 0,
                                created_at: message.created_at || new Date().toISOString(),
                                chat_id: message.chat_id || chatId,
                            }])
                            break
                        case 'auth_error':
                            setError(`Authentication failed: ${message.reason || 'Unknown error'}`)
                            wsRef.current?.close()
                            break
                        default:
                            console.warn('Unhandled message type:', message.type)
                    }
                } catch (parseError) {
                    console.error('Error parsing WebSocket message:', parseError)
                }
            }

            wsRef.current.onclose = (event) => {
                console.log('WebSocket disconnected:', event.code, event.reason)
                setConnectionStatus('disconnected')

                if (event.code === 4001) { // Unauthorized code
                    setError('Session expired. Please login again.')
                    return
                }

                if (event.code !== 1000 && reconnectAttempts.current < maxReconnectAttempts) {
                    reconnectAttempts.current += 1
                    const delay = Math.min(1000 * reconnectAttempts.current, 5000)
                    console.log(`Attempting to reconnect in ${delay}ms (attempt ${reconnectAttempts.current})`)
                    setTimeout(connectWebSocket, delay)
                } else {
                    setError('Disconnected from chat. Please refresh the page.')
                }
            }

            wsRef.current.onerror = (error) => {
                console.error('WebSocket error:', error)
                setError('Connection error. Please check your network.')
                setConnectionStatus('disconnected')
            }
        } catch (error) {
            console.error('WebSocket initialization error:', error)
            setError('Failed to connect to chat.')
            setConnectionStatus('disconnected')
        }
    }

    useEffect(() => {
        if (chatId && user?.id) {
            connectWebSocket()
        }

        return () => {
            if (wsRef.current) {
                wsRef.current.close(1000, 'Component unmounted')
                wsRef.current = null
            }
        }
    }, [chatId, user?.id])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!chatId || !inputValue.trim()) {
            setError('Please enter a message')
            return
        }

        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
            setError('Not connected to chat. Please wait...')
            return
        }

        try {
            const message = {
                type: 'new_message',
                content: inputValue.trim(),
                chat_id: chatId,
                sender_id: user?.id,
            }

            wsRef.current.send(JSON.stringify(message))
            if (selectedChat) {
                dispatch(sendMessageThunk({
                    chatId: selectedChat.id, content: message.content, fileData: '', type: 'text',
                }))
            }
            setInputValue('')
            setError(null)
        } catch (sendError) {
            console.error('Error sending message:', sendError)
            setError('Failed to send message')
        }
    }

    const recipient = selectedChat?.users.find(u => u?.id !== user?.id)

    const formatTime = (dateString: string) => format(parseISO(dateString), 'hh:mm a')
    const formatDate = (dateString: string) => format(parseISO(dateString), 'MMMM d, yyyy')

    const sortedMessages = [...messages].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())

    if (!chatId) {
        return (
            <div
                className="rounded-2xl border border-midGray bg-[#FAFAFA] max-h-[605px] flex items-center justify-center">
                <p className="text-gray-500 flex gap-5 text-primary/40 text-2xl">
                    No chat selected yet <MessagesSquare />
                </p>
            </div>
        )
    }

    if (loadingChat) {
        return (
            <div
                className="rounded-2xl border border-midGray bg-[#FAFAFA] max-h-[605px] flex items-center justify-center">
                <p className="text-gray-500">Loading chat...</p>
            </div>
        )
    }

    if (!selectedChat) return null

    return (
        <div className="rounded-2xl border border-midGray bg-[#FAFAFA] max-h-[605px]">
            <div className="py-5 pl-3 gap-7 flex items-center">
                <div className="flex items-center">
                    <button onClick={onClickBack} className="md:hidden" type="button">
                        <ChevronLeft size={40} />
                    </button>
                    <Image
                        width={55}
                        height={55}
                        className="size-[55px] rounded-full object-cover"
                        src={selectedChat.users[0]?.profile_picture || '/avatars/avatar-1.png'}
                        alt="User Avatar"
                    />
                </div>
                <div className="flex flex-col">
                    <h3 className="leading-7 font-medium text-xl">
                        {recipient?.first_name} {recipient?.last_name}
                    </h3>
                </div>
            </div>

            {error && (
                <div className="px-4 py-2 bg-red-100 text-red-700 text-sm">
                    {error}
                    {!error.includes('login') && (
                        <button
                            onClick={connectWebSocket}
                            className="ml-2 text-blue-600 hover:underline"
                        >
                            Reconnect
                        </button>
                    )}
                </div>
            )}

            <div className="flex flex-col gap-2 w-full px-4 lg:px-12 overflow-y-scroll scroll-smooth h-[430px] text-sm">
                {sortedMessages.reduce((acc: JSX.Element[], message, index, arr) => {
                    const prevMessage = arr[index - 1]
                    const showDate = !prevMessage || !isSameDay(parseISO(message.created_at), parseISO(prevMessage.created_at))

                    if (showDate) {
                        acc.push(
                            <div
                                key={`date-${message.created_at}`}
                                className="text-center text-gray-500 text-xs my-2"
                            >
                                {formatDate(message.created_at)}
                            </div>,
                        )
                    }

                    acc.push(
                        <div
                            key={message.id}
                            className={cn('px-4 pt-2 border w-fit rounded-2xl max-w-[80%]',
                                message.sender_id !== user?.id
                                    ? 'rounded-bl-none bg-white'
                                    : 'border-transparent bg-primaryBlocks text-white self-end rounded-br-none',
                            )}
                        >
                            <p>{message.content}</p>
                            <span className="text-[10px] text-gray-400 float-right ml-2">
                {formatTime(message.created_at)}
              </span>
                        </div>,
                    )

                    return acc
                }, [])}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage}>
                <div className="w-full flex justify-center gap-2 md:gap-4 py-1.5 px-4">
                    <div className="relative w-full max-w-[470px]">
                        <input
                            type="text"
                            placeholder="Напишите сообщение"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-full text-sm h-full border pl-4 lg:pl-8 rounded-full pr-10"
                            disabled={connectionStatus !== 'connected'}
                        />
                    </div>
                    <button
                        type="submit"
                        className="size-[52px] bg-primaryBlocks rounded-full flex justify-center items-center shrink-0 disabled:opacity-50"
                        disabled={!inputValue.trim() || connectionStatus !== 'connected'}
                    >
                        <SendHorizonal color="white" />
                    </button>
                </div>
            </form>
        </div>
    )
}