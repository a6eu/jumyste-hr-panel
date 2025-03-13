import { useMutation, useQueryClient } from '@tanstack/react-query'
import { IJob } from '@/types/job'
import { jobsServices } from '@/features/jobs/api/jobs.services'
import { useRouter } from 'next/navigation'
import { useToast } from '@/shared/hooks'

export const usePostJobMutation = () => {
    const queryClient = useQueryClient()
    const router = useRouter()
    const { showToast } = useToast()
    const { isPending, error, mutate: postJob } = useMutation({
        mutationKey: ['postJob'],
        mutationFn: async (data: IJob) => jobsServices.postJob(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['getJobs'] })
            showToast('success', 'Вакансия была успешно опубликована!')
            router.push('/')
        },
        onError() {
            showToast('error', 'Произошла непридвиденная ошибка, прошу попробовать позже :(')
        },
    })

    return { postJob, error, isPending }
}