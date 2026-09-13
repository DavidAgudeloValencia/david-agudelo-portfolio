import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Folder, FolderOpen, StickyNote } from "lucide-react"
import { Window } from "@/components/desktop/Window"
import { cn } from "@/lib/utils"
import type { FinderFolder } from "@/components/desktop/types"

export function FinderWindow({
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
  const folders = t("desktop.finder.folders", {
    returnObjects: true,
  }) as FinderFolder[]
  const [selectedId, setSelectedId] = useState(folders[0]?.id ?? "")
  const selected = folders.find((folder) => folder.id === selectedId)

  return (
    <Window
      title={t("desktop.finder.windowTitle")}
      onClose={onClose}
      onMinimize={onMinimize}
      onFocus={onFocus}
      zIndex={zIndex}
      minimized={minimized}
      active={active}
      className="h-[min(560px,78vh)] w-[min(720px,95vw)]"
    >
      <div className="flex flex-col sm:flex-row h-full">
        <aside className="w-full sm:w-40 shrink-0 border-b sm:border-b-0 sm:border-r border-black/10 bg-white/70 p-1.5 sm:p-2 flex sm:flex-col overflow-x-auto sm:overflow-x-visible gap-1 [scrollbar-width:none]">
          {folders.map((folder) => {
            const active = folder.id === selectedId
            return (
              <button
                key={folder.id}
                type="button"
                onClick={() => setSelectedId(folder.id)}
                className={cn(
                  "flex shrink-0 sm:w-full items-center gap-1.5 sm:gap-2 rounded-md px-2.5 py-1.5 text-left text-[12px] sm:text-[13px] font-medium transition-colors duration-200",
                  active
                    ? "bg-[#0b5ed7] text-white shadow-xs"
                    : "text-[#1f2937] hover:bg-black/5",
                )}
              >
                {active ? (
                  <FolderOpen className="size-3.5 sm:size-4 shrink-0" />
                ) : (
                  <Folder className="size-3.5 sm:size-4 shrink-0 text-[#f59e0b]" />
                )}
                <span className="truncate">{folder.name}</span>
              </button>
            )
          })}
        </aside>

        <div className="min-w-0 flex-1 overflow-y-auto bg-[#fdf6e3] p-3 sm:p-4">
          {selected && selected.notes.length > 0 ? (
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
              {selected.notes.map((note, i) => (
                <div
                  key={note.title}
                  className="rounded-sm border border-[#e4d88f] bg-[#fdf6c9] p-3 sm:p-4 shadow-[0_3px_8px_rgba(0,0,0,0.12)] transition-transform duration-200 hover:rotate-0"
                  style={{
                    transform: i % 2 === 0 ? "rotate(-0.5deg)" : "rotate(0.5deg)",
                  }}
                >
                  <div className="flex items-start gap-2">
                    <StickyNote className="mt-0.5 size-4 shrink-0 text-[#b99b3c]" />
                    <h4 className="text-[14px] sm:text-[15px] font-semibold text-[#3a3a2a]">
                      {note.title}
                    </h4>
                  </div>
                  <p className="mt-1.5 sm:mt-2 text-[12px] sm:text-[13px] leading-relaxed break-words text-[#4a4a38]">
                    {note.body}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="p-4 text-[13px] text-[#6b7280]">
              {t("desktop.finder.emptyFolder")}
            </p>
          )}
        </div>
      </div>
    </Window>
  )
}