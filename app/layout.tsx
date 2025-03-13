import type { Metadata } from 'next'
import './globals.css'
import React from 'react'
import { ClientLayout } from '@/app/client-layout'
import I18nProvider from '@/shared/providers/i18next-provider'

export const metadata: Metadata = {
    title: 'Jumyste',
    description: 'Вебсайт, упрощающий жизнь HR-ам',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
        <body className="font-gilroy antialiased bg-[#FDFCFA] text-black">
        <I18nProvider>
            <ClientLayout>{children}</ClientLayout>
        </I18nProvider>
        </body>
        </html>
    )
}
