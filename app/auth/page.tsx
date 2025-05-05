'use client'

import { Suspense } from 'react'
import SignIn from '@/features/auth/sign-in'
import SignUp from '@/features/auth/sign-up'
import LanguageSwitcher from '@/shared/ui/language-switcher'
import { useSearchParams } from 'next/navigation'

const AuthPageContent = () => {
    const searchParams = useSearchParams()
    const isRegistered = searchParams?.get('reg') === 'true'

    return (
        <>
            <div className="absolute right-9 top-5">
                <LanguageSwitcher />
            </div>
            <div
                className="flex justify-center lg:flex-row lg:justify-between items-center h-screen px-8 max-w-7xl w-full mx-auto py-16 gap-10 md:gap-24">
                <div className="max-w-[50vw] md:h-full w-full md:flex-1 rounded-3xl hidden lg:flex relative">
                    <img className="size-[870px] object-contain" src={isRegistered ? "/images/welcome-back.png" : "/images/registration.png"} alt="" />
                </div>
                <div className="w-full max-w-md flex justify-center">
                    {isRegistered ? <SignIn /> : <SignUp />}
                </div>
            </div>
        </>
    )
}

const AuthPage = () => (
    <Suspense fallback={null}>
        <AuthPageContent />
    </Suspense>
)

export default AuthPage
