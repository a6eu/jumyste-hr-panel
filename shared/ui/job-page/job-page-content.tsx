'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { SceneChooser } from '@/shared/ui/job-page/scene-chooser'
import { KanbanBoard } from '@/shared/ui/kanban'
import { JobDescription } from '@/shared/ui/job-page/job-description'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { useEffect } from 'react'
import { getJobById } from '@/entities/jobs/model/jobsSlice'
import PageHeader from '@/shared/widgets/page-header'

export const JobPageContent = () => {
    const searchParams = useSearchParams()
    const currentScene = searchParams.get('scene')
    const dispatch = useAppDispatch()
    const { selectedJob: job, loading } = useAppSelector(state => state.jobs)

    const params = useParams()
    const id = params.id as string

    useEffect(() => {
        dispatch(getJobById(id))
    }, [dispatch, id])

    if (loading || !job) {
        return <div>Loading...</div>
    }

    return (
        <>
            <PageHeader title={job?.title} />
            <SceneChooser />
            {currentScene !== 'description'
                ? <>
                    <div className="px-24 pt-9">
                        <h1 className="text-3xl font-semibold">Кандидаты</h1>
                    </div>
                    <KanbanBoard id={id} />
                </>
                : <JobDescription job={job} />
            }
        </>
    )
}
