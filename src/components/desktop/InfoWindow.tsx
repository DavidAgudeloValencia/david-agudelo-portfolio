import { Window } from "@/components/desktop/Window"

type InfoNote = { title: string; body: string }

export function InfoWindow({
  title,
  notes,
  onClose,
  onMinimize,
  onFocus,
  zIndex,
  minimized,
  active,
  className,
}: {
  title: string
  notes: InfoNote[]
  onClose: () => void
  onMinimize?: () => void
  onFocus?: () => void
  zIndex?: number
  minimized?: boolean
  active?: boolean
  className?: string
}) {
  return (
    <Window
      title={title}
      onClose={onClose}
      onMinimize={onMinimize}
      onFocus={onFocus}
      zIndex={zIndex}
      minimized={minimized}
      active={active}
      className={className}
    >
      <div className="grid gap-4 p-4 sm:grid-cols-2">
        {notes.map((note) => (
          <div
            key={note.title}
            className="rounded-sm border border-[#e4d88f] bg-[#fdf6c9] p-4 shadow-[0_3px_8px_rgba(0,0,0,0.12)]"
          >
            <h4 className="text-[15px] font-semibold text-[#3a3a2a]">
              {note.title}
            </h4>
            <p className="mt-2 text-[13px] leading-relaxed break-words text-[#4a4a38]">
              {note.body}
            </p>
          </div>
        ))}
      </div>
    </Window>
  )
}