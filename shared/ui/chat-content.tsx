'use client'

import { ChatInterface, ChatSidebar } from '@/shared/ui'
import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const ChatContent = () => {
    const [fold, setFold] = useState<'chat' | 'sidebar'>('sidebar')
    const [isMobile, setIsMobile] = useState(false)
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768)
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleClickBack = () => {
        const params = new URLSearchParams(searchParams)
        params.delete('selected_chat')
        router.replace(pathname)
        setFold('sidebar')

    }

    return (
        <div className="w-full grid h-[50vh]">
            {isMobile ? (
                fold === 'sidebar' && !searchParams.get('selected_chat') ? (
                    <ChatSidebar />
                ) : (
                    <ChatInterface onClickBack={handleClickBack} />
                )
            ) : (
                <div className="grid grid-cols-[1fr,2.5fr] gap-6 w-full">
                    <ChatSidebar />
                    <ChatInterface />
                </div>
            )}
        </div>
    )
}
