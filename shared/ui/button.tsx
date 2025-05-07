import React from 'react'
import { cn } from '@/shared/utils'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant
    size?: ButtonSize
    fullWidth?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            className,
            variant = 'primary',
            size = 'md',
            fullWidth = false,
            ...props
        },
        ref
    ) => {
        const baseStyle = 'flex items-center justify-center font-medium rounded-2xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaryBlocks/50 disabled:opacity-50 disabled:pointer-events-none'

        const variants = {
            primary: 'bg-primaryBlocks text-white hover:bg-primaryBlocks/90',
            secondary: 'bg-secondary text-white hover:bg-secondary/90',
            outline: 'border border-primaryBlocks text-primaryBlocks bg-transparent hover:bg-primaryBlocks/10',
            ghost: 'text-primaryBlocks hover:bg-primaryBlocks/10',
            link: 'text-primaryBlocks underline-offset-4 hover:underline'
        }

        const sizes = {
            sm: 'h-9 px-4 text-sm',
            md: 'h-12 px-6 text-base',
            lg: 'h-14 px-8 text-lg'
        }

        return (
            <button
                ref={ref}
                className={cn(
                    baseStyle,
                    variants[variant],
                    sizes[size],
                    fullWidth && 'w-full',
                    className
                )}
                {...props}
            >
                {children}
            </button>
        )
    }
)

Button.displayName = 'Button'