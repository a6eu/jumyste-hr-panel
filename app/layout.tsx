import type { Metadata } from 'next'
import './globals.css'
import { ClientLayout } from './client-layout'
import '@/i18next'

export const metadata: Metadata = {
    title: 'Jumyste',
    description: 'Вебсайт, упрощающий жизнь HR-ам',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html>
            <body className="font-gilroy antialiased bg-[#FDFCFA] text-black">
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    )
}
