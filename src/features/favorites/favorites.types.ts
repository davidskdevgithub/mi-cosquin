/** Key para favoritos en localStorage */
export const FAVORITES_STORAGE_KEY = "cosquin-rock-favorites";

export interface FavoritesContextValue {
  /** Set de nombres de bandas marcadas como favoritas */
  favorites: Set<string>;
  /** Toggle de favorito para una banda */
  toggleFavorite: (banda: string) => void;
  /** Consulta si una banda es favorita */
  isFavorite: (banda: string) => boolean;
  /** Indica si hay cambios pendientes de sincronizar con Convex */
  isSyncing: boolean;
  /** Cantidad de cambios pendientes */
  pendingCount: number;
}
