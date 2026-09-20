# Web de Lara Borrego

Web estática (HTML, CSS y JS sin compilación) con cuatro páginas:

- `/` inicio
- `/google-ads-granada/`
- `/meta-ads-granada/`
- `/consultora-paid-media-granada/`

## ANTES DE PUBLICAR: poner tu dominio
Las etiquetas canonical, Open Graph, los datos estructurados y el `sitemap.xml` llevan la dirección provisional `https://TUDOMINIO.com`.
Sustitúyela en todos los archivos por tu dirección real (por ejemplo `https://www.laraborrego.com`, o mientras tanto `https://TU-USUARIO.github.io/web-lara-borrego`).
Archivos afectados: `index.html`, las tres carpetas de servicio, `sitemap.xml` y `robots.txt`.

## Publicar con GitHub Pages
1. Sube el contenido de esta carpeta a la raíz de un repositorio público.
2. Settings > Pages > Source: "Deploy from a branch" > rama `main`, carpeta `/ (root)`.
3. Dominio propio: Settings > Pages > Custom domain y activa "Enforce HTTPS".
   DNS: cuatro registros A a `185.199.108.153`, `185.199.109.153`, `185.199.110.153` y `185.199.111.153`, y un CNAME de `www` a `TU-USUARIO.github.io`.

## Después de publicar
- Da de alta la web en Google Search Console y envía `sitemap.xml`.
- Crea el Perfil de Empresa de Google como negocio de área de servicio (sin mostrar dirección).
- Añade tu perfil de LinkedIn en el bloque `sameAs` de los datos estructurados de `index.html`.

## Formulario de contacto
Guarda los mensajes en la tabla `contactos` de Supabase (proyecto `web-lara-borrego`). La clave incluida en `assets/main.js` es la clave pública (publishable): es segura porque la tabla solo permite insertar.
