import { useCallback, useRef, useState, type ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { Copy, Minus, Square, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function Window({
  title,
  children,
  onClose,
  onMinimize,
  onFocus,
  zIndex = 20,
  minimized = false,
  active = true,
  className,
}: {
  title: string
  children: ReactNode
  onClose: () => void
  onMinimize?: () => void
  onFocus?: () => void
  zIndex?: number
  minimized?: boolean
  active?: boolean
  className?: string
}) {
  const { t } = useTranslation()
  const [isDragging, setIsDragging] = useState(false)
  const [maximized, setMaximized] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const positionRef = useRef({ x: 0, y: 0 })
  const dragRef = useRef<{
    startX: number
    startY: number
    originX: number
    originY: number
  } | null>(null)

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      onFocus?.()
      if (e.button !== 0 || maximized) return
      if ((e.target as HTMLElement).closest("button")) return
      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        originX: positionRef.current.x,
        originY: positionRef.current.y,
      }
      setIsDragging(true)
      e.currentTarget.setPointerCapture(e.pointerId)
    },
    [onFocus, maximized],
  )

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const drag = dragRef.current
    if (!drag) return
    const next = {
      x: drag.originX + (e.clientX - drag.startX),
      y: drag.originY + (e.clientY - drag.startY),
    }
    positionRef.current = next
    if (rootRef.current) {
      rootRef.current.style.transform = `translate(calc(-50% + ${next.x}px), ${next.y}px)`
    }
  }, [])

  const endDrag = useCallback(() => {
    dragRef.current = null
    setIsDragging(false)
  }, [])

  const toggleMaximize = useCallback(() => {
    setMaximized((m) => {
      const el = rootRef.current
      if (el) {
        if (m) {
          const p = positionRef.current
          el.style.transform = `translate(calc(-50% + ${p.x}px), ${p.y}px)`
        } else {
          el.style.transform = ""
        }
      }
      return !m
    })
  }, [])

  const stopPropagation = useCallback((e: React.PointerEvent) => {
    e.stopPropagation()
  }, [])

  const onTitleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest("button")) return
      toggleMaximize()
    },
    [toggleMaximize],
  )

  return (
    <div
      ref={rootRef}
      onPointerDownCapture={onFocus}
      className={cn(
        "absolute top-[10%] left-1/2 flex max-h-[78vh] w-[min(640px,92vw)] flex-col overflow-hidden rounded-2xl border backdrop-blur-xl will-change-transform",
        isDragging
          ? "transition-none backdrop-blur-none"
          : "transition-[opacity,transform] duration-200",
        active
          ? "border-black/10 bg-white/90 shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
          : "border-black/5 bg-white/70 shadow-[0_12px_32px_rgba(0,0,0,0.25)]",
        maximized && "rounded-none",
        minimized && "pointer-events-none scale-95 opacity-0",
        className,
      )}
      style={{
        zIndex,
        transform: maximized
          ? undefined
          : `translate(calc(-50% + ${positionRef.current.x}px), ${positionRef.current.y}px)`,
        ...(maximized
          ? {
              top: "0.5rem",
              bottom: "4.25rem",
              left: "0.5rem",
              right: "0.5rem",
              width: "auto",
              height: "auto",
              maxHeight: "none",
            }
          : {}),
      }}
    >
      <div
        className={cn(
          "flex h-10 shrink-0 cursor-grab items-center gap-2 px-3 select-none active:cursor-grabbing",
          active ? "bg-gray-200/80" : "bg-gray-200/50",
        )}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={onTitleDoubleClick}
      >
        <span
          className={cn(
            "min-w-0 flex-1 truncate text-left text-[13px] font-medium",
            active ? "text-[#1f2937]" : "text-[#4b5563]",
          )}
        >
          {title}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label={t("desktop.windows.minimizeLabel")}
            onPointerDown={stopPropagation}
            onClick={onMinimize}
            className="flex size-7 items-center justify-center rounded-lg text-[#1f2937]/80 transition-colors duration-150 hover:bg-black/10 hover:text-[#1f2937]"
          >
            <Minus className="size-3.5" />
          </button>
          <button
            type="button"
            aria-label={
              maximized
                ? t("desktop.windows.restoreLabel")
                : t("desktop.windows.maximizeLabel")
            }
            onPointerDown={stopPropagation}
            onClick={toggleMaximize}
            className="flex size-7 items-center justify-center rounded-lg text-[#1f2937]/80 transition-colors duration-150 hover:bg-black/10 hover:text-[#1f2937]"
          >
            {maximized ? <Copy className="size-3.5" /> : <Square className="size-3" />}
          </button>
          <button
            type="button"
            aria-label={t("desktop.windows.closeLabel")}
            onPointerDown={stopPropagation}
            onClick={onClose}
            className="flex size-7 items-center justify-center rounded-lg text-[#1f2937]/80 transition-colors duration-150 hover:bg-[#e81123] hover:text-white"
          >
            <X className="size-3.5" />
          </button>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-auto bg-white/60">{children}</div>
    </div>
  )
}