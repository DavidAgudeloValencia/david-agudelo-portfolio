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
      className="h-[560px]"
    >
      <div className="flex h-full">
        <aside className="w-40 shrink-0 border-r border-black/10 bg-white/70 p-2">
          {folders.map((folder) => {
            const active = folder.id === selectedId
            return (
              <button
                key={folder.id}
                type="button"
                onClick={() => setSelectedId(folder.id)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] text-[#1f2937] transition-colors duration-200",
                  active
                    ? "bg-[#0b5ed7] text-white"
                    : "hover:bg-black/5",
                )}
              >
                {active ? (
                  <FolderOpen className="size-4 shrink-0" />
                ) : (
                  <Folder className="size-4 shrink-0" />
                )}
                <span className="truncate">{folder.name}</span>
              </button>
            )
          })}
        </aside>

        <div className="min-w-0 flex-1 overflow-auto bg-[#fdf6e3] p-4">
          {selected && selected.notes.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {selected.notes.map((note, i) => (
                <div
                  key={note.title}
                  className="rotate-[-0.5deg] rounded-sm border border-[#e4d88f] bg-[#fdf6c9] p-4 shadow-[0_3px_8px_rgba(0,0,0,0.12)] transition-transform duration-200 hover:rotate-0"
                  style={{
                    transform: i % 2 === 0 ? "rotate(-1deg)" : "rotate(0.8deg)",
                  }}
                >
                  <div className="flex items-start gap-2">
                    <StickyNote className="mt-0.5 size-4 shrink-0 text-[#b99b3c]" />
                    <h4 className="text-[15px] font-semibold text-[#3a3a2a]">
                      {note.title}
                    </h4>
                  </div>
                  <p className="mt-2 text-[13px] leading-relaxed break-words text-[#4a4a38]">
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