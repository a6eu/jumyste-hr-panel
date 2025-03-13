import { useState } from 'react'
import { ChevronRight, Cog } from 'lucide-react'
import { cn } from '@/shared/lib/twmerge'
import { useOutsideClick } from '@/shared/hooks/use-outside-click'
import { useTranslation } from 'react-i18next'
import i18n from 'i18next'
import Cookies from 'js-cookie'

export const Settings = () => {
    const [showMenu, setShowMenu] = useState(false)
    const [showLangs, setShowLangs] = useState(false)
    const ref = useOutsideClick<HTMLDivElement>(() => {
        setShowMenu(false)
        setShowLangs(false)
    })
    const { t } = useTranslation()
    const [selectedLang, setSelectedLang] = useState('en')

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang).then(() => {
            setSelectedLang(lang)
            Cookies.set('NEXT_LOCALE', lang, { expires: 365 })
        })
    }

    return (
        <div className="relative">
            <button onClick={() => setShowMenu(!showMenu)} className="flex items-center gap-1.5 w-full">
                <Cog color="#A9A9A9" /> {t('sidebar.settings')}
            </button>
            {showMenu && (
                <div
                    ref={ref}
                    className={cn('absolute translate-x-36 -top-4 w-64 bg-white border-2 rounded-lg transition-all duration-200',
                        showLangs && '-top-16')}>
                    <button onClick={() => setShowLangs(!showLangs)}
                            className="flex items-center justify-between w-full pl-10 pr-3 py-2">
                        Сменить язык
                        <ChevronRight
                            className={cn('rotate-0 transition-all duration-100', showLangs && 'rotate-90')} />
                    </button>
                    {showLangs && (
                        <div className="">
                            <ul className="cursor-pointer">
                                <li onClick={() => changeLanguage('kz')}
                                    className={cn('hover:bg-gray py-1 pl-10', selectedLang === 'kz' && 'bg-gray')}>
                                    KZ
                                </li>
                                <li onClick={() => changeLanguage('ru')}
                                    className={cn('hover:bg-gray py-1 pl-10', selectedLang === 'ru' && 'bg-gray')}>
                                    RU
                                </li>
                                <li onClick={() => changeLanguage('en')}
                                    className={cn('hover:bg-gray py-1 pl-10', selectedLang === 'en' && 'bg-gray')}>
                                    EN
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
