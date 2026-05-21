# Plan: Frontend "¿Y si sí me lo gané?" — Next.js 15 + Clean Architecture

## Contexto

La API REST `mi-boleta-api` ya existe y está documentada en `mi-boleta-api/readme.md` y `mi-boleta-api/docs/rubrica.md`. Esta práctica individual (entrega 21-mayo-2026, 15% de la nota final) consiste en construir el **frontend completo** que consume esa API. La rúbrica suma 100 puntos repartidos en 11 criterios (auth, CRUD, dashboard, admin, validaciones, diseño/UX, arquitectura, consumo de API, routing/protección, calidad de código, despliegue) + hasta 10 puntos extra por bonus (tests, dark mode, i18n, etc.).

**Meta**: 100/100 + bonus de tests (+5). El frontend debe estar perfectamente alineado con el contrato de la API (que ya estudiamos) y debe demostrar Clean Architecture rigurosa: dominio puro, application con casos de uso, infrastructure con adapters HTTP/storage, y presentation con React.

**Stack confirmado**: Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + Zustand + TanStack Query + React Hook Form + Zod + Axios + Vitest + React Testing Library.

---

## Ubicación del proyecto

Crear como carpeta hermana de la API:

```
Practica-frontend/
├── mi-boleta-api/        ← ya existe
└── mi-boleta-web/        ← NUEVO, se crea aquí
```

Comando de inicialización (desde `Practica-frontend/`):

```bash
npx create-next-app@latest mi-boleta-web --typescript --tailwind --app --eslint --src-dir --import-alias "@/*" --use-npm --no-turbopack
cd mi-boleta-web
npm install zustand @tanstack/react-query @tanstack/react-query-devtools axios react-hook-form zod @hookform/resolvers date-fns
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/node
```

---

## Stack y por qué

| Capa | Librería | Razón |
|---|---|---|
| Framework | Next.js 15 App Router | Pedido del usuario; provee routing, layouts, middleware nativo, y deploy en Vercel trivial. |
| Lenguaje | TypeScript estricto | Rúbrica criterio 7 penaliza `any`. |
| Estado servidor | TanStack Query v5 | Cache, refetch automático tras mutaciones (CRUD listado), evita refetch manual (criterio 2). |
| Estado UI/auth | Zustand + `persist` middleware | Persistencia de token en localStorage (criterio 1) sin Context boilerplate. |
| HTTP | Axios + interceptores | Inyecta `Authorization` y redirige en 401 globalmente (criterio 8). |
| Forms | React Hook Form + Zod + `@hookform/resolvers` | Validación cliente que **espeja exactamente** los validators del backend (criterio 5). |
| Estilos | Tailwind CSS v4 | Responsive mobile-first rápido, sistema de tokens (criterio 6). |
| Fechas | `date-fns` + `<input type="datetime-local">` | Conversión a ISO 8601 antes de enviar. |
| Tests | Vitest + RTL + jsdom | Bonus +5 pts. Cubre use-cases y formularios críticos. |

---

## Estructura de carpetas (Clean Architecture)

```
mi-boleta-web/
├── public/
├── src/
│   ├── domain/                              # Núcleo puro, sin dependencias externas
│   │   ├── entities/
│   │   │   ├── User.ts                      # User, PublicUser, UserRole
│   │   │   └── Ticket.ts                    # Ticket, GameType, TicketStatus, constantes
│   │   ├── repositories/
│   │   │   ├── AuthRepository.ts            # interface
│   │   │   ├── TicketRepository.ts          # interface
│   │   │   └── AdminTicketRepository.ts     # interface
│   │   ├── value-objects/
│   │   │   └── Pagination.ts                # PaginationMeta, PaginatedResult<T>
│   │   └── errors/
│   │       ├── DomainError.ts               # base
│   │       ├── UnauthorizedError.ts
│   │       ├── ForbiddenError.ts
│   │       ├── NotFoundError.ts
│   │       ├── ConflictError.ts
│   │       └── ValidationError.ts
│   │
│   ├── application/                         # Casos de uso (orquestan dominio + puertos)
│   │   ├── ports/
│   │   │   ├── TokenStorage.ts              # interface (getToken/setToken/clear)
│   │   │   └── SessionStorage.ts            # interface (almacena PublicUser)
│   │   ├── dtos/
│   │   │   ├── auth.dto.ts                  # RegisterInput, LoginInput, LoginResult
│   │   │   └── tickets.dto.ts               # CreateTicketInput, UpdateTicketInput, TicketFilters, AdminTicketFilters
│   │   └── usecases/
│   │       ├── auth/
│   │       │   ├── RegisterUser.ts
│   │       │   ├── LoginUser.ts
│   │       │   ├── LogoutUser.ts
│   │       │   └── GetCurrentSession.ts
│   │       └── tickets/
│   │           ├── ListTickets.ts
│   │           ├── GetTicketById.ts
│   │           ├── CreateTicket.ts
│   │           ├── UpdateTicket.ts
│   │           ├── DeleteTicket.ts
│   │           └── ListAllTicketsAdmin.ts
│   │
│   ├── infrastructure/                      # Adapters concretos
│   │   ├── config/
│   │   │   └── env.ts                       # lee NEXT_PUBLIC_API_BASE_URL
│   │   ├── http/
│   │   │   ├── httpClient.ts                # axios.create + interceptores
│   │   │   ├── errors.ts                    # mapApiError(axiosError) → DomainError
│   │   │   └── types.ts                     # ApiSuccess<T>, ApiError
│   │   ├── repositories/
│   │   │   ├── HttpAuthRepository.ts
│   │   │   ├── HttpTicketRepository.ts
│   │   │   └── HttpAdminTicketRepository.ts
│   │   ├── storage/
│   │   │   ├── LocalTokenStorage.ts         # implementa TokenStorage
│   │   │   └── LocalSessionStorage.ts
│   │   └── di/
│   │       └── container.ts                 # composition root: instancia repos + use-cases
│   │
│   ├── presentation/                        # React (UI)
│   │   ├── providers/
│   │   │   ├── QueryProvider.tsx            # QueryClientProvider + devtools
│   │   │   └── AuthProvider.tsx             # bootstrap: hidrata zustand desde storage
│   │   ├── stores/
│   │   │   └── authStore.ts                 # zustand: token, user, setSession, clearSession
│   │   ├── hooks/
│   │   │   ├── useAuth.ts                   # selectors + acciones (login, register, logout)
│   │   │   ├── useTickets.ts                # useQuery + useMutations (list/create/update/delete)
│   │   │   ├── useTicket.ts                 # useQuery ticket por id
│   │   │   ├── useAdminTickets.ts           # useQuery con filtros admin
│   │   │   └── useDebouncedValue.ts         # utilitario para búsqueda
│   │   ├── components/
│   │   │   ├── ui/                          # primitivos
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   ├── Textarea.tsx
│   │   │   │   ├── Select.tsx
│   │   │   │   ├── Label.tsx
│   │   │   │   ├── FieldError.tsx
│   │   │   │   ├── Badge.tsx                # color por status
│   │   │   │   ├── Modal.tsx                # confirmación de delete
│   │   │   │   ├── Spinner.tsx
│   │   │   │   ├── EmptyState.tsx
│   │   │   │   └── Alert.tsx                # error/success toast inline
│   │   │   ├── forms/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── RegisterForm.tsx
│   │   │   │   └── TicketForm.tsx           # crea y edita
│   │   │   ├── tickets/
│   │   │   │   ├── TicketCard.tsx
│   │   │   │   ├── TicketsList.tsx
│   │   │   │   ├── TicketFilters.tsx        # status, gameType, q
│   │   │   │   └── Pagination.tsx
│   │   │   ├── dashboard/
│   │   │   │   ├── StatCard.tsx
│   │   │   │   ├── UpcomingDraws.tsx
│   │   │   │   ├── PendingTickets.tsx
│   │   │   │   └── HistoryPreview.tsx
│   │   │   └── layout/
│   │   │       ├── Navbar.tsx               # logo, links, menú usuario, logout
│   │   │       ├── Sidebar.tsx              # opcional desktop
│   │   │       ├── Container.tsx
│   │   │       └── ProtectedShell.tsx
│   │   ├── guards/
│   │   │   ├── RequireAuth.tsx              # client component: redirige a /login
│   │   │   └── RequireAdmin.tsx             # redirige a / si role !== 'admin'
│   │   └── lib/
│   │       ├── cn.ts                        # clsx + tailwind-merge
│   │       ├── formatters.ts                # formatDate, formatCurrency
│   │       └── validation/
│   │           ├── auth.schemas.ts          # Zod: registerSchema, loginSchema
│   │           └── ticket.schemas.ts        # Zod: ticketSchema (espeja CreateTicketDto)
│   │
│   └── app/                                 # Next.js App Router (capa de entrega)
│       ├── layout.tsx                       # html, providers, fonts
│       ├── page.tsx                         # redirige a /dashboard si auth, si no a /login
│       ├── globals.css                      # Tailwind + tokens
│       ├── not-found.tsx                    # 404 global
│       ├── (auth)/
│       │   ├── layout.tsx                   # layout centrado para auth
│       │   ├── login/page.tsx
│       │   └── register/page.tsx
│       └── (app)/
│           ├── layout.tsx                   # <RequireAuth><ProtectedShell>{children}
│           ├── dashboard/page.tsx
│           ├── tickets/
│           │   ├── page.tsx                 # lista + filtros
│           │   ├── new/page.tsx             # crear
│           │   └── [id]/
│           │       ├── page.tsx             # detalle
│           │       └── edit/page.tsx        # editar
│           └── admin/
│               ├── layout.tsx               # <RequireAdmin>
│               └── page.tsx                 # tabla con filtros y paginación
│
├── tests/
│   ├── application/
│   │   ├── LoginUser.test.ts
│   │   └── CreateTicket.test.ts
│   ├── components/
│   │   ├── LoginForm.test.tsx
│   │   └── TicketForm.test.tsx
│   └── setup.ts                              # jest-dom matchers
│
├── .env.example                              # NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api/v1
├── .env.local                                # gitignored
├── .gitignore
├── next.config.ts
├── tailwind.config.ts                        # tokens, breakpoints, dark mode
├── tsconfig.json                             # strict: true
├── vitest.config.ts
├── package.json
└── README.md                                 # cómo correr, screenshots, link demo
```

**Regla de dependencias** (validar manualmente al implementar):
- `domain/` no importa nada de las otras capas.
- `application/` solo importa de `domain/`.
- `infrastructure/` importa de `domain/` y `application/` (implementa sus interfaces).
- `presentation/` importa de `application/`, `domain/`, y de `infrastructure/di/container`.
- `app/` solo importa de `presentation/`.

---

## Contrato de la API (referencia rápida)

Base URL: `http://localhost:4000/api/v1` (configurable vía `NEXT_PUBLIC_API_BASE_URL`).

Todas las respuestas exitosas: `{ data: T, meta?: PaginationMeta }`. Todos los errores: `{ error: string }`. Token JWT en `Authorization: Bearer <token>` (expira 24h).

| Método | Path | Auth | Body / Query | Éxito |
|---|---|---|---|---|
| POST | `/auth/register` | público | `{ name, email, password }` | 201 `{ data: PublicUser }` |
| POST | `/auth/login` | público | `{ email, password }` | 200 `{ data: { token, user } }` |
| GET | `/tickets` | user | `?status&gameType&q&page&pageSize` | 200 `{ data: Ticket[], meta }` |
| GET | `/tickets/:id` | user | — | 200 `{ data: Ticket }` |
| POST | `/tickets` | user | `CreateTicketDto` | 201 `{ data: Ticket }` |
| PUT | `/tickets/:id` | user | parcial | 200 `{ data: Ticket }` |
| DELETE | `/tickets/:id` | user | — | 204 |
| GET | `/admin/tickets` | admin | `?status&gameType&q&userId&page&pageSize` | 200 `{ data: TicketWithOwner[], meta }` |

**Enums exactos** (mismas strings que el backend):
- `GameType`: `"Lotería" | "Rifa" | "Sorteo" | "Boleta" | "Juego ocasional"`
- `TicketStatus`: `"Pendiente" | "Ganado" | "Perdido"`
- `UserRole`: `"user" | "admin"`

**Códigos de error**: 400 (validación), 401 (token inválido), 403 (no admin), 404, 409 (email duplicado), 500.

**Pagination meta**: `{ total, page, pageSize, totalPages }`.

---

## Implementación paso a paso (Sonnet sigue este orden)

### Fase 0 — Bootstrap (5 min)

1. Ejecutar el `npx create-next-app` y los `npm install` de la sección "Ubicación".
2. Crear `.env.example` y `.env.local` con `NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api/v1`. Añadir `.env.local` al `.gitignore` (create-next-app ya lo hace).
3. En `tsconfig.json` verificar `"strict": true` y `"paths": { "@/*": ["./src/*"] }`.
4. Configurar `tailwind.config.ts`: incluir `darkMode: 'class'`, paleta custom (primario, success, warning, danger), `screens` por defecto.
5. En `app/globals.css`: `@import "tailwindcss";` + variables CSS de tokens (colores, radios, sombras).

### Fase 1 — Domain (sin dependencias)

Crear archivos en `src/domain/`:

`entities/Ticket.ts` — copiar exactamente del backend:
```ts
export const GAME_TYPES = ['Lotería', 'Rifa', 'Sorteo', 'Boleta', 'Juego ocasional'] as const;
export const TICKET_STATUSES = ['Pendiente', 'Ganado', 'Perdido'] as const;
export type GameType = (typeof GAME_TYPES)[number];
export type TicketStatus = (typeof TICKET_STATUSES)[number];

export type Ticket = {
  id: string;
  userId: string;
  title: string;
  gameType: GameType;
  gameNumber?: string | null;
  gameDate: Date;
  amount?: number | null;
  place?: string | null;
  status: TicketStatus;
  notes?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type TicketOwner = { id: string; name: string; email: string };
export type TicketWithOwner = Ticket & { owner: TicketOwner };
```

`entities/User.ts`:
```ts
export type UserRole = 'user' | 'admin';
export type PublicUser = { id: string; name: string; email: string; role: UserRole; createdAt: Date };
```

`value-objects/Pagination.ts`:
```ts
export type PaginationMeta = { total: number; page: number; pageSize: number; totalPages: number };
export type PaginatedResult<T> = { items: T[]; meta: PaginationMeta };
```

`errors/DomainError.ts` y subclases (`UnauthorizedError`, `ForbiddenError`, `NotFoundError`, `ConflictError`, `ValidationError`). Cada una recibe `message: string` y opcionalmente `details`.

`repositories/AuthRepository.ts`:
```ts
export interface AuthRepository {
  register(input: { name: string; email: string; password: string }): Promise<PublicUser>;
  login(input: { email: string; password: string }): Promise<{ token: string; user: PublicUser }>;
}
```

`repositories/TicketRepository.ts` con: `list(filters)`, `getById(id)`, `create(input)`, `update(id, partial)`, `delete(id)`.
`repositories/AdminTicketRepository.ts` con: `listAll(filters)`.

### Fase 2 — Application

`application/ports/TokenStorage.ts`:
```ts
export interface TokenStorage {
  get(): string | null;
  set(token: string): void;
  clear(): void;
}
```

`application/ports/SessionStorage.ts`: análogo para `PublicUser`.

`application/dtos/auth.dto.ts` y `tickets.dto.ts` con los inputs/outputs de cada use case.

`application/usecases/auth/RegisterUser.ts`:
```ts
export class RegisterUser {
  constructor(private repo: AuthRepository) {}
  execute(input: RegisterInput): Promise<PublicUser> {
    return this.repo.register(input);
  }
}
```

Análogos: `LoginUser` (además llama `tokenStorage.set` y `sessionStorage.set`), `LogoutUser` (solo limpia storages), `GetCurrentSession`.

`application/usecases/tickets/*` — cada use case recibe el repo correspondiente y delega. `CreateTicket` debe convertir `gameDate: string` (del form) a `Date` antes de pasar al repo.

### Fase 3 — Infrastructure

`infrastructure/config/env.ts`:
```ts
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000/api/v1';
```

`infrastructure/http/httpClient.ts`:
```ts
import axios from 'axios';
import { API_BASE_URL } from '../config/env';
import { localTokenStorage } from '../storage/LocalTokenStorage';
import { mapApiError } from './errors';

export const httpClient = axios.create({ baseURL: API_BASE_URL });

httpClient.interceptors.request.use((cfg) => {
  const token = localTokenStorage.get();
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

httpClient.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401) {
      localTokenStorage.clear();
      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(mapApiError(err));
  },
);
```

`infrastructure/http/errors.ts` — `mapApiError(axiosError)` traduce status → `UnauthorizedError | ForbiddenError | NotFoundError | ConflictError | ValidationError | DomainError`. Extrae `err.response.data.error` como mensaje.

`infrastructure/storage/LocalTokenStorage.ts` — wrapper sobre `localStorage` con guards SSR (`typeof window === 'undefined' → null`). Misma para `LocalSessionStorage` con JSON parse/stringify y revivir `createdAt` a `Date`.

`infrastructure/repositories/HttpTicketRepository.ts`:
```ts
export class HttpTicketRepository implements TicketRepository {
  async list(f: TicketFilters): Promise<PaginatedResult<Ticket>> {
    const { data } = await httpClient.get('/tickets', { params: stripUndefined(f) });
    return { items: data.data.map(reviveTicket), meta: data.meta };
  }
  // ... create/update/delete
}
```
Helpers: `reviveTicket(raw)` convierte `gameDate`/`createdAt`/`updatedAt` a `Date` y `amount: string | null` a `number | null`.

`HttpAuthRepository.ts` análogo. `HttpAdminTicketRepository.ts` también con `reviveTicketWithOwner`.

`infrastructure/di/container.ts`:
```ts
export const tokenStorage = new LocalTokenStorage();
export const sessionStorage = new LocalSessionStorage();
const authRepo = new HttpAuthRepository();
const ticketRepo = new HttpTicketRepository();
const adminRepo = new HttpAdminTicketRepository();

export const useCases = {
  registerUser: new RegisterUser(authRepo),
  loginUser: new LoginUser(authRepo, tokenStorage, sessionStorage),
  logoutUser: new LogoutUser(tokenStorage, sessionStorage),
  getCurrentSession: new GetCurrentSession(tokenStorage, sessionStorage),
  listTickets: new ListTickets(ticketRepo),
  getTicket: new GetTicketById(ticketRepo),
  createTicket: new CreateTicket(ticketRepo),
  updateTicket: new UpdateTicket(ticketRepo),
  deleteTicket: new DeleteTicket(ticketRepo),
  listAdminTickets: new ListAllTicketsAdmin(adminRepo),
};
```

### Fase 4 — Validación con Zod (espeja backend)

`presentation/lib/validation/auth.schemas.ts`:
```ts
export const registerSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener entre 2 y 80 caracteres').max(80, '...'),
  email: z.string().email('El email no es válido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

export const loginSchema = z.object({
  email: z.string().email('El email no es válido'),
  password: z.string().min(1, 'Ingresa tu contraseña'),
});
```

`presentation/lib/validation/ticket.schemas.ts`:
```ts
export const ticketSchema = z.object({
  title: z.string().min(1).max(120, 'El título debe tener entre 1 y 120 caracteres'),
  gameType: z.enum(GAME_TYPES),
  gameNumber: z.string().min(1).max(50).optional().or(z.literal('').transform(() => undefined)),
  gameDate: z.string().min(1, 'La fecha es obligatoria')
    .refine((v) => !Number.isNaN(Date.parse(v)), 'Fecha inválida'),
  amount: z.coerce.number().min(0, 'No puede ser negativo').optional().or(z.literal('').transform(() => undefined)),
  place: z.string().min(1).max(120).optional().or(z.literal('').transform(() => undefined)),
  status: z.enum(TICKET_STATUSES),
  notes: z.string().max(1000, 'No puede exceder 1000 caracteres').optional(),
});
```

### Fase 5 — Estado y hooks

`presentation/stores/authStore.ts` (Zustand con `persist`):
```ts
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setSession: (token, user) => set({ token, user }),
      clearSession: () => set({ token: null, user: null }),
    }),
    { name: 'mi-boleta-auth' },
  ),
);
```

`presentation/hooks/useAuth.ts` — expone `login`, `register`, `logout`, `isAuthenticated`, `isAdmin`, `user`. Cada acción invoca el use case del container y actualiza el store.

`presentation/hooks/useTickets.ts`:
```ts
export function useTicketsQuery(filters: TicketFilters) {
  return useQuery({
    queryKey: ['tickets', filters],
    queryFn: () => useCases.listTickets.execute(filters),
  });
}

export function useCreateTicketMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: useCases.createTicket.execute.bind(useCases.createTicket),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tickets'] }),
  });
}
// update/delete análogos, invalidando además ['ticket', id]
```

`useAdminTickets.ts` igual con queryKey `['admin', 'tickets', filters]`.

### Fase 6 — Providers y bootstrap

`presentation/providers/QueryProvider.tsx`: `'use client'` + `QueryClientProvider` con `staleTime: 30s`, `retry: 1`, devtools en dev.

`presentation/providers/AuthProvider.tsx`: hidrata el store de Zustand desde `tokenStorage`/`sessionStorage` en el primer mount (Zustand `persist` ya lo hace, pero este provider sirve para evitar parpadeo SSR: render `null` hasta `useEffect` set `hydrated=true`).

`app/layout.tsx` — envuelve `<html><body>` con `<QueryProvider><AuthProvider>{children}</AuthProvider></QueryProvider>`. Fuentes con `next/font/google` (Inter). `lang="es"`.

### Fase 7 — Routing y guards

`presentation/guards/RequireAuth.tsx` (`'use client'`): usa `useAuthStore` + `useRouter`; si no hay token tras hidratación → `router.replace('/login')`. Mientras hidrata, mostrar `<Spinner />`.

`presentation/guards/RequireAdmin.tsx`: requiere auth y `user.role === 'admin'`; si no, `router.replace('/dashboard')` con toast "Acceso denegado".

`app/(auth)/layout.tsx` — layout centrado, redirige a `/dashboard` si ya hay sesión.
`app/(app)/layout.tsx` — `<RequireAuth><ProtectedShell>...`.
`app/(app)/admin/layout.tsx` — `<RequireAdmin>...`.
`app/not-found.tsx` — 404 con link a `/`.

`app/page.tsx`: client component que en `useEffect` redirige a `/dashboard` o `/login`.

### Fase 8 — Páginas

#### `app/(auth)/login/page.tsx`
- `<LoginForm />`: campos email/password, validación Zod, submit deshabilitado durante mutation.
- En éxito: redirige a `/dashboard` con `router.push`.
- En error: muestra `<Alert variant="error">` con `error.message`.

#### `app/(auth)/register/page.tsx`
- `<RegisterForm />`: name/email/password + confirmación de password (validación cliente; no se envía al backend).
- Éxito: hace login automático y redirige a `/dashboard`.

#### `app/(app)/dashboard/page.tsx`
- 4 `<StatCard>`: Total, Próximos sorteos (filtra `gameDate > now`), Pendientes (`status === 'Pendiente'`), Ganados.
- `<UpcomingDraws />`: lista top 5 ordenada por `gameDate` ascendente futura.
- `<PendingTickets />`: lista top 5 con status Pendiente.
- `<HistoryPreview />`: link a `/tickets`.
- Datos: `useTicketsQuery({ pageSize: 100 })` y derivar en cliente.

#### `app/(app)/tickets/page.tsx`
- `<TicketFilters />`: status, gameType, búsqueda q (debounced 300ms), pageSize.
- `<TicketsList>` que renderiza `<TicketCard>` por ticket. Cada card: title, badge de status (color), gameType, gameDate formateada, número, lugar, monto. Acciones: Ver, Editar, Eliminar.
- Eliminar → `<Modal>` confirmación → `useDeleteTicketMutation`.
- `<Pagination>` con meta.
- Estados: loading (skeletons), empty ("Aún no tienes boletas. Crea la primera."), error.

#### `app/(app)/tickets/new/page.tsx`
- `<TicketForm mode="create">` con todos los campos. Submit → `useCreateTicketMutation` → `router.push('/tickets')`.

#### `app/(app)/tickets/[id]/page.tsx`
- Detalle del ticket. `useTicketQuery(id)`. Si 404 → `notFound()` (Next).
- Botones Editar y Eliminar.

#### `app/(app)/tickets/[id]/edit/page.tsx`
- `<TicketForm mode="edit" initialValues={...}>`. Submit → `useUpdateTicketMutation` (envío **parcial**: solo dirty fields).

#### `app/(app)/admin/page.tsx`
- Tabla responsive (en mobile colapsa a cards). Columnas: dueño (name + email), título, tipo, número, fecha, estado.
- Filtros: q, status, gameType, `userId` opcional. Combinables.
- Paginación.
- `useAdminTicketsQuery(filters)`.

### Fase 9 — Componentes UI

Cada primitivo de `components/ui/`:
- Acepta `className` opcional combinado con `cn()`.
- Tipos correctos (no `any`).
- `Input`, `Select`, `Textarea`: `forwardRef` para integración con React Hook Form.
- `Button`: variantes `primary | secondary | ghost | danger`, sizes `sm | md | lg`, prop `loading` que muestra spinner y deshabilita.
- `Badge`: prop `status: TicketStatus` mapea a color (Pendiente=amber, Ganado=emerald, Perdido=rose).
- `Modal`: portal, cierra con ESC y click fuera, focus trap simple, `role="dialog"`.

### Fase 10 — Estilos y responsive

- `tailwind.config.ts`: `theme.extend.colors` con paleta semántica.
- Breakpoints: usar defaults (sm 640, md 768, lg 1024, xl 1280).
- Mobile-first: cards en `flex-col`, grids `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`.
- Navbar: hamburguesa en mobile, menú lateral en desktop.
- Tabla admin: `overflow-x-auto` en desktop, transformación a cards apiladas en mobile via clases `hidden md:table-row` / `md:hidden`.
- Accesibilidad: cada input con `<Label htmlFor>`, contraste WCAG AA (verificar con dev tools), `aria-invalid` en campos con error, `aria-describedby` apuntando al `<FieldError>`.

### Fase 11 — Tests (Vitest + RTL)

`vitest.config.ts`: `environment: 'jsdom'`, `setupFiles: ['./tests/setup.ts']`.
`tests/setup.ts`: `import '@testing-library/jest-dom'`.

Tests mínimos para bonus:
- `tests/application/LoginUser.test.ts`: mock de `AuthRepository` y `TokenStorage`; verifica que `execute()` llama `repo.login` y guarda el token.
- `tests/application/CreateTicket.test.ts`: verifica que pasa los campos correctos al repo.
- `tests/components/LoginForm.test.tsx`: renderiza, escribe email inválido → muestra error de Zod; submit con datos válidos → llama al callback.
- `tests/components/TicketForm.test.tsx`: valida que enums se muestran en el Select y que submit envía las fechas en ISO.

`package.json` scripts:
```json
"test": "vitest",
"test:run": "vitest run",
"typecheck": "tsc --noEmit",
"lint": "next lint"
```

### Fase 12 — README y despliegue

`README.md` debe incluir:
- Descripción del proyecto y link al repo de la API.
- Stack utilizado.
- Variables de entorno (`NEXT_PUBLIC_API_BASE_URL`).
- Cómo correr: `npm install`, `npm run dev`.
- Cómo correr tests: `npm test`.
- Diagrama o lista de la estructura Clean Architecture.
- Screenshots (login, dashboard, tickets, admin).
- Link al deploy en Vercel.
- Credenciales de un usuario admin demo (no commitear secretos reales).

Deploy en Vercel:
- Push a GitHub (repo público).
- `vercel.com` → Import repo → setear `NEXT_PUBLIC_API_BASE_URL` apuntando a la URL pública de la API (Render).
- Verificar que CORS de la API permite el origen de Vercel (la API ya tiene `cors()` abierto).

`.env.example` commiteado con placeholder; `.env.local` en `.gitignore`.

---

## Checklist de verificación end-to-end (correr antes de entregar)

Manualmente, con backend corriendo en `localhost:4000`:

1. `npm run dev` levanta el front en `localhost:3000`.
2. `/register` crea un usuario; los errores 409 (email duplicado) y 400 (validación) se muestran al usuario.
3. `/login` autentica y persiste el token. Refrescar página mantiene la sesión.
4. Logout limpia token y `localStorage`, redirige a `/login`.
5. Borrar el token manualmente en DevTools y navegar a `/dashboard` → redirige a `/login`.
6. CRUD completo de tickets: crear → aparece en lista sin refresh manual; editar → cambios persistidos; eliminar → modal de confirmación → desaparece de la lista.
7. Validaciones: enviar formulario vacío muestra errores por campo; email inválido en register; fecha inválida en ticket.
8. Dashboard: contadores correctos (verificar manualmente contra la lista).
9. Página `/admin`:
   - Con usuario normal: redirige a `/dashboard`.
   - Promover a admin via SQL (ver README de la API) y volver a loguear: tabla muestra tickets de todos los usuarios.
   - Filtros combinados funcionan: status + gameType + q + paginación.
10. Mobile (DevTools 375px): navbar colapsa, formularios usables, tablas convertidas a cards.
11. Estados: pantalla de loading visible en navegaciones; empty state con texto claro cuando no hay tickets; error visible si el backend está caído.
12. `npm run typecheck` pasa sin errores.
13. `npm run lint` sin warnings.
14. `npm test:run` todos los tests verdes.
15. Sin `console.log` en código de producción (grep antes de commit).
16. `.env.local` no commiteado (verificar con `git status`).
17. Deploy en Vercel funcionando contra la API en Render.

---

## Archivos críticos a crear/modificar

**Crear toda la estructura desde cero** dentro de `Practica-frontend/mi-boleta-web/`. La API en `mi-boleta-api/` **no se toca**.

Archivos generados por `create-next-app` que se mantienen tal cual: `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `tsconfig.json` (verificar `strict`).

Archivos que se sobreescriben de los generados: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `tailwind.config.ts` (si lo genera), `README.md`.

Archivos nuevos: todos los listados en la sección "Estructura de carpetas".

---

## Riesgos y cómo mitigarlos

| Riesgo | Mitigación |
|---|---|
| CORS bloquea requests en producción | API ya tiene `cors()` abierto en dev; en Render mantener configuración. Si bloquea, ajustar API. |
| `gameDate` se envía mal formateada | Usar `new Date(value).toISOString()` antes de enviar; en el form input usar `type="datetime-local"` y convertir. |
| Decimales (`amount`) llegan como string desde Prisma | El backend ya lo convierte a number según README §"Notas para el frontend"; aún así, en `reviveTicket` aplicar `Number(raw.amount)` defensivamente. |
| Token expira durante la sesión | Interceptor 401 ya limpia y redirige. |
| Hydration mismatch SSR/CSR por `localStorage` | `AuthProvider` retrasa render hasta `useEffect` (flag `hydrated`). |
| Filtros admin combinados rompen la URL | `useAdminTickets` construye query con `URLSearchParams`, sincroniza con `useSearchParams` para que sea bookmarkable. |
| Submits dobles | Botones con `disabled={mutation.isPending}` + `loading`. |

---

## Resumen ejecutivo (TL;DR para Sonnet)

1. **Crear** `Practica-frontend/mi-boleta-web/` con `create-next-app` + dependencias listadas.
2. **Implementar** en orden: domain → application → infrastructure → presentation → app (router). No saltar capas.
3. **Mantener** la regla de dependencias (domain no conoce nada externo).
4. **Espejar** el contrato de la API con tipos y schemas Zod idénticos a los del backend.
5. **Centralizar** HTTP en `httpClient.ts` con interceptores; nunca usar `fetch` suelto en componentes.
6. **Invalidar** queries con TanStack Query tras cada mutación para actualizar la UI automáticamente.
7. **Validar** todos los formularios con Zod en cliente y mostrar errores junto al campo + mensajes del backend.
8. **Proteger** rutas con `<RequireAuth>` y `<RequireAdmin>`. 401 → logout automático.
9. **Diseñar** mobile-first con Tailwind, estados loading/empty/error visibles, accesibilidad básica.
10. **Probar** con Vitest + RTL al menos 4 archivos críticos (2 use-cases, 2 forms).
11. **Documentar** README + desplegar en Vercel con env var apuntando al backend Render.
12. **Verificar** con el checklist de 17 puntos antes de entregar.
