import { useTranslation } from "react-i18next"
import type { ProcessStepI18n } from "@/data/content"
import { Reveal } from "@/components/Reveal"

export function Process() {
  const { t } = useTranslation()
  const items = t("process.items", { returnObjects: true }) as ProcessStepI18n[]

  return (
    <section
      id="proceso"
      className="scroll-mt-14 bg-graphite-veil px-5 py-24 sm:py-[108px]"
    >
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="eyebrow">{t("process.label")}</p>
          <h2 className="display mt-10 max-w-[800px] text-bone-white">
            {t("process.title")}
          </h2>
        </Reveal>

        <div className="mt-16">
          {items.map((step: ProcessStepI18n, i) => (
            <Reveal key={step.step} delay={i * 80}>
              <div className="group border-b border-ash-border py-12">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-baseline lg:gap-16">
                  <span className="text-[17px] tracking-[0.02em] text-fog-blue uppercase">
                    {step.step}
                  </span>
                  <div className="max-w-2xl">
                    <h3 className="font-[450] text-[clamp(1.5rem,3vw,1.75rem)] leading-[1.3] tracking-[-0.03em] text-bone-white transition-colors duration-500 ease-[cubic-bezier(0.52,0.01,0,1)] group-hover:text-fog-blue">
                      {step.title}
                    </h3>
                    <p className="lead mt-4 text-bone-white">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}