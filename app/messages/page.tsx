'use client'

import { Button, ChatContent, SceneChanger } from '@/shared/ui'
import { SquarePen } from 'lucide-react'
import { Suspense } from 'react'

const MessagesPage = () => {
    return (
        <div className="w-full lg:px-10 px-4 py-7 flex flex-col gap-8">
            <div className="flex flex-wrap gap-2 items-center justify-between w-full">
                <SceneChanger />
                <Button>
                    <SquarePen />
                    <span className="hidden md:block">Новое сообщение</span>
                </Button>
            </div>

            <Suspense fallback={null}>
                <ChatContent />
            </Suspense>
        </div>
    )
}

export default MessagesPage
