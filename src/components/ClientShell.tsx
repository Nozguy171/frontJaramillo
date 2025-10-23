"use client";

import dynamic from "next/dynamic";

import ToasterProvider from "@/components/ToasterProvider";

const UserBadge = dynamic(() => import("@/components/UserBadge"), { ssr: false });

export default function ClientShell() {
  return (
    <>
      <ToasterProvider />
      <UserBadge />
    </>
  );
}
