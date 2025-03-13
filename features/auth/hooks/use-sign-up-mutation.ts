import { useMutation } from '@tanstack/react-query'
import { authServices } from '@/features/auth/api/auth.services'
import { useToast } from '@/shared/hooks'
import { useRouter } from 'next/navigation'

export const useSignUpMutation = () => {
    const router = useRouter()
    const { showToast } = useToast()
    const { isPending, error, isSuccess, mutate: signUp } = useMutation({
        mutationKey: ['signUp'],
        mutationFn: ({ email, password, first_name, last_name }: {
            first_name: string,
            last_name: string,
            email: string;
            password: string
        }) => authServices.signUp(first_name, last_name, email, password),
        onSuccess() {
            showToast('success', 'Вы успешно зарегистрированы, теперь, прошу, авторизуйтесь!')
            router.push('/auth?reg=true')
        },
        onError() {
            showToast('error', 'Ошибка!')
        },
    })

    return { isPending, signInError: error, isSuccess, signUp }
}