# Desktop Portfolio — Style Reference
> escritorio retro, portafolio interactivo de David Agudelo

**Theme:** full color (excepción lúdica al monocromo de `DESIGN.md`)

El escritorio es una vista interactiva a pantalla completa que abre desde el
botón "Ver portafolio interactivo" de la sección Sobre mí. Recrea un sistema
operativo moderno con estética **Windows 11 (dock DockLike, ventanas mica)**:
dock flotante con menú Inicio, ventanas acrílicas con controles modernos
(minimizar, maximizar, cerrar), fondo de fotos animado (gato en el campo),
cuadrícula de íconos que abren ventanas con contenido real, widgets
transparentes y notificaciones tipo toast. Es la única zona del sitio donde
el color se libera — el resto de la vitrina sigue el sistema Vivid+Co de
`DESIGN.md`.

## Estilo visual

- **Fondo:** secuencia animada de fotos del gato en el campo. Una sola
  **WebP animada directa** (`public/cat_bg/cat_bg.webp`, 26 fotogramas de
  1280×720 a 200ms c/u → ~5s, loop infinito) reproducida con un `<img>`
  nativo — sin JavaScript de fusión; con `prefers-reduced-motion` se muestra
  el fotograma estático (`cat_static.webp`). Sin imágenes externas ni CDNs.
  La animación se genera desde `cat_bg/ezgif-frame-001.png…026.png` con
  `npm run catbg` (ffmpeg, ~1.6 MB).
- **Tipografía:** base original — Inter 400/700, lh 1.5, grid de espaciado 4px (`.desktop-base` sobreescribe `--spacing` a 4px y lh a 1.5; el sistema Suisse/Anton del landing NO aplica aquí).
- **Estética:** minimalista, sombras suaves, bordes redondeados.
- **Taskbar (estilo DockLike, Windows 11):** dock **flotante y centrado** con
  efecto acrílico (glass: `bg-white/60` + `backdrop-blur-xl`, borde blanco,
  esquinas `rounded-2xl`), botón Inicio con el logo de 4 paneles, apps con
  **íconos reales a color** (sin tiles) en píldoras de hover, indicador de
  línea azul para apps corriendo/activas, separador, tech stack, y la
  **bandeja en una píldora separada** a la derecha (LinkedIn + reloj
  fecha/hora + ✕ para salir).
- **Efectos:** glassmorphism en paneles y widgets (fondos translúcidos con
  blur).
- **Animaciones:** la WebP animada del fondo (200ms por fotograma, ~5s en
  loop infinito), transiciones suaves en hover, entrada de notificaciones
  (`notif-in`, 0.25s), burbujas del mockup de chat (`chat-in`) y de
  ventanas. Con `prefers-reduced-motion` el fondo usa el fotograma estático.

## Estructura general

### 1. Taskbar inferior (reemplaza menubar y dock)
- **Contenido:** botón **Inicio** (logo Windows 4 paneles RGB) · apps
  (Explorador de archivos, Email, WhatsApp, GitHub, LinkedIn) · separador ·
  tech stack (Laravel, React, SQL, n8n, OpenAI, WhatsApp) · bandeja en
  píldora separada: LinkedIn, reloj con **fecha y hora en vivo**, ✕ salir.
- **Íconos reales:** glifos oficiales de **Simple Icons** (`icons.tsx`,
  `BrandIcon`): Gmail, WhatsApp, GitHub, LinkedIn, Spotify, Laravel, React,
  MySQL, n8n y OpenAI — sin interpretaciones lucide; el Explorador usa un
  glifo plano de carpeta ámbar (`FolderGlyph`, `IconArt.tsx`) y la música el
  logo real de Spotify.
- **Menú Inicio:** header con nombre y rol, ítems (Explorador de archivos,
  Proyectos, Demo, Acerca de este escritorio), separador y **Apagar** (rojo).
  Se ancla sobre el dock.
- **Estados:** app corriendo = píldora translúcida + línea azul fina bajo el
  ícono; app activa (ventana con mayor z-index, sin minimizar) = píldora más
  clara + línea azul sólida; hover = elevación del ícono (lift + scale).
- **Componente:** `src/components/desktop/Taskbar.tsx`.

### 2. Sección de perfil
- **Ubicación:** superior izquierda (alineado a la izquierda).
- **Elementos:** avatar circular (foto en gris, `src/assets/foto-perfil.jpg`)
  y una **tarjeta glass** con título `FULL-STACK · AUTOMATIZACIÓN E IA` y la
  descripción en **texto oscuro** (`#374151`/#`1f2937` sobre `bg-white/45` +
  blur, legible sobre el fondo claro), más el enlace `MÁS SOBRE MÍ →` que
  abre el CV.
- **Componente:** `src/components/desktop/ProfileSection.tsx`.

### 3. Escritorio — carpetas listadas a la izquierda (estilo clásico)
Carpetas **ámbar** con el diseño 3D de capas (`FolderArt`, `IconArt.tsx`):
hoja trasera con pestaña, 3 páginas zinc y frente con gradiente
ámbar; al pasar el cursor se **abanican** (rotateX por capa) con
profundidad de perspectiva. Columna vertical a la izquierda que envuelve en
más columnas cuando falta altura. Cada carpeta abre una ventana:

| Ícono | Representa | Abre |
|-------|-------------|------|
| Carpeta ámbar | Proyectos | Notas de los proyectos reales (del i18n del Finder) |
| Carpeta ámbar | Notas y bocetos | Perfil, método y habilidades |
| Carpeta ámbar | Publicaciones | Enlaces reales a LinkedIn y GitHub |
| Carpeta ámbar | Perfil / CV | Ventana Explorer con carpetas del CV |
| Carpeta ámbar | Demo | Mockup del bot en WhatsApp (conversación realista: cotización → diagnóstico gratis → cita) + video `demo.mp4` si existe, con CTA de WhatsApp |
| Carpeta ámbar | Galería | Imágenes de proyectos de `public/gallery/` (el nombre del archivo es el link, ej. `byexlot.com.png` → `https://byexlot.com`); clic abre el proyecto |

**Componente:** `src/components/desktop/DesktopIcons.tsx` + ventanas
(`InfoWindow`, `FinderWindow`, `PublicationsWindow`, `DemoWindow`).

### 4. Panel lateral izquierdo
- Etiqueta vertical `DA.` · tres íconos circulares: WhatsApp, GitHub,
  LinkedIn.
- **Componente:** `src/components/desktop/LeftPanel.tsx`. Oculto en móvil.

### 5. Panel lateral derecho (widgets)
Módulos glassmorphism en una columna de 320px, ocultos en móvil. **Reloj y
clima van en la misma fila** (dos columnas) y el reproductor ocupa el ancho
completo debajo:
1. **Reloj:** tarjeta glassmorphism con ícono de reloj y título, hora grande
   en negrita (24px, con segundos) y fecha debajo, en vivo.
2. **Clima · Medellín (estilo Google Weather):** círculo con gradiente según
   el estado real (despejado/nublado/lluvia/nieve/tormenta/niebla), temperatura
   grande y condición; **datos reales de Open-Meteo** (sin API key);
   fallback "Sin datos" si falla la red.
3. **Música:** cabecera "Reproduciendo ahora" (Now Playing) + reproductor
   **embebido de Spotify** (iframe de 352px: playlist completa con carátula,
   título, artista y todos los controles; playlist real del usuario en
   `SITE.spotifyPlaylist`) + enlace "Abrir en Spotify" debajo del listado.

**Componente:** `src/components/desktop/Widgets.tsx`.

### 6. Notificaciones de precios (toast estilo Windows 11)
- Primera a los ~6s; luego cada 25–45s aleatorios; visible ~5s y se oculta
  sola (o con su ✕).
- Mensajes de precios reales de la vitrina (oferta de lanzamiento,
  diagnóstico $0, retainer, proyectos, desarrollo a la medida) vía i18n
  (`desktop.notifications.messages`).
- **Diseño:** tarjeta acrílica (blur + blanco translúcido), esquinas
  `rounded-2xl`, ícono Sparkles en círculo azul, título + mensaje y ✕.
- **Ubicación:** abajo a la derecha, sobre la bandeja del dock.

### 7. Demo del bot (mockup de WhatsApp)
- En la ventana **Demo**, el mockup es el contenido principal **siempre
  visible**: chat de WhatsApp con el bot de David — reloj/estado, cabecera
  con avatar (foto local `foto-perfil.jpg`) y "BOT IA · en línea", aviso de
  cifrado extremo a extremo, burbujas de conversación y doble check azul.
- **Conversación realista de la demo** (i18n `desktop.demoChat.messages`):
  un cliente escribe a las 11:47 p. m. → el bot responde al instante con las
  opciones reales (bot desde $1.9M, diagnóstico $0, retainer desde
  $500K/mes) → el cliente elige el diagnóstico → el bot pregunta el rubro y
  agenda la cita. 7 mensajes en secuencia con 3 fases de "escribiendo…"
  (CSS puro: keyframes `chat-in`, `typing-dot`, `mockup-in`; sin librerías
  de animación ni imágenes externas).
- Debajo: descripción corta y CTA "Ver demo en vivo (gratis)" → WhatsApp.
- Si algún día existe `demo.mp4`, se muestra debajo del mockup.
- **Componente:** `src/components/desktop/ChatMockup.tsx` + `DemoWindow.tsx`.

## Comportamiento funcional

- **Framework:** React + TypeScript + Tailwind CSS v4 (sin Framer Motion, sin
  dependencias nuevas).
- **Ventanas:** multi-ventana simultánea, foco por clic (z-index, marco
  acrílico claro: activa = `bg-white/90` + sombra fuerte; inactiva =
  `bg-white/70` + sombra suave), **cabecera gris oscurecida**
  (`bg-gray-200/80` activa, `bg-gray-200/50` inactiva) para diferenciarla del
  cuerpo, minimizar, maximizar (doble clic en la
  barra o botón ▢, ocupa el escritorio sobre el dock, sin redondeo),
  cerrar (✕ rojo al hover), arrastre con pointer events.
- **Cierre:** ✕ de la ventana (arreglado con `stopPropagation` en el
  `pointerdown` de los botones — el `setPointerCapture` del arrastre no roba
  el clic), ✕ de la taskbar, menú Inicio → Apagar, o tecla ESC; lock de
  scroll del fondo.
- **Restaurar:** una ventana minimizada se recupera desde su botón en la
  taskbar.
- **Responsive:** desktop-first; paneles laterales ocultos en móvil; tech
  stack de la taskbar oculto en <768px.
- **Contenido:** todo el texto en i18n (`desktop.*` en `es.json`/`en.json`);
  enlaces con `rel="noreferrer"` y pestaña nueva.

## Reglas

- Sin imágenes externas (ni CDNs ni Unsplash): el fondo usa fotos locales
  optimizadas (`public/cat_bg/`) y los íconos/notas son código e i18n. El
  embed de Spotify es un iframe oficial (requiere internet), no una imagen.
- Fondo regenerable: `npm run catbg` lee los fotogramas `cat_bg/ezgif-frame-*.png`
  y genera con ffmpeg (libwebp, 1280×720, q75) la animación directa
  `public/cat_bg/cat_bg.webp` (200ms/fotograma, ~5s, loop infinito) y el
  estático `cat_static.webp`; también limpia los PNG sobrantes de `public/cat_bg/`.
- Galería automática: las imágenes de `public/gallery/` se listan solas
  en la ventana Galería (módulo virtual `virtual:gallery` del `vite.config.ts`);
  el link se lee del nombre del archivo (`dominio.png` → `https://dominio`).
  Al agregar una imagen, reinicia el servidor de desarrollo.
- Sin datos falsos: clima real con fallback elegante, música sin canción
  inventada, notificaciones con precios reales de la vitrina.
- El escritorio solo existe como overlay: al cerrarlo, la vitrina vuelve a
  Vivid+Co sin rastro del tema.
- `prefers-reduced-motion` respetado (nubes, notificaciones y ventanas).
- Datos de contacto reales: WhatsApp `304 671 0563`, email
  `david.agudelo.valencia@gmail.com`, LinkedIn
  `/in/david-agudelo-valencia`, GitHub en `SITE.github`.