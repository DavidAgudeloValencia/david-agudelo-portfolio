import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { waLink } from "@/data/content"
import { Reveal } from "@/components/Reveal"

export function LaunchOffer() {
  const { t } = useTranslation()

  return (
    <section
      aria-label={t("launch.badge")}
      className="bg-graphite-veil px-5 py-24 sm:py-[108px]"
    >
      <Reveal>
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow">{t("launch.badge")}</p>
          <p className="lead mx-auto mt-8 max-w-[440px] text-left text-bone-white">
            {t("launch.note")}
          </p>
          <h2 className="display mt-10 text-bone-white">
            {t("launch.title")}
          </h2>
          <p className="heading-lg mt-10 text-bone-white">
            {t("launch.price")}{" "}
            <span className="text-fog-blue">{t("launch.retainer")}</span>
          </p>
          <Button
            size="lg"
            className="mt-12"
            onClick={() => window.open(waLink(t("wa.launch")), "_blank")}
          >
            {t("launch.cta")}
          </Button>
        </div>
      </Reveal>
    </section>
  )
}