'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/shared/utils'
import { CalendarDays, ClipboardList, MessageSquareText, Plus, UserPlus } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { Settings } from '@/shared/ui/settings'
import { useTranslation } from 'react-i18next'
import { openSidebar } from '@/shared/widgets/models/sidebarSlice'
import $api from '@/http/setup'
import Link from 'next/link'

const menuLinks = [
    {
        key: 'board',
        label: 'sidebar.mainMenu.bulletinBoard',
        icon: <ClipboardList />,
        path: '/board',
    },
    {
        key: 'messages',
        label: 'sidebar.mainMenu.messages',
        icon: <MessageSquareText />,
        path: '/messages',
    },
    {
        key: 'recruiting',
        label: 'sidebar.mainMenu.recruiting',
        icon: <UserPlus />,
        path: '/recruiting',
    },
]

export const Sidebar = () => {
    const [active, setActive] = useState('')
    const pathname = usePathname()
    const router = useRouter()
    const isOpen = useAppSelector((state) => state.sidebar.isOpen)
    const dispatch = useAppDispatch()
    const { user } = useAppSelector((state) => state.user)
    const { t } = useTranslation()

    useEffect(() => {
        if (pathname.includes('/recruiting')) setActive('recruiting')
        else if (pathname.includes('/schedule')) setActive('schedule')
        else if (pathname.includes('/board')) setActive('board')
        else if (pathname.includes('/messages')) setActive('messages')
    }, [pathname])

    useEffect(() => {
        if (window.innerWidth >= 728) dispatch(openSidebar())
    }, [])

    return (
        <aside
            className={cn(
                `top-0 w-full max-w-80 pt-20 bg-white border-r-2 shrink-0 transition-all px-8 duration-300 h-screen z-50 fixed shadow-2xl lg:shadow-none`,
                pathname.includes('auth') && 'hidden',
                isOpen ? 'translate-x-0' : '-translate-x-full hidden',
            )}
        >
            <div className="bg-[#D4D4D4] h-[3px] w-full" />
            <div className="pt-7 flex flex-col gap-5">
                <div className="border border-[#C0C0C0] gap-1.5 bg-[#F8F7F7] rounded-sm p-2 flex items-center">
                    <div className="bg-[#C4C4C4] rounded size-11" />
                    <h2 className="font-bold text-xl">{user?.company.name}</h2>
                </div>

                <div>
                    <h1 className="font-bold text-sm text-[#A3A2A2] uppercase ml-5">
                        {t('sidebar.mainMenu.title')}
                    </h1>
                    <div className="flex flex-col font-semibold">
                        {menuLinks.map(({ key, label, icon, path }) => (
                            <div
                                key={key}
                                onClick={() => {
                                    setActive(key)
                                    router.push(path)
                                }}
                                className={cn(
                                    'flex items-center gap-5 h-14 rounded-md pl-4 cursor-pointer select-none',
                                    active === key
                                        ? 'bg-[#E1D5FF] text-primaryBlocks'
                                        : 'bg-white text-black border-transparent',
                                )}
                            >
                                {icon}
                                {t(label)}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-[#D4D4D4] h-[3px] w-full" />
                <Departments />
                <Settings />
            </div>
        </aside>
    )
}

const colorOptions = [
    { name: 'Blue', value: '#2979FF' },
    { name: 'Green', value: '#4CAF50' },
    { name: 'Purple', value: '#8E44AD' },
    { name: 'Red', value: '#E53935' },
    { name: 'Yellow', value: '#FBC02D' },
]

export const Departments = () => {
    const [departments, setDepartments] = useState<{ id?: number, name: string, color: string }[]>([])
    const [newDepartment, setNewDepartment] = useState('')
    const [selectedColor, setSelectedColor] = useState(colorOptions[0].value)
    const [showDropdown, setShowDropdown] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useAppSelector((state) => state.user)
    const addMenuRef = useRef<HTMLFormElement | null>(null)
    const { t } = useTranslation()

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                setIsLoading(true)
                const response = await $api.get('/departments/all')
                setDepartments(response.data)
            } catch (error) {
                console.error('Error fetching departments:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchDepartments()
    }, [])

    const addDepartment = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newDepartment.trim()) return

        try {
            setIsLoading(true)
            const response = await $api.post('departments/', {
                name: newDepartment,
                color: selectedColor,
            })

            setDepartments([...departments, response.data])
            setNewDepartment('')
            setSelectedColor(colorOptions[0].value)
            setIsAdding(false)
        } catch (error) {
            console.error('Error adding department:', error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isAdding &&
                addMenuRef.current &&
                !addMenuRef.current.contains(event.target as Node)
            ) {
                setIsAdding(false)
            }
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsAdding(false)
                setShowDropdown(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isAdding])

    const handleSelectColor = (color: string) => {
        setSelectedColor(color)
        setShowDropdown(false)
    }


    if (!user?.is_owner) {
        return null
    }


    return (
        <div className="max-w-sm h-64 overflow-scroll">
            <div className="flex justify-between items-center">
                <h1 className="text-gray-500 font-bold uppercase">
                    {t('sidebar.departments.title')}
                </h1>
                <button
                    onClick={() => setIsAdding(true)}
                    className="p-1 rounded-full hover:bg-gray-200"
                    disabled={isLoading}
                >
                    <Plus size={20} />
                </button>
            </div>

            {isLoading && !isAdding && (
                <div className="mt-4 text-center">Loading departments...</div>
            )}

            {isAdding && (
                <form
                    ref={addMenuRef}
                    className="mt-4 relative"
                    onSubmit={addDepartment}
                >
                    <div className="flex items-center gap-2">
                        <div
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="border border-[#A3A2A2] rounded-md p-2.5 cursor-pointer"
                        >
                            <div
                                style={{ backgroundColor: selectedColor }}
                                className="size-5 rounded"
                            />
                        </div>
                        {showDropdown && (
                            <div
                                className="border border-[#A3A2A2] rounded-b p-2.5 flex flex-col gap-2 absolute bg-white border-t-0 top-[35px] shadow-md">
                                {colorOptions.map((option, index) => (
                                    <div
                                        className="size-5 rounded cursor-pointer"
                                        key={index}
                                        style={{
                                            backgroundColor: option.value,
                                        }}
                                        onClick={() =>
                                            handleSelectColor(option.value)
                                        }
                                    />
                                ))}
                            </div>
                        )}
                        <input
                            type="text"
                            placeholder="Название отдела"
                            className="w-full p-2 border rounded-md focus:outline-none"
                            value={newDepartment}
                            onChange={(e) => setNewDepartment(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-2 p-2 bg-primaryBlocks text-white rounded-md"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Adding...' : t('sidebar.departments.button')}
                    </button>
                </form>
            )}

            <div className="mt-4 space-y-3">
                {departments?.map((dept) => (
                    <div key={dept.id} className="flex items-center gap-3 group">
                        <div
                            className="w-5 h-5 rounded bg-gray-300"
                            style={{ backgroundColor: dept.color }}
                        />
                        <p className="text-gray-600 flex-1">{dept.name}</p>
                    </div>
                ))}
                <Link href="/departments" className="text-stone-500">Manage departments</Link>
            </div>


        </div>
    )
}

