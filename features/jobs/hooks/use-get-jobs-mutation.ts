import { useQuery } from '@tanstack/react-query'
import { jobsServices } from '@/features/jobs/api/jobs.services'

export const useGetJobsQuery = () => {
    const { isPending, data: jobs, error } = useQuery({
        queryKey: ['getJobs'],
        queryFn: jobsServices.getJobs,
    })

    return { isPending, jobs, error }
}