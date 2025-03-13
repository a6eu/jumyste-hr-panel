'use client'

import { SignUp } from '@/features/auth'
import { LanguageSwitcher } from '@/shared/ui'

const AuthPage = () => {
    return (
        <>
            <div className="absolute right-9 top-5">
                <LanguageSwitcher />
            </div>
            <div
                className="flex justify-center lg:flex-row lg:justify-between items-center h-screen px-8 max-w-7xl w-full mx-auto py-16 gap-10 md:gap-24">
                <div
                    className="bg-secondaryLight/50 h-64 max-w-[50vw] md:h-full w-full md:flex-1 rounded-3xl hidden lg:flex" />
                <div className="w-full max-w-md flex justify-center">
                    <SignUp />
                </div>
            </div>
        </>
    )
}

export default AuthPage
