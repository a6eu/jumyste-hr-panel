'use client'

import Image from 'next/image'
import {motion} from 'framer-motion'
import React, { useState } from 'react'
import { ICandidate } from '@/types/user'
import { UserIcon, XIcon } from 'lucide-react'

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
                <ResumeModal setIsModalOpen={setIsModalOpen} />
            )}
        </>
    )
}

const ResumeModal = ({setIsModalOpen}: {setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
    return (
        <div className="fixed w-screen h-screen bg-black/40 top-0 left-0 z-[100] flex justify-center items-center">
            <div className="w-full max-w-screen-md bg-white rounded-2xl p-6">
                <div className="w-full flex justify-between items-center font-semibold">
                    <div className="flex gap-2 items-center"><UserIcon size={25}/> Описание кандидата</div>
                    <button onClick={() => setIsModalOpen(false)} className="size-9 flex justify-center items-center border border-midGray rounded">
                        <XIcon size={25}/>
                    </button>
                </div>
                <div className="w-full h-[1px] bg-gray my-4"/>
            </div>
        </div>
    )
}