import type { CSSProperties } from "react"
import { cn } from "@/lib/utils"

type ShapeKind = "circle" | "square" | "triangle" | "diamond" | "hexagon" | "ring"

const SHAPES: {
  shape: ShapeKind
  top: string
  left: string
  size: number
  rot: string
  dur: number
}[] = [
  { shape: "circle", top: "5%", left: "5%", size: 96, rot: "0deg", dur: 6.65 },
  { shape: "hexagon", top: "7%", left: "76%", size: 108, rot: "0deg", dur: 7.4 },
  { shape: "square", top: "14%", left: "38%", size: 54, rot: "3deg", dur: 6.1 },
  { shape: "triangle", top: "20%", left: "12%", size: 74, rot: "-6deg", dur: 7.8 },
  { shape: "ring", top: "22%", left: "62%", size: 88, rot: "0deg", dur: 6.4 },
  { shape: "diamond", top: "30%", left: "88%", size: 62, rot: "0deg", dur: 7.1 },
  { shape: "circle", top: "36%", left: "27%", size: 50, rot: "0deg", dur: 6.9 },
  { shape: "hexagon", top: "42%", left: "72%", size: 70, rot: "0deg", dur: 6.3 },
  { shape: "triangle", top: "48%", left: "6%", size: 58, rot: "8deg", dur: 7.6 },
  { shape: "square", top: "52%", left: "48%", size: 86, rot: "5deg", dur: 6.0 },
  { shape: "ring", top: "58%", left: "88%", size: 110, rot: "0deg", dur: 7.2 },
  { shape: "diamond", top: "62%", left: "20%", size: 78, rot: "0deg", dur: 6.7 },
  { shape: "circle", top: "68%", left: "60%", size: 128, rot: "0deg", dur: 7.9 },
  { shape: "hexagon", top: "76%", left: "36%", size: 56, rot: "0deg", dur: 6.2 },
  { shape: "triangle", top: "80%", left: "80%", size: 66, rot: "-4deg", dur: 7.0 },
  { shape: "ring", top: "86%", left: "10%", size: 76, rot: "0deg", dur: 6.5 },
]

export function Prism({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("absolute inset-0 overflow-hidden", className)}
    >
      {SHAPES.map((s, i) => (
        <div
          key={i}
          className={`prism-shape prism-shape--${s.shape}`}
          style={
            {
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              "--i": i,
              "--rot": s.rot,
              "--dur": `${s.dur}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  )
}