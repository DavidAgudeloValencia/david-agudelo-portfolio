import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import es from "./locales/es.json"
import en from "./locales/en.json"

const stored =
  typeof window !== "undefined"
    ? localStorage.getItem("vitrina-lang")
    : null

void i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
  },
  lng: stored ?? "es",
  fallbackLng: "es",
  interpolation: { escapeValue: false },
})

i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng
  try {
    localStorage.setItem("vitrina-lang", lng)
  } catch {
    // localStorage no disponible (modo privado)
  }
})

export default i18n