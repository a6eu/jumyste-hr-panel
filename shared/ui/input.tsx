import { cn } from '@/shared/utils'
import React, { ChangeEventHandler } from 'react'

interface InputData {
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined
    value?: string | number | readonly string[] | undefined
    className?: string | undefined
    name: string | undefined
    type: string | undefined
    placeholder?: string | undefined
}

export const Input = ({ onChange, value, className = '', name, type, placeholder }: InputData) => {
    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            className={cn('w-full p-2 border rounded-md mb-1 max-w-72', className)}
            onChange={onChange}
            value={value}
        />
    )
}