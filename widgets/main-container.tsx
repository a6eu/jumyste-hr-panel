'use client'

import { ReactNode } from 'react'
import { useAppSelector } from '@/redux/store'
import { usePathname } from 'next/navigation'

export const MainContainer = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname()
    const { isOpen } = useAppSelector(state => state.sidebar)
    return <main className={isOpen && !pathname.includes('auth') ? 'lg:pl-80' : ''}>
        {children}
    </main>
}
