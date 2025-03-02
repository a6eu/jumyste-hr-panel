'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChevronDown } from 'lucide-react'

const languages = [
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
    { code: 'kz', label: 'KZ' },
]

const LanguageSwitcher = () => {
    const { i18n } = useTranslation()
    const [selectedLang, setSelectedLang] = useState(i18n.language)
    const [open, setOpen] = useState(false)

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang).then(() => {
            setSelectedLang(lang) 
            setOpen(false)
        })
    }

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 bg-gray px-4 py-2 rounded-lg"
            >
                <ChevronDown /> {selectedLang.toUpperCase()}
            </button>

            {open && (
                <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-md">
                    {languages.map(({ code, label }) => (
                        <button
                            key={code}
                            onClick={() => changeLanguage(code)}
                            className="block px-8 py-2 w-full text-left hover:bg-gray-200"
                        >
                            {label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default LanguageSwitcher
