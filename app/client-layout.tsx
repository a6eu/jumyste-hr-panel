'use client'

import dynamic from 'next/dynamic'
import { store } from '@/redux/store'
import { Sidebar } from '@/components/sidebar'
import { Provider } from 'react-redux'
import { usePathname } from 'next/navigation'
import { ToastProvider } from '@/hooks/use-toast'

const Header = dynamic(() => import('../components/header'), { ssr: false })

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()

    return (
        <Provider store={store}>
            <div className="flex w-full">
                <Sidebar />
                <div className="w-full">
                    {!pathname.includes('/auth') && <Header />}
                    <ToastProvider>{children}</ToastProvider>
                </div>
            </div>
        </Provider>
    )
}
