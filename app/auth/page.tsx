'use client'
import SignIn from '@/components/auth/sign-in'
import SignUp from '@/components/auth/sign-up'
import { useSearchParams } from 'next/navigation'

const AuthPage = () => {
    const searchParams = useSearchParams()
    const isRegistered = searchParams.get('reg') === 'true'

    return (
        <div className="flex flex-col-reverse md:flex-row justify-between items-center h-screen px-8 md:px-40 py-16 gap-10 md:gap-24">
            <div className="bg-secondaryLight/50 h-64 md:h-full w-full md:flex-1 rounded-3xl hidden lg:flex"></div>
            <div className="w-full max-w-md flex justify-center">
                {isRegistered ? <SignIn /> : <SignUp />}
            </div>
        </div>
    )
}

export default AuthPage
