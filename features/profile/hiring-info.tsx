import { Skeleton } from '@mui/material'
import { ArrowUpRight, User } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const HiringInfo = ({ loading }: { loading: boolean }) => {
    const { t } = useTranslation()


    return (
        <div className="py-6 px-4 bg-white border border-[#E4E4E4] rounded-2xl flex flex-col w-full mt-8">
            <div className="flex gap-2">
                <User size={27} />
                <h1 suppressHydrationWarning className="font-medium text-xl m-0 p-0 leading-none pt-2">
                    {t('profile.employeesGrowth')}
                </h1>
            </div>
            <div className="flex gap-5 items-baseline">
                {loading ? <Skeleton width={80} height={50} /> : <div className="font-medium text-[40px]">+56.9%</div>}
                {loading ? (
                    <Skeleton width={64} height={28} variant="rounded" />
                ) : (
                    <div
                        className="text-white text-sm bg-primaryBlocks rounded-3xl h-7 w-16 justify-center px-2 flex items-center">
                        <ArrowUpRight size={17} color="white" />
                        13%
                    </div>
                )}
            </div>
            {loading ? <Skeleton width={220} height={20} /> : <p className="text-sm">{t('profile.differences')}</p>}
        </div>
    )
}
