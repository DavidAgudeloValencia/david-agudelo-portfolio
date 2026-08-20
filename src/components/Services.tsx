import { useTranslation } from "react-i18next"
import type { ServiceI18n } from "@/data/content"
import { Reveal } from "@/components/Reveal"

export function Services() {
  const { t } = useTranslation()
  const items = t("services.items", { returnObjects: true }) as ServiceI18n[]

  return (
    <section
      id="servicios"
      className="scroll-mt-14 bg-obsidian px-5 py-24 sm:py-[108px]"
    >
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="eyebrow">{t("services.label")}</p>
          <p className="lead mt-8 max-w-[440px] text-bone-white">
            {t("services.subtitle")}
          </p>
          <h2 className="display mt-10 text-bone-white">
            {t("services.title")}
          </h2>
        </Reveal>

        <div className="mt-16">
          {items.map((service: ServiceI18n, i) => (
            <Reveal key={service.title} delay={i * 80}>
              <div className="group border-b border-ash-border py-12">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-baseline lg:justify-between">
                  <div className="max-w-xl">
                    <h3 className="font-[450] text-[clamp(1.5rem,3vw,1.75rem)] leading-[1.3] tracking-[-0.03em] text-bone-white transition-colors duration-500 ease-[cubic-bezier(0.52,0.01,0,1)] group-hover:text-fog-blue">
                      {service.title}
                    </h3>
                    <p className="lead mt-4 text-bone-white">
                      {service.description}
                    </p>
                  </div>
                  <span className="shrink-0 pt-5 text-[20px] text-fog-blue lg:pt-0 lg:pb-[30px]">
                    {service.tag}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}