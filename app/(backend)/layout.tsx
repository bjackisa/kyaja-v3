import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import Sidebar from "@/components/back-end/Sidebar";
import Header from "@/components/back-end/Header";

export default async function BackLayout({ children }:any) {
  const session = await getServerSession(authOptions);
  // console.log(session?.user)
  if (!session) {
    redirect("/login?returnUrl=/dashboard");
  }
  return (
    <div className="relative min-h-screen bg-neutral-950 text-gray-100">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black via-neutral-950 to-neutral-900"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,#f97316_0,transparent_30%)] opacity-10"
        aria-hidden
      />
      <div className="relative z-10 grid min-h-screen w-full md:grid-cols-[240px_1fr] lg:grid-cols-[300px_1fr]">
        <div className="border-r border-orange-500/10 bg-black/40 backdrop-blur">
          <Sidebar session={session} />
        </div>
        <div className="flex flex-col bg-black/30 backdrop-blur">
          <Header session={session} />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8">
            <div className="rounded-3xl border border-orange-500/10 bg-neutral-900/60 p-4 lg:p-6 shadow-lg shadow-black/20">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
