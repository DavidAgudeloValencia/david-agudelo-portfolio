import { useEffect, useMemo, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  ArrowLeft,
  BatteryMedium,
  Camera,
  CheckCheck,
  Lock,
  Mic,
  MoreVertical,
  Paperclip,
  Phone,
  Signal,
  Smile,
  Video,
  Wifi,
} from "lucide-react"
import fotoPerfil from "@/assets/foto-perfil.jpg"
import { cn } from "@/lib/utils"

type DemoMessage = { from: "user" | "bot"; text: string; time: string }

const STEPS: { at: number; count?: number; typing?: boolean }[] = [
  { at: 600, count: 1 },
  { at: 1900, typing: true },
  { at: 3100, count: 3 },
  { at: 4700, count: 4 },
  { at: 5900, typing: true },
  { at: 7100, count: 5 },
  { at: 8300, count: 6 },
  { at: 9500, typing: true },
  { at: 10700, count: 7 },
  { at: 16000 },
]

export function ChatMockup({
  autoPlay = true,
  className,
}: {
  autoPlay?: boolean
  className?: string
  size?: "sm" | "lg"
}) {
  const { t } = useTranslation()
  const messages = useMemo(
    () => t("desktop.demoChat.messages", { returnObjects: true }) as DemoMessage[],
    [t],
  )
  const [visible, setVisible] = useState<DemoMessage[]>([])
  const [typing, setTyping] = useState(false)
  const [cycle, setCycle] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!autoPlay) {
      setVisible(messages)
      return
    }
    let mounted = true
    const timers: number[] = []
    const run = () => {
      setVisible([])
      setTyping(false)
      for (const step of STEPS) {
        if (step.typing) {
          timers.push(
            window.setTimeout(() => {
              if (mounted) setTyping(true)
            }, step.at),
          )
          continue
        }
        timers.push(
          window.setTimeout(() => {
            if (mounted) {
              setTyping(false)
              if (step.count) setVisible(messages.slice(0, step.count))
            }
          }, step.at),
        )
      }
      timers.push(
        window.setTimeout(() => {
          if (mounted) setCycle((prev) => prev + 1)
        }, 16400),
      )
    }
    run()
    return () => {
      mounted = false
      timers.forEach((id) => window.clearTimeout(id))
    }
  }, [autoPlay, messages, cycle])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [visible, typing])

  return (
    <div
      className={cn(
        "desktop-base relative mx-auto flex w-full max-w-[280px] items-center justify-center py-2 select-none",
        className,
      )}
    >
      <div className="animate-[mockup-in_0.6s_cubic-bezier(0.52,0.01,0,1)_both] relative flex h-[520px] w-full transform-gpu flex-col overflow-hidden rounded-[40px] bg-neutral-900 p-2.5 shadow-2xl transition-transform duration-300 hover:-translate-y-1.5 sm:h-[540px]">
        <div className="absolute top-24 -left-[5px] h-8 w-[2.5px] rounded-l-xs bg-neutral-700" />
        <div className="absolute top-36 -left-[5px] h-10 w-[2.5px] rounded-l-xs bg-neutral-700" />
        <div className="absolute top-48 -left-[5px] h-10 w-[2.5px] rounded-l-xs bg-neutral-700" />
        <div className="absolute top-32 -right-[5px] h-14 w-[2.5px] rounded-r-xs bg-neutral-700" />

        <div className="relative isolate flex h-full w-full transform-gpu flex-col overflow-hidden rounded-[30px] bg-[#efeae2] text-neutral-900">
          <div className="z-30 flex shrink-0 items-center justify-between bg-[#008069] px-4 pt-2 pb-1 text-[11px] font-semibold text-white">
            <span className="w-10 text-left font-bold tracking-tight">
              10:13
            </span>
            <div className="flex items-center justify-end gap-1.5 text-white">
              <Signal className="size-3" />
              <Wifi className="size-3" />
              <BatteryMedium className="size-3.5" />
            </div>
          </div>

          <div className="z-20 flex shrink-0 items-center justify-between bg-[#008069] px-3 py-1.5 text-white">
            <div className="flex items-center gap-1.5">
              <button type="button" className="text-white/90 hover:text-white">
                <ArrowLeft className="size-4" />
              </button>
              <div className="size-7 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-emerald-400 to-emerald-700">
                <img
                  src={fotoPerfil}
                  alt={t("desktop.demoChat.botName")}
                  className="size-full object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="max-w-[105px] truncate text-[11.5px] leading-tight font-semibold text-white">
                  {t("desktop.demoChat.botName")}
                </span>
                <span className="mt-0.5 text-[9.5px] leading-none font-medium text-emerald-200">
                  {t("desktop.demoChat.subtitle")}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <button type="button" className="hover:text-white">
                <Video className="size-3.5" />
              </button>
              <button type="button" className="hover:text-white">
                <Phone className="size-3.5" />
              </button>
              <button type="button" className="hover:text-white">
                <MoreVertical className="size-4" />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="relative flex min-h-0 flex-1 flex-col overflow-y-auto bg-[#efeae2] p-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="relative z-10 mx-auto mb-1.5 rounded-full bg-white/90 px-2.5 py-0.5 text-[9px] font-medium text-neutral-600 shadow-2xs">
              {t("desktop.demoChat.today")}
            </div>
            <div className="relative z-10 mx-auto mb-1.5 flex max-w-[88%] items-center gap-1 rounded-md bg-[#fff8e7] px-2 py-0.5 text-[8.5px] leading-tight text-[#54656f] shadow-[0_1px_1px_rgba(0,0,0,0.06)]">
              <Lock className="size-2.5 shrink-0" />
              <span>{t("desktop.demoChat.encrypted")}</span>
            </div>
            <div className="relative z-10 flex flex-1 flex-col justify-end space-y-1.5">
              {visible.map((msg, i) => {
                const isUser = msg.from === "user"
                return (
                  <div
                    key={`${cycle}-${i}`}
                    className={cn(
                      "animate-[chat-in_0.3s_ease-out_both] flex flex-col",
                      isUser ? "items-end" : "items-start",
                    )}
                  >
                    <div
                      className={cn(
                        "relative flex max-w-[86%] flex-col rounded-xl px-2.5 py-1 text-[11px] shadow-2xs",
                        isUser
                          ? "rounded-tr-none bg-[#dcf8c6]"
                          : "rounded-tl-none bg-white",
                      )}
                    >
                      <p className="text-[11px] leading-tight text-neutral-900">
                        {msg.text}
                      </p>
                      <div className="mt-0.5 flex items-center justify-end gap-1 self-end">
                        <span className="text-[8.5px] text-neutral-400">
                          {msg.time}
                        </span>
                        {isUser && (
                          <CheckCheck className="size-3 text-[#34b7f1]" />
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
              {typing && (
                <div className="animate-[chat-in_0.2s_ease-out_both] flex items-center justify-start">
                  <div className="flex items-center gap-1.5 rounded-xl rounded-tl-none bg-white px-3 py-2 shadow-2xs">
                    <span className="text-[10px] font-semibold text-emerald-600">
                      {t("desktop.demoChat.typing")}
                    </span>
                    <div className="flex items-center gap-1">
                      {[0, 1, 2].map((dot) => (
                        <span
                          key={dot}
                          className="animate-[typing-dot_0.6s_ease-in-out_infinite] size-1.5 rounded-full bg-emerald-500"
                          style={{ animationDelay: `${dot * 0.15}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="z-20 flex shrink-0 items-center gap-1.5 bg-[#f0f2f5] p-2">
            <button
              type="button"
              className="p-1 text-neutral-600 hover:text-emerald-600"
            >
              <Smile className="size-4" />
            </button>
            <div className="flex flex-1 items-center justify-between rounded-full bg-white px-3 py-1.5 text-xs text-neutral-400 shadow-2xs">
              <span className="truncate">{t("desktop.demoChat.placeholder")}</span>
              <div className="flex items-center gap-2">
                <button type="button" className="hover:text-neutral-600">
                  <Paperclip className="size-3.5" />
                </button>
                <button type="button" className="hover:text-neutral-600">
                  <Camera className="size-3.5" />
                </button>
              </div>
            </div>
            <button
              type="button"
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#00a884] text-white hover:bg-emerald-600"
            >
              <Mic className="size-3.5" />
            </button>
          </div>

          <div className="flex shrink-0 justify-center bg-[#f0f2f5] pt-0.5 pb-1.5">
            <div className="h-1 w-24 rounded-full bg-neutral-400/70" />
          </div>
        </div>
      </div>
    </div>
  )
}