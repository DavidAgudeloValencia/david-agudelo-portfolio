import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { waLink, type PlanI18n } from "@/data/content"
import { Reveal } from "@/components/Reveal"

export function Pricing() {
  const { t } = useTranslation()
  const items = t("pricing.items", { returnObjects: true }) as PlanI18n[]

  return (
    <section
      id="precios"
      className="scroll-mt-14 bg-obsidian px-5 py-24 sm:py-[108px]"
    >
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="eyebrow">{t("pricing.label")}</p>
          <p className="lead mt-8 max-w-[440px] text-bone-white">
            {t("pricing.subtitle")}
          </p>
          <h2 className="display mt-10 text-bone-white">
            {t("pricing.title")}
          </h2>
        </Reveal>

        <div className="mt-16">
          {items.map((plan: PlanI18n, i) => (
            <Reveal key={plan.name} delay={i * 80}>
              <div className="group border-b border-ash-border py-12">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="max-w-xl">
                    <div className="flex flex-wrap items-baseline gap-4">
                      <h3 className="font-[450] text-[clamp(1.5rem,3vw,1.75rem)] leading-[1.3] tracking-[-0.03em] text-bone-white transition-colors duration-500 ease-[cubic-bezier(0.52,0.01,0,1)] group-hover:text-fog-blue">
                        {plan.name}
                      </h3>
                      {plan.featured && (
                        <span className="rounded-full border border-ash-border px-3 py-1 text-[14px] text-fog-blue">
                          {t("pricing.featured")}
                        </span>
                      )}
                    </div>
                    <ul className="mt-6 space-y-3">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="text-[18px] leading-[1.5] text-bone-white"
                        >
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex shrink-0 flex-col items-start gap-4 lg:items-end">
                    <div className="heading-lg text-bone-white">
                      {plan.amount}
                    </div>
                    <div className="text-[15px] leading-[1.2] text-fog-blue">
                      {plan.note}
                    </div>
                    <Button
                      className="mt-2"
                      onClick={() =>
                        window.open(waLink(plan.ctaMessage), "_blank")
                      }
                    >
                      {plan.ctaLabel}
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-10 max-w-[440px] text-[15px] leading-[1.2] text-fog-blue">
            {t("pricing.disclaimer")}
          </p>
        </Reveal>
      </div>
    </section>
  )
}