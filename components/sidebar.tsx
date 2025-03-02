import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/twmerge'
import { ClipboardList, UserPlus, CalendarDays, Plus, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useAppSelector } from '@/store/store'

export const Sidebar = () => {
    const [active, setActive] = useState('board')
    const pathname = usePathname()
    const isOpen = useAppSelector((state) => state.sidebar.isOpen)

    useEffect(() => {
        if (pathname.includes('/recruiting')) setActive('recruiting')
        else if (pathname.includes('/schedule')) setActive('schedule')
        else setActive('board')
    }, [pathname])

    return (
        <aside
            className={cn(
                'w-full max-w-80 pt-20 bg-white border-r-2 shrink-0 px-8 duration-300',
                pathname.includes('auth') && 'hidden',
                isOpen ? 'translate-x-0' : '-translate-x-full hidden'
            )}
        >
            <div className="bg-[#D4D4D4] h-[3px] w-full" />
            <div className="pt-7 flex flex-col gap-10">
                <div className="border border-[#C0C0C0] gap-1.5 bg-[#F8F7F7] rounded-sm p-2 flex">
                    <div className="bg-[#C4C4C4] rounded size-11" />
                    <div>
                        <h2 className="font-bold">AO &quot;Халык Банк&quot;</h2>
                        <p className="text-sm">Команда 250 сотрудников</p>
                    </div>
                </div>

                {/* Main menu */}
                <div>
                    <h1 className="font-bold text-sm text-[#A3A2A2] uppercase ml-5">
                        Главное меню
                    </h1>
                    <div className="flex flex-col font-semibold">
                        <div
                            onClick={() => setActive('board')}
                            className={cn(
                                'flex items-center gap-5 border-2 h-14 rounded-md pl-4 cursor-pointer',
                                active === 'board'
                                    ? 'border-primaryBlocks bg-[#E1D5FF] text-primaryBlocks'
                                    : 'bg-white text-black border-transparent'
                            )}
                        >
                            <ClipboardList />
                            Доска Объявлений
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
                                    : ' bg-white text-black border-transparent'
                            )}
                        >
                            <UserPlus />
                            Рекрутинг
                        </div>
                        <div
                            onClick={() => setActive('schedule')}
                            className={cn(
                                'flex items-center gap-5 border-2 h-14 rounded-md pl-4 cursor-pointer',
                                active === 'schedule'
                                    ? 'border-primaryBlocks bg-[#E1D5FF] text-primaryBlocks'
                                    : 'bg-white text-black border-transparent'
                            )}
                        >
                            <CalendarDays />
                            График
                        </div>
                    </div>
                </div>
                <div className="bg-[#D4D4D4] h-[3px] w-full" />
                <Departments />
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
    const [isAdding, setIsAdding] = useState(false)
    const addMenuRef = useRef<HTMLDivElement>(null)

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
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isAdding])

    return (
        <div className="max-w-sm">
            <div className="flex justify-between items-center">
                <h1 className="text-gray-500 font-bold uppercase">
                    Департаменты
                </h1>
                <button
                    onClick={() => setIsAdding(true)}
                    className="p-1 rounded-full hover:bg-gray-200"
                >
                    <Plus size={20} />
                </button>
            </div>

            {isAdding && (
                <div
                    ref={addMenuRef}
                    className="mt-4 p-3 border rounded-md bg-gray-50 relative"
                >
                    <input
                        type="text"
                        placeholder="Название отдела"
                        className="w-full p-2 border rounded-md focus:outline-none"
                        value={newDepartment}
                        onChange={(e) => setNewDepartment(e.target.value)}
                    />
                    <select
                        className="w-full mt-2 p-2 border rounded-md"
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                    >
                        {colorOptions.map((color) => (
                            <option key={color.value} value={color.value}>
                                {color.name}
                            </option>
                        ))}
                    </select>
                    <button
                        className="w-full mt-2 p-2 bg-blue-500 text-white rounded-md"
                        onClick={addDepartment}
                    >
                        Добавить
                    </button>
                </div>
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
