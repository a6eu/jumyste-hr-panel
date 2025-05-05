'use client'

import Image from 'next/image'
import { ChevronDown, Clock4, MapPinned } from 'lucide-react'
import sanitizeHtml from 'sanitize-html'
import { useState } from 'react'
import { cn, formatDateRelative, formatNumber } from '@/shared/utils'
import { IJob } from '@/types/job'
import Link from 'next/link'

export const JobsListItem = ({ job }: { job: IJob }) => {
    const [showDescription, setShowDescription] = useState(false)

    return (
        <div className={cn(
            'flex flex-col rounded-2xl p-5 md:p-8 lg:p-10 border w-full relative',
            job.status === 'closed' && "bg-gray-50 opacity-80"
        )}>
            {/* Closed status ribbon */}
            {job.status === 'closed' && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-md shadow-md z-10">
                    Закрыта
                </div>
            )}

            <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-0">
                <div className="flex items-center gap-4 md:gap-6">
                    <div className="flex items-center justify-center size-16 md:size-20 rounded-full bg-white">
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
                            <h3 className="font-medium text-lg md:text-xl p-0 md:text-nowrap">{job.title}</h3>
                        </div>
                        <h3 className="font-medium text-lg md:text-xl">от {formatNumber(job.salary_min, 'kz')}</h3>
                        <p className="text-sm mt-2.5">АО &quot;Халык Банк&quot;</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 w-full justify-end">
                    <Link
                        className="bg-primaryBlocks h-9 font-medium text-sm rounded-lg text-white w-[148px] flex items-center justify-center"
                        href={`/recruiting/job/${job.id}`}
                        prefetch
                    >
                        Посмотреть детали
                    </Link>
                    <Link
                        href={`/recruiting//job/${job.id}`}
                        prefetch
                        className="font-medium h-9 text-sm rounded-lg border-[#4E4E4E] border w-[148px] flex items-center justify-center"
                    >
                        Редактировать
                    </Link>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-5 md:mt-7">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <span className="text-sm text-black/40">Ключевые навыки:</span>
                    <div className="flex flex-wrap gap-2">
                        {job.skills.length > 0
                            ? job.skills.map((item) => (
                                <span key={item}
                                      className="text-primary bg-primaryBlocks/30 py-1 px-2.5 rounded-2xl text-sm">
                                {item}
                            </span>
                            ))
                            : <span className="text-primary bg-primaryBlocks/30 py-1 px-2.5 rounded-2xl text-sm">
                                Не требуются
                            </span>
                        }
                    </div>
                </div>
                <div
                    onClick={() => setShowDescription(!showDescription)}
                    className="flex items-end gap-1 self-center cursor-pointer select-none my-2"
                >
                    <span className="md:hidden">{showDescription ? 'Скрыть' : 'Посмотреть'} текст</span>
                    <ChevronDown
                        size={30}
                        className={cn('cursor-pointer transition-all duration-100 select-none mt-2 md:mt-0 self-center', showDescription ? 'rotate-180' : '')}
                    />
                </div>
            </div>

            {showDescription && (
                <div className="my-5 md:my-7 text-sm md:text-base leading-relaxed job-description">
                    <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(job.description) }} />
                </div>
            )}

            <div className="flex flex-col md:flex-row justify-between gap-3 md:mt-7 md:gap-0">
                <div
                    className="text-sm text-black/40 font-medium flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <div className="flex items-center gap-[3px]">
                        <MapPinned size={15} />
                        <span>{job.location}</span>
                    </div>
                    <div className="hidden sm:block size-[5px] rounded-full bg-black/40 mx-3" />
                    <div>{job.employment_type}</div>
                </div>
                <div className="flex items-center gap-2 text-sm text-black/40">
                    <Clock4 size={18} />
                    Опубликовано: {formatDateRelative(job.created_at as string, 'ru')}
                </div>
            </div>
            <div className="flex gap-2 items-center h-8 mt-6">
                <div className="relative flex h-full w-[84px]">
                    <Image src="/avatars/avatar-1.png" alt="Avatar" width={50} height={50}
                           className="rounded-full size-8 object-cover absolute" />
                    <Image src="/avatars/avatar-2.png" alt="Avatar" width={50} height={50}
                           className="rounded-full size-8 object-cover absolute left-6 ring-2 ring-background" />
                    <Image src="/avatars/avatar-3.png" alt="Avatar" width={50} height={50}
                           className="rounded-full size-8 object-cover absolute left-12 ring-2 ring-background" />
                </div>
                <span className="text-sm font-medium">{job.count_responses} откликов</span>
            </div>
        </div>
    )
}