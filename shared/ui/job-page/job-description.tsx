'use client'

import Image from 'next/image'
import { formatDateRelative, formatNumber } from '@/shared/utils'
import sanitizeHtml from 'sanitize-html'
import { Clock4 } from 'lucide-react'
import { IJob } from '@/types/job'
import { VacancyClosedSuccess } from '@/entities/jobs/vacancy-closed-success'
import { useState } from 'react'
import $api from '@/http/setup'

export const JobDescription = ({ job }: { job: IJob | null }) => {
    const [showAlert, setShowAlert] = useState(false)
    const [currentJob, setCurrentJob] = useState(job)
    const [isLoading, setIsLoading] = useState(false)

    if (!currentJob) {
        return <div className="p-10 text-center text-gray-500">Загрузка...</div>
    }

    const handleCloseJob = async () => {
        const newStatus = currentJob.status === 'closed' ? 'open' : 'closed'
        setIsLoading(true)

        try {
            await $api.put(`vacancies/status/${currentJob.id}`, {
                status: newStatus
            })

            setCurrentJob({
                ...currentJob,
                status: newStatus
            })
            setShowAlert(newStatus === 'closed')
        } catch (err) {
            console.error('Error updating job status:', err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="px-4 lg:px-20 pt-11">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 md:gap-6">
                    <div className="flex items-center justify-center size-16 md:size-20 rounded-full border border-gray bg-white">
                        <div className="relative w-12 md:w-16 lg:w-20 min-w-12 max-w-20 h-auto aspect-square">
                            <Image
                                src="/svg/halyk.svg"
                                alt="Halyk Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-wrap items-center gap-2 md:gap-3">
                            <h3 className="font-medium text-lg md:text-xl p-0 md:text-nowrap">{currentJob.title}</h3>
                        </div>
                        <h3 className="font-medium text-lg md:text-xl">от {formatNumber(currentJob.salary_min, 'kz')}</h3>
                        <p className="text-sm mt-2.5">АО &quot;Халык Банк&quot;</p>
                    </div>
                </div>

                <button className="border border-black/30 w-36 h-9 rounded-lg flex items-center justify-center">
                    Редактировать
                </button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-8">
                <span className="text-sm text-black/40">Ключевые навыки:</span>
                <div className="flex flex-wrap gap-2">
                    {currentJob.skills.map((item) => (
                        <span
                            key={item}
                            className="text-primary bg-primaryBlocks/30 py-1 px-2.5 rounded-2xl text-sm"
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </div>
            <div className="my-5 md:my-7 text-sm md:text-base leading-relaxed job-description">
                <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(currentJob.description) }} />
            </div>
            <div className="flex items-center gap-2 text-sm text-black/40">
                <Clock4 size={18} />
                Опубликовано: {formatDateRelative(currentJob.created_at as string, 'ru')}
            </div>
            {showAlert && <VacancyClosedSuccess onClose={() => setShowAlert(false)} />}
            <button
                onClick={handleCloseJob}
                disabled={isLoading}
                className={`py-2 px-4 rounded-lg text-white font-semibold my-10 ${
                    currentJob.status !== 'closed'
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-green-600 hover:bg-green-700'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {isLoading ? 'Processing...' :
                    currentJob.status !== 'closed' ? 'Close job' : 'Open job'}
            </button>
        </div>
    )
}