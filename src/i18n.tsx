import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
// import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  // TODO Enable when we have english trad .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: "fr", // TODO disable when we have english trad
    fallbackLng: "fr",
    debug: false,
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
