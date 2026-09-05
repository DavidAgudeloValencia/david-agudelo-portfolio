import { useTranslation } from "react-i18next"
import { ArrowLeft, ShieldCheck, Mail, Lock, Phone, MessageSquare, Trash2, CheckCircle2 } from "lucide-react"
import { SITE, waLink } from "@/data/content"
import { Button } from "@/components/ui/button"

type Section = {
  title: string
  content: string
  bullets?: string[]
  footerNote?: string
}

export function PrivacyPolicy({ onBack }: { onBack?: () => void }) {
  const { t, i18n } = useTranslation()
  const sections = (t("privacy.sections", { returnObjects: true }) || []) as Section[]

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      window.history.pushState({}, "", "/")
      window.dispatchEvent(new PopStateEvent("popstate"))
    }
  }

  const toggleLanguage = () => {
    const nextLang = i18n.language.startsWith("es") ? "en" : "es"
    i18n.changeLanguage(nextLang)
    localStorage.setItem("vitrina-lang", nextLang)
  }

  return (
    <div className="min-h-screen bg-obsidian text-bone-white selection:bg-fog-blue selection:text-obsidian">
      {/* Top navigation */}
      <header className="sticky top-0 z-50 border-b border-ash-border/80 bg-obsidian/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <button
            type="button"
            onClick={handleBack}
            className="group inline-flex items-center gap-2 text-sm font-medium text-bone-white/80 transition-colors hover:text-bone-white cursor-pointer"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            <span>{t("privacy.backHome")}</span>
          </button>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggleLanguage}
              className="rounded border border-ash-border px-2.5 py-1 font-mono text-xs text-bone-white/70 transition-colors hover:border-bone-white/40 hover:text-bone-white cursor-pointer"
            >
              {i18n.language.startsWith("es") ? "EN" : "ES"}
            </button>
            <Button
              className="hidden sm:inline-flex text-xs h-8 px-3"
              onClick={() => window.open(waLink(t("wa.diagnostic")), "_blank")}
            >
              WhatsApp
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-5 py-12 sm:py-16">
        {/* Title Header */}
        <div className="mb-12 border-b border-ash-border pb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            <ShieldCheck className="size-3.5" />
            <span>Meta / WhatsApp Cloud API Verified Policy</span>
          </div>

          <h1 className="mt-4 font-sans text-3xl font-bold tracking-tight text-bone-white sm:text-4xl">
            {t("privacy.title")}
          </h1>
          <p className="mt-3 text-base text-bone-white/70 sm:text-lg">
            {t("privacy.subtitle")}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 font-mono text-xs text-bone-white/50">
            <span>{t("privacy.lastUpdated")}</span>
            <span>•</span>
            <span>{SITE.domain}</span>
            <span>•</span>
            <span>{SITE.city}</span>
          </div>
        </div>

        {/* Quick Highlights Grid */}
        <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-ash-border bg-graphite-veil/40 p-4">
            <div className="flex items-center gap-2 text-emerald-400">
              <Lock className="size-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Cifrado SSL / Meta</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-bone-white/70">
              Comunicaciones cifradas de extremo a extremo y mediante WhatsApp Cloud API segura.
            </p>
          </div>

          <div className="rounded-xl border border-ash-border bg-graphite-veil/40 p-4">
            <div className="flex items-center gap-2 text-fog-blue">
              <Trash2 className="size-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Eliminación de Datos</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-bone-white/70">
              Puedes solicitar el borrado permanente de tu información en cualquier momento en &lt;48h.
            </p>
          </div>

          <div className="rounded-xl border border-ash-border bg-graphite-veil/40 p-4">
            <div className="flex items-center gap-2 text-amber-400">
              <MessageSquare className="size-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">Uso Profesional</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-bone-white/70">
              Tus datos solo se usan para responder tus cotizaciones y dar soporte a tu negocio.
            </p>
          </div>
        </div>

        {/* Sections List */}
        <div className="space-y-10">
          {sections.map((section, idx) => (
            <section
              key={idx}
              className="rounded-2xl border border-ash-border/70 bg-graphite-veil/20 p-6 sm:p-8 transition-colors hover:border-ash-border"
            >
              <h2 className="text-xl font-semibold tracking-tight text-bone-white">
                {section.title}
              </h2>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-bone-white/80 whitespace-pre-line">
                {section.content}
              </p>

              {section.bullets && (
                <ul className="mt-4 space-y-2.5">
                  {section.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3 text-sm text-bone-white/75">
                      <CheckCircle2 className="mt-1 size-4 shrink-0 text-emerald-400" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.footerNote && (
                <div className="mt-4 rounded-lg border border-ash-border/50 bg-obsidian/60 p-3 text-xs text-bone-white/70">
                  {section.footerNote}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Direct Contact & Data Deletion Box */}
        <div className="mt-12 rounded-2xl border border-ash-border bg-gradient-to-b from-graphite-veil to-obsidian p-6 sm:p-8 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold text-bone-white">
                ¿Preguntas o solicitudes sobre tus datos?
              </h3>
              <p className="mt-1 text-sm text-bone-white/70">
                Escríbenos directamente para atención personalizada o solicitudes de revocación.
              </p>
              <div className="mt-3 flex flex-wrap gap-4 text-xs font-mono text-bone-white/60">
                <span className="flex items-center gap-1.5">
                  <Mail className="size-3.5 text-fog-blue" />
                  {SITE.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="size-3.5 text-emerald-400" />
                  +57 305 258 0913
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                className="text-xs"
                onClick={handleBack}
              >
                {t("privacy.backHome")}
              </Button>
              <Button
                className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white border-none"
                onClick={() => window.open(waLink("Hola David, tengo una consulta sobre la política de privacidad y mis datos."), "_blank")}
              >
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-ash-border bg-obsidian py-8 px-5 text-center text-xs text-bone-white/50">
        <div className="mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© 2026 {SITE.fullName} · {SITE.city}</div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleBack}
              className="text-bone-white/70 hover:text-bone-white transition-colors cursor-pointer"
            >
              Inicio
            </button>
            <span>•</span>
            <a
              href={`mailto:${SITE.email}`}
              className="text-bone-white/70 hover:text-bone-white transition-colors"
            >
              {SITE.email}
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
