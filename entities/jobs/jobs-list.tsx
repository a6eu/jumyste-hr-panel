'use client'

import Link from 'next/link'
import Image from 'next/image'
import { JobsListItem } from '@/entities/jobs/jobs-list-item'
import { useTranslation } from 'react-i18next'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { SearchInput } from '@/shared/ui'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { getCompanyJobs } from '@/entities/jobs/model/jobsSlice'

const JobList = ({ setFilter }: { setFilter: Dispatch<SetStateAction<boolean>> }) => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const { jobs } = useAppSelector(state => state.jobs)

    useEffect(() => {
        dispatch(getCompanyJobs())
    }, [dispatch])

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="font-medium text-2xl">{t('jobPage.title')}</h1>
                <Link
                    className="px-5 py-2.5 bg-primaryBlocks rounded-xl font-medium text-white text-nowrap"
                    href="/recruiting/job-create"
                >
                    {t('jobPage.createButton')}
                </Link>
            </div>
            <div className="flex items-stretch mt-6 md:px-2.5">
                <SearchInput placeholder={t('jobPage.searchInput')} />
                <button
                    type="button"
                    className="flex items-center justify-center border rounded-2xl ml-4 md:ml-8 size-16"
                    onClick={() => setFilter(true)}
                >
                    <Image src="/svg/filter.svg" alt="Filter" width={22} height={24} />
                </button>
            </div>
            <div className="mt-6 flex flex-col gap-5">
                {jobs.length > 0 && jobs.map(job => (
                    <JobsListItem key={job.id} job={job} />
                ))}
            </div>
        </>
    )
}

export default JobList