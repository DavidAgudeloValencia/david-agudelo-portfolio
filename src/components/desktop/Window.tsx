import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"
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
  const [maximized, setMaximized] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const positionRef = useRef({ x: 0, y: 0 })
  const dragRef = useRef<{
    startX: number
    startY: number
    originX: number
    originY: number
  } | null>(null)
  const rafRef = useRef<number | null>(null)

  const updateTransform = useCallback((x: number, y: number) => {
    if (rootRef.current && !maximized) {
      rootRef.current.style.transform = `translate3d(calc(-50% + ${x}px), ${y}px, 0)`
    }
  }, [maximized])

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      onFocus?.()
      if (maximized) return
      if (e.pointerType === "mouse" && e.button !== 0) return
      if ((e.target as HTMLElement).closest("button")) return

      // Prevent native browser touch callouts and panning
      e.preventDefault()

      dragRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        originX: positionRef.current.x,
        originY: positionRef.current.y,
      }

      const onPointerMove = (moveEvent: PointerEvent) => {
        const drag = dragRef.current
        if (!drag) return

        const nextX = drag.originX + (moveEvent.clientX - drag.startX)
        const nextY = drag.originY + (moveEvent.clientY - drag.startY)
        positionRef.current = { x: nextX, y: nextY }

        if (rafRef.current) cancelAnimationFrame(rafRef.current)
        rafRef.current = requestAnimationFrame(() => {
          updateTransform(nextX, nextY)
        })
      }

      const onPointerUp = () => {
        dragRef.current = null
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current)
          rafRef.current = null
        }
        window.removeEventListener("pointermove", onPointerMove)
        window.removeEventListener("pointerup", onPointerUp)
        window.removeEventListener("pointercancel", onPointerUp)
      }

      window.addEventListener("pointermove", onPointerMove, { passive: false })
      window.addEventListener("pointerup", onPointerUp)
      window.addEventListener("pointercancel", onPointerUp)
    },
    [onFocus, maximized, updateTransform],
  )

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const toggleMaximize = useCallback(() => {
    setMaximized((m) => {
      const el = rootRef.current
      if (el) {
        if (m) {
          const p = positionRef.current
          el.style.transform = `translate3d(calc(-50% + ${p.x}px), ${p.y}px, 0)`
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
        "absolute top-3 sm:top-[8%] left-1/2 flex max-h-[calc(100svh-4.5rem)] sm:max-h-[80vh] w-[min(680px,calc(100vw-1rem))] flex-col overflow-hidden rounded-xl sm:rounded-2xl border backdrop-blur-xl will-change-transform shadow-2xl transition-[opacity,scale] duration-150",
        active
          ? "border-black/10 bg-white/95 shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
          : "border-black/5 bg-white/80 shadow-[0_12px_32px_rgba(0,0,0,0.25)]",
        maximized && "rounded-none",
        minimized && "pointer-events-none scale-95 opacity-0",
        className,
      )}
      style={{
        zIndex,
        transform: maximized
          ? undefined
          : `translate3d(calc(-50% + ${positionRef.current.x}px), ${positionRef.current.y}px, 0)`,
        ...(maximized
          ? {
              top: "0.25rem",
              bottom: "4rem",
              left: "0.25rem",
              right: "0.25rem",
              width: "auto",
              height: "auto",
              maxHeight: "none",
            }
          : {}),
      }}
    >
      {/* Draggable Titlebar Handle */}
      <div
        className={cn(
          "flex h-9 sm:h-10 shrink-0 cursor-grab items-center gap-2 px-2.5 sm:px-3 select-none active:cursor-grabbing border-b border-black/5 touch-none",
          active ? "bg-gray-200/90" : "bg-gray-200/60",
        )}
        style={{
          touchAction: "none",
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
        onPointerDown={onPointerDown}
        onDoubleClick={onTitleDoubleClick}
      >
        <span
          className={cn(
            "min-w-0 flex-1 truncate text-left text-[12px] sm:text-[13px] font-semibold pointer-events-none",
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
      <div className="min-h-0 flex-1 overflow-auto bg-white/70">{children}</div>
    </div>
  )
}