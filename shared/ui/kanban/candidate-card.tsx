'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { ICandidate, ICandidateDetails } from '@/types/user'
import { UserIcon, XIcon } from 'lucide-react'
import { Button } from '@/shared/ui'
import { useTranslation } from 'react-i18next'

export const CandidateCard = ({ candidate }: { candidate: ICandidate }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleDragStart = (e: any, card: ICandidate) => {
        e.dataTransfer.setData('cardId', card.id)
    }

    return (
        <>
            <motion.div
                onClick={() => setIsModalOpen(true)}
                layout
                layoutId={candidate.id}
                draggable
                onDragStart={(e) => {
                    console.log('Drag started for', candidate.id)
                    handleDragStart(e, candidate)
                }}
                className="flex flex-col text-sm border-2 border-gray rounded-lg p-2 bg-white cursor-grab active:cursor-grabbing"
            >
                <div className="flex items-center gap-2">
                    <Image
                        draggable={false}
                        src="/avatars/avatar-1.png"
                        alt="Avatar"
                        width={40}
                        height={40}
                        className="size-10 rounded-full object-cover"
                    />
                    <div>
                        <div className="font-semibold truncate max-w-[145px]">
                            {candidate.first_name} {candidate.last_name}
                        </div>
                        <div className="text-xs text-midGray truncate max-w-[140px]">
                            {candidate.email}
                        </div>
                    </div>
                </div>
                <div className="mx-4 bg-gray h-0.5 mt-3 mb-4" />
                <div className="font-medium text-midGray">LinkedIn</div>
            </motion.div>
            {isModalOpen && (
                <ResumeModal setIsModalOpen={setIsModalOpen} candidate={candidate} />
            )}
        </>
    )
}

export const ResumeModal = ({ setIsModalOpen, candidate }: {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
    candidate: any
}) => {
    const { t } = useTranslation()
    return (
        <div className="fixed inset-0 z-[100] bg-black/40 flex justify-center items-center p-4">
            <div className="w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-xl">
                <div className="p-6 flex justify-between items-center border-b">
                    <div className="flex items-center gap-3">
                        <UserIcon className="text-primaryBlocks" size={24} />
                        <h2 className="text-xl font-semibold">{t('candidate.about')}</h2>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <XIcon size={24} className="text-gray-500" />
                    </button>
                </div>

                <div className="overflow-y-auto max-h-[80vh] p-6">
                    <div className="flex flex-col md:flex-row gap-6 mb-8">
                        <div className="flex-shrink-0">
                            <Image
                                width={100}
                                height={100}
                                src={'/avatars/avatar-1.png'}
                                alt={`${candidate.first_name} ${candidate.last_name}`}
                                className="rounded-full object-cover border-2 size-24"
                            />
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                                <div>
                                    <h1 className="text-2xl font-bold">
                                        {candidate.first_name} {candidate.last_name}
                                    </h1>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-gray-600">
                                            {candidate.resume.desired_position}
                                        </span>
                                    </div>
                                    <p className="text-gray-500 mt-1">
                                        {candidate.resume.city}, Казахстан
                                    </p>
                                </div>

                            </div>


                        </div>
                    </div>

                    <div className="rounded-lg p-4 border border-stone-300">
                        <h3 className="text-lg font-semibold mb-4">
                            {t('candidate.desc')}
                        </h3>
                        <p className="text-gray-700">
                            {candidate.resume.about}
                        </p>
                    </div>

                    <div className="mb-8 p-4 border border-stone-300 rounded-lg mt-5">
                        <h3 className="text-lg font-semibold mb-4">{t('candidate.skills')}</h3>
                        <div className="flex flex-wrap gap-2">
                            {candidate.resume.skills.map((skill: string, index: number) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-primaryBlocks/20 text-gray-800 rounded-full text-sm"
                                >
                  {skill}
                </span>
                            ))}
                        </div>
                    </div>
                    {candidate.ai_strengths && (
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                            <h3 className="font-semibold text-blue-800 mb-2">AI Analysis</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-sm font-semibold text-blue-700 mb-1">Strengths</h4>
                                    <p className="text-blue-800">{candidate.ai_strengths}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-blue-700 mb-1">Weaknesses</h4>
                                    <p className="text-blue-800">{candidate.ai_weaknesses}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-4 border-t flex justify-end gap-3">
                    <Button
                        variant="outline"
                        onClick={() => setIsModalOpen(false)}
                    >
                        Close
                    </Button>
                </div>
            </div>
        </div>
    )
}