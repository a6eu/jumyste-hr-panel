'use client'

import PageHeader from '@/shared/widgets/page-header'
import JobCreateForm from '@/entities/jobs/job-create-form'
import { useTranslation } from 'react-i18next'
import { Suspense } from 'react'

const JobCreatePage = () => {
    const { t } = useTranslation()

    return (
        <>
            <PageHeader title={t('jobForm.title')} />
            <Suspense fallback={null}>
                <JobCreateForm />
            </Suspense>
        </>
    )
}

export default JobCreatePage
