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
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar session={session} />
      <div className="flex flex-col">
        <Header session={session} />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
