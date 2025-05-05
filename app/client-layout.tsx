'use client'

import { store } from './store'
import { Sidebar } from '@/shared/widgets/sidebar'
import { Provider } from 'react-redux'
import { usePathname } from 'next/navigation'
import { ToastProvider } from '@/shared/hooks/use-toast'
import { MainContainer } from '@/shared/widgets/main-container'
import Header from '@/shared/widgets/header'
import React from 'react'

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()

    return (
        <Provider store={store}>
            <div className="flex w-full">
                <Sidebar />
                <div className="w-full">
                    {!pathname.includes('/auth') && <Header />}
                    <ToastProvider>
                        <MainContainer>{children}</MainContainer>
                    </ToastProvider>
                </div>
            </div>
        </Provider>
    )
}
