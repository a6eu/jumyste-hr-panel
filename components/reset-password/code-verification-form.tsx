'use client'
import { useToast } from '@/hooks/use-toast'
import $api from '@/http/setup'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const CodeVerificationForm = ({
    onNext,
    email,
}: {
    onNext: (code: string) => void
    email: string
}) => {
    const { t } = useTranslation()
    const [code, setCode] = useState(['', '', '', ''])
    const [timeLeft, setTimeLeft] = useState(30)
    const { showToast } = useToast()

    useEffect(() => {
        if (timeLeft > 0) {
            const intervalId = setTimeout(() => {
                setTimeLeft((prev) => prev - 1)
            }, 1000)
            return () => clearTimeout(intervalId)
        }
    }, [timeLeft])

    const handleResend = () => {
        if (timeLeft === 0) {
            setTimeLeft(30)
            $api.post('/api/auth/forgot-password', { email })
                .then((r) => console.log(r.data))
                .catch((err) => {
                    showToast('error', t('errors.unexpected'))
                    console.error(err)
                })
        }
    }

    const handleChange = (index: number, value: string) => {
        if (/^\d?$/.test(value)) {
            const newCode = [...code]
            newCode[index] = value
            setCode(newCode)

            if (value && index < 3) {
                document.getElementById(`code-input-${index + 1}`)?.focus()
            }

            if (newCode.every((num) => num !== '')) {
                console.log('User entered code:', newCode.join(''))
                onNext(newCode.join(''))
            }
        }
    }

    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === 'Backspace' && !code[index] && index > 0) {
            const newCode = [...code]
            newCode[index - 1] = ''
            setCode(newCode)
            document.getElementById(`code-input-${index - 1}`)?.focus()
        }
    }

    return (
        <div className="h-[100dvh] flex justify-center items-center">
            <form className="code-form py-12 px-8 w-fit text-center h-[658px] max-w-[480px]">
                <h1 className="text-2xl mb-3 font-medium">
                    {t('resetPassword.confirmCode')}
                </h1>
                <p className="text-wrap">
                    {t('resetPassword.codeDescription')} {email}
                </p>
                <div className="flex gap-8 text-5xl *:text-center mt-20 mb-16">
                    {code.map((val, i) => (
                        <input
                            key={i}
                            id={`code-input-${i}`}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            className="h-20 w-20 border text-center rounded-xl"
                            value={val}
                            onChange={(e) => handleChange(i, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(i, e)}
                        />
                    ))}
                </div>
                <div className="flex justify-between text-black/30">
                    <button
                        className={`underline ${
                            timeLeft > 0 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        disabled={timeLeft > 0}
                        onClick={handleResend}
                        type="button"
                    >
                        {t('resetPassword.resendButton')}
                    </button>
                    <span>
                        ({t('resetPassword.timer')}: {timeLeft} сек.)
                    </span>
                </div>
                <button className="w-full h-12 bg-button text-white text-xl rounded-xl mt-20">
                    {t('resetPassword.confirmButton')}
                </button>
            </form>
        </div>
    )
}

export default CodeVerificationForm
