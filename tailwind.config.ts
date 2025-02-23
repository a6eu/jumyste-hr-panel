import type { Config } from 'tailwindcss'

export default {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                primary: '#493D9E',
                primaryLight: '#B2A5FF',
                primaryBlocks: '#8B5DFF',
                secondary: '#DAD2FF',
                secondaryLight: '#FFF2AF',
                neutral: '#000000',
                neutralLight: '#FDFCFA',
                button: '#8B5DFF',
            },
            fontFamily: {
                gilroy: ['Gilroy', 'sans-serif'],
                antipasto: ['Antipasto', 'sans-serif'],
            },
        },
    },
    plugins: [],
} satisfies Config
