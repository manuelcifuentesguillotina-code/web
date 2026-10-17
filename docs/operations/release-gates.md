# Publicación de un commit verificado

Las reglas y autoridades están en la [sección 10.1 del README](../../README.md#101-publicaciones-completas-y-verificadas). Este documento explica su operación.

## Desarrollo y publicación

1. Trabajar en una rama de cambio. Un movimiento de carpetas incluye sus consumidores e imports en la misma etapa.
2. Crear el commit completo y enviar esa rama. GitHub Actions ejecuta la suite del repositorio en Linux desde una copia limpia.
3. Esperar el estado `check` satisfactorio del SHA que se desea publicar.
4. Avanzar `main` al mismo SHA y enviarla a `origin`. El hook verifica ese commit en un directorio temporal; no usa los archivos pendientes del checkout.
5. Confirmar el estado de Vercel de esa revisión y verificar el dominio mediante el [procedimiento de despliegue](./vercel-deployment.md).

Para verificar manualmente una revisión:

```bash
pnpm release:verify HEAD
```

El comando no hace commits, merges ni pushes. Instala el lockfile del snapshot, ejecuta `pnpm check` y compila además con la configuración pública. Si falla, corregir y crear una nueva revisión; no omitir el hook para completar una publicación.

## Activar la protección en GitHub

Estado al incorporar este control: la API pública devuelve `protected: false` para `main`. El hook local está instalado; la protección remota sigue pendiente. La autenticación SSH disponible permite enviar código y no concede una sesión administrativa de la API.

La configuración revisable está en [.github/main-protection.json](../../.github/main-protection.json). Exige el check `check`, la actualización con la base y la aplicación a administradores; conserva historia lineal y rechaza force-push y eliminación. No añade una aprobación humana obligatoria.

Un administrador puede aplicarla desde un GitHub CLI autenticado para este repositorio:

```bash
gh api --method PUT 'repos/{owner}/{repo}/branches/main/protection' \
  --input .github/main-protection.json
gh api 'repos/{owner}/{repo}/branches/main/protection'
```

La cuenta debe corresponder al repositorio acordado; no se reutiliza el perfil de otros proyectos. La respuesta debe confirmar `required_status_checks`, `enforce_admins` y las prohibiciones configuradas. También puede configurarse en **Settings → Branches → Add branch protection rule**, seleccionando `main`, el check `check`, actualización obligatoria e inclusión de administradores.

La API exige permisos de administración de escritura: [documentación de protección de ramas](https://docs.github.com/en/rest/branches/branch-protection#update-branch-protection). La política de estado requerido se explica en [ramas protegidas](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches).
