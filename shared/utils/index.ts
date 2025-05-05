export * from './twmerge'

type Lang = 'en' | 'ru' | 'kz'

export const formatNumber = (value: number, lang: Lang = 'en'): string => {
    return new Intl.NumberFormat(lang === 'kz' ? 'ru' : lang, {
        useGrouping: true,
    }).format(value)
}

export const formatDateRelative = (date: string | Date, lang: Lang = 'en'): string => {
    const locales: Record<Lang, string> = {
        en: 'en',
        ru: 'ru',
        kz: 'ru',
    }

    const now = new Date()
    const past = new Date(date)
    const diffMs = now.getTime() - past.getTime()

    const rtf = new Intl.RelativeTimeFormat(locales[lang], { numeric: 'auto' })

    const seconds = Math.floor(diffMs / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const months = Math.floor(days / 30)
    const years = Math.floor(days / 365)

    if (seconds < 60) return rtf.format(-seconds, 'second')
    if (minutes < 60) return rtf.format(-minutes, 'minute')
    if (hours < 24) return rtf.format(-hours, 'hour')
    if (days < 30) return rtf.format(-days, 'day')
    if (months < 12) return rtf.format(-months, 'month')
    return rtf.format(-years, 'year')
}
