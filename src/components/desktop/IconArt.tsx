import { useId } from "react"
import { cn } from "@/lib/utils"

const FOLDER_W = 240
const FOLDER_H = 160

const FOLDER_PATH =
  "M5.5 11 H17.5 L21 16.5 H44.5 Q47 16.5 47 19 V40 Q47 42.5 44.5 42.5 H8.5 Q6 42.5 6 40 V19 Q6 16.5 8.5 16.5 H5.5 Z"

export function FolderGlyph({ className }: { className?: string }) {
  const rawId = useId().replace(/:/g, "")
  const bodyId = `${rawId}-body`
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={bodyId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <path d={FOLDER_PATH} fill={`url(#${bodyId})`} stroke="rgba(0,0,0,0.15)" />
    </svg>
  )
}

export function FolderArt({
  size = 56,
  className,
}: {
  size?: number
  className?: string
}) {
  const scale = size / FOLDER_W
  return (
    <div
      className={cn("relative group", className)}
      style={{ width: size, height: FOLDER_H * scale }}
    >
      <div
        className="file relative w-60 h-40 cursor-pointer origin-bottom [perspective:1500px] [transform-style:preserve-3d] z-50"
        style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
      >
        <div className="work-5 bg-amber-600 w-full h-full origin-top rounded-2xl rounded-tl-none transition-all ease duration-300 relative after:absolute after:content-[''] after:bottom-[99%] after:left-0 after:w-20 after:h-4 after:bg-amber-700 after:rounded-t-2xl before:absolute before:content-[''] before:-top-[15px] before:left-[75.5px] before:w-4 before:h-4 before:bg-amber-700 before:[clip-path:polygon(0_35%,0%_100%,50%_100%);] group-hover:shadow-[0_20px_40px_rgba(0,0,0,.2)]" />
        <div className="work-4 absolute inset-1 bg-zinc-400 rounded-2xl transition-all ease duration-300 origin-bottom select-none group-hover:[transform:rotateX(-20deg)]" />
        <div className="work-3 absolute inset-1 bg-zinc-300 rounded-2xl transition-all ease duration-300 origin-bottom group-hover:[transform:rotateX(-30deg)]" />
        <div className="work-2 absolute inset-1 bg-zinc-200 rounded-2xl transition-all ease duration-300 origin-bottom group-hover:[transform:rotateX(-38deg)]" />
        <div className="work-1 absolute bottom-0 bg-gradient-to-t from-amber-500 to-amber-400 w-full h-[156px] rounded-2xl rounded-tr-none after:absolute after:content-[''] after:bottom-[99%] after:right-0 after:w-[146px] after:h-[16px] after:bg-amber-600 after:rounded-t-2xl before:absolute before:content-[''] before:-top-[10px] before:right-[142px] before:size-3 before:bg-amber-600 before:[clip-path:polygon(100%_14%,50%_100%,100%_100%);] transition-all ease duration-300 origin-bottom flex items-end group-hover:shadow-[inset_0_20px_40px_#fbbf24,_inset_0_-20px_40px_#d97706] group-hover:[transform:rotateX(-46deg)_translateY(1px)]" />
      </div>
    </div>
  )
}