import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { waLink } from "@/data/content"
import { Window } from "@/components/desktop/Window"
import { ChatMockup } from "@/components/desktop/ChatMockup"

export function DemoWindow({
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
  const [failed, setFailed] = useState(false)

  return (
    <Window
      title={t("desktop.windows.demoTitle")}
      onClose={onClose}
      onMinimize={onMinimize}
      onFocus={onFocus}
      zIndex={zIndex}
      minimized={minimized}
      active={active}
      className="w-[min(520px,92vw)]"
    >
      <div className="flex flex-col items-center gap-3 p-4">
        <ChatMockup size="sm" />
        <p className="mx-auto max-w-sm text-center text-[13px] leading-relaxed text-[#4a4a38]">
          {t("desktop.demoChat.caption")}
        </p>
        <Button
          className="border-[#0b5ed7] text-[#0b5ed7] hover:border-[#3a7bd5] hover:text-[#3a7bd5]"
          onClick={() => window.open(waLink(t("wa.diagnostic")), "_blank")}
        >
          {t("desktop.windows.demoCta")}
        </Button>
        {!failed && (
          <div className="w-full overflow-hidden rounded-sm border border-[#e4d88f] bg-[#fdf6c9] p-1">
            <video
              src="/demo.mp4"
              poster="/demo-poster.png"
              className="aspect-video size-full object-contain"
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="metadata"
              onError={() => setFailed(true)}
            >
              {t("demo.videoFallback")}{" "}
              <a href="/demo.mp4" className="text-[#0b5ed7]">
                {t("demo.videoDownload")}
              </a>
              .
            </video>
          </div>
        )}
      </div>
    </Window>
  )
}