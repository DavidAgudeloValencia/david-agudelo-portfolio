import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { SITE, waLink } from "@/data/content"
import { cn } from "@/lib/utils"

const LANGS = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
]

const NAV_LINKS = [
  { href: "#servicios", key: "nav.services" },
  { href: "#proceso", key: "nav.process" },
  { href: "#precios", key: "nav.pricing" },
  { href: "#sobre-mi", key: "nav.about" },
]

export function Header() {
  const { t, i18n } = useTranslation()
  const [progress, setProgress] = useState(0)
  const current = i18n.language === "en" ? "en" : "es"

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - doc.clientHeight
      setProgress(max > 0 ? (doc.scrollTop / max) * 100 : 0)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-obsidian">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-5">
        <a
          href="#inicio"
          aria-label={SITE.fullName}
          className="text-[17px] text-bone-white no-underline transition-colors duration-500 ease-[cubic-bezier(0.52,0.01,0,1)] hover:text-fog-blue"
        >
          David Agudelo
        </a>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label={t("nav.label")}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[14px] tracking-[0.02em] text-bone-white uppercase no-underline transition-colors duration-500 ease-[cubic-bezier(0.52,0.01,0,1)] hover:text-fog-blue"
            >
              {t(link.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <div
            className="flex items-center gap-2"
            role="group"
            aria-label="Idioma / Language"
          >
            {LANGS.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => void i18n.changeLanguage(lang.code)}
                aria-pressed={current === lang.code}
                className={cn(
                  "text-[14px] tracking-[0.02em] uppercase transition-colors duration-500 ease-[cubic-bezier(0.52,0.01,0,1)]",
                  current === lang.code
                    ? "text-bone-white"
                    : "text-fog-blue hover:text-bone-white",
                )}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <Button
            className="hidden sm:inline-flex"
            onClick={() =>
              window.open(waLink(t("wa.diagnostic")), "_blank")
            }
          >
            {t("header.cta")}
          </Button>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute bottom-0 left-0 h-px bg-bone-white transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </header>
  )
}