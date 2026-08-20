import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { waLink } from "@/data/content"
import { Reveal } from "@/components/Reveal"

export function Demo() {
  const { t } = useTranslation()
  const [failed, setFailed] = useState(false)

  return (
    <section
      id="demo"
      className="scroll-mt-14 bg-graphite-veil px-5 py-24 sm:py-[108px]"
    >
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="eyebrow">{t("demo.label")}</p>
          <p className="lead mt-8 max-w-[440px] text-bone-white">
            {t("demo.subtitle")}
          </p>
          <h2 className="display mt-10 text-bone-white">
            {t("demo.title")}
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-16">
            {failed ? (
              <div className="rounded-[15px] border border-ash-border bg-obsidian px-6 py-20 text-center">
                <p className="font-[450] text-[clamp(1.5rem,3vw,1.75rem)] leading-[1.3] tracking-[-0.03em] text-bone-white">
                  {t("demo.placeholderTitle")}
                </p>
                <p className="lead mx-auto mt-6 max-w-[440px] text-bone-white">
                  {t("demo.placeholderBody")}
                </p>
                <Button
                  className="mt-10"
                  onClick={() =>
                    window.open(waLink(t("wa.diagnostic")), "_blank")
                  }
                >
                  {t("demo.cta")}
                </Button>
              </div>
            ) : (
              <div className="rounded-[15px] border border-ash-border bg-obsidian p-2">
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
                  <a href="/demo.mp4" className="text-fog-blue">
                    {t("demo.videoDownload")}
                  </a>
                  .
                </video>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}