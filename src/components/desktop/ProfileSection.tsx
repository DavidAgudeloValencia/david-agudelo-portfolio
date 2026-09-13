import { useTranslation } from "react-i18next"
import { ChevronRight } from "lucide-react"
import fotoPerfil from "@/assets/foto-perfil.jpg"

export function ProfileSection({ onOpenCv }: { onOpenCv: () => void }) {
  const { t } = useTranslation()

  return (
    <div className="absolute top-3 sm:top-6 left-3 sm:left-6 md:left-14 z-10 flex max-w-[calc(100vw-1.5rem)] sm:max-w-[380px] md:max-w-[420px] flex-col items-start text-left pointer-events-auto">
      <div className="flex items-center gap-3 sm:block">
        <img
          src={fotoPerfil}
          alt="David Agudelo Valencia"
          className="size-16 sm:size-24 md:size-28 shrink-0 rounded-full border-2 border-white/60 object-cover shadow-lg grayscale"
        />
        <button
          type="button"
          onClick={onOpenCv}
          className="sm:hidden flex items-center gap-1 text-[13px] font-medium text-white bg-black/30 px-3 py-1.5 rounded-full border border-white/30 backdrop-blur-sm transition-colors duration-200 hover:bg-black/50"
        >
          {t("desktop.profile.moreAbout")}
          <ChevronRight className="size-3.5" />
        </button>
      </div>

      <div className="mt-2.5 sm:mt-4 max-w-full rounded-xl border border-white/50 bg-white/45 px-3 sm:px-3.5 py-2 sm:py-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.18)] backdrop-blur-md">
        <h2 className="text-[11px] sm:text-[12px] font-semibold tracking-[0.08em] text-[#374151]">
          {t("desktop.profile.title")}
        </h2>
        <p className="mt-1 text-[12px] sm:text-[13px] md:text-[14px] leading-snug sm:leading-relaxed text-[#1f2937]">
          {t("desktop.profile.description")}
        </p>
      </div>

      <button
        type="button"
        onClick={onOpenCv}
        className="hidden sm:flex mt-3 items-center gap-1 text-[14px] text-white underline-offset-4 transition-colors duration-200 hover:text-white/70 hover:underline"
      >
        {t("desktop.profile.moreAbout")}
        <ChevronRight className="size-4" />
      </button>
    </div>
  )
}