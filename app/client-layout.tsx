'use client'

import { store } from '@/redux/store'
import { Header, MainContainer, Sidebar } from '@/widgets/'
import { Provider } from 'react-redux'
import { usePathname } from 'next/navigation'
import { ToastProvider } from '@/shared/hooks'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()


    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <div className="flex w-full">
                    <Sidebar />
                    <div className="w-full">
                        {!pathname.includes('/auth') && <Header />}
                        <ToastProvider>
                            <MainContainer>{children}</MainContainer>
                        </ToastProvider>
                    </div>
                </div>
            </QueryClientProvider>
        </Provider>
    )
}
