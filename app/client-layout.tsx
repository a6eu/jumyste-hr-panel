'use client'

import { store } from '@/store/store'
import { Provider } from 'react-redux'

export const ClientLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    return <Provider store={store}>{children}</Provider>
}
