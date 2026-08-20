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
    <div className="absolute top-[340px] bottom-[76px] left-14 z-10 flex flex-col flex-wrap content-start gap-3">
      {ICON_IDS.map((id) => (
        <button
          key={id}
          type="button"
          onClick={() => onOpen(id === "cv" ? "finder" : id)}
          className="group flex w-[76px] flex-col items-center gap-1.5 rounded-lg p-2 transition-transform duration-200 hover:scale-105"
        >
          <span className="drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:drop-shadow-[0_6px_12px_rgba(0,0,0,0.45)]">
            <FolderArt size={56} />
          </span>
          <span className="max-w-full truncate rounded-sm bg-black/30 px-1.5 py-0.5 text-[11px] text-white shadow-[0_1px_2px_rgba(0,0,0,0.3)] backdrop-blur-sm">
            {t(`desktop.icons.${id}`)}
          </span>
        </button>
      ))}
    </div>
  )
}