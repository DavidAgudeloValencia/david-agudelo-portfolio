import { useTranslation } from "react-i18next"
import { LinkedInIcon } from "@/components/icons"
import { SITE } from "@/data/content"

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-obsidian px-5 pt-[15px] pb-10">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-6 border-t border-ash-border pt-8">
        <div>
          <div className="text-[17px] text-bone-white">{SITE.name}</div>
          <div className="mt-1 text-[14px] text-fog-blue">
            {t("footer.stack")}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-[14px] text-bone-white">
          <a
            href="/politica-de-privacidad"
            onClick={(e) => {
              e.preventDefault()
              window.history.pushState({}, "", "/politica-de-privacidad")
              window.dispatchEvent(new PopStateEvent("popstate"))
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className="text-bone-white/80 no-underline transition-colors duration-300 hover:text-fog-blue"
          >
            {t("footer.privacy")}
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn de David Agudelo"
            className="text-bone-white no-underline transition-colors duration-500 ease-[cubic-bezier(0.52,0.01,0,1)] hover:text-fog-blue"
          >
            <LinkedInIcon className="size-4" />
          </a>
          <span className="text-[14px] text-bone-white">
            {t("footer.rights")}
          </span>
        </div>
      </div>
    </footer>
  )
}