'use client'

import UserHeader from '@/entities/profile/user-header'
import UserInfo from '@/entities/profile/user-info'
import HiringInfo from '@/entities/profile/hiring-info'
import HiringFunnel from '@/entities/profile/hiring-funnel'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { getUser } from '@/entities/profile/model/userSlice'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/shared/utils'

const ProfilePage = () => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const { user, loading } = useAppSelector((state) => state.user)
    const { isOpen } = useAppSelector((state) => state.sidebar)

    useEffect(() => {
        dispatch(getUser()).then(r => console.log(r))
    }, [])

    if (!user && !loading) {
        return (
            <div className="flex justify-center text-3xl py-9 px-10 text-red-500 font-medium">
                {t('errors.loadingError')}
            </div>
        )
    }

    return (
        <div
            className={cn('w-full py-8 px-4 lg:px-16 gap-9 grid grid-cols-1 lg:gap-8 border-t-[3px]',
                isOpen ? 'max-h-[calc(100svh-80px)] lg:max-h-max overflow-hidden lg:grid-cols-[1.1fr,1fr]' : "lg:grid-cols-[2fr,1fr]")}
        >
            <div className="flex flex-col w-full gap-5 lg:gap-9">
                <UserHeader loading={loading} />
                <div
                    className={cn('grid grid-cols-1 md:gap-8 items-start px-4 lg:px-0',
                        !isOpen && 'lg:grid-cols-2')}
                >
                    <UserInfo loading={loading} user={user} />
                    <div className="flex flex-col gap-7 w-full">
                        <HiringInfo loading={loading} />
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
