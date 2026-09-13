import { useEffect, useState, type ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { Folder, Info, Layers, MonitorPlay, Power, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { LinkedInIcon } from "@/components/icons"
import { SITE } from "@/data/content"

type WinState = { z: number; minimized: boolean }

type TaskbarApp = {
  id: string
  name: string
  icon: ReactNode
  color: string
}

function WindowsLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 88 88" className={className} aria-hidden="true">
      <path fill="#f35325" d="M0 12.402 35.687 7.55l.011 34.42-35.679.494z" />
      <path fill="#81bc06" d="M39.05 7.28 74.784.994l.013 41.188-35.772.557z" />
      <path fill="#05a6f0" d="M0 47.578 35.666 48.07l.014 34.337-35.67 4.811z" />
      <path fill="#ffba08" d="M39.04 48.16 74.77 48.74l.012 40.51-35.75-5.098z" />
    </svg>
  )
}

export function Taskbar({
  apps,
  techApps,
  windows,
  activeId,
  onAppClick,
  onOpenWindow,
  onClose,
}: {
  apps: TaskbarApp[]
  techApps: TaskbarApp[]
  windows: Record<string, WinState>
  activeId: string | null
  onAppClick: (id: string) => void
  onOpenWindow: (id: string) => void
  onClose: () => void
}) {
  const { t, i18n } = useTranslation()
  const [startOpen, setStartOpen] = useState(false)
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(id)
  }, [])

  const locale = i18n.language === "en" ? "en-US" : "es-CO"
  const time = now.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  })
  const date = now.toLocaleDateString(locale, {
    weekday: "short",
    day: "2-digit",
    month: "short",
  })

  const startItems = [
    {
      id: "finder",
      label: t("desktop.apps.finder"),
      icon: <Folder className="size-4 shrink-0" />,
      action: () => onAppClick("finder"),
    },
    {
      id: "projects",
      label: t("desktop.icons.projects"),
      icon: <Layers className="size-4 shrink-0" />,
      action: () => onOpenWindow("projects"),
    },
    {
      id: "demo",
      label: t("desktop.icons.demo"),
      icon: <MonitorPlay className="size-4 shrink-0" />,
      action: () => onOpenWindow("demo"),
    },
    {
      id: "about",
      label: t("desktop.windows.aboutTitle"),
      icon: <Info className="size-4 shrink-0" />,
      action: () => onOpenWindow("about"),
    },
  ]

  return (
    <>
      {startOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setStartOpen(false)}
        />
      )}
      <div className="absolute inset-x-0 bottom-2.5 sm:bottom-3 z-40 flex items-end justify-center px-2 sm:px-3">
        <div className="relative max-w-[calc(100vw-1rem)]">
          {startOpen && (
            <div className="absolute bottom-[calc(100%+10px)] left-0 z-50 w-64 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-black/10 bg-[#f0f4fa]/95 shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl">
              <div className="border-b border-black/10 px-4 py-3">
                <p className="text-[15px] font-semibold text-[#1f2937]">
                  {SITE.name}
                </p>
                <p className="text-[12px] text-[#4b5563] truncate">{SITE.role}</p>
              </div>
              <div className="p-2">
                {startItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setStartOpen(false)
                      item.action()
                    }}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-[13px] text-[#1f2937] transition-colors duration-150 hover:bg-[#0b5ed7] hover:text-white"
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="mx-2 h-px bg-black/10" />
              <div className="p-2">
                <button
                  type="button"
                  onClick={() => {
                    setStartOpen(false)
                    onClose()
                  }}
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-[13px] text-[#1f2937] transition-colors duration-150 hover:bg-[#e81123] hover:text-white"
                >
                  <Power className="size-4 shrink-0 text-[#c00000]" />
                  {t("desktop.taskbar.shutdown")}
                </button>
              </div>
            </div>
          )}

          {/* Main Floating Taskbar */}
          <div className="flex h-12 sm:h-14 items-center gap-0.5 sm:gap-1 rounded-2xl border border-white/60 bg-white/70 px-1.5 sm:px-2 shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl">
            {/* Start button */}
            <button
              type="button"
              aria-label={t("desktop.taskbar.start")}
              onClick={() => setStartOpen((open) => !open)}
              className={cn(
                "flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-150 hover:bg-white/60",
                startOpen && "bg-white/70",
              )}
            >
              <WindowsLogo className="size-4 sm:size-5" />
            </button>

            <div className="mx-0.5 h-6 sm:h-7 w-px shrink-0 bg-black/10" />

            {/* Apps */}
            <div className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto [scrollbar-width:none]">
              {apps.map((app) => {
                const running = Boolean(windows[app.id])
                const active = activeId === app.id
                return (
                  <button
                    key={app.id}
                    type="button"
                    aria-label={app.name}
                    title={app.name}
                    onClick={() => onAppClick(app.id)}
                    className={cn(
                      "group relative flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-150",
                      active ? "bg-white/70" : running ? "bg-white/40" : "hover:bg-white/50",
                    )}
                  >
                    <span
                      style={{ color: app.color }}
                      className="transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:scale-110"
                    >
                      {app.icon}
                    </span>
                    {(running || active) && (
                      <span
                        className={cn(
                          "absolute bottom-1 left-1/2 h-[3px] w-3.5 -translate-x-1/2 rounded-full",
                          active ? "bg-[#0b5ed7]" : "bg-[#0b5ed7]/50",
                        )}
                      />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Tech apps (visible on md+) */}
            <div className="mx-0.5 hidden h-7 w-px shrink-0 bg-black/10 md:block" />
            <div className="hidden items-center gap-1 md:flex">
              {techApps.map((tech) => (
                <button
                  key={tech.id}
                  type="button"
                  aria-label={tech.name}
                  title={tech.name}
                  className="group flex size-9 items-center justify-center rounded-xl transition-colors duration-150 hover:bg-white/50"
                >
                  <span
                    style={{ color: tech.color }}
                    className="transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:scale-110"
                  >
                    {tech.icon}
                  </span>
                </button>
              ))}
            </div>

            {/* Mobile inline tray (hidden on sm+) */}
            <div className="flex sm:hidden items-center gap-0.5 pl-0.5 border-l border-black/10">
              <span className="text-[11px] font-semibold text-[#1f2937] px-1 tabular-nums">
                {time}
              </span>
              <button
                type="button"
                aria-label={t("desktop.closeLabel")}
                onClick={onClose}
                className="flex size-8 shrink-0 items-center justify-center rounded-lg text-[#1f2937]/70 transition-colors duration-150 hover:bg-[#e81123] hover:text-white"
              >
                <X className="size-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop / Tablet separate right tray (sm+) */}
        <div className="hidden sm:flex absolute right-3 bottom-0 h-14 items-center gap-1.5 rounded-2xl border border-white/60 bg-white/60 px-2 shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl">
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex size-9 items-center justify-center rounded-xl text-[#0a66c2] transition-colors duration-150 hover:bg-white/60"
          >
            <LinkedInIcon className="size-4" />
          </a>
          <div className="flex flex-col items-end pr-1 text-[12px] leading-tight text-[#1f2937] tabular-nums">
            <span className="font-semibold">{time}</span>
            <span className="hidden md:inline text-[11px] text-[#4b5563]">
              {date}
            </span>
          </div>
          <button
            type="button"
            aria-label={t("desktop.closeLabel")}
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-xl text-[#1f2937]/70 transition-colors duration-150 hover:bg-[#e81123] hover:text-white"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    </>
  )
}