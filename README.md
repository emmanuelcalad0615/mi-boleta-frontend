# ¿Y si sí me lo gané? — Mi Boleta

Frontend para administrar boletas, rifas, loterías y sorteos, con verificación de resultados en tiempo real contra el portal de datos abiertos de Colombia.

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router) |
| Lenguaje | TypeScript (strict) |
| Estado servidor | TanStack Query v5 |
| Estado UI/auth | Zustand v5 + persist |
| HTTP | Axios + interceptores |
| Formularios | React Hook Form + Zod v4 |
| Estilos | Tailwind CSS v4 |
| Animaciones | Framer Motion |
| Íconos | Lucide React |
| Notificaciones | React Hot Toast |
| Fechas | date-fns |
| Tests | Vitest + React Testing Library |

## Arquitectura (Clean Architecture)

```
src/
├── domain/          # Entidades, repos (interfaces), errores, value-objects
├── application/     # Ports, DTOs, use cases
├── infrastructure/  # httpClient, datosGovClient, repos HTTP, storage, DI container
└── presentation/    # Stores, hooks, components, guards, providers
app/                 # Páginas (Next.js App Router)
```

**Regla de dependencias:** `domain` ← `application` ← `infrastructure` ← `presentation` ← `app`

Dos clientes HTTP completamente separados:
- `httpClient` — backend propio (`mi-boleta-api`), con interceptores de auth y redirect a `/login`
- `datosGovClient` — API pública de `datos.gov.co` (Socrata), sin auth, sin interceptores

## Variables de entorno

```env
# Backend propio
NEXT_PUBLIC_API_BASE_URL=https://mi-boleta-api-y9dv.onrender.com/api/v1

# API de datos abiertos (Socrata)
NEXT_PUBLIC_DATOS_GOV_BASE_URL=https://www.datos.gov.co
NEXT_PUBLIC_DATOS_GOV_LOTTERY_DATASET_ID=i3kx-3zps

# Opcional — sube rate limit de Socrata (server-side only, sin NEXT_PUBLIC_)
DATOS_GOV_APP_TOKEN=
```

Copiar `.env.example` a `.env.local` y completar. No commitear `.env.local`.

## Cómo correr

```bash
npm install
npm run dev        # http://localhost:3000
```

## Scripts

```bash
npm run dev        # servidor de desarrollo
npm run build      # build de producción
npm run start      # servidor de producción
npm run typecheck  # verificación de tipos
npm run lint       # ESLint
npm run test       # Vitest (watch)
npm run test:run   # Vitest (single run)
```

## Páginas

| Ruta | Descripción | Auth |
|---|---|---|
| `/login` | Inicio de sesión | Pública |
| `/register` | Registro de usuario | Pública |
| `/dashboard` | Stats + próximos sorteos + pendientes | Requiere login |
| `/tickets` | Lista CRUD con filtros y paginación | Requiere login |
| `/tickets/new` | Crear boleta | Requiere login |
| `/tickets/[id]` | Detalle + verificar resultado | Requiere login |
| `/tickets/[id]/edit` | Editar boleta | Requiere login |
| `/resultados` | Últimos resultados de loterías (datos.gov.co) | Requiere login |
| `/admin` | Panel admin — todos los tickets | Requiere `role=admin` |

## Integración de resultados (datos.gov.co)

La página `/resultados` y el botón "Verificar resultado" en el detalle de cada ticket consumen la API pública [Socrata Open Data API](https://dev.socrata.com/) de Colombia.

- **Dataset:** `i3kx-3zps` — resultados históricos de loterías colombianas
- **Endpoint:** `https://www.datos.gov.co/resource/i3kx-3zps.json`
- **Sin autenticación** para lectura (rate limit ~1000 req/h por IP). Con `DATOS_GOV_APP_TOKEN` el límite es mayor.
- La verificación es **solo lectura** — nunca muta el estado del ticket automáticamente. El usuario decide.

Datasets alternativos disponibles:
- Lotería de Bogotá: `h5dm-9t39`
- Lotería Santander: `4zwu-ra3f`

## API

Backend desplegado: `https://mi-boleta-api-y9dv.onrender.com/api/v1`

Para acceder al panel `/admin`, un usuario debe tener `role = 'admin'`. Promover vía SQL en la DB del backend:

```sql
UPDATE users SET role = 'admin' WHERE email = 'tu@email.com';
```
