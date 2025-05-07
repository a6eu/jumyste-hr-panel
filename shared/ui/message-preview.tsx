'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { IChat } from '@/features/chat/model'
import React from 'react'
import Image from 'next/image'
import { cn } from '@/shared/utils'

interface IMessagePreviewProps {
    chat: IChat
}

export const MessagePreview: React.FC<IMessagePreviewProps> = ({ chat }) => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    const selectedChatId = Number(searchParams.get('selected_chat'))
    const isSelected = selectedChatId === chat.id

    const handleSelectChat = () => {
        const newParams = new URLSearchParams(searchParams.toString())
        newParams.set('selected_chat', chat.id.toString())
        router.push(`${pathname}?${newParams.toString()}`, { scroll: false })
    }

    return (
        <div
            onClick={handleSelectChat}
            className={cn(
                'grid grid-cols-[3rem,1fr,auto] items-center gap-3 py-4 px-3 border-b border-b-midGray hover:bg-primaryBlocks/5 cursor-pointer select-none',
                isSelected ? 'bg-primaryBlocks/10' : 'bg-white',
            )}
        >
            <div className="relative w-12 h-12">
                <Image
                    className="rounded-full object-cover"
                    src="/avatars/avatar-1.png"
                    alt="User Avatar"
                    fill
                />
            </div>

            <div className="flex flex-col justify-center w-full">
                <h3 className="text-base font-medium leading-6">{chat.users[0]?.first_name + ' ' + chat.users[0]?.last_name}</h3>
                <p className="text-sm text-gray-600 truncate max-w-[180px]">
                    {chat.last_message || 'No messages yet'}
                </p>
            </div>

            <div className="flex flex-col items-start text-xs text-gray-500">
                <span className="leading-6 whitespace-nowrap">06:12 PM</span>

            </div>
        </div>
    )
}
