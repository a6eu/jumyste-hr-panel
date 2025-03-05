'use client'

import Header from '@/components/header'
import { store } from '@/store/store'
import { Sidebar } from '@/components/sidebar'
import { Provider } from 'react-redux'
import { usePathname } from 'next/navigation'
import { ModalProvider } from '@/hooks/use-modal'
import { ToastProvider } from '@/hooks/use-toast'

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()

    return (
        <Provider store={store}>
            <ModalProvider>
                <div className="flex w-full">
                    <Sidebar />
                    <div className="w-full relative">
                        {!pathname.includes('/auth') && <Header />}
                        <ToastProvider>{children}</ToastProvider>
                    </div>
                </div>
            </ModalProvider>
        </Provider>
    )
}
