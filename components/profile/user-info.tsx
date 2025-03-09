'use client'

import { Skeleton } from '@mui/material'
import { Linkedin, Mail, Phone } from 'lucide-react'
import Image from 'next/image'

const UserInfo = ({
    user,
    loading,
    t,
}: {
    user?: { first_name: string; last_name: string; email: string }
    loading: boolean
    t: (key: string) => string
}) => {
    return (
        <div className="py-6 px-4 bg-white border-[#E4E4E4] border-[1px] rounded-2xl flex flex-col w-full mt-8">
            <h2 className="self-center mb-2.5 font-medium text-2xl">
                {t('profile.generalInfo')}
            </h2>
            <div className="space-y-2 flex flex-col">
                <div>
                    <span className="text-primary font-semibold">
                        {t('profile.fullName')}:
                    </span>{' '}
                    {loading ? (
                        <Skeleton width={150} height={24} />
                    ) : (
                        <span>{user?.first_name + ' ' + user?.last_name}</span>
                    )}
                </div>
                <div>
                    <span className="text-primary font-semibold">
                        {t('profile.specialization')}:
                    </span>{' '}
                    {loading ? (
                        <Skeleton width={120} height={24} />
                    ) : (
                        <span>HR Manager</span>
                    )}
                </div>
                <div>
                    <span className="text-primary font-semibold">
                        {t('profile.contacts')}:
                    </span>
                    <div className="*:flex *:items-center *:gap-2 space-y-2">
                        {loading ? (
                            <>
                                <Skeleton width={200} height={24} />
                                <Skeleton width={200} height={24} />
                                <Skeleton width={200} height={24} />
                            </>
                        ) : (
                            <>
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
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="w-[90%] bg-[#9F9F9F] h-[1px] self-center mt-6 mb-4 rounded-full" />
            <div className="mt-2 space-y-2">
                {loading ? (
                    <>
                        <Skeleton width={250} height={18} />
                        <Skeleton width={200} height={18} />
                    </>
                ) : (
                    <>
                        <div className="flex items-start text-sm gap-1">
                            <div className="bg-primaryBlocks size-4 rounded-md shrink-0 inline-block"></div>
                            <p className="-mt-[2px]">
                                {t('profile.avgDays')}: 25
                            </p>
                        </div>
                        <div className="flex items-start text-sm gap-1">
                            <div className="bg-primaryBlocks size-4 rounded-md shrink-0 inline-block"></div>
                            <p className="-mt-[2px]">
                                {t('profile.totalEmployees')}: 105
                            </p>
                        </div>
                    </>
                )}
            </div>
            <div className="w-[90%] bg-[#9F9F9F] h-[1px] self-center mt-6 mb-4 rounded-full" />
            <div className="flex justify-between">
                {loading ? (
                    <Skeleton width={40} height={40} variant="rounded" />
                ) : (
                    <div
                        onClick={() => (window.location.href = '/profile/edit')}
                        className="size-10 bg-gray flex justify-center items-center rounded-xl cursor-pointer"
                    >
                        <Image
                            src="/svg/edit.svg"
                            width={24}
                            height={24}
                            alt=""
                        />
                    </div>
                )}
                <div className="w-24 flex justify-between">
                    {loading ? (
                        <>
                            <Skeleton
                                width={40}
                                height={40}
                                variant="rounded"
                            />
                            <Skeleton
                                width={40}
                                height={40}
                                variant="rounded"
                            />
                        </>
                    ) : (
                        <>
                            <div className="size-10 bg-primaryBlocks flex justify-center items-center rounded-xl cursor-pointer">
                                <Image
                                    src="/svg/github.svg"
                                    width={20}
                                    height={20}
                                    alt=""
                                />
                            </div>
                            <div className="size-10 bg-primaryBlocks flex justify-center items-center rounded-xl cursor-pointer">
                                <Image
                                    src="/svg/telegram.svg"
                                    width={21}
                                    height={17.5}
                                    alt=""
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UserInfo
