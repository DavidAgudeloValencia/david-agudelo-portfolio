import { useTranslation } from "react-i18next"
import { GithubIcon, LinkedInIcon, WhatsAppIcon } from "@/components/icons"
import { SITE, waLink } from "@/data/content"

export function LeftPanel() {
  const { t } = useTranslation()

  return (
    <div className="absolute top-24 bottom-[76px] left-3 z-10 hidden flex-col items-center gap-6 md:flex">
      <span
        className="text-[13px] tracking-[0.3em] text-white/80 uppercase"
        style={{ writingMode: "vertical-rl" }}
      >
        {t("desktop.panel.label")}
      </span>
      <div className="flex flex-col items-center gap-3">
        <a
          href={waLink(t("desktop.wa"))}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp"
          className="flex size-9 items-center justify-center rounded-full border border-white/40 bg-black/25 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/40"
        >
          <WhatsAppIcon className="size-4" />
        </a>
        <a
          href={SITE.github}
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
          className="flex size-9 items-center justify-center rounded-full border border-white/40 bg-black/25 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/40"
        >
          <GithubIcon className="size-4" />
        </a>
        <a
          href={SITE.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="flex size-9 items-center justify-center rounded-full border border-white/40 bg-black/25 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/40"
        >
          <LinkedInIcon className="size-4" />
        </a>
      </div>
    </div>
  )
}