'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Logo from '@/public/logo-text.svg'
import { NextPage } from 'next'
import { CodeVerificationForm, EmailForm, ResetPasswordForm } from '@/features/reset-password'
import { cn } from '@/shared/lib/twmerge'

const ForgotPassword: NextPage = () => {
    const [step, setStep] = useState<'email' | 'code' | 'reset'>('email')
    const [verificationCode, setVerificationCode] = useState('')
    const [email, setEmail] = useState('')


    return (
        <div
            className={cn(
                'flex lg:flex-row-reverse items-center h-screen px-8 md:px-40 py-16 gap-10 md:gap-24',
                step === 'code'
                    ? 'justify-center'
                    : 'justify-center lg:justify-between',
            )}
        >
            <div
                className={cn(
                    'bg-secondaryLight/50 h-64 md:h-full w-full md:flex-1 rounded-3xl',
                    step !== 'code' ? 'hidden lg:flex' : 'hidden',
                )}
            ></div>
            <div className="w-full max-w-md flex justify-center">
                <div className="flex flex-col flex-1 self-center">
                    <Image
                        className={cn(
                            'self-center',
                            step === 'code' && 'hidden',
                        )}
                        src={Logo}
                        alt="Logo"
                    />
                    {step === 'email' && (
                        <EmailForm
                            onNext={(email) => {
                                setStep('code')
                                setEmail(email)
                            }}
                        />
                    )}
                    {step === 'code' && (
                        <CodeVerificationForm
                            email={email}
                            onNext={(code) => {
                                setStep('reset')
                                setVerificationCode(code)
                            }}
                        />
                    )}
                    {step === 'reset' && (
                        <ResetPasswordForm
                            code={verificationCode}
                            email={email}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
