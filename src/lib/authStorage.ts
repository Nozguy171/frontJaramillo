const LS_TOKEN = "auth_token";
const LS_EMAIL = "auth_email";

function safeStorage() {
  if (typeof window === "undefined") {
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    };
  }
  return window.localStorage;
}

function safeSession() {
  if (typeof window === "undefined") {
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    };
  }
  return window.sessionStorage;
}

export function saveAuth(token: string, email: string, remember = false) {
  const ls = safeStorage();
  const ss = safeSession();
  if (remember) {
    ls.setItem(LS_TOKEN, token);
    ls.setItem(LS_EMAIL, email);
  } else {
    ss.setItem(LS_TOKEN, token);
    ss.setItem(LS_EMAIL, email);
  }
  if (typeof window !== "undefined") window.dispatchEvent(new Event("auth:change"));
}

export function clearAuth() {
  const ls = safeStorage();
  const ss = safeSession();
  ls.removeItem(LS_TOKEN);
  ls.removeItem(LS_EMAIL);
  ss.removeItem(LS_TOKEN);
  ss.removeItem(LS_EMAIL);
  if (typeof window !== "undefined") window.dispatchEvent(new Event("auth:change"));
}

export function getToken(): string | null {
  const ls = safeStorage();
  const ss = safeSession();
  return ls.getItem(LS_TOKEN) || ss.getItem(LS_TOKEN);
}

export function getEmail(): string | null {
  const ls = safeStorage();
  const ss = safeSession();
  return ls.getItem(LS_EMAIL) || ss.getItem(LS_EMAIL);
}
