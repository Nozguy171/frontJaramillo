import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteNav from "@/components/SiteNav";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ACKER",
  description: "Segmentación y análisis con YOLO",
  manifest: "/manifest.webmanifest",
  themeColor: "#10b981",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="overscroll-none overflow-x-hidden">
      <head>
        <meta name="theme-color" content="#10b981" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-acker text-slate-100 overscroll-none`}>
        <div className="min-h-[100svh] flex flex-col">
          <SiteNav />
          <main className="flex-1">
            {children}
          </main>
        </div>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker
                    .register('/sw.js', { scope: '/' })
                    .catch(() => {});
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
