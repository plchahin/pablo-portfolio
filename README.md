# Portfolio de Pablo Chahin — versión propia

Réplica del layout de tu Squarespace, lista para alojar gratis en Netlify y editar sin tocar código desde `/admin`.

## Estructura

- `index.html` + `css/style.css` + `js/main.js` — el sitio en sí.
- `content/site.json` — todos los textos, links e imágenes. Esto es lo que vas a editar.
- `admin/` — panel de edición (Decap CMS).
- Las fotos de la galería y tu foto de perfil apuntan directamente a las URLs de tu Squarespace actual (son públicas, así que funcionan sin copiarlas). Los videos no se pudieron extraer de Squarespace (se sirven como streaming privado), así que quedaron como bloques "video pendiente" — los agregás vos desde el panel de edición subiendo un .mp4 o pegando un link de YouTube/Vimeo.

## Paso 1 — Crear cuenta en GitHub (si no tenés)

1. Andá a github.com y creá una cuenta gratis.
2. Creá un repositorio nuevo (por ejemplo `pablo-portfolio`), público o privado, sin ningún archivo inicial.

## Paso 2 — Subir estos archivos al repositorio

La forma más simple: en la página del repo en GitHub, usá "Add file → Upload files" y arrastrá toda esta carpeta (manteniendo la estructura de subcarpetas `css/`, `js/`, `content/`, `admin/`).

## Paso 3 — Conectar con Netlify

1. Entrá a netlify.com y creá una cuenta gratis (podés usar tu cuenta de GitHub para entrar).
2. "Add new site" → "Import an existing project" → elegí GitHub → seleccioná el repositorio.
3. Dejá "Build command" vacío y "Publish directory" como `.` (la raíz). Deploy.
4. Netlify te da un dominio gratis tipo `tunombre.netlify.app`. Desde Site settings podés cambiar ese subdominio o conectar un dominio propio si comprás uno.

## Paso 4 — Activar el panel de edición (`/admin`)

1. En Netlify, andá a **Site configuration → Identity** y activá Identity.
2. En Identity → Registration, dejá "Invite only" (así solo vos podés entrar).
3. En Identity → Services, activá **Git Gateway**.
4. En Identity → Invite users, invitate a tu propio email (plchahin@gmail.com). Te va a llegar un mail para poner contraseña.
5. Entrá a `tusitio.netlify.app/admin` con esos datos y ya podés editar textos, fotos y videos desde ahí — cada cambio se guarda directo en el repositorio y el sitio se actualiza solo.

## Notas

- Como el sitio no usa un generador de páginas (Hugo, Eleventy, etc.), los cambios que hagas en `/admin` se ven apenas recargás la página — no hace falta esperar un build.
- Si querés previsualizar el sitio en tu computadora antes de subirlo, no lo abras haciendo doble clic en `index.html` (el navegador bloquea la carga de `content/site.json` en modo archivo local). Corré esto en la carpeta del proyecto desde una terminal:
  ```
  python3 -m http.server 8000
  ```
  y abrí `http://localhost:8000` en el navegador.
- Los "click to see" del carrusel de proyectos (Desmadre, Tecno-key, MOV®) hoy apuntan a `#`. Cuando tengas las páginas o videos de cada proyecto, actualizá el campo "Link" de cada uno desde `/admin`.
