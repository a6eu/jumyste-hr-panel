'use client'
import { getUser, logout } from '@/redux/auth/authSlice'
import { RootState, useAppDispatch } from '@/redux/store'
import { LogOut, Menu, SquareUser, User, X } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { toggleSidebar } from '@/redux/ui/sidebarSlice'
import { useSelector } from 'react-redux'

const Header = () => {
    const [showUserMenu, setShowUserMenu] = useState(false)
    const { user } = useSelector((state: RootState) => state.auth)
    const [showMobileMenu, setShowMobileMenu] = useState(false)
    const pathname = usePathname()
    const dispatch = useAppDispatch()

    const handleClickAvatar = () => {
        setShowUserMenu(!showUserMenu)
    }

    useEffect(() => {
        dispatch(getUser())
    }, [])

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
                    <div className="flex w-[250px] items-center justify-between absolute left-8 z-50">
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
                            className="flex justify-center items-center hover:bg-gray duration-150 cursor-pointer size-10 rounded-full">
                            <Image
                                onClick={() => dispatch(toggleSidebar())}
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
                <UserMenu onClick={() => dispatch(logout())} />
            )}

            {showMobileMenu && (
                <MobileMenu open={showMobileMenu} setOpen={setShowMobileMenu} />
            )}
        </>
    )
}


const MobileMenu = ({ open, setOpen }: { open: boolean, setOpen: (value: boolean) => void }) => {
    return <div className="absolute w-screen h-screen bg-white flex flex-col px-6 py-4 z-50 top-0 sm:hidden">
        <X onClick={() => setOpen(!open)} size={56} className="self-end cursor-pointer" />
        <ul className="text-3xl font-medium flex flex-col w-full items-start space-y-6">
            <Link href="/profile">
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

const UserMenu = ({ onClick }: { onClick: () => void }) => {
    return (
        <div className="absolute top-20 right-4 flex flex-col border rounded-xl bg-white w-36 overflow-hidden">
            <button
                onClick={() => (window.location.href = '/profile')}
                className="flex justify-between font-medium p-3 border-b hover:bg-gray"
            >
                Профиль <SquareUser />
            </button>
            <button
                onClick={onClick}
                className="flex justify-between font-medium p-3 hover:bg-red-300"
            >
                Выйти <LogOut />
            </button>
        </div>
    )
}

export default Header
