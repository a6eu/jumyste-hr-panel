'use client'

import Image from 'next/image'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ResumeListItem } from '@/entities/resume/resume-list-item'
import { SearchInput } from '@/shared/ui'
import $api from '@/http/setup'
import { IResume } from '@/entities/resume/model/IResume'
import { useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'

export const fetchResumes = async (params?: {
    ai_match: string | undefined;
    skills: string[] | undefined;
    city: string[] | undefined;
    position: string | undefined
}) => {
    try {
        const response = await $api.get('resume/candidates', {
            params: {
                ai_match: params?.ai_match,
                skills: params?.skills,
                city: params?.city,
                position: params?.position,
            },
        })
        return response.data
    } catch (error) {
        console.error('Error fetching resumes:', error)
        return []
    }
}

const ResumeList = ({ setFilter }: { setFilter: Dispatch<SetStateAction<boolean>> }) => {
    const [resumes, setResumes] = useState<IResume[]>([])
    const [loading, setLoading] = useState(true)
    const searchParams = useSearchParams()
    const [searchQuery, setSearchQuery] = useState('')
    const { t } = useTranslation()

    useEffect(() => {
        const loadResumes = async () => {
            setLoading(true)

            const ai_match = searchParams.get('ai_match') || undefined
            const skills = searchParams.getAll('skills') || undefined
            const city = searchParams.getAll('city') || undefined
            const position = searchParams.get('position') || undefined

            const data = await fetchResumes({
                ai_match,
                skills,
                city,
                position,
            })
            setResumes(data)
            setLoading(false)
        }
        loadResumes()
    }, [searchParams])

    const filteredResumes = resumes?.filter(resume => {
        const name = resume.resume.full_name.toLowerCase()
        const position = resume.resume.desired_position.toLowerCase()
        return (
            name.includes(searchQuery.toLowerCase()) ||
            position.includes(searchQuery.toLowerCase())
        )
    })

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <div className="flex items-stretch mt-6 md:px-2.5">
                <SearchInput
                    value={searchQuery}
                    onChange={
                        (e) =>
                            setSearchQuery(e.target.value)
                    }
                    placeholder={t('jobPage.searchInput')} />
                <button
                    type="button"
                    className="flex items-center justify-center border rounded-2xl ml-4 md:ml-8 size-16"
                >
                    <Image onClick={() => setFilter(true)} src="/svg/filter.svg" alt="" width={22} height={24} />
                </button>
            </div>
            <div className="mt-6 space-y-4">
                {filteredResumes?.map(resume => (
                    <ResumeListItem key={resume.id} resume={resume} />
                ))}
            </div>
        </>
    )
}

export default ResumeList