import axios, { type AxiosError } from "axios";

export const BACKEND_URL: string =
  (import.meta.env["VITE_BACKEND_URL"] as string | undefined) || "https://api.yourdomain.com";

export const TOKEN_KEY = "sas_token";
export const USER_KEY = "sas_user";

export const tokenStore = {
  get: () => (typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY)),
  set: (t: string) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};

export const api = axios.create({ baseURL: BACKEND_URL, timeout: 6000 });

api.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (error: AxiosError) => {
    if (error.response?.status === 401 && typeof window !== "undefined") tokenStore.clear();
    return Promise.reject(error);
  },
);

/** Network-level failure (backend unreachable) → caller should use demo fallback. */
export function isOffline(e: unknown) {
  const err = e as AxiosError;
  return !err?.response;
}

/** Run a request; if the backend is unreachable, resolve with fallback data instead. */
export async function withFallback<T>(req: () => Promise<T>, fallback: () => T | Promise<T>): Promise<{ data: T; demo: boolean }> {
  try {
    return { data: await req(), demo: false };
  } catch (e) {
    if (isOffline(e)) return { data: await fallback(), demo: true };
    throw e;
  }
}

export async function checkBackendHealth(): Promise<boolean> {
  try {
    await api.get("/health", { timeout: 3000 });
    return true;
  } catch {
    return false;
  }
}
