'use client'

import { useTranslation } from 'react-i18next'
import { cn } from '@/shared/lib/twmerge'
import { HiringFunnel, HiringInfo, UserHeader, UserInfo } from '@/features/profile'
import { useGetProfileQuery } from '@/features/profile/hooks'
import { useAppSelector } from '@/redux/store'

const ProfilePage = () => {
    const { t } = useTranslation()
    const { user, error, isPending } = useGetProfileQuery()
    const { isOpen } = useAppSelector((state) => state.sidebar)


    if (error) {
        return (
            <div className="flex justify-center text-3xl py-9 px-10 text-red-500 font-medium">
                {t('errors.loadingError')}
            </div>
        )
    }

    return (
        <div
            className={cn('w-full py-8 px-4 lg:px-16 gap-9 grid grid-cols-1 lg:grid-cols-[1.1fr,1fr] lg:gap-8',
                isOpen && 'max-h-[calc(100svh-80px)] lg:max-h-max overflow-hidden')}
        >
            <div className="flex flex-col w-full gap-5 lg:gap-9">
                <UserHeader loading={isPending} />
                <div
                    className={cn('grid grid-cols-1 md:gap-8 items-start px-4 lg:px-0',
                        !isOpen && 'lg:grid-cols-2')}
                >
                    <UserInfo loading={isPending} user={user} />
                    <div className="flex flex-col gap-7 w-full">
                        <HiringInfo loading={isPending} />
                    </div>
                </div>
            </div>
            <div className="px-4 lg:px-0 w-full">
                <HiringFunnel />
            </div>
        </div>
    )
}

export default ProfilePage
