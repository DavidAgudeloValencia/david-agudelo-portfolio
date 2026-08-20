import { useEffect, useState } from "react"

export function Wallpaper() {
  const [staticFrame, setStaticFrame] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStaticFrame(true)
    }
  }, [])

  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#24539b] via-[#3f7cb8] to-[#6fa3cc]"
    >
      <img
        src={staticFrame ? "/cat_bg/cat_static.webp" : "/cat_bg/cat_bg.webp"}
        alt=""
        className="absolute inset-0 size-full object-cover"
      />
    </div>
  )
}