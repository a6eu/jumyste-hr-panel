'use client'

import { Input, Label, Radio, Select } from '@/shared/ui'
import { useTranslation } from 'react-i18next'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Types } from '@/entities/jobs/model/types'
import { RotateCcw, X } from 'lucide-react'
import { Dialog } from '@headlessui/react'

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

    const cities = [
        { value: 'Almaty' },
        { value: 'Astana' },
        { value: 'London' },
        { value: 'Oral' },
        { value: 'Tashkent' },
        { value: 'Bishkek' },
    ]

    // Initialize state from URL params when modal opens
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
        setIsOpen(false)
    }

    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-50"
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
                            <Label htmlFor="location">Локация</Label>
                            <Select
                                defaultValue={searchParams.get('location') || ''}
                                placeholder="Выберите город"
                                options={cities}
                                onChangeAction={(option) => updateSearchParams('location', option as string)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>{t('jobForm.jobType.title')}</Label>
                            <div className="flex flex-col gap-2">
                                {(t('jobForm.jobType.array', { returnObjects: true }) as Types[]).map((type) => (
                                    <Radio
                                        key={type.value}
                                        name="employment_type"
                                        value={type.value}
                                        label={type.label}
                                        selected={searchParams.get('employment_type') === type.value}
                                        onChange={() => updateSearchParams('employment_type', type.value)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>{t('jobForm.workFormat.title')}</Label>
                            <div className="flex flex-col gap-2">
                                {(t('jobForm.workFormat.array', { returnObjects: true }) as Types[]).map((type) => (
                                    <Radio
                                        key={type.value}
                                        name="work_format"
                                        value={type.value}
                                        label={type.label}
                                        selected={searchParams.get('work_format') === type.value}
                                        onChange={() => updateSearchParams('work_format', type.value)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <Label htmlFor="show">
                                Показать вакансии
                            </Label>
                            <div className="flex flex-col gap-2">
                                {['Все', 'Открытые вакансии', 'Закрытые вакансии'].map((type) => (
                                    <Radio
                                        key={type}
                                        name="show"
                                        value={type}
                                        label={type}
                                        selected={searchParams.get('show') === type}
                                        onChange={() => updateSearchParams('show', type)}
                                    />
                                ))}
                            </div>
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