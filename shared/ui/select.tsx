'use client'

import { ChevronDown, X } from 'lucide-react'
import React, { useState } from 'react'
import { cn } from '@/shared/utils'
import { useOutsideClick } from '@/shared/hooks/use-outside-click'

type OptionType = {
    label?: string | null
    value: string
    color?: string | null
}

interface SelectProps {
    options: OptionType[]
    placeholder: string
    onChangeAction: (option: string | string[]) => void
    defaultValue?: string
    value?: string | string[]
    isMulti?: boolean
}

export const Select = ({
                           options,
                           placeholder,
                           onChangeAction,
                           defaultValue = '',
                           isMulti = false,
                           value = '',
                       }: SelectProps) => {
    const [showList, setShowList] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([])
    const [allOptions, setAllOptions] = useState<OptionType[]>(options)
    const ref = useOutsideClick<HTMLDivElement>(() => setShowList(false))
    const [showMultiOptions, setShowMultiOptions] = useState(false)
    const selectedOption = options.find((option) => option.value === value) || null

    const removeFromAllOptions = (option: OptionType) => {
        setAllOptions(l => l.filter(item => item.value !== option.value))
    }

    const populateSelectedOptions = (option: OptionType) => {
        const newSelected = [...selectedOptions, option]
        setSelectedOptions(newSelected)
        onChangeAction(newSelected.map(opt => opt.value))
    }

    const removeFromSelectedOptions = (option: OptionType) => {
        const newSelected = selectedOptions.filter(item => item.value !== option.value)
        setSelectedOptions(newSelected)
        setAllOptions(prev => [...prev, option])
        onChangeAction(newSelected.map(opt => opt.value))
    }

    return (
        <div ref={ref} className="relative w-72 flex flex-col gap-4">
            <div
                onClick={() => {
                    isMulti ? setShowMultiOptions(true) : setShowList(!showList)
                }}
                className={cn(
                    'w-full rounded-sm border min-h-10 flex flex-wrap items-center pl-4 bg-white cursor-pointer py-1',
                    value ? 'text-black' : 'text-black/40', isMulti && 'gap-2',
                )}
            >
                {isMulti
                    ? selectedOptions.length > 0 && selectedOptions.map((option) => (
                    <button
                        type="button"
                        key={option.value}
                        onClick={() => removeFromSelectedOptions(option)}
                        className="border border-midGray bg-lightGray text-black rounded-2xl px-1.5 py-1 text-xs"
                    >
                        {option.label ? option.label : option.value}
                    </button>
                ))
                    : selectedOption ? selectedOption.label ? selectedOption.label : selectedOption.value : placeholder}
                {!isMulti && <ChevronDown className="absolute top-2 right-4 text-black/40" />}
            </div>
            {showMultiOptions ? (
                <div className="flex flex-col relative bg-lightGray max-h-52 overflow-scroll max-w-sm w-full">
                    <button onClick={() => {
                        setShowMultiOptions(false)
                    }} type="button" className="absolute top-2 right-3">
                        <X size={20} />
                    </button>
                    <div className="flex flex-wrap gap-2 pt-7 pb-3 px-3 rounded">
                        {allOptions.map((option) => (
                            <button
                                onClick={() => {
                                    populateSelectedOptions(option)
                                    removeFromAllOptions(option)
                                }}
                                type="button"
                                className="border border-midGray bg-white py-1.5 px-2.5 rounded-2xl text-xs"
                                key={option.value}
                            >
                                {option.label ? option.label : option.value}
                            </button>
                        ))}
                    </div>
                </div>
            ) : showList && (
                <div
                    className="absolute min-w-full bg-white border border-t-0 rounded-b-sm max-h-40 overflow-y-auto custom-scrollbar z-10 top-10"
                >
                    {options.map((option) => (
                        <div key={option.value} className="flex gap-2 items-center px-4 my-1.5">
                            {option.color ? <div
                                style={option.color ? { backgroundColor: option.color } : undefined}
                                className="size-5 rounded"
                            /> : null}
                            <div
                                onClick={() => {
                                    setShowList(false)
                                    onChangeAction(option.value as string)
                                }}
                                className="flex gap-2 items-center text-black cursor-pointer select-none"
                            >
                                {option.label ? option.label : option.value}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
