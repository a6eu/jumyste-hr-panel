import React from 'react'
import { cn } from '@/shared/utils'

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
}

export const Button = ({ children, className, ...props }: ButtonProps) => {
    const baseStyle = 'px-6 h-12 flex items-center gap-2 bg-primaryBlocks font-medium rounded-2xl text-white'

    return (
        <button {...props} className={cn(baseStyle, className)} type="button">
            {children}
        </button>
    )
}