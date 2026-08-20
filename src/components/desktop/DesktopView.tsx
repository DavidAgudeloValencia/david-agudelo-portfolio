import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Sparkles, X } from "lucide-react"
import { Wallpaper } from "@/components/desktop/Wallpaper"
import { Taskbar } from "@/components/desktop/Taskbar"
import { ProfileSection } from "@/components/desktop/ProfileSection"
import { DesktopIcons } from "@/components/desktop/DesktopIcons"
import { LeftPanel } from "@/components/desktop/LeftPanel"
import { FinderWindow } from "@/components/desktop/FinderWindow"
import { InfoWindow } from "@/components/desktop/InfoWindow"
import { PublicationsWindow } from "@/components/desktop/PublicationsWindow"
import { DemoWindow } from "@/components/desktop/DemoWindow"
import { GalleryWindow } from "@/components/desktop/GalleryWindow"
import {
  ClockWidget,
  MusicWidget,
  WeatherWidget,
} from "@/components/desktop/Widgets"
import { FolderGlyph } from "@/components/desktop/IconArt"
import {
  GmailIcon,
  GithubIcon,
  LaravelIcon,
  LinkedInIcon,
  MySqlIcon,
  N8nIcon,
  OpenAIIcon,
  ReactIcon,
  WhatsAppIcon,
} from "@/components/icons"
import { SITE, waLink } from "@/data/content"
import type { FinderFolder } from "@/components/desktop/types"

type WinState = { z: number; minimized: boolean }

function useFolders(t: ReturnType<typeof useTranslation>["t"]) {
  return t("desktop.finder.folders", { returnObjects: true }) as FinderFolder[]
}

export function DesktopView({ onClose }: { onClose: () => void }) {
  const { t } = useTranslation()
  const folders = useFolders(t)
  const [windows, setWindows] = useState<Record<string, WinState>>({})
  const zCounter = useRef(20)
  const [notification, setNotification] = useState<string | null>(null)
  const notificationMessages = t("desktop.notifications.messages", {
    returnObjects: true,
  }) as string[]

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  useEffect(() => {
    const timers: number[] = []
    const show = (index: number) => {
      setNotification(notificationMessages[index % notificationMessages.length])
      timers.push(window.setTimeout(() => setNotification(null), 5000))
      timers.push(
        window.setTimeout(
          () => show(index + 1),
          25000 + Math.floor(Math.random() * 20000),
        ),
      )
    }
    timers.push(window.setTimeout(() => show(0), 6000))
    return () => timers.forEach((id) => window.clearTimeout(id))
  }, [notificationMessages])

  const openWindow = (id: string) =>
    setWindows((prev) => {
      const existing = prev[id]
      if (existing) {
        return {
          ...prev,
          [id]: { ...existing, minimized: false, z: ++zCounter.current },
        }
      }
      return { ...prev, [id]: { z: ++zCounter.current, minimized: false } }
    })

  const closeWindow = (id: string) =>
    setWindows((prev) => {
      const next = { ...prev }
      delete next[id]
      return next
    })

  const focusWindow = (id: string) =>
    setWindows((prev) =>
      prev[id] ? { ...prev, [id]: { ...prev[id], z: ++zCounter.current } } : prev,
    )

  const minimizeWindow = (id: string) =>
    setWindows((prev) =>
      prev[id] ? { ...prev, [id]: { ...prev[id], minimized: true } } : prev,
    )

  const activeId =
    Object.entries(windows)
      .filter(([, state]) => !state.minimized)
      .sort((a, b) => b[1].z - a[1].z)[0]?.[0] ?? null

  const winProps = (id: string) => ({
    onClose: () => closeWindow(id),
    onMinimize: () => minimizeWindow(id),
    onFocus: () => focusWindow(id),
    zIndex: windows[id]?.z ?? 20,
    minimized: windows[id]?.minimized ?? false,
    active: activeId === id,
  })

  const byId = (id: string) => folders.find((folder) => folder.id === id)

  const apps = [
    {
      id: "finder",
      name: t("desktop.apps.finder"),
      color: "#f59e0b",
      icon: <FolderGlyph className="size-5" />,
    },
    {
      id: "email",
      name: t("desktop.apps.email"),
      color: "#ea4335",
      icon: <GmailIcon className="size-5" />,
    },
    {
      id: "whatsapp",
      name: t("desktop.apps.whatsapp"),
      color: "#25d366",
      icon: <WhatsAppIcon className="size-5" />,
    },
    {
      id: "github",
      name: t("desktop.apps.github"),
      color: "#181717",
      icon: <GithubIcon className="size-5" />,
    },
    {
      id: "linkedin",
      name: t("desktop.apps.linkedin"),
      color: "#0a66c2",
      icon: <LinkedInIcon className="size-5" />,
    },
  ]

  const techNames = t("desktop.taskbar.tech", { returnObjects: true }) as string[]
  const techIcons = [
    { icon: <LaravelIcon className="size-4" />, color: "#ff2d20" },
    { icon: <ReactIcon className="size-4" />, color: "#149eca" },
    { icon: <MySqlIcon className="size-4" />, color: "#00758f" },
    { icon: <N8nIcon className="size-4" />, color: "#ea4b71" },
    { icon: <OpenAIIcon className="size-4" />, color: "#10a37f" },
    { icon: <WhatsAppIcon className="size-4" />, color: "#25d366" },
  ]
  const techApps = techNames.map((name, i) => ({
    id: `tech-${i}`,
    name,
    color: techIcons[i]?.color ?? "#4a5568",
    icon: techIcons[i]?.icon ?? <GithubIcon className="size-4" />,
  }))

  const handleAppClick = (appId: string) => {
    const state = windows[appId]
    if (state) {
      if (state.minimized) openWindow(appId)
      else closeWindow(appId)
      return
    }
    if (appId === "finder") {
      openWindow("finder")
      return
    }
    if (appId === "email") {
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
        t("desktop.emailSubject"),
      )}`
      return
    }
    if (appId === "whatsapp") {
      window.open(waLink(t("desktop.wa")), "_blank", "noreferrer")
      return
    }
    if (appId === "github") {
      window.open(SITE.github, "_blank", "noreferrer")
      return
    }
    if (appId === "linkedin") {
      window.open(SITE.linkedin, "_blank", "noreferrer")
      return
    }
  }

  return (
    <div className="desktop-base fixed inset-0 z-50 overflow-hidden bg-[#3a7bd5]">
      <Wallpaper />

      <ProfileSection onOpenCv={() => openWindow("finder")} />
      <LeftPanel />
      <DesktopIcons onOpen={openWindow} />

      <div className="absolute top-6 right-3 bottom-[76px] z-10 hidden w-[320px] flex-col gap-3 lg:flex">
        <div className="grid grid-cols-2 gap-3">
          <ClockWidget />
          <WeatherWidget />
        </div>
        <MusicWidget />
      </div>

      {notification && (
        <div className="absolute right-3 bottom-[76px] z-40 w-[320px] overflow-hidden rounded-2xl border border-black/10 bg-white/85 p-3 shadow-[0_12px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl animate-[notif-in_0.25s_ease-out]">
          <div className="flex items-start gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#3a7bd5] to-[#0b5ed7]">
              <Sparkles className="size-4 text-white" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[12px] font-semibold text-[#1f2937]">
                  {t("desktop.notifications.title")}
                </span>
                <button
                  type="button"
                  aria-label={t("desktop.notifications.dismiss")}
                  onClick={() => setNotification(null)}
                  className="flex size-6 shrink-0 items-center justify-center rounded-full text-[#1f2937]/50 transition-colors duration-150 hover:bg-black/5 hover:text-[#1f2937]"
                >
                  <X className="size-3.5" />
                </button>
              </div>
              <p className="mt-1 text-[13px] leading-snug text-[#4b5563]">
                {notification}
              </p>
            </div>
          </div>
        </div>
      )}

      {windows.about && (
        <InfoWindow
          {...winProps("about")}
          title={t("desktop.windows.aboutTitle")}
          notes={[{ title: t("desktop.windows.aboutTitle"), body: t("desktop.windows.aboutBody") }]}
        />
      )}
      {windows.finder && <FinderWindow {...winProps("finder")} />}
      {windows.projects && (
        <InfoWindow
          {...winProps("projects")}
          title={t("desktop.windows.projectsTitle")}
          notes={byId("projects")?.notes ?? []}
        />
      )}
      {windows.notes && (
        <InfoWindow
          {...winProps("notes")}
          title={t("desktop.windows.notesTitle")}
          notes={[...(byId("about")?.notes ?? []), ...(byId("skills")?.notes ?? [])]}
        />
      )}
      {windows.publications && <PublicationsWindow {...winProps("publications")} />}
      {windows.demo && <DemoWindow {...winProps("demo")} />}
      {windows.gallery && <GalleryWindow {...winProps("gallery")} />}

      <Taskbar
        apps={apps}
        techApps={techApps}
        windows={windows}
        activeId={activeId}
        onAppClick={handleAppClick}
        onOpenWindow={openWindow}
        onClose={onClose}
      />
    </div>
  )
}