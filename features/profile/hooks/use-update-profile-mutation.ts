import { useRouter } from 'next/navigation'
import { useToast } from '@/shared/hooks'
import { useMutation } from '@tanstack/react-query'
import { userServices } from '@/features/profile/api/user.services'
import { IUser } from '@/types/user'

export const useUpdateProfileMutation = () => {
    const router = useRouter()
    const { showToast } = useToast()
    const { isPending, mutate: updateProfile, error } = useMutation({
        mutationKey: ['updateProfile'],
        mutationFn: (profileData: Partial<IUser>) => userServices.updateProfile(profileData),
        onSuccess() {
            showToast('success', 'Профиль успешно обновлен!')
            router.push('/profile')
        },
        onError() {
            showToast('error', 'Не получилось обработать данные :(')
        },
    })

    return { isPending, updateProfile, error }
}