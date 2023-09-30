import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import resources from 'assets/copy.json'

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    lng: 'en',
    resources,
    debug: false, // < Set to true for f*cking annoying debug content!
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
