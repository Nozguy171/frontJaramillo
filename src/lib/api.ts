import axios from "axios";
import { getToken, clearAuth } from "./authStorage";

const API_BASE = "/api/proxy";

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Accept": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err?.response?.status === 401 && typeof window !== "undefined") {
      clearAuth();
      const back = encodeURIComponent(window.location.pathname + window.location.search);
      window.location.href = `/login?next=${back}`;
    }
    return Promise.reject(err);
  }
);

export async function loginRequest(correo: string, password: string) {
  const { data } = await api.post("/api/usuarios/login", { correo, password }, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
}

export async function signupRequest(correo: string, password: string) {
  const { data } = await api.post("/api/usuarios", { correo, password }, {
    headers: { "Content-Type": "application/json" },
  });
  return data;
}

export async function meRequest() {
  const { data } = await api.get("/api/usuarios/me", { headers: { "Cache-Control": "no-store" } });
  return data;
}
