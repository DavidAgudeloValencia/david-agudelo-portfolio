import { useTranslation } from "react-i18next"
import { FolderArt } from "@/components/desktop/IconArt"

const ICON_IDS = [
  "projects",
  "notes",
  "publications",
  "cv",
  "demo",
  "gallery",
]

export function DesktopIcons({
  onOpen,
}: {
  onOpen: (id: string) => void
}) {
  const { t } = useTranslation()

  return (
    <div className="absolute top-[200px] sm:top-[280px] md:top-[320px] bottom-[64px] sm:bottom-[76px] left-3 sm:left-6 md:left-14 z-10 flex max-w-[calc(100vw-1.5rem)] sm:max-w-none flex-row sm:flex-col flex-wrap content-start gap-1.5 sm:gap-3 overflow-y-auto sm:overflow-visible [scrollbar-width:none]">
      {ICON_IDS.map((id) => (
        <button
          key={id}
          type="button"
          onClick={() => onOpen(id === "cv" ? "finder" : id)}
          className="group flex w-[64px] sm:w-[76px] flex-col items-center gap-1 sm:gap-1.5 rounded-lg p-1 sm:p-2 transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          <span className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:drop-shadow-[0_6px_12px_rgba(0,0,0,0.45)]">
            <span className="hidden sm:inline-block">
              <FolderArt size={56} />
            </span>
            <span className="sm:hidden inline-block">
              <FolderArt size={42} />
            </span>
          </span>
          <span className="max-w-full truncate rounded-sm bg-black/40 px-1 sm:px-1.5 py-0.5 text-[10px] sm:text-[11px] font-medium text-white shadow-[0_1px_2px_rgba(0,0,0,0.4)] backdrop-blur-sm">
            {t(`desktop.icons.${id}`)}
          </span>
        </button>
      ))}
    </div>
  )
}