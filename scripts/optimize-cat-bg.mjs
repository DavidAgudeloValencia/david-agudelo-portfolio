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
const baseFps = frames.length / durationSec // 5 fps
const animPath = join(OUT, "cat_bg.webp")
const mp4Path = join(OUT, "cat_bg.mp4")
const staticPath = join(OUT, "cat_static.webp")

console.log("Generando video fluido a 30fps con interpolación...")
execFileSync(
  ffmpegPath,
  [
    "-y",
    "-framerate", String(Number(baseFps.toFixed(6))),
    "-i", join(SRC, "ezgif-frame-%03d.png"),
    "-vf", `scale=${WIDTH}:${HEIGHT}:flags=lanczos,minterpolate=fps=30:mi_mode=blend`,
    "-c:v", "libx264",
    "-preset", "slow",
    "-crf", "22",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    mp4Path,
  ],
  { cwd: ROOT, stdio: ["ignore", "inherit", "pipe"] },
)

const encodeWebp = (quality) => {
  execFileSync(
    ffmpegPath,
    [
      "-y",
      "-framerate", String(Number(baseFps.toFixed(6))),
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
encodeWebp(quality)
let animSize = (await stat(animPath)).size
while (animSize > MAX_SIZE && quality > QUALITY_MIN) {
  quality -= 10
  encodeWebp(quality)
  animSize = (await stat(animPath)).size
}

const meta = await sharp(animPath).metadata()

await sharp(join(SRC, frames[0]))
  .resize(WIDTH, HEIGHT, { fit: "cover" })
  .webp({ quality: 70 })
  .toFile(staticPath)

const mp4Size = (await stat(mp4Path)).size
const srcBytes = (await Promise.all(frames.map((f) => stat(join(SRC, f))))).reduce((a, s) => a + s.size, 0)

for (const f of await readdir(OUT)) {
  if (/^ezgif-frame-.*\.png$/i.test(f) || /^cat_\d+\.webp$/i.test(f)) {
    await rm(join(OUT, f))
    console.log(`Limpiado: public/cat_bg/${f}`)
  }
}

console.log(`Fotogramas: ${frames.length} PNG (${(srcBytes / 1024 / 1024).toFixed(1)} MB) → animación de ${durationSec.toFixed(1)}s`)
console.log(`cat_bg.mp4 (fluido 30fps): ${(mp4Size / 1024).toFixed(0)} KB`)
console.log(`cat_bg.webp: ${(animSize / 1024).toFixed(0)} KB · ${meta.width}×${meta.height} · pages=${meta.pages} · loop=${meta.loop}`)
console.log(`cat_static.webp: ${((await stat(staticPath)).size / 1024).toFixed(0)} KB (prefers-reduced-motion)`)

