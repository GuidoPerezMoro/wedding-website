# Web boda — Mili & Guido · 12.12.2027

Sitio de casamiento en Next.js 15 (App Router) + TypeScript + Tailwind CSS v4.

## Primeros pasos

```bash
npm install                  # instala dependencias (solo la primera vez)
cp .env.example .env.local   # completá con los valores reales
npm run dev                  # levanta el sitio en http://localhost:3000
```

Otros comandos:

```bash
npm run build           # build de producción (lo que corre Vercel)
npm run lint            # ESLint
npm run format          # Prettier sobre todo el proyecto
npm run generate-codes  # genera códigos hex para la lista de invitados
```

## Estructura

- `lib/wedding-data.ts` — todos los datos del evento (fecha, lugares, etc.). Los `TODO:` marcan placeholders a completar.
- `lib/guests.ts` — carga la lista de invitados. Solo se lee del lado del servidor.
- `components/` — una sección por archivo. `Landing.tsx` las ensambla.
- `app/i/[code]/` — página personalizada por invitado (ej. `/i/a3f9`).
- `app/api/rsvp/` — recibe el formulario. Por ahora loguea en consola del servidor; próximo paso: Google Sheets.

## Datos sensibles (repo público)

Teléfono, alias/CBU y la lista real de invitados **no se versionan**: viven en
variables de entorno (`.env.local` en dev, Environment Variables en Vercel).
Ver `.env.example`. Igual quedan visibles en el sitio deployado — es la idea,
los invitados los necesitan — pero no en el historial de git.

Para actualizar la lista de invitados: editá `NAMES` en `scripts/generate-codes.mjs`,
corré `npm run generate-codes`, pegá el `GUESTS_JSON` resultante en `.env.local`
y en Vercel, y redeployá (Deployments → ⋯ → Redeploy).

## Códigos de invitados (prueba)

| Código | Invitado           |
| ------ | ------------------ |
| `a3f9` | Juan Pérez         |
| `7c21` | Ana y Martín       |
| `e04b` | Familia Rodríguez  |
| `1d8e` | Sofía González     |
| `b652` | Caro y Lucas       |

Probá `http://localhost:3000/i/7c21` para ver la versión personalizada.

## Deploy en Vercel

1. Subí el repo a GitHub.
2. En [vercel.com](https://vercel.com) → Add New Project → importá el repo. Detecta Next.js solo, no hay que configurar nada.
3. Cada `git push` a `main` deploya automáticamente.
