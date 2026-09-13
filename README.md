# david-agudelo-portfolio — Sitio de David Agudelo

[![CI](https://github.com/DavidAgudeloValencia/david-agudelo-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/DavidAgudeloValencia/david-agudelo-portfolio/actions/workflows/ci.yml)

Landing page de servicios (desarrollo de software full stack a la medida para empresas de Medellín) + escritorio interactivo estilo Windows accesible directamente por `/portafolio`.
Stack: **React + TypeScript + Vite + Tailwind CSS v4 + shadcn/ui (Base UI) + lucide-react**.

Lista para publicar en **Netlify (gratis)**.

## Requisitos

- Node.js 20+ y npm.

## Desarrollo local

```bash
npm install
npm run dev        # servidor local (Vite)
npm run build      # build de producción → dist/ (incluye typecheck)
npm run lint       # revisión de código (oxlint)
npm run catbg      # genera la animación del fondo (cat_bg/ → public/cat_bg/)
npm run preview    # probar el build localmente
```

## Notas del repositorio

- **`cat_bg/` no se sube** (26 PNG fuente, ~53 MB, solo locales). El webp
  compilado vive en `public/cat_bg/`; para regenerarlo, ten los frames en
  `cat_bg/` y ejecuta `npm run catbg`.
- Los documentos de negocio y el CV no están en el repo (viven solo en OneDrive).
- **CI**: en cada PR y push a `main`/`develop` corre `npm run lint` + `npm run build`
  (`.github/workflows/ci.yml`).

## Deploy (Cloudflare Pages)

1. Crea cuenta en [dash.cloudflare.com](https://dash.cloudflare.com) y en **Workers & Pages → Create → Pages → Connect to Git**.
2. Conecta el repo `david-agudelo-portfolio` y configura:
   - Preset: **React (Vite)** — Build command: `npm run build`
   - Build output directory: `dist`
   - Deja el campo *Install command* vacío (Cloudflare instala las dependencias automáticamente con `npm install`).
   - Node.js: el archivo `.node-version` del repo fija la versión `22` (Cloudflare lo respeta; también puedes poner la variable de entorno `NODE_VERSION=22` en **Settings → Environment variables**). Es obligatorio: Vite 8 requiere Node 22 y el build image antiguo trae Node 18.
3. Al primer push a `main` se publica automáticamente en `https://<proyecto>.pages.dev`.
4. En **Custom domains**, agrega `davidagudelo.com` (y `www`) y apunta el DNS en tu registrador a Cloudflare (o usa el DNS de Cloudflare: añade los records `CNAME davidagudelo.com → <proyecto>.pages.dev` y `www → <proyecto>.pages.dev`).
5. Los headers de seguridad y caché están en `public/_headers` (equivalentes a los que antes estaban en `netlify.toml`).

### Re-desplegar / deploy manual

- **Automático**: cada push a `main` dispara un build nuevo (el CI de GitHub corre lint + build aparte).
- **Dashboard**: proyecto → **Deployments** → *Retry deployment* sobre cualquier deploy anterior, o **Create deployment** seleccionando la rama.
- **CLI** (si tienes `wrangler`): `npx wrangler pages deploy dist --project-name=<proyecto>`.

### SEO (dominio real)

El sitio ya usa `davidagudelo.com` en canonical, Open Graph, Twitter, JSON-LD,
`robots.txt` y `sitemap.xml`. Después del deploy, verifica en
[Search Console](https://search.google.com/search-console) la propiedad y
envía el sitemap.

## Personalizar

| Qué | Dónde |
|---|---|
| Número de WhatsApp | `src/data/content.ts` → `SITE.whatsapp` (hoy `573052580913` / `+57 305 258 0913`) |
| URL de LinkedIn | `src/data/content.ts` → `SITE.linkedin` |
| Textos de la UI (ES y EN) | `src/i18n/locales/es.json` y `en.json` (mensajes de WhatsApp en `wa.*`) |
| Foto de perfil | Reemplaza `src/assets/foto-perfil.jpg` |
| Video demo del bot | Coloca `demo.mp4` en `public/` (y opcional `demo-poster.png`). La sección `#demo` lo reproduce automáticamente; si no existe, la ventana Demo del escritorio muestra el mockup de chat del bot (`ChatMockup`) |
| Email y GitHub del escritorio | `src/data/content.ts` → `SITE.email` y `SITE.github` (dados: email `david.agudelo.valencia@gmail.com`, GitHub `https://github.com/DavidAgudeloValencia`) |
| Galería de proyectos del escritorio | Agrega la imagen en `public/gallery/` con el **link en el nombre del archivo** (ej: `davidagudelo.com.png` → abre `https://davidagudelo.com`). Se lista sola en la ventana Galería; clic → abre el proyecto en pestaña nueva |
| Playlist de Spotify del escritorio | `src/data/content.ts` → `SITE.spotifyPlaylist` (ID de la playlist; hoy `47F8GYRkS01waEogPB0ehq`) |
| Fondo animado del escritorio | Reemplaza los fotogramas en `cat_bg/` (`ezgif-frame-001.png`…`ezgif-frame-026.png`, 16:9, cualquier resolución) y ejecuta `npm run catbg` — genera con ffmpeg la **WebP animada** `public/cat_bg/cat_bg.webp` (1280×720, 200ms/fotograma, ~5s en loop infinito, optimizada) y el estático `cat_static.webp` para `prefers-reduced-motion` |
| Contenido del Finder (CV en carpetas) | `src/i18n/locales/es.json` y `en.json` → `desktop.finder.folders` |
| Paleta y tipografía | `src/index.css` → variables `:root` (estilo "Vivid+Co": Obsidian/Bone White/Graphite Veil/Fog Blue, ver `DESIGN.md`) |

## Notas técnicas

- Sistema de diseño: **"Vivid+Co"** (prisma de luz sobre lienzo obsidiana) —
  ver `DESIGN.md` para tokens, reglas y mapeo a código.
- Componentes shadcn en `src/components/ui/` (Base UI, sin Radix). Botones
  outlined (1px bone-white, radio 5px) y ghost — sin botones rellenos.
- Internacionalización: `i18next` + `react-i18next`, switch ES/EN en el header,
  persistido en `localStorage["vitrina-lang"]`.
- Iconos: `lucide-react` (monocromo, genéricos) y **`BrandIcon` en
  `src/components/icons.tsx`** con los glifos oficiales de Simple Icons
  (Gmail, WhatsApp, GitHub, LinkedIn, Spotify, Laravel, React, MySQL, n8n,
  OpenAI) para las marcas del escritorio.
- Tipografía: **Anton** (display condensada uppercase) + **Inter** variable (body, peso 450) + **JetBrains Mono** (labels), self-hosted en `src/assets/fonts/` — sin CDN, funciona offline. Base de espaciado 8px en la landing; el **desktop conserva su base original** (Inter 400/700, grid 4px) vía `.desktop-base`.
- Artefacto de marca: `src/components/Prism.tsx` — **figuras geométricas
  básicas** (círculos, cuadrados, triángulos, rombos, hexágonos y anillos) de
  distintos tamaños que llenan la pantalla del hero, con edges RGB-split y
  shimmer de ~6.65s — el único elemento cromático del sistema.
- Vista "Desktop Portfolio": overlay retro Windows desde el botón de Sobre mí
  (`src/components/desktop/`) — fondo animado (`Wallpaper.tsx`: **WebP
  animada directa** `public/cat_bg/cat_bg.webp`, 26 fotogramas a 200ms —
  ~5s en loop infinito; `cat_static.webp` con `prefers-reduced-motion`), perfil, carpetas ámbar 3D
  listadas a la izquierda (estilo clásico, con abanico al hover) que abren
  ventanas (proyectos, notas, publicaciones, CV, demo, **galería de
  proyectos** con imágenes de `public/gallery/` que llevan el link en el
  nombre del archivo),
  taskbar Windows 11 estilo DockLike (`Taskbar.tsx`): dock flotante
  centrado con acrílico + bandeja en píldora separada, menú Inicio + Apagar,
  apps con estados running/active (línea azul indicadora) e **íconos reales
  de marca (Simple Icons)** a color, tech stack, reloj fecha/hora y LinkedIn;
  widgets de
  reloj (tarjeta glass con ícono y hora grande) / clima estilo Google (Open-Meteo:
  temperatura y condición reales, sin API key) / música (playlist
  de Spotify embebida completa con controles, `SITE.spotifyPlaylist`);
  ventanas acrílicas estilo Windows 11 (mica, botones pill, ✕ rojo);
  notificaciones de precios tipo toast Win11 (5s visibles, 25–45s aleatorios);
  demo del bot con mockup de chat WhatsApp (conversación realista
  cliente→bot: cotización, diagnóstico gratis y cita; avatar con foto local,
  aviso de cifrado, animaciones CSS puras, textos en i18n) más `demo.mp4`
  si existe.
  Guía visual en `DESIGN_DESKTOP.md`.
- Animaciones: reveal al scroll (IntersectionObserver, curva
  `cubic-bezier(0.52, 0.01, 0, 1)`), shimmer del prisma, barra de progreso de
  scroll — todo respeta `prefers-reduced-motion`.
- SEO: meta tags, Open Graph, Twitter Cards, JSON-LD (`ProfessionalService`),
  favicon SVG, `robots.txt`, `netlify.toml` con headers de seguridad.

## Verificación rápida

`npm run dev` y abre el navegador. Debe verse: header oscuro (wordmark +
4 ghost links + switch ES/EN + botón outlined), hero obsidiana con prisma
RGB tras el headline 136px, oferta de lanzamiento (banda graphite-veil),
servicios/proceso/precios como filas con hairlines, demo, sobre mí con
retrato en gris y contacto. Cambia el idioma con el switch y verifica que
todos los textos se traduzcan.