'use client'
import { getUser, logout } from '@/store/auth/authSlice'
import { RootState, useAppDispatch } from '@/store/store'
import { User, LogOut, SquareUser } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import LanguageSwitcher from './language-switcher'
import { toggleSidebar } from '@/store/ui/sidebarSlice'
import { useSelector } from 'react-redux'

const Header = () => {
    const [showUserMenu, setShowUserMenu] = useState(false)
    const { user } = useSelector((state: RootState) => state.auth)
    const pathname = usePathname()
    const dispatch = useAppDispatch()

    const handleClickAvatar = () => {
        setShowUserMenu(!showUserMenu)
    }

    useEffect(() => {
        dispatch(getUser())
    }, [])

    return (
        <header
            className={
                pathname.includes('auth')
                    ? 'hidden'
                    : 'flex w-full border-b-[3px]'
            }
        >
            <div className="flex items-center w-full py-3 px-4 lg:px-14">
                <div className="flex gap-9 absolute left-8 z-50">
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
                    <div className="flex justify-center items-center hover:bg-gray duration-150 cursor-pointer size-10 rounded-full">
                        <Image
                            onClick={() => dispatch(toggleSidebar())}
                            src="/svg/sidebar-toggle.svg"
                            width={20}
                            height={20}
                            alt=""
                        />
                    </div>
                </div>

                <div className="flex gap-5 items-center ml-auto">
                    <LanguageSwitcher />

                    <div className="flex items-center cursor-pointer justify-center bg-[#F3F3F3] size-11 rounded-full">
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

                    {showUserMenu && (
                        <UserMenu onClick={() => dispatch(logout())} />
                    )}
                </div>
            </div>
        </header>
    )
}

export default Header

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
