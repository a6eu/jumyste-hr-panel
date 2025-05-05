'use client'

import Image from 'next/image'
import { ChevronLeft, MessagesSquare, MicOff, Paperclip, SendHorizonal } from 'lucide-react'
import { FormEvent, JSX, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { getChatByIdThunk, getChatMessagesThunk } from '@/features/chat/api/chatSlice'
import { useSearchParams } from 'next/navigation'
import { sendMessageThunk } from '@/features/chat/api/messageSlice'
import { format, isSameDay, parseISO } from 'date-fns'
import { cn } from '@/shared/utils'

interface ChatInterfaceProps {
    onClickBack?: () => void
}

/*
* TODO:
*   1) Websocket
*   2) Voice Message
*   3) Search
*/


export const ChatInterface = ({ onClickBack }: ChatInterfaceProps) => {
    const searchParams = useSearchParams()
    const chatId = Number(searchParams.get('selected_chat'))
    const dispatch = useAppDispatch()

    const { messages, selectedChat, loading: loadingMessages } = useAppSelector(state => state.chats)
    const { user } = useAppSelector(state => state.user)

    const messagesEndRef = useRef<HTMLDivElement>(null)
    const [inputValue, setInputValue] = useState<string>('')
    const [file, setFile] = useState<string | null>(null)

    const [isRecording, setIsRecording] = useState(false)
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const audioChunksRef = useRef<Blob[]>([])

    useEffect(() => {
        if (chatId) {
            dispatch(getChatMessagesThunk(chatId))
            dispatch(getChatByIdThunk(chatId))
        }
    }, [chatId, dispatch])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0]
        if (!selectedFile) return

        const reader = new FileReader()
        reader.readAsDataURL(selectedFile)
        reader.onload = () => {
            setFile(reader.result as string)
        }
    }

    const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!chatId || (!inputValue.trim() && !file)) return

        dispatch(
            sendMessageThunk({
                chatId,
                type: file ? 'file' : 'text',
                content: inputValue.trim() || '',
                fileData: file || undefined,
            }),
        )

        setInputValue('')
        setFile(null)
    }

    const formatTime = (dateString: string) => format(parseISO(dateString), 'hh:mm a')
    const formatDate = (dateString: string) => format(parseISO(dateString), 'MMMM d, yyyy')

    const sortedMessages = [...(messages ?? [])].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())


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

    const handleDoubleClickSend = async () => {
        if (isRecording) {
            mediaRecorderRef.current?.stop()
            setIsRecording(false)
        } else {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
                const mediaRecorder = new MediaRecorder(stream)
                mediaRecorderRef.current = mediaRecorder
                audioChunksRef.current = []

                mediaRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        audioChunksRef.current.push(event.data)
                    }
                }

                mediaRecorder.onstop = () => {
                    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
                    const reader = new FileReader()
                    reader.readAsDataURL(audioBlob)
                    reader.onloadend = () => {
                        const base64Audio = reader.result as string
                        dispatch(
                            sendMessageThunk({
                                chatId,
                                type: 'voice',
                                content: '',
                                fileData: base64Audio,
                            }),
                        )
                    }
                }

                mediaRecorder.start()
                setIsRecording(true)
            } catch (error) {
                console.error('Error accessing microphone:', error)
            }
        }
    }

    if (loadingMessages) {
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
                        {selectedChat.users[0]?.first_name + ' ' + selectedChat.users[0]?.last_name}
                    </h3>
                    <p>{'User'}</p>
                </div>
            </div>

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
                        // <div
                        //     key={message.id}
                        //     className="flex flex-col w-fit self-end gap-2">
                        //     <span
                        //         className="text-xs text-gray-400 float-right text-end leading-7">
                        //         {formatTime(message.created_at)}
                        //     </span>
                        //     <div className={cn('text-white px-4 py-2 border w-fit rounded-2xl',
                        //         message.sender_id !== user?.id
                        //             ? 'rounded-bl-none'
                        //             : 'border-transparent bg-primaryBlocks text-white self-end rounded-br-none',
                        //     )}>
                        //         {message.content}
                        //     </div>
                        // </div>,

                        <div
                            key={message.id}
                            className={cn('px-4 pt-2 border w-fit rounded-2xl',
                                message.sender_id !== user?.id
                                    ? 'rounded-bl-none'
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
                    <input
                        type="text"
                        placeholder="Напишите сообщение"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="w-full text-sm max-w-[470px] border pl-4 lg:pl-8 rounded-full"
                    />
                    <label
                        className="bg-gray rounded-full size-[52px] flex justify-center items-center shrink-0 cursor-pointer relative">
                        <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handleFileChange}
                        />
                        <Paperclip />
                    </label>
                    <button
                        type="button"
                        onDoubleClick={handleDoubleClickSend}
                        className="size-[52px] bg-primaryBlocks rounded-full flex justify-center items-center shrink-0"
                    >
                        {isRecording ? <MicOff color="white" /> : <SendHorizonal color="white" />}
                    </button>
                </div>
            </form>
        </div>
    )
}
