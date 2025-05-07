'use client'

import { Button, ChatContent, SceneChanger } from '@/shared/ui'
import { SquarePen } from 'lucide-react'
import { Dispatch, SetStateAction, Suspense, useEffect, useState } from 'react'
import { useOutsideClick } from '@/shared/hooks'
import { fetchResumes } from '@/entities/resume/resume-list'
import { IResume } from '@/entities/resume/model/IResume'
import Image from 'next/image'
import { Skeleton } from '@mui/material'
import $api from '@/http/setup'

const MessagesPage = () => {
    const [openModal, setOpenModal] = useState(false)
    return (
        <div className="w-full lg:px-10 px-4 py-7 flex flex-col gap-8">
            {openModal && (
                <NewChatModal setOpenModal={setOpenModal} />
            )}
            <div className="flex flex-wrap gap-2 items-center justify-between w-full">
                <SceneChanger />
                <Button onClick={() => {
                    setOpenModal(true)
                }}>
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

const NewChatModal = ({ setOpenModal }: { setOpenModal: Dispatch<SetStateAction<boolean>> }) => {
    const [resumes, setResumes] = useState<IResume[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const ref = useOutsideClick<HTMLDivElement>(() => setOpenModal(false))

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true)
                const data = await fetchResumes()
                setResumes(data)
            } catch (error) {
                console.error('Failed to fetch resumes:', error)
            } finally {
                setIsLoading(false)
            }
        }

        loadData()
    }, [])

    const createChat = async (userId: number) => {
        await $api.post('chats/', {
            second_user_id: userId
        })
    }

    return (
        <div className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
            <div
                ref={ref}
                className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-xl"
            >
                <div className="p-6 border-b">
                    <h1 className="text-2xl font-semibold text-gray-800">Select a candidate to message</h1>
                    <p className="text-gray-500 mt-1">Start a conversation with potential candidates</p>
                </div>

                <div className="overflow-y-auto flex-1 p-4 md:p-6">
                    {isLoading ? (
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
                                    <Skeleton className="h-12 w-12 rounded-full" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-3 w-1/2" />
                                    </div>
                                    <Skeleton className="h-9 w-24" />
                                </div>
                            ))}
                        </div>
                    ) : resumes.length > 0 ? (
                        <div className="space-y-3">
                            {resumes.map(resume => (
                                <div
                                    key={resume.id}
                                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
                                >
                                    <div className="flex items-center gap-4 flex-1 min-w-0">
                                        <Image
                                            width={48}
                                            height={48}
                                            className="rounded-full size-12 object-cover flex-shrink-0"
                                            alt={`${resume.first_name} ${resume.last_name}`}
                                            src="/avatars/avatar-1.png"
                                        />
                                        <div className="min-w-0">
                                            <h3 className="font-medium text-gray-900 truncate">
                                                {resume.first_name} {resume.last_name}
                                            </h3>
                                            <p className="text-sm text-gray-500 truncate">
                                                {resume.resume.desired_position}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1 truncate">
                                                {resume.email}
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        size="sm"
                                        className="w-full sm:w-auto mt-2 sm:mt-0"
                                        onClick={() => {
                                            createChat(resume.user_id)
                                            setOpenModal(false)
                                        }}
                                    >
                                        Message
                                    </Button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center p-8">
                            <div className="bg-gray-100 p-4 rounded-full mb-4">
                                <SquarePen className="text-gray-400" size={24} />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">No candidates found</h3>
                            <p className="text-gray-500 mt-1 max-w-md">
                                There are currently no resumes available to start a conversation with.
                            </p>
                        </div>
                    )}
                </div>

                <div className="p-4 border-t flex justify-end">
                    <Button
                        variant="outline"
                        onClick={() => setOpenModal(false)}
                    >
                        Close
                    </Button>
                </div>
            </div>
        </div>
    )
}