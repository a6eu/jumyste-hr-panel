import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HttpApi from 'i18next-http-backend'
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector'

import kz from '@/locales/kz.json'
import ru from '@/locales/ru.json'
import en from '@/locales/en.json'


i18n.use(initReactI18next)
    .use(I18nextBrowserLanguageDetector)
    .use(HttpApi)
    .init({
        fallbackLng: 'en',
        detection: {
            order: ['cookie', 'localStorage'],
            caches: ['cookie', 'localStorage'],
        },
        resources: {
            kz: { translation: kz },
            ru: { translation: ru },
            en: { translation: en },
        },
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
    })


export default i18n
