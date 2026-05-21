Librerías seleccionadas para máximo impacto visual:

framer-motion — animaciones staggered, transiciones de página, contadores animados
lucide-react — íconos perfectos para el contexto (ya disponibles en Claude sin instalar)
recharts — gráficas del dashboard
react-hot-toast — notificaciones elegantes
date-fns — fechas en español con countdown ("en 3 días")
# 🎨 Design System — "¿Y si sí me lo gané?"

## Librerías recomendadas

| Librería | Para qué | Instalación |
|---|---|---|
| **Lucide React** | Íconos — línea limpia, consistente, 1000+ íconos | `npm i lucide-react` |
| **Framer Motion** | Animaciones — entradas staggered, transiciones, micro-interacciones | `npm i framer-motion` |
| **Recharts** | Gráficas del dashboard (barras, pie) con tema personalizable | `npm i recharts` |
| **React Hot Toast** | Notificaciones elegantes con tema oscuro | `npm i react-hot-toast` |
| **date-fns** | Formateo de fechas legibles y countdown ("en 3 días") | `npm i date-fns` |
| **clsx** | Clases CSS condicionales sin concatenación manual | `npm i clsx` |

### Íconos clave para este contexto (Lucide)
```tsx
import {
  Ticket, Trophy, Calendar, Star, DollarSign,
  Search, SlidersHorizontal, Plus, Pencil, Trash2,
  LogOut, User, ChevronRight, MapPin, Clock, Shield
} from 'lucide-react'
```

### Configuración de React Hot Toast (tema oscuro)
```tsx
<Toaster
  toastOptions={{
    style: {
      background: '#1A1A1A',
      color: '#F0F0F0',
      border: '1px solid #FFFFFF14',
      borderRadius: '8px',
    },
    success: { iconTheme: { primary: '#00D4FF', secondary: '#0D0D0D' } },
    error:   { iconTheme: { primary: '#FF6B6B', secondary: '#0D0D0D' } },
  }}
/>
```

### Animación de entrada estándar (Framer Motion)
```tsx
// Contenedor con stagger
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } }
}

// Cada item
const item = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.3 } }
}

// Uso
<motion.ul variants={container} initial="hidden" animate="show">
  <motion.li variants={item}>...</motion.li>
</motion.ul>
```

---

## Paleta de colores

| Token | Hex | Uso |
|---|---|---|
| `--color-bg` | `#0D0D0D` | Fondo principal |
| `--color-surface-1` | `#1A1A1A` | Cards, sidebar |
| `--color-surface-2` | `#242424` | Inputs, dropdowns, hover |
| `--color-accent` | `#00D4FF` | Botones primarios, links, bordes activos |
| `--color-danger` | `#FF6B6B` | Estado Perdido, botones destructivos |
| `--color-warning` | `#FFD166` | Estado Pendiente |
| `--color-success` | `#00D4FF` | Estado Ganado (mismo acento) |
| `--color-border` | `#FFFFFF14` | Bordes de cards e inputs |
| `--color-text-primary` | `#F0F0F0` | Títulos y texto principal |
| `--color-text-secondary` | `#888888` | Labels, placeholders, metadata |

---

## Tipografía

| Rol | Fuente | Peso | Uso |
|---|---|---|---|
| Display | Space Grotesk | 700 | Títulos de página, números grandes del dashboard |
| UI | Inter | 400 / 500 | Texto general, labels, botones |

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Inter:wght@400;500&display=swap');
```

---

## Efectos y elevación

```css
/* Glow en elementos activos / hover */
--glow-accent: 0 0 12px #00D4FF44;

/* Sombra de card */
--shadow-card: 0 1px 3px rgba(0, 0, 0, 0.4);

/* Sombra de modal */
--shadow-modal: 0 8px 32px rgba(0, 0, 0, 0.6);
```

---

## Componentes

### Botón primario
```css
background: #00D4FF;
color: #0D0D0D;
font-weight: 500;
border-radius: 8px;
padding: 10px 20px;

&:hover {
  box-shadow: 0 0 12px #00D4FF44;
}
```

### Botón ghost
```css
background: transparent;
border: 1px solid #FFFFFF14;
color: #F0F0F0;
border-radius: 8px;
padding: 10px 20px;

&:hover {
  border-color: #FFFFFF30;
  background: #1A1A1A;
}
```

### Botón destructivo
```css
background: transparent;
border: 1px solid #FF6B6B44;
color: #FF6B6B;
border-radius: 8px;

&:hover {
  background: #FF6B6B14;
}
```

### Input / Select
```css
background: #1A1A1A;
border: 1px solid #FFFFFF14;
border-radius: 8px;
color: #F0F0F0;
padding: 10px 14px;

&:focus {
  border-color: #00D4FF;
  box-shadow: 0 0 0 3px #00D4FF22;
  outline: none;
}

&::placeholder {
  color: #888888;
}
```

### Card
```css
background: #1A1A1A;
border: 1px solid #FFFFFF14;
border-radius: 12px;
padding: 20px;
```

### Card — estado Ganado
```css
border-color: #00D4FF44;
box-shadow: 0 0 16px #00D4FF22;
```

### Badge de estado
```css
/* Pendiente */
background: #FFD16620; color: #FFD166; border-radius: 999px; padding: 2px 10px;

/* Ganado */
background: #00D4FF20; color: #00D4FF; border-radius: 999px; padding: 2px 10px;

/* Perdido */
background: #FF6B6B20; color: #FF6B6B; border-radius: 999px; padding: 2px 10px;
```

### Sidebar — ítem activo
```css
border-left: 2px solid #00D4FF;
background: #00D4FF0D;
color: #00D4FF;
```

---

## Fondo con patrón de puntos

```css
background-image: radial-gradient(circle, #FFFFFF08 1px, transparent 1px);
background-size: 24px 24px;
```

---

## Focus visible (accesibilidad)

```css
*:focus-visible {
  outline: 2px solid #00D4FF;
  outline-offset: 2px;
}
```

---

# 🎯 Plan: Integración API externa — datos.gov.co (Resultados de loterías)

> **Para Sonnet:** Este plan es la **única fuente de verdad** para integrar la API pública de `datos.gov.co`. Sigue el orden exacto. No saltes pasos. No modifiques archivos fuera de la lista permitida. Si algo no está claro, **detente y pregunta** — no inventes endpoints, IDs de dataset, ni campos.

## 0. Objetivo

Consumir el portal de datos abiertos de Colombia (`https://www.datos.gov.co`) — basado en **Socrata Open Data API (SODA)** — para obtener resultados oficiales de loterías colombianas (Lotería de Bogotá, Medellín, Cruz Roja, etc.) y, opcionalmente, **auto-resolver** el `status` de un ticket comparando `gameNumber` + `gameDate` contra el resultado real.

**Alcance mínimo (MVP de la integración):**
1. Mostrar **últimos resultados** publicados (lista) en una nueva página `/resultados`.
2. Botón "Verificar resultado" en el detalle de un ticket (`/tickets/[id]`) que consulta la API y muestra si ese número ganó en esa fecha.

**Alcance NO incluido** (para evitar romper la app):
- ❌ No se modifica el dominio existente (`Ticket`, `TicketStatus`, repos del backend propio).
- ❌ No se modifica el backend `mi-boleta-api`.
- ❌ No se persisten resultados de datos.gov.co en el backend (es solo cliente-lectura).
- ❌ No se cambia automáticamente el `status` del ticket en BD; solo se **sugiere** al usuario actualizarlo (un botón explícito).

## 1. Contrato de la API externa (SODA)

**Base URL:** `https://www.datos.gov.co/resource/{datasetId}.json`

**Autenticación:** ninguna para lectura. Opcional `X-App-Token` (header) para subir el rate-limit. Configurable vía env var (no se commitea).

**Query params soportados (SoQL):**
- `$limit=50` — máximo de filas
- `$offset=0` — paginación
- `$order=fecha DESC` — orden
- `$where=fecha>'2026-01-01'` — filtros
- `$select=campo1,campo2` — proyección
- `$q=texto` — full-text search

**Respuesta:** array plano JSON. Cada fila es un objeto con campos específicos del dataset (varían por lotería). Ejemplo de campos típicos: `fecha`, `numero`, `serie`, `loteria`, `premio_mayor`.

**Errores:** status HTTP estándar + body JSON `{ "code": "...", "message": "..." }`.

## 2. Descubrimiento del dataset (HACER ANTES DE CODIFICAR)

**No inventar IDs de dataset.** Para obtener el ID correcto:

1. Ir a https://www.datos.gov.co y buscar "loteria" / "resultados loteria".
2. Anotar el `datasetId` (4 chars + 4 chars, formato `xxxx-xxxx`) visible en la URL del dataset bajo `/d/`.
3. Inspeccionar 1 fila vía: `https://www.datos.gov.co/resource/{datasetId}.json?$limit=1` y registrar **nombres exactos de campos** (Socrata normaliza a snake_case lowercase y puede acortar).
4. **Confirmar al usuario** el `datasetId` y los nombres de campos antes de seguir.

Variables confirmadas (no inventar ni cambiar):

| Variable | Valor |
|---|---|
| `DATASET_ID` | `i3kx-3zps` |
| `FIELD_FECHA` | `fecha_del_sorteo` |
| `FIELD_NUMERO` | `numero_billete_ganador` |
| `FIELD_SERIE` | `numero_serie_ganadora` |
| `FIELD_LOTERIA` | `loter_a` (con tilde — así viene de Socrata) |
| `FIELD_SORTEO` | `n_mero_del_sorteo` |
| `FIELD_PREMIO` | `tipo_de_premio` |

Datasets alternativos (por lotería específica):
- Lotería de Bogotá: `h5dm-9t39`
- Lotería Santander: `4zwu-ra3f`

Endpoint JSON: `https://www.datos.gov.co/resource/i3kx-3zps.json`

## 3. Variables de entorno

Añadir a `.env.example` y a `.env.local` (no commitear `.env.local`):

```env
NEXT_PUBLIC_DATOS_GOV_BASE_URL=https://www.datos.gov.co
NEXT_PUBLIC_DATOS_GOV_LOTTERY_DATASET_ID=i3kx-3zps
# Opcional — sube rate limit. Generar en https://evergreen.data.socrata.com/signup
# Si está ausente, el cliente NO debe enviar el header.
DATOS_GOV_APP_TOKEN=
```

> ⚠️ **Importante:** `DATOS_GOV_APP_TOKEN` **sin prefijo `NEXT_PUBLIC_`** → solo accesible en server. Si se necesita en cliente, **no se expone**; en su lugar, se proxea vía Route Handler (ver §6).

## 4. Estructura de archivos (NUEVOS — no tocar existentes)

Respetando la Clean Architecture del plan principal:

```
src/
├── domain/
│   ├── entities/
│   │   └── LotteryResult.ts                       # NUEVO
│   └── repositories/
│       └── LotteryResultRepository.ts             # NUEVO (interface)
│
├── application/
│   ├── dtos/
│   │   └── lotteryResults.dto.ts                  # NUEVO
│   └── usecases/
│       └── lottery/
│           ├── ListLatestLotteryResults.ts        # NUEVO
│           └── CheckTicketAgainstResults.ts       # NUEVO (lógica pura)
│
├── infrastructure/
│   ├── config/
│   │   └── datosGovEnv.ts                         # NUEVO (lee envs propias)
│   ├── http/
│   │   └── datosGovClient.ts                      # NUEVO (axios.create separado)
│   ├── repositories/
│   │   └── DatosGovLotteryResultRepository.ts     # NUEVO
│   └── di/
│       └── container.ts                           # MODIFICAR: añadir nuevas instancias (solo append)
│
├── presentation/
│   ├── hooks/
│   │   ├── useLotteryResults.ts                   # NUEVO
│   │   └── useCheckTicket.ts                      # NUEVO
│   └── components/
│       └── lottery/
│           ├── LotteryResultsList.tsx             # NUEVO
│           ├── LotteryResultCard.tsx              # NUEVO
│           └── CheckTicketButton.tsx              # NUEVO (en detalle de ticket)
│
└── app/(app)/
    ├── resultados/
    │   └── page.tsx                               # NUEVO
    └── tickets/[id]/page.tsx                      # MODIFICAR: insertar <CheckTicketButton/>
```

**Lista blanca de archivos que Sonnet PUEDE modificar:**
- `src/infrastructure/di/container.ts` — solo **añadir** instancias y exportes.
- `src/app/(app)/tickets/[id]/page.tsx` — solo **insertar** el botón en sección no crítica del JSX.
- `.env.example` y `.env.local` — append.

**Lista negra (NO TOCAR):**
- Todo `src/domain/entities/Ticket.ts`, `User.ts`.
- Todos los repos y use-cases existentes del backend propio.
- `httpClient.ts` (el cliente del backend propio). El nuevo `datosGovClient.ts` es **separado**.
- `authStore.ts`, providers, guards.

## 5. Contratos de tipos (dominio)

```ts
// src/domain/entities/LotteryResult.ts
export type LotteryResult = {
  id: string;          // hash estable de loteria+fecha+numero (no viene de la API)
  loteria: string;     // nombre normalizado
  fecha: Date;
  numero: string;      // como string para preservar ceros a la izquierda
  serie: string | null;
  premioMayor: number | null;
  raw: Record<string, unknown>;  // crudo, por si UI necesita campos extra
};

export type LotteryMatchResult =
  | { matched: true; result: LotteryResult }
  | { matched: false; reason: 'no-results-for-date' | 'number-not-winner' };
```

```ts
// src/domain/repositories/LotteryResultRepository.ts
export interface LotteryResultRepository {
  listLatest(input: { limit?: number; loteria?: string }): Promise<LotteryResult[]>;
  findByDateAndNumber(input: {
    fecha: Date;
    numero: string;
    loteria?: string;
  }): Promise<LotteryResult | null>;
}
```

## 6. Implementación paso a paso (orden obligatorio)

### Paso 1 — Domain + Application (sin red, sin React)
1. Crear `LotteryResult.ts` y `LotteryResultRepository.ts` con los tipos de §5.
2. Crear `lotteryResults.dto.ts`: input/output de los use-cases.
3. Crear `ListLatestLotteryResults.ts`: recibe el repo, delega.
4. Crear `CheckTicketAgainstResults.ts`: lógica pura — recibe `{ ticket, repo }`, llama `repo.findByDateAndNumber`, retorna `LotteryMatchResult`. **Normalizar el número** quitando espacios y ceros a la izquierda solo para comparar (no para mostrar).

### Paso 2 — Infrastructure (HTTP)
1. `datosGovEnv.ts`:
   ```ts
   export const DATOS_GOV_BASE_URL = process.env.NEXT_PUBLIC_DATOS_GOV_BASE_URL ?? 'https://www.datos.gov.co';
   export const LOTTERY_DATASET_ID = process.env.NEXT_PUBLIC_DATOS_GOV_LOTTERY_DATASET_ID ?? '';
   // App token NO se expone al cliente. Solo en server (route handler).
   ```
2. `datosGovClient.ts`: `axios.create` **separado** del `httpClient` del backend propio. **No** comparte interceptores. Sin `Authorization` Bearer. Sin redirect a `/login` en 401.
   ```ts
   export const datosGovClient = axios.create({
     baseURL: `${DATOS_GOV_BASE_URL}/resource`,
     timeout: 8000,
   });
   ```
3. `DatosGovLotteryResultRepository.ts`: implementa la interface. Convierte fila cruda → `LotteryResult` con un `mapRow(raw)` defensivo (todos los campos pueden faltar). Generar `id` con `${loteria}-${fecha}-${numero}` lowercased + slugify simple.

### Paso 3 — Proxy server-side (solo si se usa app token)
Si la entrega usa `DATOS_GOV_APP_TOKEN`, crear Route Handler para **no exponer** el token:

```
src/app/api/datos-gov/lottery/route.ts
```

El handler reenvía query params al cliente Socrata con el header `X-App-Token` y devuelve la respuesta. El `datosGovClient` apunta a `/api/datos-gov/lottery` en vez de directo. **Si NO hay token**, llamar directo desde el cliente está OK (es lectura pública).

> ⚠️ Decidir esto **antes** de codificar el repo, porque cambia la `baseURL` del cliente.

### Paso 4 — DI container (append-only)
En `infrastructure/di/container.ts`, **añadir al final** (sin mover/borrar líneas):

```ts
import { DatosGovLotteryResultRepository } from '../repositories/DatosGovLotteryResultRepository';
import { ListLatestLotteryResults } from '@/application/usecases/lottery/ListLatestLotteryResults';
import { CheckTicketAgainstResults } from '@/application/usecases/lottery/CheckTicketAgainstResults';

const lotteryRepo = new DatosGovLotteryResultRepository();

// Extender el objeto useCases existente sin reemplazarlo:
Object.assign(useCases, {
  listLatestLotteryResults: new ListLatestLotteryResults(lotteryRepo),
  checkTicketAgainstResults: new CheckTicketAgainstResults(lotteryRepo),
});
```

> Si `useCases` está declarado `as const` o readonly, en su lugar exportar un nuevo objeto `lotteryUseCases` desde un archivo separado. **No reescribir** la declaración existente.

### Paso 5 — Hooks (TanStack Query)
```ts
// useLotteryResults.ts
export function useLatestLotteryResultsQuery(limit = 10) {
  return useQuery({
    queryKey: ['lottery', 'latest', limit],
    queryFn: () => useCases.listLatestLotteryResults.execute({ limit }),
    staleTime: 5 * 60_000,    // 5 min — los resultados no cambian rápido
    retry: 1,
  });
}

// useCheckTicket.ts — useMutation (acción explícita del usuario)
export function useCheckTicketMutation() {
  return useMutation({
    mutationFn: (ticket: Ticket) =>
      useCases.checkTicketAgainstResults.execute({ ticket }),
  });
}
```

### Paso 6 — UI
1. `LotteryResultCard.tsx`: card oscura siguiendo el design system existente (`#1A1A1A`, borde `#FFFFFF14`, radio 12px). Muestra: loteria, fecha formateada con `date-fns/locale/es`, número grande con fuente Display, premio formateado.
2. `LotteryResultsList.tsx`: stagger con framer-motion (variants ya definidos arriba).
3. `app/(app)/resultados/page.tsx`: `<RequireAuth>` ya está en el layout `(app)`. Render `<LotteryResultsList />`. Estados loading (skeletons), empty, error con toast.
4. `CheckTicketButton.tsx`: botón ghost. Al click, `mutation.mutate(ticket)`. Muestra:
   - Loading → spinner inline.
   - `matched: true` → toast success "¡Coincide! Número ganador del {fecha}".
   - `matched: false, reason: 'number-not-winner'` → toast neutro "Este número no aparece como ganador en esa fecha.".
   - `matched: false, reason: 'no-results-for-date'` → toast warning "Aún no hay resultados publicados para esa fecha.".
   - Error → toast error con `error.message`.
   - **Nunca** muta el ticket automáticamente. Solo informa.
5. Insertar `<CheckTicketButton ticket={ticket} />` en `tickets/[id]/page.tsx` **junto a** los botones "Editar"/"Eliminar" existentes, sin alterar la lógica de esos.

### Paso 7 — Sidebar
Añadir entrada "Resultados" al Sidebar/Navbar existentes con ícono `Trophy` de lucide-react. **Solo añadir item**, no reorganizar.

## 7. Manejo de errores y resiliencia

- **Timeout:** 8s en `datosGovClient`. Si excede → repo lanza `DomainError` con mensaje "Datos.gov.co no respondió a tiempo".
- **CORS:** la API de Socrata soporta CORS desde browser. Si falla en producción, mover al Route Handler (Paso 3).
- **Rate limit (429):** mostrar toast "Demasiadas consultas, intenta en unos segundos". No hacer retry automático agresivo (`retry: 1` máximo).
- **Dataset vacío / campos faltantes:** `mapRow` retorna `LotteryResult` con campos opcionales en `null`, **nunca** lanza.
- **Fechas:** Socrata devuelve ISO strings o `YYYY-MM-DDTHH:mm:ss.sss`. Parsear con `new Date(raw[FIELD_FECHA])`. Si `isNaN`, descartar la fila (loggear con `console.warn` solo en dev, eliminar antes de entrega).
- **Comparación de números:** normalizar a string sin espacios, sin guiones, sin ceros a la izquierda **solo para comparar**. UI muestra el valor original.

## 8. Reglas de seguridad y "no rompas la app"

1. ✋ **No mezcles clientes HTTP.** El backend propio usa `httpClient`. La API externa usa `datosGovClient`. Cero acoplamiento entre interceptores.
2. ✋ **No modifiques el tipo `Ticket`** ni `TicketStatus`. La integración solo lee del ticket existente.
3. ✋ **No persistas resultados** en el backend propio ni en localStorage (cache lo maneja TanStack Query).
4. ✋ **No expongas `DATOS_GOV_APP_TOKEN`** al cliente. Si se usa, va por Route Handler.
5. ✋ **No bloquees el render** del detalle de ticket esperando la verificación. La consulta es bajo demanda (`useMutation`, no `useQuery`).
6. ✋ **No reescribas** `container.ts`, `httpClient.ts`, `authStore.ts`, layouts ni guards. Solo append donde se indica.
7. ✋ **No supongas IDs de dataset ni nombres de campo.** Confirma con el usuario tras §2.
8. ✋ **No commitees** `.env.local` ni el app token.

## 9. Checklist de verificación (correr antes de cerrar la tarea)

1. `npm run typecheck` pasa sin errores.
2. `npm run lint` sin warnings nuevos.
3. `/resultados` carga la lista (con backend de la app **caído** debe seguir funcionando — es independiente).
4. Botón "Verificar" en un ticket muestra el toast correcto en los 3 escenarios (match / no-winner / no-results).
5. Sin token: funciona pero puede dar 429 bajo carga. Con token vía proxy: no hay 429 en uso normal.
6. Logout → `/resultados` redirige a `/login` (lo cubre el guard del layout `(app)`).
7. Mobile 375px: cards apiladas, botón "Verificar" tamaño táctil ≥ 44px.
8. DevTools Network: requests a `datos.gov.co` (o `/api/datos-gov/...` si hay proxy). Nunca aparece el app token en el cliente.
9. `git diff` solo toca archivos de la lista blanca de §4.
10. Sin `console.log` antes de entregar.

## 10. Tests (bonus, opcional)

- `CheckTicketAgainstResults.test.ts`: mockea repo, verifica los 3 outcomes.
- `DatosGovLotteryResultRepository.test.ts`: mock de `axios`, valida que `mapRow` tolera campos faltantes.
- `LotteryResultCard.test.tsx`: render con datos completos y con datos parciales.

## 11. TL;DR para Sonnet

1. Pregunta al usuario el `datasetId` y campos exactos (§2). **No avances sin esto.**
2. Crea archivos en el orden: domain → application → infrastructure → presentation → app (§4).
3. **Cliente HTTP separado** (`datosGovClient`), nunca toques `httpClient`.
4. DI container: **solo append** con `Object.assign` o archivo paralelo.
5. UI: solo **lectura** + acción explícita "Verificar". **Nunca** muta tickets automáticamente.
6. Token de Socrata: **server-side only** vía Route Handler si se usa.
7. Verifica con el checklist de §9 antes de entregar.
