import localFont from "next/font/local";
import Footer from "@/components/Footer";
import SubNav from "@/components/SubNav";
import BottomTabs from "@/components/front-end/bottom-tabs";
import React from "react";

const geistSans = localFont({
  src: "../../app/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "../../app/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function StoreShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen bg-neutral-950 text-gray-100`}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-neutral-900"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#f97316_0,transparent_30%)] opacity-10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0,#fb923c_0,transparent_30%)] opacity-5"
        aria-hidden
      />
      <div className="relative z-10 flex min-h-screen flex-col">
        <div className="sticky top-0 z-30 shadow-lg shadow-orange-500/10">
          <SubNav />
        </div>

        <main className="flex-1">
          <div className="mx-auto w-full max-w-screen-2xl px-3 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-10 space-y-6">
            <div className="rounded-3xl border border-orange-500/10 bg-black/40 p-4 sm:p-6 lg:p-8 backdrop-blur">
              {children}
            </div>
          </div>
        </main>

        <Footer />
        <BottomTabs />
      </div>
    </div>
  );
}

