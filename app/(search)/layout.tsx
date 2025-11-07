import localFont from "next/font/local";
import "../globals.css";
import Footer from "@/components/Footer";
import BottomTabs from "@/components/front-end/bottom-tabs";


const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export default async function FrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative lg:px-0 md:px-0 px-0 min-h-screen`}
      >
      
        <div className="overflow-hidden lg:mt-0 md:mt-0 mt-[2%]">{children}</div>
        <Footer />
        <BottomTabs />
      </body>
  );
}
