import { useTranslation } from "react-i18next"
import { ExternalLink } from "lucide-react"
import { Window } from "@/components/desktop/Window"
import { SITE } from "@/data/content"

export function PublicationsWindow({
  onClose,
  onMinimize,
  onFocus,
  zIndex,
  minimized,
  active,
}: {
  onClose: () => void
  onMinimize?: () => void
  onFocus?: () => void
  zIndex?: number
  minimized?: boolean
  active?: boolean
}) {
  const { t } = useTranslation()
  const items = t("desktop.windows.publications", {
    returnObjects: true,
  }) as { title: string; body: string }[]

  const links = [
    { href: SITE.linkedin },
    { href: SITE.github },
  ]

  return (
    <Window
      title={t("desktop.windows.publicationsTitle")}
      onClose={onClose}
      onMinimize={onMinimize}
      onFocus={onFocus}
      zIndex={zIndex}
      minimized={minimized}
      active={active}
      className="h-auto max-h-[60vh]"
    >
      <div className="p-4">
        {items.map((item, i) => (
          <a
            key={item.title}
            href={links[i]?.href}
            target="_blank"
            rel="noreferrer"
            className="group mb-3 block rounded-sm border border-[#e4d88f] bg-[#fdf6c9] p-4 shadow-[0_3px_8px_rgba(0,0,0,0.12)] transition-transform duration-200 hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-2">
              <h4 className="text-[15px] font-semibold text-[#3a3a2a]">
                {item.title}
              </h4>
              <ExternalLink className="size-3.5 text-[#0b5ed7]" />
            </div>
            <p className="mt-2 text-[13px] leading-relaxed break-words text-[#4a4a38]">
              {item.body}
            </p>
          </a>
        ))}
      </div>
    </Window>
  )
}