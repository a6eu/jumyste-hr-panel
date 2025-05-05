'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

interface PageHeaderProps {
    title: string
}

const PageHeader = ({title}: PageHeaderProps) => {
    const router = useRouter()
    const { t } = useTranslation()

    return (
        <div
            className="lg:px-24 px-4 w-full flex flex-col gap-3 bg-[#F5F2FF] border-t-[3px] border-b-[3px] border-primaryBlocks h-28 justify-center">
            <div
                onClick={() => router.back()}
                className="flex items-center font-medium text-[#6C6A6A] cursor-pointer"
            >
                <ChevronLeft size={20} />
                {t('jobForm.backButton')}
            </div>
            <h1 className="font-semibold text-3xl">{title}</h1>
        </div>
    )
}

export default PageHeader
