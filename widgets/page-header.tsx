'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const PageHeader = () => {
    const router = useRouter()
    return (
        <div
            className="lg:px-24 px-4 w-full flex flex-col gap-3 bg-[#F5F2FF] border-t-[3px] border-b-[3px] border-primaryBlocks h-28 justify-center">
            <div
                onClick={() => router.back()}
                className="flex items-center font-medium text-[#6C6A6A] cursor-pointer"
            >
                <ChevronLeft size={20} />
                Назад к списку
            </div>
            <h1 className="font-semibold text-3xl">Создание вакансии</h1>
        </div>
    )
}

