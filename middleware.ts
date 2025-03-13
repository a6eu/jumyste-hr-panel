import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
    const lang = req.cookies.get('NEXT_LOCALE')?.value || 'en' // Default to English
    const res = NextResponse.next()
    res.cookies.set('NEXT_LOCALE', lang) // Ensure cookie is set
    return res
}

export const config = {
    matcher: '/:path*', // Apply to all routes
}
