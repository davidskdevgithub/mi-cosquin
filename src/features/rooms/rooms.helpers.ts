import type {
  HeatmapEntry,
  HeatmapGroup,
  MemberWithFavorites,
  Room,
  RoomMember,
} from "./rooms.types";

const CACHE_KEYS = {
  myRooms: "cr_rooms_cache",
  heatmap: "cr_heatmap_cache",
  members: "cr_members_cache",
} as const;

interface CachedRoom extends Omit<Room, "_id"> {
  _id: string;
  _cachedAt: number;
}

interface CachedMember {
  userId: string;
  username: string;
  joinedAt: number;
  _cachedAt: number;
}

interface CachedHeatmapMember {
  userId: string;
  username: string;
  favorites: string[];
  _cachedAt: number;
}

const CACHE_TTL = 1000 * 60 * 30; // 30 minutos

/**
 * Procesa los datos crudos de miembros+favoritos en entradas de heatmap.
 * Retorna las bandas ordenadas por cantidad de coincidencias (desc).
 */
export const buildHeatmapEntries = (
  membersData: MemberWithFavorites[],
): HeatmapEntry[] => {
  const bandaMap = new Map<string, string[]>();

  for (const member of membersData) {
    for (const banda of member.favorites) {
      const existing = bandaMap.get(banda) ?? [];
      existing.push(member.username);
      bandaMap.set(banda, existing);
    }
  }

  return [...bandaMap.entries()]
    .map(([banda, members]) => ({
      banda,
      members,
      count: members.length,
    }))
    .filter((entry) => entry.count >= 2) // solo bandas con 2+ coincidencias
    .sort((a, b) => b.count - a.count);
};

/**
 * Agrupa las entradas del heatmap por nivel de coincidencia.
 */
export const groupHeatmapEntries = (
  entries: HeatmapEntry[],
  totalMembers: number,
): HeatmapGroup[] => {
  const groups: HeatmapGroup[] = [
    { label: "Todos van", minRatio: 1, entries: [] },
    { label: "La mayoría", minRatio: 0.6, entries: [] },
    { label: "Algunos", minRatio: 0, entries: [] },
  ];

  for (const entry of entries) {
    const ratio = entry.count / totalMembers;
    const group = groups.find((g) => ratio >= g.minRatio);
    if (group) {
      group.entries.push(entry);
    }
  }

  return groups.filter((g) => g.entries.length > 0);
};

/**
 * Genera la URL para unirse a una sala (usada en el QR).
 */
export const buildJoinUrl = (code: string): string => {
  if (typeof window === "undefined") return "";
  return `${window.location.origin}?sala=${code}`;
};

// ─── Offline Cache ───────────────────────────────────────────────────────────

const isClient = typeof window !== "undefined";

const getCache = <T>(key: string): T | null => {
  if (!isClient) return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
};

const setCache = <T>(key: string, data: T): void => {
  if (!isClient) return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Storage lleno o no disponible
  }
};

const isCacheValid = (cachedAt: number): boolean => {
  return Date.now() - cachedAt < CACHE_TTL;
};

// Rooms

export const readCachedRooms = (): Room[] | null => {
  const cached = getCache<CachedRoom[]>(CACHE_KEYS.myRooms);
  if (!cached || cached.length === 0) return null;
  if (!isCacheValid(cached[0]?._cachedAt)) return null;
  return cached.map((r) => ({
    _id: r._id as Room["_id"],
    code: r.code,
    name: r.name,
    createdBy: r.createdBy,
    createdAt: r.createdAt,
    memberCount: r.memberCount,
    creatorName: r.creatorName,
  }));
};

export const writeCachedRooms = (rooms: Room[]): void => {
  const toStore: CachedRoom[] = rooms.map((r) => ({
    ...r,
    _cachedAt: Date.now(),
  }));
  setCache(CACHE_KEYS.myRooms, toStore);
};

// Members (para room detail)

export const readCachedMembers = (
  roomId: string,
): { roomId: string; members: RoomMember[] } | null => {
  const allCached = getCache<
    Record<string, { members: CachedMember[]; cachedAt: number }>
  >(CACHE_KEYS.members);
  if (!allCached?.[roomId]) return null;
  if (!isCacheValid(allCached[roomId].cachedAt)) return null;
  return {
    roomId,
    members: allCached[roomId].members.map((m) => ({
      userId: m.userId as RoomMember["userId"],
      username: m.username,
      joinedAt: m.joinedAt,
    })),
  };
};

export const writeCachedMembers = (
  roomId: string,
  members: RoomMember[],
): void => {
  const allCached =
    getCache<Record<string, { members: CachedMember[]; cachedAt: number }>>(
      CACHE_KEYS.members,
    ) || {};
  allCached[roomId] = {
    members: members.map((m) => ({
      ...m,
      _cachedAt: Date.now(),
    })),
    cachedAt: Date.now(),
  };
  setCache(CACHE_KEYS.members, allCached);
};

// Heatmap

export const readCachedHeatmap = (
  roomId: string,
): MemberWithFavorites[] | null => {
  const allCached = getCache<
    Record<string, { data: CachedHeatmapMember[]; cachedAt: number }>
  >(CACHE_KEYS.heatmap);
  if (!allCached?.[roomId]) return null;
  if (!isCacheValid(allCached[roomId].cachedAt)) return null;
  return allCached[roomId].data.map((m) => ({
    userId: m.userId as MemberWithFavorites["userId"],
    username: m.username,
    favorites: m.favorites,
  }));
};

export const writeCachedHeatmap = (
  roomId: string,
  data: MemberWithFavorites[],
): void => {
  const allCached =
    getCache<Record<string, { data: CachedHeatmapMember[]; cachedAt: number }>>(
      CACHE_KEYS.heatmap,
    ) || {};
  allCached[roomId] = {
    data: data.map((d) => ({
      ...d,
      _cachedAt: Date.now(),
    })),
    cachedAt: Date.now(),
  };
  setCache(CACHE_KEYS.heatmap, allCached);
};

// Clear all cache

export const clearRoomsCache = (): void => {
  if (!isClient) return;
  localStorage.removeItem(CACHE_KEYS.myRooms);
  localStorage.removeItem(CACHE_KEYS.members);
  localStorage.removeItem(CACHE_KEYS.heatmap);
};
