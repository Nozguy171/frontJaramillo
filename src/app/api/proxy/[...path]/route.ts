// src/app/api/proxy/[...path]/route.ts
import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const BACKEND = process.env.BACKEND_URL ?? "http://localhost:5051";

const join = (p: string[]) => p.join("/");

function forwardHeaders(req: NextRequest) {
  const h = new Headers();
  for (const [k, v] of req.headers) {
    if (/^host$|^connection$|^content-length$/i.test(k)) continue;
    h.set(k, v);
  }
  return h;
}

async function proxyFetch(target: string, init: RequestInit) {
  return fetch(target, { ...init, cache: "no-store", redirect: "follow" });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  const target = `${BACKEND}/${join(params.path)}${req.nextUrl.search}`;
  const headers = forwardHeaders(req);
  const resp = await proxyFetch(target, { method: "GET", headers });
  return new Response(resp.body, { status: resp.status, headers: resp.headers });
}

export async function POST(req: NextRequest, { params }: { params: { path: string[] } }) {
  const target = `${BACKEND}/${join(params.path)}${req.nextUrl.search}`; // 👈 añade query
  const headers = forwardHeaders(req);
  const body = await req.arrayBuffer();
  const resp = await proxyFetch(target, { method: "POST", headers, body });
  return new Response(resp.body, { status: resp.status, headers: resp.headers });
}

export async function PUT(req: NextRequest, { params }: { params: { path: string[] } }) {
  const target = `${BACKEND}/${join(params.path)}${req.nextUrl.search}`; // 👈 añade query
  const headers = forwardHeaders(req);
  const body = await req.arrayBuffer();
  const resp = await proxyFetch(target, { method: "PUT", headers, body });
  return new Response(resp.body, { status: resp.status, headers: resp.headers });
}

export async function PATCH(req: NextRequest, { params }: { params: { path: string[] } }) {
  const target = `${BACKEND}/${join(params.path)}${req.nextUrl.search}`; // 👈 añade query
  const headers = forwardHeaders(req);
  const body = await req.arrayBuffer();
  const resp = await proxyFetch(target, { method: "PATCH", headers, body });
  return new Response(resp.body, { status: resp.status, headers: resp.headers });
}

export async function DELETE(req: NextRequest, { params }: { params: { path: string[] } }) {
  const target = `${BACKEND}/${join(params.path)}${req.nextUrl.search}`;
  const headers = forwardHeaders(req);
  const resp = await proxyFetch(target, { method: "DELETE", headers });
  return new Response(resp.body, { status: resp.status, headers: resp.headers });
}
