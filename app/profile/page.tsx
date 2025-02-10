'use client'

import { getUser } from '@/store/auth/authSlice'
import { RootState, useAppDispatch } from '@/store/store'
import { Linkedin, Mail, Phone } from 'lucide-react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const ProfilePage = () => {
    const dispatch = useAppDispatch()
    const { user, error, loading } = useSelector(
        (state: RootState) => state.auth
    )

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error!</div>
    }

    return (
        <div>
            <div className="flex items-center gap-7">
                <div className="size-52 bg-secondaryLight rounded-full"></div>
                <div>
                    <h2 className="font-semibold text-2xl mb-7">
                        HR Manager Profile
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="bg-primary size-[72px] rounded-lg"></div>
                        <div>
                            <span className="text-xl">
                                АО &quot;Халык Банк&quot;
                            </span>
                            <p className="text-black/50">250 сотрудников</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-6 px-4 border-[#9F9F9F] border-[1px] rounded-2xl flex flex-col w-[340px] mt-8">
                <h2 className="self-center mb-2.5 font-medium text-2xl">
                    Общие сведения
                </h2>
                <div className="space-y-2 flex flex-col">
                    <div>
                        <span className="text-primary font-semibold">ФИО:</span>{' '}
                        <span>{user?.first_name + ' ' + user?.last_name}</span>
                    </div>
                    <div>
                        <span className="text-primary font-semibold">
                            Должность:
                        </span>{' '}
                        <span>HR Manager</span>
                    </div>
                    <div>
                        <span className="text-primary font-semibold">
                            Контактные данные:
                        </span>
                        <div className="*:flex *:items-center *:gap-2 space-y-2">
                            <p>
                                <Mail color="#A3A2A2" />
                                {user?.email}
                            </p>
                            <p>
                                <Phone color="#A3A2A2" /> +7 777 77 77
                            </p>
                            <p className="underline">
                                <Linkedin color="#A3A2A2" /> linkedin.com
                            </p>
                        </div>
                    </div>
                    <div className="w-[90%] bg-[#9F9F9F] h-[1px] self-center" />
                    <div className="mt-2 space-y-2">
                        <div className="flex items-start text-sm gap-1">
                            <div className="bg-primary size-4 rounded-md shrink-0 inline-block"></div>
                            <p className="-mt-[2px]">
                                {' '}
                                Среднее время закрытии вакансии 25 дней
                            </p>
                        </div>
                        <div className="flex items-start text-sm gap-1">
                            <div className="bg-primary size-4 rounded-md shrink-0 inline-block"></div>
                            <p className="-mt-[2px]">
                                {' '}
                                Среднее время закрытии вакансии 25 дней
                            </p>
                        </div>
                        <div className="flex items-start text-sm gap-1">
                            <div className="bg-primary size-4 rounded-md shrink-0 inline-block"></div>
                            <p className="-mt-[2px]">
                                {' '}
                                Среднее время закрытии вакансии 25 дней
                            </p>
                        </div>
                        <div className="flex items-start text-sm gap-1">
                            <div className="bg-primary size-4 rounded-md shrink-0 inline-block"></div>
                            <p className="-mt-[2px]">
                                {' '}
                                Среднее время закрытии вакансии 25 дней
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
