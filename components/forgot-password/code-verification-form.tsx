'use client'
import { useState } from 'react'

const CodeVerificationForm = ({
    onNext,
}: {
    onNext: (code: string) => void
}) => {
    const [code, setCode] = useState(['', '', '', ''])

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
                    Подтверждение кода
                </h1>
                <p className="text-wrap">
                    Введите 4-значный код, отправленный вам на email
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
                    <span className="underline">Отправить код заново</span>
                    <span>(Доступно через: 30 сек.)</span>
                </div>
                <button className="w-full h-12 bg-button text-white text-xl rounded-xl mt-20">
                    Подтвердить
                </button>
            </form>
        </div>
    )
}

export default CodeVerificationForm
