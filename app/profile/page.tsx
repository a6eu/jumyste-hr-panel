'use client'

import UserHeader from '@/components/profile/user-header'
import UserInfo from '@/components/profile/user-info'
import HiringInfo from '@/components/profile/hiring-info'
import HiringFunnel from '@/components/profile/hiring-funnel'
import { RootState, useAppDispatch } from '@/store/store'
import { getUser } from '@/store/auth/authSlice'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { cn } from '@/lib/twmerge'

const ProfilePage = () => {
    const dispatch = useAppDispatch()
    const { user, error, loading } = useSelector(
        (state: RootState) => state.auth
    )
    const { isOpen } = useSelector((state: RootState) => state.sidebar)

    useEffect(() => {
        dispatch(getUser())
    }, [])

    console.log(user)

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error!</div>
    }

    return (
        user && (
            <div
                className={cn(
                    'w-full py-8 px-4 flex gap-8 flex-col justify-between items-stretch',
                    isOpen
                        ? 'lg:pr-[78px] pl-4 flex-col'
                        : 'lg:px-[78px] lg:flex-row'
                )}
            >
                <div className="flex w-full flex-[70%] gap-5 lg:gap-9">
                    <div className="flex flex-col w-full items-center lg:items-start">
                        <UserHeader />
                        <div
                            className={cn(
                                'flex flex-col md:gap-8 items-start px-4 lg:px-0',
                                isOpen ? 'lg:flex-row' : 'lg:flex-row'
                            )}
                        >
                            <UserInfo user={user} />
                            <div className="flex flex-col gap-7 w-full">
                                <HiringInfo />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="px-4 lg:px-0 w-full flex-[30%]">
                    <HiringFunnel />
                </div>
            </div>
        )
    )
}

export default ProfilePage
