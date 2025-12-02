"use client";
import FAQsSection from "@/components/FAQsSection";

export default function FAQs() {
  return (
    <main className="relative min-h-screen text-white">

      <section className="relative">

        <div
          className="
            absolute inset-0
            bg-[url('/fondo2.jpeg')]
            bg-cover bg-center bg-no-repeat bg-fixed
            -z-20
          "
        />
    <div className="absolute inset-0 bg-black/60" />


        <div className="relative z-10">
          <FAQsSection />
        </div>

      </section>

    </main>
  );
}
