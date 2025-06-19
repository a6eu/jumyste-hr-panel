'use client'

import Image from 'next/image'
import { BriefcaseBusiness, Clock4, MapPinned } from 'lucide-react'
import { IResume } from '@/entities/resume/model/IResume'
import { formatDateRelative } from '@/shared/utils'
import { useState } from 'react'
import { ResumeModal } from '@/shared/ui/kanban'
import { useTranslation } from 'react-i18next'

export const ResumeListItem = ({ resume }: { resume: IResume }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const { t } = useTranslation()

    return (
        <div className="flex flex-col rounded-2xl p-5 md:px-10 border w-full">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="flex flex-col sm:flex-row items-center md:items-start w-full gap-5 sm:gap-10">
                    <div
                        className="relative w-16 h-16 sm:w-[84px] sm:h-[84px] min-w-16 max-w-[84px] aspect-square shrink-0">
                        <Image
                            src={'/avatars/avatar-1.png'}
                            alt={`${resume.first_name} ${resume.last_name}`}
                            fill
                            className="object-cover rounded-full"
                        />
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex flex-col sm:flex-row justify-between w-full items-start sm:items-center">
                            <h2 className="font-medium text-lg self-center">
                                {resume.first_name} {resume.last_name}
                            </h2>
                            <div className="flex w gap-2 w-full sm:w-auto">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="bg-primaryBlocks h-9 font-medium text-sm rounded-lg text-white w-full sm:w-auto px-4">
                                    {t('candidate.watch')}
                                </button>
                                {isModalOpen && (
                                    <ResumeModal setIsModalOpen={setIsModalOpen} candidate={resume} />
                                )}
                            </div>
                        </div>
                        <div
                            className="w-full flex flex-col sm:flex-row sm:justify-between text-black/40 text-sm gap-2 sm:gap-0">
                            <div className="flex items-center gap-1">
                                <BriefcaseBusiness size={15} />
                                {resume.resume.desired_position || 'Position not specified'}
                            </div>
                            <div className="flex items-center gap-1">
                                <MapPinned size={15} />
                                <span>{resume.resume.city || 'Location not specified'}</span>
                            </div>
                            <div
                                className="flex flex-col sm:flex-row sm:items-center text-sm text-black/40 font-medium gap-1 sm:gap-3">
                                <div className="flex items-center gap-1">Experience not specified</div>
                                <div className="hidden sm:block size-[5px] rounded-full bg-black/40" />
                                <div className="flex items-center gap-1">Employment type not specified</div>
                                <div className="hidden sm:block size-[5px] rounded-full bg-black/40" />
                                <div>Work mode not specified</div>
                            </div>
                        </div>
                        <div
                            className="w-[100px] h-[30px] border border-[#319F43] rounded-3xl bg-[#F0FEF5] font-medium text-[#319F43] flex items-center justify-center">
                            {resume.ai_matching_score || 0}% match
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="border-[.5px] rounded-2xl px-5 sm:px-8 py-4 mt-3 text-sm grid grid-cols-1 sm:grid-cols-[.5fr,3fr] gap-2">
                <span className="text-black/40 font-light">О себе</span>
                <div className="flex flex-col gap-2 w-full">
                    <p>{resume.resume.about || 'No information provided'}</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                    <span className="text-sm text-black/40">Ключевые навыки:</span>
                    <div className="flex flex-wrap gap-2">
                        {resume.resume.skills.length > 0 ? (
                            resume.resume.skills.map((item, index) => (
                                <span key={index}
                                      className="text-primary bg-primaryBlocks/30 py-1 px-2.5 rounded-2xl text-sm">
                                    {item}
                                </span>
                            ))
                        ) : (
                            <span className="text-sm text-black/40">No skills specified</span>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-black/40 mt-6">
                <Clock4 size={18} />
                Последняя активность: {formatDateRelative(resume.applied_at)}
            </div>
        </div>
    )
}