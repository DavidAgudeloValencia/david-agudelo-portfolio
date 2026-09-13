import { useTranslation } from "react-i18next"
import { Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/Reveal"
import { navigateTo } from "@/App"

export function About() {
  const { t } = useTranslation()

  return (
    <section
      id="sobre-mi"
      className="scroll-mt-14 bg-obsidian px-5 py-24 sm:py-[108px]"
    >
      <div className="mx-auto max-w-[440px]">
        <Reveal>
          <p className="eyebrow">{t("about.label")}</p>
          <h2 className="display mt-8 text-bone-white">
            {t("about.title")}
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <Button
            size="lg"
            className="mt-12"
            onClick={() => navigateTo("/portafolio")}
          >
            <Monitor className="size-4" />
            {t("desktop.openCta")}
          </Button>
        </Reveal>
      </div>
    </section>
  )
}