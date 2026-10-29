import { api, tokenStore, USER_KEY, withFallback } from "./client";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "dealer";
}
export interface LoginResponse {
  token: string;
  user: AuthUser;
}

export const authApi = {
  async login(identifier: string, password: string) {
    const res = await withFallback(
      async () => (await api.post<LoginResponse>("/auth/login", { identifier, password })).data,
      () => {
        if (!identifier || password.length < 4) throw new Error("Invalid credentials");
        const role: AuthUser["role"] = identifier.toLowerCase().includes("admin") ? "admin" : "dealer";
        return {
          token: `demo.${btoa(identifier)}.${Date.now()}`,
          user: { id: "demo", name: identifier.split("@")[0], email: identifier, role },
        };
      },
    );
    tokenStore.set(res.data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(res.data.user));
    return res;
  },
  logout() {
    tokenStore.clear();
  },
  currentUser(): AuthUser | null {
    if (typeof window === "undefined") return null;
    try {
      return JSON.parse(localStorage.getItem(USER_KEY) || "null");
    } catch {
      return null;
    }
  },
};
