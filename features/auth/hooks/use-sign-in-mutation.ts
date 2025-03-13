import { useMutation } from '@tanstack/react-query'
import { authServices } from '@/features/auth/api/auth.services'
import { useToast } from '@/shared/hooks'
import { useRouter } from 'next/navigation'

export const useSignInMutation = () => {
    const router = useRouter()
    const { showToast } = useToast()
    const { isPending, error, isSuccess, mutate: signIn } = useMutation({
        mutationKey: ['signIn'],
        mutationFn: ({ email, password }: {
            email: string;
            password: string
        }) => authServices.signIn(email, password),
        onSuccess() {
            showToast('success', 'Авторизовались!')
            router.push('/')
        },
        onError() {
            showToast('error', 'Ошибка!')
        },
    })

    return { isPending, signInError: error, isSuccess, signIn }
}