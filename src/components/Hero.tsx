import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Prism } from "@/components/Prism"
import { waLink } from "@/data/content"
import { Reveal } from "@/components/Reveal"

export function Hero() {
  const { t } = useTranslation()
  const stats = t("hero.stats", { returnObjects: true }) as {
    value: string
    label: string
  }[]
  const sectors = t("marquee.sectors", {
    returnObjects: true,
  }) as string[]

  return (
    <section
      id="inicio"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-obsidian px-5 pt-24 pb-12"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Prism className="opacity-70" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl text-center">
        <Reveal>
          <p className="eyebrow">{t("hero.label")}</p>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="display-xl mt-6 text-bone-white">
            {t("hero.title")}
            <span className="block">{t("hero.subtitle")}</span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="lead mx-auto mt-10 max-w-[440px] text-left text-bone-white">
            {t("hero.subtitleLabel")}
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Button
              size="lg"
              onClick={() =>
                window.open(waLink(t("wa.diagnostic")), "_blank")
              }
            >
              {t("hero.ctaPrimary")}
            </Button>
            <a href="#servicios" className="ghost-link">
              {t("hero.ctaSecondary")}
            </a>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 border-t border-ash-border pt-8 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-normal text-bone-white">
                  {stat.value}
                </div>
                <div className="mt-1 text-[14px] tracking-[0.02em] text-fog-blue uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={450}>
          <div className="mt-10">
            <p className="mb-4 text-[14px] tracking-[0.02em] text-fog-blue uppercase">
              {t("marquee.label")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {sectors.map((sector) => (
                <span
                  key={sector}
                  className="rounded-full border border-ash-border px-3 py-1 text-[14px] text-fog-blue"
                >
                  {sector}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}