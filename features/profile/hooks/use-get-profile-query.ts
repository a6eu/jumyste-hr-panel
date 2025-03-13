import { useQuery } from '@tanstack/react-query'
import { userServices } from '@/features/profile/api/user.services'

export const useGetProfileQuery = () => {
    const { isPending, error, status, data: user } = useQuery({
        queryKey: ['getProfile'],
        queryFn: userServices.getProfile,
    })

    return { isPending, error, status, user }
}