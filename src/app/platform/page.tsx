"use client";
import React from "react";
import AckerPlatform from "@/components/AckerPlatform";

export default function AckerPlatformPage() {
  return (
    <main className="min-h-screen text-white">
          <section className="relative">

  <div
    className="
      absolute inset-0
      bg-[url('/fondo7.jpeg')]
      bg-cover bg-center bg-no-repeat bg-fixed -z-20
    "
  />


      <div className="absolute inset-0 bg-black/50 relative" />

      <AckerPlatform />
      </section>
    </main>
  );
}
