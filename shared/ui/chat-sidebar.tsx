'use client'

import { SearchInput } from '@/shared/ui/search-input'
import { MessagePreview } from '@/shared/ui/message-preview'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { useEffect } from 'react'
import { getUserChatsThunk } from '@/features/chat/api/chatSlice'

export const ChatSidebar = () => {
    const dispatch = useAppDispatch()
    const { chats, loading, error } = useAppSelector(state => state.chats)

    useEffect(() => {
        dispatch(getUserChatsThunk())
    }, [dispatch])

    console.log(chats)

    return (
        <div className="flex flex-col gap-2 h-full">
            <SearchInput className="h-12" placeholder="Search" />
            <div className="flex flex-col rounded-2xl border border-midGray overflow-y-scroll h-[550px]">
                {chats ? chats.map((chat) => (
                    <MessagePreview key={chat.id} chat={chat} />
                )) : <span className="text-center py-3">No chats yet</span>}
            </div>
        </div>
    )
}
