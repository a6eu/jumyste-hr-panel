'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/shared/lib/twmerge'
import { CalendarDays, ClipboardList, Plus, UserPlus, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useAppSelector } from '@/redux/store'
import { Settings } from '@/shared/ui'
import { useTranslation } from 'react-i18next'

export const Sidebar = () => {
    const [active, setActive] = useState('')
    const pathname = usePathname()
    const isOpen = useAppSelector((state) => state.sidebar.isOpen)
    const { t } = useTranslation()

    useEffect(() => {
        if (pathname.includes('/recruiting')) setActive('recruiting')
        else if (pathname.includes('/schedule')) setActive('schedule')
    }, [pathname])

    return (
        <aside
            className={cn(
                `top-0 w-full max-w-80 pt-20 bg-white border-r-2 shrink-0 transition-all px-8 duration-300 h-screen z-50 fixed shadow-2xl lg:shadow`,
                pathname.includes('auth') && 'hidden',
                isOpen ? 'translate-x-0' : '-translate-x-full hidden',
            )}
        >
            <div className="bg-[#D4D4D4] h-[3px] w-full" />
            <div className="pt-7 flex flex-col gap-10">
                <div className="border border-[#C0C0C0] gap-1.5 bg-[#F8F7F7] rounded-sm p-2 flex">
                    <div className="bg-[#C4C4C4] rounded size-11" />
                    <div>
                        <h2 className="font-bold">AO &quot;Халык Банк&quot;</h2>
                        <p className="text-sm">{t('sidebar.team')} 250 {t('sidebar.employees')}</p>
                    </div>
                </div>

                <div>
                    <h1 className="font-bold text-sm text-[#A3A2A2] uppercase ml-5">
                        {t('sidebar.mainMenu.title')}
                    </h1>
                    <div className="flex flex-col font-semibold">
                        <div
                            onClick={() => setActive('board')}
                            className={cn(
                                'flex items-center gap-5 border-2 h-14 rounded-md pl-4 cursor-pointer',
                                active === 'board'
                                    ? 'border-primaryBlocks bg-[#E1D5FF] text-primaryBlocks'
                                    : 'bg-white text-black border-transparent',
                            )}
                        >
                            <ClipboardList />
                            {t('sidebar.mainMenu.bulletinBoard')}
                        </div>
                        <div
                            onClick={() => {
                                setActive('recruiting')
                                window.location.href = '/recruiting'
                            }}
                            className={cn(
                                'flex items-center gap-5 border-2 h-14 rounded-md pl-4 cursor-pointer',
                                active === 'recruiting'
                                    ? 'border-primaryBlocks bg-[#E1D5FF] text-primaryBlocks'
                                    : ' bg-white text-black border-transparent',
                            )}
                        >
                            <UserPlus />
                            {t('sidebar.mainMenu.recruiting')}
                        </div>
                        <div
                            onClick={() => setActive('schedule')}
                            className={cn(
                                'flex items-center gap-5 border-2 h-14 rounded-md pl-4 cursor-pointer',
                                active === 'schedule'
                                    ? 'border-primaryBlocks bg-[#E1D5FF] text-primaryBlocks'
                                    : 'bg-white text-black border-transparent',
                            )}
                        >
                            <CalendarDays />
                            {t('sidebar.mainMenu.schedule')}
                        </div>
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
    const [departments, setDepartments] = useState([
        { name: 'Финансы', color: '#2979FF' },
        { name: 'IT Департамент', color: '#4CAF50' },
        { name: 'Дата-Аналитики', color: '#8E44AD' },
        { name: 'Дизайнеры', color: '#E53935' },
        { name: 'Проект Менеджеры', color: '#FBC02D' },
    ])
    const [newDepartment, setNewDepartment] = useState('')
    const [selectedColor, setSelectedColor] = useState(colorOptions[0].value)
    const [showDropdown, setShowDropdown] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    const addMenuRef = useRef<HTMLFormElement | null>(null)
    const { t } = useTranslation()

    const addDepartment = () => {
        if (!newDepartment.trim()) return
        setDepartments([
            ...departments,
            { name: newDepartment, color: selectedColor },
        ])
        setNewDepartment('')
        setSelectedColor(colorOptions[0].value)
        setIsAdding(false)
    }

    const removeDepartment = (index: number) => {
        setDepartments(departments.filter((_, i) => i !== index))
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

    return (
        <div className="max-w-sm">
            <div className="flex justify-between items-center">
                <h1 className="text-gray-500 font-bold uppercase">
                    {t('sidebar.departments.title')}
                </h1>
                <button
                    onClick={() => setIsAdding(true)}
                    className="p-1 rounded-full hover:bg-gray-200"
                >
                    <Plus size={20} />
                </button>
            </div>

            {isAdding && (
                <form ref={addMenuRef} className="mt-4 relative">
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
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-2 p-2 bg-primaryBlocks text-white rounded-md"
                        onClick={addDepartment}
                    >
                        {t('sidebar.departments.button')}
                    </button>
                </form>
            )}

            <div className="mt-4 space-y-3">
                {departments.map((dept, index) => (
                    <div key={index} className="flex items-center gap-3 group">
                        <div
                            className="w-5 h-5 rounded bg-gray-300"
                            style={{ backgroundColor: dept.color }}
                        />
                        <p className="text-gray-600 flex-1">{dept.name}</p>
                        <button
                            onClick={() => removeDepartment(index)}
                            className="p-1 rounded-full hover:bg-gray-200"
                        >
                            <X className="hidden group-hover:block" size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
