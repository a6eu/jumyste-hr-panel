'use client'

import Link from 'next/link'
import { JobsListItem } from '@/entities/jobs/jobs-list-item'
import { useTranslation } from 'react-i18next'
import { useEffect, useMemo, useState } from 'react'
import { SearchInput, Select } from '@/shared/ui'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { getCompanyJobs } from '@/entities/jobs/model/jobsSlice'

const JobList = () => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const { jobs } = useAppSelector(state => state.jobs)

    const [searchValue, setSearchValue] = useState('')
    const [statusFilter, setStatusFilter] = useState<string | null>(null)

    useEffect(() => {
        dispatch(getCompanyJobs())
    }, [dispatch])

    const filteredJobs = useMemo(() => {
        return jobs?.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(searchValue.toLowerCase())
            const matchesStatus = !statusFilter || job.status === statusFilter
            return matchesSearch && matchesStatus
        })
    }, [jobs, searchValue, statusFilter])

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
            <div className="flex items-stretch mt-6 md:px-2.5 gap-4">
                <SearchInput
                    placeholder={t('jobPage.searchInput')}
                    onChange={e => setSearchValue(e.target.value)}
                    value={searchValue}
                />
                <Select
                    options={[
                        { label: 'Все', value: '' },
                        { label: 'Открытые', value: 'open' },
                        { label: 'Закрытые', value: 'closed' },
                    ]}
                    value={statusFilter as string}
                    placeholder="Показать"
                    onChangeAction={value => setStatusFilter(value as string || null)}
                />
            </div>
            <div className="mt-6 flex flex-col gap-5">
                {filteredJobs?.map(job => (
                    <JobsListItem key={job.id} job={job} />
                ))}
            </div>
        </>
    )
}

export default JobList
