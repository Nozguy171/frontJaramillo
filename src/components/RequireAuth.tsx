"use client";
import { AuthGuard } from "./RouteGuards";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
