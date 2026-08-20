import { useTranslation } from "react-i18next"
import { ChevronRight } from "lucide-react"
import fotoPerfil from "@/assets/foto-perfil.jpg"

export function ProfileSection({ onOpenCv }: { onOpenCv: () => void }) {
  const { t } = useTranslation()

  return (
    <div className="absolute top-6 left-14 z-10 flex max-w-[420px] flex-col items-start text-left">
      <img
        src={fotoPerfil}
        alt="David Agudelo Valencia"
        className="size-24 rounded-full border-2 border-white/60 object-cover shadow-lg grayscale sm:size-28"
      />
      <div className="mt-4 max-w-[420px] rounded-xl border border-white/50 bg-white/45 px-3.5 py-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.18)] backdrop-blur-md">
        <h2 className="text-[12px] font-semibold tracking-[0.08em] text-[#374151]">
          {t("desktop.profile.title")}
        </h2>
        <p className="mt-1.5 text-[13px] leading-relaxed text-[#1f2937] sm:text-[14px]">
          {t("desktop.profile.description")}
        </p>
      </div>
      <button
        type="button"
        onClick={onOpenCv}
        className="mt-3 flex items-center gap-1 text-[14px] text-white underline-offset-4 transition-colors duration-200 hover:text-white/70 hover:underline"
      >
        {t("desktop.profile.moreAbout")}
        <ChevronRight className="size-4" />
      </button>
    </div>
  )
}