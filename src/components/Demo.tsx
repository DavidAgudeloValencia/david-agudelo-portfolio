import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { waLink } from "@/data/content"
import { Reveal } from "@/components/Reveal"
import { ChatMockup } from "@/components/desktop/ChatMockup"
import { Zap, Code2, CalendarCheck, ShieldCheck, Sparkles } from "lucide-react"

export function Demo() {
  const { t } = useTranslation()

  const features = [
    {
      icon: Zap,
      title: t("demo.features.speed.title"),
      desc: t("demo.features.speed.desc"),
    },
    {
      icon: Code2,
      title: t("demo.features.ai.title"),
      desc: t("demo.features.ai.desc"),
    },
    {
      icon: CalendarCheck,
      title: t("demo.features.agenda.title"),
      desc: t("demo.features.agenda.desc"),
    },
  ]

  return (
    <section
      id="demo"
      className="scroll-mt-14 bg-graphite-veil/40 px-5 py-24 sm:py-[108px] border-y border-ash-border/60 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-400">
              <Sparkles className="size-3.5" />
              <span>{t("demo.badge")}</span>
            </div>
            <p className="eyebrow mt-4">{t("demo.label")}</p>
            <h2 className="display mt-6 text-bone-white">
              {t("demo.title")}
            </h2>
            <p className="lead mt-4 max-w-[620px] text-bone-white/80">
              {t("demo.subtitle")}
            </p>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-14 sm:mt-18 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left column: Capability Cards and CTA */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-6 order-2 lg:order-1">
              <div className="space-y-4">
                {features.map((feat, index) => {
                  const Icon = feat.icon
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-4.5 rounded-2xl border border-ash-border/70 bg-obsidian/85 p-5 backdrop-blur-sm transition-all duration-300 hover:border-ash-border hover:bg-obsidian hover:shadow-lg"
                    >
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <Icon className="size-5.5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-base text-bone-white tracking-tight">
                          {feat.title}
                        </h3>
                        <p className="mt-1.5 text-sm text-bone-white/70 leading-relaxed">
                          {feat.desc}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Button
                  className="px-7 py-5 text-sm font-semibold tracking-wide shadow-md"
                  onClick={() =>
                    window.open(waLink(t("wa.diagnostic")), "_blank")
                  }
                >
                  {t("demo.cta")}
                </Button>
                <div className="flex items-center justify-center gap-2 text-xs font-mono text-bone-white/60">
                  <ShieldCheck className="size-4 text-emerald-400" />
                  <span>WhatsApp Cloud API Oficial</span>
                </div>
              </div>
            </div>

            {/* Right column: WhatsApp Interactive Phone Mockup */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2">
              <div className="relative w-full max-w-[370px] sm:max-w-[400px] flex justify-center">
                {/* Emerald ambient glow behind the mockup */}
                <div className="absolute -inset-6 rounded-full bg-emerald-500/15 blur-3xl -z-10 pointer-events-none" />
                <ChatMockup size="lg" />
              </div>
              <p className="mt-3.5 text-center text-xs font-mono text-bone-white/50">
                {t("desktop.demoChat.caption")}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}