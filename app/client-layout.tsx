'use client'

import Header from '@/components/header'
import { store } from '@/store/store'
import { Sidebar } from '@/components/sidebar'
import { Provider } from 'react-redux'
import { usePathname } from 'next/navigation'

export const ClientLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    const pathname = usePathname()
    return (
        <Provider store={store}>
            <div className="flex w-full">
                <Sidebar />
                <div className="w-full">
                    {!pathname.includes('/auth') && <Header />}
                    {children}
                </div>
            </div>
        </Provider>
    )
}
