'use client'

import UserHeader from '@/components/profile/user-header'
import UserInfo from '@/components/profile/user-info'
import HiringInfo from '@/components/profile/hiring-info'
import HiringFunnel from '@/components/profile/hiring-funnel'
import { RootState, useAppDispatch, useAppSelector } from '@/redux/store'
import { getUser } from '@/redux/auth/authSlice'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/twmerge'

const ProfilePage = () => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const { user, error, loading } = useAppSelector((state) => state.auth)
    const { isOpen } = useSelector((state: RootState) => state.sidebar)

    useEffect(() => {
        dispatch(getUser())
    }, [])

    if (error) {
        return (
            <div className="flex justify-center text-3xl py-9 px-10 text-red-500 font-medium">
                {t('errors.loadingError')}
            </div>
        )
    }

    return (
        user && (
            <div
                className={cn('w-full py-8 px-4 gap-9 grid grid-cols-1 lg:grid-cols-[1.1fr,1fr] lg:gap-8',
                    isOpen && 'max-h-[calc(100svh-80px)] lg:max-h-max overflow-hidden')}
            >
                <div className="flex flex-col w-full gap-5 lg:gap-9">
                    <UserHeader t={t} loading={loading} />
                    <div
                        className={cn('grid grid-cols-1 md:gap-8 items-start px-4 lg:px-0',
                            !isOpen && 'lg:grid-cols-2')}
                    >
                        <UserInfo t={t} loading={loading} user={user} />
                        <div className="flex flex-col gap-7 w-full">
                            <HiringInfo t={t} loading={loading} />
                        </div>
                    </div>
                </div>
                <div className="px-4 lg:px-0 w-full">
                    <HiringFunnel t={t} />
                </div>
            </div>
        )
    )
}

export default ProfilePage
