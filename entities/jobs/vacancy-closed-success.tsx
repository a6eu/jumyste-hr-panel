import { X } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/shared/ui'

export const VacancyClosedSuccess = ({ onClose }: { onClose:  () => void}) => {
    return (
        <div className="bg-black/20 w-screen h-screen fixed top-0 left-0 z-[1000] flex justify-center items-center">
            <div className="bg-white rounded-2xl p-8 relative flex flex-col items-center gap-10">
                <button onClick={onClose} className="bg-midGray rounded-full p-2 absolute top-2 right-2">
                    <X size={10} />
                </button>
                <div className="flex flex-col items-center gap-6 max-w-sm w-full">
                    <Image width={110} height={110} src="/images/success-icon.png" alt="" />
                    <h1 className="font-semibold text-2xl">Vacancy closed successfully!</h1>
                </div>
                <div>
                    Now vacancy is closed. Thanks for your job, appreciate it!
                </div>
                <Button onClick={onClose}>Thanks!</Button>
            </div>
        </div>
    )
}