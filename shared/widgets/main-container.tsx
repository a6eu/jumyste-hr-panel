'use client'

import { ReactNode } from 'react'
import { useAppSelector } from '@/shared/hooks'
import { usePathname } from 'next/navigation'

export const MainContainer = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname()
    const { isOpen } = useAppSelector(state => state.sidebar)

    // const baseStyle = "py-8 px-4 lg:px-16 gap-9"

    return <main className={isOpen && !pathname.includes('auth') ? 'lg:pl-80' : ''}>
        {children}
    </main>
}
