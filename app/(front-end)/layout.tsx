import "../globals.css";
import StoreShell from "@/components/layout/StoreShell";

export default async function FrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreShell>
      {children}
    </StoreShell>
  );
}

