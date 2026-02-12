"use client";

import { api } from "@convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useOnlineStatus } from "@/features/pwa";
import type { UserIdentity } from "./auth.types";
import {
  DEVICE_TOKEN_KEY,
  IDENTITY_CACHE_KEY,
  USER_ID_KEY,
} from "./auth.types";

/**
 * Genera o recupera un deviceToken único de localStorage.
 */
const getOrCreateDeviceToken = (): string => {
  if (typeof window === "undefined") return "";
  let token = localStorage.getItem(DEVICE_TOKEN_KEY);
  if (!token) {
    token = crypto.randomUUID();
    localStorage.setItem(DEVICE_TOKEN_KEY, token);
  }
  return token;
};

/**
 * Lee la identidad cacheada de localStorage (para fallback offline).
 */
const readCachedIdentity = (): UserIdentity | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(IDENTITY_CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UserIdentity;
  } catch {
    return null;
  }
};

/**
 * Cachea la identidad en localStorage.
 */
const writeCachedIdentity = (identity: UserIdentity) => {
  localStorage.setItem(IDENTITY_CACHE_KEY, JSON.stringify(identity));
};

/**
 * Hook de identidad del usuario.
 *
 * - Genera un deviceToken único al primer uso
 * - Busca si existe un usuario registrado con ese token
 * - Cachea la identidad en localStorage para fallback offline
 * - Expone `register()` para crear cuenta con username
 * - Retorna `null` si el usuario es anónimo
 */
export const useIdentity = () => {
  const [deviceToken, setDeviceToken] = useState("");
  const [cachedIdentity, setCachedIdentity] = useState<UserIdentity | null>(
    null,
  );
  const isOnline = useOnlineStatus();

  useEffect(() => {
    setDeviceToken(getOrCreateDeviceToken());
    setCachedIdentity(readCachedIdentity());
  }, []);

  // Buscar usuario existente por deviceToken
  const existingUser = useQuery(
    api.users.getByDeviceToken,
    deviceToken ? { deviceToken } : "skip",
  );

  const registerMutation = useMutation(api.users.register);

  const register = useCallback(
    async (username: string, localFavorites: string[]) => {
      if (!deviceToken) return;
      try {
        const userId = await registerMutation({
          username,
          deviceToken,
          localFavorites,
        });
        localStorage.setItem(USER_ID_KEY, userId);
        const newIdentity: UserIdentity = { userId, username, deviceToken };
        writeCachedIdentity(newIdentity);
        setCachedIdentity(newIdentity);
      } catch (err) {
        console.error("[Auth] Registration failed:", err);
        throw err;
      }
    },
    [deviceToken, registerMutation],
  );

  // Convex responde → actualizar cache; Convex no responde → usar cache
  const identity: UserIdentity | null = useMemo(() => {
    if (existingUser) {
      const id: UserIdentity = {
        userId: existingUser._id,
        username: existingUser.username,
        deviceToken: existingUser.deviceToken,
      };
      writeCachedIdentity(id);
      return id;
    }
    if (!isOnline && cachedIdentity) {
      return cachedIdentity;
    }
    // existingUser es undefined (cargando) → usar cache
    // existingUser es null (no existe el usuario) → anónimo
    if (existingUser === undefined) {
      return cachedIdentity;
    }
    return null;
  }, [existingUser, cachedIdentity, isOnline]);

  return {
    identity,
    deviceToken,
    isLoading:
      deviceToken !== "" && existingUser === undefined && !cachedIdentity,
    register,
  };
};
