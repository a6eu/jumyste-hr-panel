'use client'

import SignIn from '@/components/auth/sign-in'
import SignUp from '@/components/auth/sign-up'
import LanguageSwitcher from '@/components/language-switcher'
import { useSearchParams } from 'next/navigation'

const AuthPage = () => {
    const searchParams = useSearchParams()
    const isRegistered = searchParams?.get('reg') === 'true'

    return (
        <>
            <div className="absolute right-9 top-5">
                <LanguageSwitcher />
            </div>
            <div className="flex justify-center lg:flex-row lg:justify-between items-center h-screen px-8 max-w-7xl w-full mx-auto py-16 gap-10 md:gap-24">
                <div className="bg-secondaryLight/50 h-64 max-w-[50vw] md:h-full w-full md:flex-1 rounded-3xl hidden lg:flex" />
                <div className="w-full max-w-md flex justify-center">
                    {isRegistered ? <SignIn /> : <SignUp />}
                </div>
            </div>
        </>
    )
}

export default AuthPage
