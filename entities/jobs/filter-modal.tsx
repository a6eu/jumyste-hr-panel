'use client'

import { Input, Label, Select } from '@/shared/ui'
import { useTranslation } from 'react-i18next'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Types } from '@/entities/jobs/model/types'
import { RotateCcw, X } from 'lucide-react'
import { Dialog } from '@headlessui/react'
import { skillsOptions } from '@/entities/jobs/job-create-form'

export const FilterModal = ({
                                isOpen,
                                setIsOpen,
                            }: {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}) => {
    const { t } = useTranslation()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [aiMatch, setAiMatch] = useState('')
    const [city, setCity] = useState<string[]>([])
    const [skills, setSkills] = useState<string[]>([])

    const cities = [
        { value: 'Almaty' },
        { value: 'Astana' },
        { value: 'London' },
        { value: 'Oral' },
        { value: 'Tashkent' },
        { value: 'Bishkek' },
    ]

    useEffect(() => {
        if (isOpen) {
            setAiMatch(searchParams.get('ai_match') || '')
        }
    }, [isOpen, searchParams])

    const updateSearchParams = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value) {
            params.set(key, value)
        } else {
            params.delete(key)
        }
        router.push(`?${params.toString()}`, { scroll: false })
    }

    const handleAiMatchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setAiMatch(value)
        updateSearchParams('ai_match', value)
    }

    const resetSearchParams = () => {
        router.replace(pathname)
        setAiMatch('')
    }

    const applyFilters = () => {
        const params = new URLSearchParams(searchParams.toString())

        if (aiMatch) params.set('ai_match', aiMatch)
        else params.delete('ai_match')

        router.push(`${pathname}?${params.toString()}`, { scroll: false })
        setIsOpen(false)
    }

    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-[100]"
        >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6">
                    <div className="flex justify-between items-center">
                        <Dialog.Title className="font-medium text-2xl">Фильтр</Dialog.Title>
                        <div className="flex gap-3">
                            <button
                                onClick={resetSearchParams}
                                className="p-1 text-gray-500 hover:text-gray-700"
                            >
                                <RotateCcw size={20} />
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 text-gray-500 hover:text-gray-700"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 space-y-7">
                        <div className="space-y-2 flex flex-col">
                            <Label htmlFor="ai-match">AI match</Label>
                            <Input
                                value={aiMatch}
                                onChange={handleAiMatchChange}
                                name="ai-match"
                                placeholder="AI match"
                                type="text"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="city">Локация</Label>
                            <Select
                                isMulti
                                value={city}
                                defaultValue={searchParams.getAll('city') || ''}
                                placeholder="Выберите город"
                                options={cities}
                                onChangeAction={(option) => {
                                    setCity((prev) => [...prev, option as string])
                                    updateSearchParams('city', option as string)
                                }}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location">Skills</Label>
                            <Select
                                isMulti
                                value={skills}
                                placeholder="Выберите город"
                                options={skillsOptions}
                                onChangeAction={(option) => updateSearchParams('location', option as string)}
                            />
                        </div>
                    </div>

                    <button
                        onClick={applyFilters}
                        className="w-full px-4 py-3 bg-button rounded-md text-white text-lg mt-8 hover:bg-button/90"
                    >
                        Применить фильтры
                    </button>
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}

export default FilterModal