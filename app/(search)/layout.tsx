import "../globals.css";
import StoreShell from "@/components/layout/StoreShell";

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <StoreShell>{children}</StoreShell>;
}

