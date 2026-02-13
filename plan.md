# Plan de Desarrollo — Grilla Cosquin Rock

> Cada fase es autocontenida y testeable. No se avanza sin aprobación.

---

## Fase 1 — Grilla Mínima Visible

- [x] Tipos de dominio: `ScenarioId`, `Scenario`, `Event`, `EventsType`
- [x] Data reducida: 3 escenarios, ~4 bandas c/u, Día 1
- [x] Utilidades: `timeToMinutes()`, constantes de config
- [x] Componentes: `EventsGrid`, `TimeSlotCell`, `EventSlotCell`, `ScenarioSidebar`, `LineupContainer`
- [x] Renderizar grilla en `page.tsx` con scroll horizontal
- [x] Tokens de color por escenario (`--color-stage-*`)
- [x] Token de favorito (`--color-favorite`)
- [x] Jerarquía visual de neutrals (opción B: toque de marca en estructura)
- [x] Arquitectura vertical slice: `src/features/lineup/`
- [x] Convención de nombres: `lineup.types.ts`, `lineup.config.ts`, etc.

---

## Fase 2 — Interactividad Básica

- [x] `CurrentTimeIndicator`: línea vertical en la posición de hora actual (timezone Argentina)
- [x] Actualización automática cada minuto
- [x] Botón scroll-to-now (icono reloj) en el sidebar header
- [x] Toggle de favoritos con `localStorage`
- [x] Visual diferenciado para bandas favoritas usando token `--color-favorite`
- [x] Persistencia: favoritos sobreviven reload

**Testeo:** la línea se posiciona correctamente, el botón centra la vista, los favoritos persisten al recargar.

---

## Fase 3 — Data Completa + Tabs de Días

- [x] JSON completo: todos los escenarios (7), todas las bandas, Día 1 y Día 2
- [x] Extender `lineup.config.ts`: jornada 14:00 → 04:00 AM (medianoche no corta)
- [x] Tabs para cambiar de día (`DayTabs` + `LineupPage`)
- [x] Escenarios sin eventos en un día se ocultan automáticamente
- [x] TIME_SLOTS dinámico según rango real de la jornada (`generateTimeSlots`)

**Testeo:** ambos días funcionan, grilla se adapta, todos los escenarios y bandas visibles.

---

## Fase 4 — PWA + Offline-first

- [x] Configurar Next.js como PWA (manifest.json, service worker)
- [x] JSON de lineup embebido en el bundle (sin fetch externo)
- [x] Detección de estado de conexión (`useOnlineStatus` + `useSyncExternalStore`)
- [x] Badge offline en el header (solo visible sin conexión)
- [x] Iconos placeholder para instalación (192px + 512px)
- [ ] Modo Ahorro: flag que limita sync con Convex cuando hay mala señal (diferido a Fase 5)

**Testeo:** instalar la app en dispositivo, activar modo avión, todo sigue funcionando.

---

## Fase 5 — Convex: Identidad + Sync de Favoritos

- [x] Feature `src/features/auth/` (vertical slice)
- [x] Convex schema: `convex/schema.ts` con tablas `users` y `favorites`
- [x] Modelo `users`: username + deviceToken (index `by_device_token`)
- [x] Modelo `favorites`: userId + banda (indexes `by_user`, `by_user_banda`)
- [x] Uso anónimo inicial (solo `localStorage`) — sin cambios en UX existente
- [x] Registro opcional: input username + deviceToken auto (UUID)
- [x] Sync: al registrar, localStorage se sube a Convex; luego local es fuente de verdad y Convex se mantiene en sync
- [x] `UserBadge` y `RegisterForm` en el header
- [x] `useFavorites` acepta `userId` opcional — dual mode (local/Convex)
- [x] Indicador de conexión: `OfflineBadge` ya existente (Fase 4)

**Testeo:** crear usuario, marcar favoritos, recargar, verificar sync.

---

## Fase 6 — Convex: Salas de Amigos

- [x] Feature `src/features/rooms/`
- [x] Modelo dual: favoritos personales local-first; salas/heatmap Convex-first (fuente compartida)
- [x] Modelo en Convex: tablas `rooms`, `room_members`
- [x] Crear sala con código único
- [x] Unirse a sala por código o QR
- [x] Generación de QR con el ID de sala (cara a cara, sin internet inmediato)
- [x] "Mapa de calor": visualizar coincidencias de favoritos entre miembros
- [x] Actualización en tiempo real vía subscriptions de Convex
- [x] Cache offline: datos de salas y heatmap persistidos en localStorage (TTL 30min)
- [x] Fallback offline: sin conexión se usan datos cacheados de salas y heatmap

**Testeo:** dos usuarios en la misma sala ven las coincidencias de favoritos.

---

## Fase 7 — Admin Portal

- [ ] Feature `src/features/admin/`
- [ ] Ruta oculta `/admin-portal` protegida
- [ ] Tabla `schedule_updates` en Convex (parches sobre el JSON estático)
- [ ] UI para crear/editar updates: retrasos, cambios de escenario, cancelaciones
- [ ] Lógica de merge: JSON base + parches = lineup renderizada
- [ ] Los parches se aplican en tiempo real para usuarios conectados

**Testeo:** crear un parche desde admin, verificar que la grilla refleja el cambio.

---

## Fase 8 — Polish & UX

- [ ] Mobile-first responsive (la grilla se usa en el festival, desde el celular)
- [ ] Animaciones y transiciones (scroll, toggle favoritos, cambio de tab)
- [ ] Manejo de edge-cases: banda sin fin, overlap, escenario vacío
- [ ] Performance: memoización, virtualización si es necesario
- [ ] Accesibilidad básica (roles ARIA, navegación por teclado)
- [ ] Testing final cross-browser y cross-device
