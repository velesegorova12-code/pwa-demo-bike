import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import HttpBackend from 'i18next-http-backend'
import { initReactI18next, useTranslation } from 'react-i18next'

const supportedLngs = ['en', 'et'] as const

const i18n = i18next.createInstance()

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: [...supportedLngs],
    defaultNS: 'translation',
    ns: ['translation', 'common'],
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'cookie', 'navigator'],
      lookupLocalStorage: 'lang',
    },
  })

export { i18n }
export type AppLocale = (typeof supportedLngs)[number]
export const useAppTranslation = useTranslation
// Marks a translation key for extraction while preserving the original value
export const extractKey = <T extends string>(key: T) => key

