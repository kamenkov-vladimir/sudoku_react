import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { Language } from './i18n.types';

const COOKIE_LIFETIME = 10080; // 7 days

i18n.use(LanguageDetector).init({
    detection: {
        order: ['cookie'],
        lookupCookie: 'locale',
        caches: ['cookie'],
        cookieMinutes: COOKIE_LIFETIME,
        cookieOptions: {
            path: '/',
        },
    },
});

i18n.use(Backend).use(initReactI18next).init({
    fallbackLng: Language.Ru,
});

export default i18n;
