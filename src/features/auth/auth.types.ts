import type { Id } from "@convex/_generated/dataModel";

export interface UserIdentity {
  userId: Id<"users">;
  username: string;
  deviceToken: string;
}

/** Key para el deviceToken en localStorage */
export const DEVICE_TOKEN_KEY = "cosquin-rock-device-token";

/** Key para el userId en localStorage (cache) */
export const USER_ID_KEY = "cosquin-rock-user-id";

/** Key para la identidad completa cacheada en localStorage */
export const IDENTITY_CACHE_KEY = "cosquin-rock-identity";
