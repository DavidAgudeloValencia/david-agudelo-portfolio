import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { LinkedInIcon } from "@/components/icons"
import { SITE, waLink } from "@/data/content"
import { Reveal } from "@/components/Reveal"

export function Contact() {
  const { t } = useTranslation()

  return (
    <section
      id="contacto"
      className="scroll-mt-14 bg-graphite-veil px-5 py-24 sm:py-[108px]"
    >
      <Reveal>
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{t("contact.label")}</p>
          <h2 className="display mt-10 text-bone-white">
            {t("contact.title")}
          </h2>
          <p className="lead mx-auto mt-10 max-w-[440px] text-left text-bone-white">
            {t("contact.subtitle")}
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Button
              size="lg"
              onClick={() =>
                window.open(waLink(t("wa.diagnostic")), "_blank")
              }
            >
              {t("contact.cta")}
            </Button>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="ghost-link inline-flex items-center gap-2"
            >
              <LinkedInIcon className="size-3.5" />
              {t("contact.linkedin")}
            </a>
          </div>
          <p className="mt-12 text-[15px] leading-[1.2] text-fog-blue">
            {t("contact.small")}
          </p>
        </div>
      </Reveal>
    </section>
  )
}