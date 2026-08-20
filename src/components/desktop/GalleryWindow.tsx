import { useTranslation } from "react-i18next"
import { ExternalLink, ImageOff } from "lucide-react"
import { Window } from "@/components/desktop/Window"
import galleryFiles from "virtual:gallery"

type GalleryItem = { src: string; url: string; domain: string }

const GALLERY: GalleryItem[] = galleryFiles
  .map((name) => {
    const domain = name.replace(/\.[^.]+$/, "")
    return {
      src: `${import.meta.env.BASE_URL}gallery/${name}`,
      url: `https://${domain}`,
      domain,
    }
  })
  .sort((a, b) => a.domain.localeCompare(b.domain))

export function GalleryWindow({
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

  return (
    <Window
      title={t("desktop.windows.galleryTitle")}
      onClose={onClose}
      onMinimize={onMinimize}
      onFocus={onFocus}
      zIndex={zIndex}
      minimized={minimized}
      active={active}
      className="h-[480px] w-[min(560px,92vw)]"
    >
      <div className="h-full overflow-auto p-4">
        {GALLERY.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <ImageOff className="size-8 text-[#6b7280]" />
            <p className="text-[13px] text-[#6b7280]">
              {t("desktop.windows.galleryEmpty")}
            </p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {GALLERY.map((item) => (
              <a
                key={item.domain}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="group relative block overflow-hidden rounded-lg border border-black/10 bg-white shadow-[0_3px_8px_rgba(0,0,0,0.12)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div className="aspect-video w-full overflow-hidden bg-black/5">
                  <img
                    src={item.src}
                    alt={item.domain}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-2 text-[12px] font-semibold text-[#1f2937]">
                  <ExternalLink className="size-3.5 text-[#0b5ed7]" />
                  <span className="truncate">{item.domain}</span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </Window>
  )
}