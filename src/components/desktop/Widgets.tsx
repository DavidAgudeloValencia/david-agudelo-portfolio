import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { SITE } from "@/data/content"
import {
  Clock,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  ExternalLink,
  Sun,
  type LucideIcon,
} from "lucide-react"
import { SpotifyIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

type Condition = "clear" | "clouds" | "fog" | "rain" | "snow" | "storm"

function weatherCondition(code: number): Condition {
  if (code === 0) return "clear"
  if (code <= 3) return "clouds"
  if (code <= 48) return "fog"
  if (code <= 67 || (code >= 80 && code <= 82)) return "rain"
  if (code <= 77) return "snow"
  return "storm"
}

function WeatherIcon({
  code,
  className,
}: {
  code: number
  className?: string
}) {
  const icon: LucideIcon =
    code === 0
      ? Sun
      : code <= 3
        ? CloudSun
        : code <= 48
          ? CloudFog
          : code <= 67 || (code >= 80 && code <= 82)
            ? CloudRain
            : code <= 77
              ? CloudSnow
              : CloudLightning
  const Component = icon
  return <Component className={className} />
}

const CIRCLE_BG: Record<Condition, string> = {
  clear: "from-[#4db8ff] to-[#c9e9ff]",
  clouds: "from-[#9aa8b8] to-[#dde4ea]",
  fog: "from-[#b8c4ce] to-[#e6ebef]",
  rain: "from-[#3f8cf3] to-[#b8d9f7]",
  snow: "from-[#8fd3f5] to-[#e4f5fc]",
  storm: "from-[#7c6cf0] to-[#d3ccfb]",
}

export function ClockWidget() {
  const { t, i18n } = useTranslation()
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const locale = i18n.language === "en" ? "en-US" : "es-CO"
  const time = now.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
  const date = now.toLocaleDateString(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
  })

  return (
    <div className="flex flex-col justify-between rounded-xl border border-white/40 bg-white/70 p-3 shadow-lg backdrop-blur-sm">
      <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#1f2937]">
        <Clock className="size-3.5 text-[#0b5ed7]" />
        {t("desktop.widgets.clock.title")}
      </div>
      <div className="mt-2 text-center">
        <div className="text-[24px] leading-none font-bold tracking-tight text-[#1f2937] tabular-nums">
          {time}
        </div>
        <div className="mt-1.5 text-[11px] leading-tight text-[#4b5563] capitalize">
          {date}
        </div>
      </div>
    </div>
  )
}

export function WeatherWidget() {
  const { t } = useTranslation()
  const [state, setState] = useState<{
    status: "loading" | "ready" | "error"
    temp?: number
    code?: number
  }>({ status: "loading" })

  useEffect(() => {
    let cancelled = false
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=6.2518&longitude=-75.5636&current=temperature_2m,weather_code&timezone=auto",
    )
      .then((res) =>
        res.ok ? res.json() : Promise.reject(new Error("bad request")),
      )
      .then((data) => {
        if (cancelled) return
        setState({
          status: "ready",
          temp: Math.round(data.current?.temperature_2m ?? 0),
          code: data.current?.weather_code ?? 0,
        })
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" })
      })
    return () => {
      cancelled = true
    }
  }, [])

  const condition = weatherCondition(state.code ?? 0)

  return (
    <div className="flex flex-col items-center rounded-xl border border-white/40 bg-white/70 p-3 shadow-lg backdrop-blur-sm">
      <div className="w-full text-[12px] font-semibold text-[#1f2937]">
        {t("desktop.widgets.weather.title")}
      </div>
      {state.status === "loading" && (
        <span className="mt-4 text-[12px] text-[#6b7280]">
          {t("desktop.widgets.weather.loading")}
        </span>
      )}
      {state.status === "error" && (
        <span className="mt-4 text-[12px] text-[#6b7280]">
          {t("desktop.widgets.weather.error")}
        </span>
      )}
      {state.status === "ready" && (
        <>
          <span
            className={cn(
              "mt-2 flex size-14 items-center justify-center rounded-full bg-gradient-to-b shadow-inner",
              CIRCLE_BG[condition],
            )}
          >
            <WeatherIcon
              code={state.code ?? 0}
              className="size-7 text-[#1e4e79] drop-shadow-sm"
            />
          </span>
          <div className="mt-1 text-[30px] leading-none font-bold tabular-nums text-[#1f2937]">
            {state.temp}°
          </div>
          <div className="mt-0.5 text-[12px] font-medium capitalize text-[#4b5563]">
            {t(`desktop.widgets.weather.${condition}`)}
          </div>
        </>
      )}
    </div>
  )
}

export function MusicWidget() {
  const { t } = useTranslation()

  return (
    <div className="rounded-xl border border-white/40 bg-white/70 p-3 shadow-lg backdrop-blur-sm">
      <div className="flex items-center gap-2 text-[12px] font-semibold text-[#1f2937]">
        <SpotifyIcon className="size-4 text-[#1db954]" />
        {t("desktop.widgets.music.nowPlaying")}
      </div>
      <div className="mt-2 overflow-hidden rounded-lg border border-black/10">
        <iframe
          title={t("desktop.widgets.music.title")}
          src={`https://open.spotify.com/embed/playlist/${SITE.spotifyPlaylist}?utm_source=generator`}
          width="100%"
          height="352"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture; web-share"
          loading="lazy"
          className="block border-0"
        />
      </div>
      <a
        href={t("desktop.widgets.music.url")}
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold text-[#1db954] underline-offset-4 hover:underline"
      >
        <ExternalLink className="size-3.5" />
        {t("desktop.widgets.music.link")}
      </a>
    </div>
  )
}