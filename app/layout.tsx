import type { Metadata } from 'next'
import './globals.css'
import { ClientLayout } from './client-layout'

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
            <body className="font-sans antialiased">
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    )
}
