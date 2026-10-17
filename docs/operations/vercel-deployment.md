# Despliegue en Vercel y conexión con NIC Chile

Procedimiento operativo. Las autoridades de configuración y contenido siguen definidas en [el README](../../README.md); este documento no mantiene otra copia del teléfono ni del catálogo.

## Línea de operación de este proyecto

| Parte | Destino acordado | Verificación |
| --- | --- | --- |
| Código | `manuelcifuentesguillotina-code/web`, rama `main` | Remoto `origin` del checkout; autenticación SSH verificada con esa cuenta. |
| Alojamiento | [Proyecto `corte7/web` en Vercel](https://vercel.com/corte7/web) | La captura del usuario muestra un despliegue `Ready` del commit `3ef728c`. |
| Dominio | Hostname del origen canónico de `publication-config.ts` | Se conecta al proyecto anterior; la administración en NIC Chile conserva su titularidad independiente. |

Las operaciones de este proyecto usan esa línea. Los perfiles de otros proyectos se mantienen separados. La integración de GitHub del chat es una conexión independiente: antes de utilizarla para esta web se comprueba que su identidad y acceso correspondan al repositorio. Mientras esté conectada a otra cuenta, se utiliza Git local, cuya autenticación ya se verificó.

La vista **My contributions** de GitHub aplica un filtro de contribuciones y no acredita la ausencia del repositorio. Para localizarlo se usa **My repositories** o su URL directa.

## Acceso al repositorio

El repositorio que se importa es el configurado en `git remote get-url origin`. Comprobar el propietario y la cuenta de GitHub conectada a Vercel si no aparece en la lista. Para repositorios de cuentas personales, Vercel requiere que quien importe sea su propietario; el acceso como colaborador no basta. [Requisitos oficiales de acceso](https://vercel.com/docs/git/vercel-for-github#missing-git-repository).

La conexión local por SSH con GitHub no inicia sesión en Vercel ni concede permisos a otra cuenta de GitHub.

## Configuración del proyecto existente

1. Abrir el proyecto de Vercel indicado arriba y conservar su vinculación con `origin` y la rama `main`.
2. Comprobar el preset **Next.js** y la raíz del repositorio. La versión de Node debe corresponder con `engines.node` de `package.json`.
3. Conservar la detección del directorio de salida de Next.js. El comando de compilación es `pnpm build`; no usar una exportación estática ni cambiar el framework.
4. Comprobar las variables de entorno indicadas abajo y, si se modifican, ejecutar un nuevo despliegue.

| Variable | Entorno | Valor y autoridad |
| --- | --- | --- |
| `ENABLE_EXPERIMENTAL_COREPACK` | Production y Preview | `1`, para usar la versión exacta de pnpm declarada en `packageManager`. |
| `SITE_MODE` | Production | `public`, para generar metadatos indexables y exigir contacto confirmado. |
| `SITE_MODE` | Preview | `preview`, para mantener las revisiones fuera de indexación. |
| `SITE_ORIGIN` | Solo si cambia el origen | Origen canónico completo; el valor predeterminado ya vive en [publication-config.ts](../../src/composition/configuration/publication-config.ts). |

No añadir una variable de teléfono. Su autoridad es [company.ts](../../src/contexts/commercial-presence/infrastructure/content/company.ts).

Vercel documenta la activación de Corepack en [configuración de compilación](https://vercel.com/docs/builds/configure-a-build#corepack). Usar un plan adecuado para el uso comercial confirmado; [Hobby está limitado a proyectos personales no comerciales](https://vercel.com/docs/plans/hobby).

## Conectar el dominio

1. En el proyecto desplegado, abrir **Settings → Domains** y añadir el hostname del origen canónico. Añadir también su variante `www` y redirigirla al hostname canónico.
2. En NIC Chile, abrir **Modificar dominio → Configuración técnica → Servidores DNS**.
3. Añadir `ns1.vercel-dns.com` en **Nombre de Servidor** y pulsar **Agregar Servidor de Nombre**.
4. Repetir con `ns2.vercel-dns.com` y guardar mediante **Actualizar datos de dominio**.
5. Volver a Vercel y comprobar el estado del dominio y el certificado HTTPS. La delegación y la propagación DNS pueden requerir tiempo; registrar servidores no acredita que ya esté sirviendo el sitio.

Los servidores publicados por Vercel se consultan en [Working with nameservers](https://vercel.com/docs/domains/working-with-nameservers). NIC Chile explica su función en [Servidor de nombres](https://www.nic.cl/ayuda/faq/ins-05.html).

## Verificar y cambiar el contacto

- Abrir la portada y una landing de producto desde el dominio definitivo; comprobar HTTPS, metadatos canónicos y enlace de WhatsApp con producto y beneficio correctos.
- Una verificación del enlace no demuestra que exista una cuenta de WhatsApp en ese número ni que se haya enviado un mensaje.
- Para reemplazar el contacto provisional, modificar únicamente `company.phone`, ejecutar `pnpm check` y publicar esa revisión del repositorio. Las landings se recompilan; el número desplegado sigue vigente hasta ese nuevo despliegue.
- Las modificaciones de variables de entorno también requieren un nuevo despliegue para actualizar el HTML prerenderizado.

## Estado

La autenticación SSH y el remoto de GitHub están verificados. El usuario aportó una captura del proyecto de Vercel con estado `Ready` y el commit señalado arriba. La fuente de contacto contiene un número provisional autorizado. La conexión del dominio y sus DNS, así como las variables del proyecto alojado, siguen pendientes de verificación; la captura no acredita esos estados.
