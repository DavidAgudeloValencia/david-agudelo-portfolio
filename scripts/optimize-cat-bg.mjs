import { execFileSync } from "node:child_process"
import { mkdir, readdir, rm, stat } from "node:fs/promises"
import { join } from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"
import ffmpegPath from "ffmpeg-static"

const ROOT = fileURLToPath(new URL("..", import.meta.url))
const SRC = join(ROOT, "cat_bg")
const OUT = join(ROOT, "public", "cat_bg")

const FRAME_MS = 200
const WIDTH = 1280
const HEIGHT = 720
const MAX_SIZE = 2.5 * 1024 * 1024
const QUALITY_MIN = 60

if (!ffmpegPath) {
  console.error("ffmpeg-static no encontró el binario; reinstala con: npm rebuild ffmpeg-static")
  process.exit(1)
}

const frames = (await readdir(SRC))
  .filter((f) => /^ezgif-frame-\d+\.png$/i.test(f))
  .sort((a, b) => Number(a.match(/\d+/)) - Number(b.match(/\d+/)))

if (frames.length < 2) {
  console.error("No se encontraron fotogramas ezgif-frame-*.png en cat_bg/")
  process.exit(1)
}

await mkdir(OUT, { recursive: true })

const durationSec = (frames.length * FRAME_MS) / 1000
const fps = frames.length / durationSec
const animPath = join(OUT, "cat_bg.webp")
const staticPath = join(OUT, "cat_static.webp")

const encode = (quality) => {
  execFileSync(
    ffmpegPath,
    [
      "-y",
      "-framerate", String(Number(fps.toFixed(6))),
      "-i", join(SRC, "ezgif-frame-%03d.png"),
      "-vf", `scale=${WIDTH}:${HEIGHT}:flags=lanczos`,
      "-fps_mode", "passthrough",
      "-loop", "0",
      "-c:v", "libwebp",
      "-quality", String(quality),
      "-compression_level", "6",
      "-preset", "picture",
      animPath,
    ],
    { cwd: ROOT, stdio: ["ignore", "inherit", "pipe"] },
  )
}

let quality = 75
encode(quality)
let animSize = (await stat(animPath)).size
while (animSize > MAX_SIZE && quality > QUALITY_MIN) {
  quality -= 10
  encode(quality)
  animSize = (await stat(animPath)).size
}

const meta = await sharp(animPath).metadata()

await sharp(join(SRC, frames[0]))
  .resize(WIDTH, HEIGHT, { fit: "cover" })
  .webp({ quality: 70 })
  .toFile(staticPath)

const srcBytes = (await Promise.all(frames.map((f) => stat(join(SRC, f))))).reduce((a, s) => a + s.size, 0)

for (const f of await readdir(OUT)) {
  if (/^ezgif-frame-.*\.png$/i.test(f) || /^cat_\d+\.webp$/i.test(f)) {
    await rm(join(OUT, f))
    console.log(`Limpiado: public/cat_bg/${f}`)
  }
}

console.log(`Fotogramas: ${frames.length} PNG (${(srcBytes / 1024 / 1024).toFixed(1)} MB) → animación de ${durationSec.toFixed(1)}s`)
console.log(`cat_bg.webp: ${(animSize / 1024).toFixed(0)} KB · ${meta.width}×${meta.height} · pages=${meta.pages} · ${meta.delay?.[0]}ms/fotograma · loop=${meta.loop} · calidad=${quality}`)
console.log(`cat_static.webp: ${((await stat(staticPath)).size / 1024).toFixed(0)} KB (prefers-reduced-motion)`)

if (meta.pages !== frames.length || meta.loop !== 0) {
  console.error("ERROR: la animación generada no es válida (pages/loop incorrectos)")
  process.exit(1)
}
