import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Import translation files
import enTranslation from "../locales/en.json";
import tlhTranslation from "../locales/tlh.json";

const resources = {
  en: {
    translation: enTranslation,
  },
  tlh: {
    translation: tlhTranslation,
  },
};

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    resources,

    // Language to use if no translations found for current language
    fallbackLng: "en",

    // Namespace separator
    ns: ["translation"],
    defaultNS: "translation",

    // Enable key separator for nested keys
    keySeparator: ".",

    // Disable namespace separator since we're using single namespace
    nsSeparator: false,

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    // Language detection options
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
    },

    // Debug mode
    debug: import.meta.env.DEV,
  });

export default i18n;
