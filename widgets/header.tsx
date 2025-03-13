'use client'

import { useAppDispatch, useAppSelector } from '@/redux/store'
import { LogOut, Menu, SquareUser, User, X } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { forwardRef, useState } from 'react'
import Link from 'next/link'
import { useOutsideClick } from '@/shared/hooks'
import { toggleSidebar } from '@/redux/ui/sidebarSlice'
import { cn } from '@/shared/lib/twmerge'
import { useTranslation } from 'react-i18next'
import { useGetProfileQuery } from '@/features/profile/hooks'
import { authServices } from '@/features/auth/api/auth.services'

export const Header = () => {
    const { isOpen } = useAppSelector(state => state.sidebar)
    const [showUserMenu, setShowUserMenu] = useState(false)
    const { user } = useGetProfileQuery()
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const pathname = usePathname()
    const dispatch = useAppDispatch()
    const ref = useOutsideClick<HTMLDivElement>(() => {
        setShowUserMenu(false)
    })

    const handleClickAvatar = () => {
        setShowUserMenu(!showUserMenu)
    }

    return (
        <>
            <header
                className={
                    pathname.includes('auth')
                        ? 'hidden'
                        : 'flex w-full'
                }
            >
                <div className="flex items-center w-full h-20 px-4 lg:px-14">
                    <div className={cn('flex w-[250px] items-center justify-between left-8 z-[100]',
                        isOpen ? 'fixed' : 'absolute')}>
                        <Link href="/" className="flex gap-3 items-end">
                            <Image
                                priority={true}
                                src="/logo-light.svg"
                                width={51}
                                height={47}
                                alt="Logo"
                            />
                            <h1 className="font-bold text-2xl">Jumyste</h1>
                        </Link>
                        <div
                            onClick={() => dispatch(toggleSidebar())}
                            className="flex justify-center items-center hover:bg-gray duration-150 cursor-pointer size-10 rounded-full">
                            <Image
                                src="/svg/sidebar-toggle.svg"
                                width={20}
                                height={20}
                                alt=""
                            />
                        </div>
                    </div>

                    <div className="ml-auto">
                        <div className="hidden sm:flex gap-5 items-center">
                            <div
                                className="flex items-center cursor-pointer justify-center bg-[#F3F3F3] size-11 rounded-full">
                                <Image
                                    src="/svg/bell.svg"
                                    height={20}
                                    width={16}
                                    alt=""
                                />
                            </div>
                            {user?.profile_picture ? (
                                <Image
                                    width={56}
                                    height={56}
                                    objectFit="cover"
                                    className="rounded-full"
                                    src={user.profile_picture}
                                    alt="User profile"
                                />
                            ) : (
                                <div
                                    onClick={handleClickAvatar}
                                    className="size-14 flex cursor-pointer justify-center items-center bg-[#D9D9D9] rounded-full"
                                >
                                    <User size={36} />
                                </div>
                            )}
                        </div>
                        <Menu onClick={() => setShowMobileMenu(!showMobileMenu)} className="sm:hidden cursor-pointer"
                              size={46} />


                    </div>
                </div>
            </header>
            {showUserMenu && (
                <UserMenu ref={ref} onClick={() => {
                    authServices.signOut()
                }} />
            )}

            {showMobileMenu && (
                <MobileMenu open={showMobileMenu} setOpen={setShowMobileMenu} />
            )}
        </>
    )
}


const MobileMenu = ({ open, setOpen }: { open: boolean, setOpen: (value: boolean) => void }) => {
    return <div className="absolute w-screen h-screen bg-white flex flex-col px-6 py-4 z-[100] top-0 sm:hidden">
        <X onClick={() => setOpen(!open)} size={56} className="self-end cursor-pointer" />
        <ul className="text-3xl font-medium flex flex-col w-full items-start space-y-6">
            <Link prefetch href="/profile">
                Профиль
            </Link>
            <Link href="/messages">
                Уведомления
            </Link>
            <button className="">
                Выйти
            </button>
        </ul>
    </div>
}

const UserMenu = forwardRef<HTMLDivElement, { onClick: () => void }>(
    ({ onClick }, ref) => {
        const { t } = useTranslation()
        return (
            <div ref={ref}
                 className="absolute top-20 right-4 flex flex-col border rounded-xl bg-white w-36 overflow-hidden">
                <button
                    onClick={() => (window.location.href = '/profile')}
                    className="flex justify-between font-medium p-3 border-b hover:bg-gray"
                >
                    {t('header.userMenu.profile')} <SquareUser />
                </button>
                <button
                    onClick={onClick}
                    className="flex justify-between font-medium p-3 hover:bg-red-300"
                >
                    {t('header.userMenu.logout')} <LogOut />
                </button>
            </div>
        )
    },
)

