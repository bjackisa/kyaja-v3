import localFont from "next/font/local";
import "../globals.css";
import SubNav from "@/components/SubNav";
import ShopHeader from "@/components/ShopHeader";
import Footer from "@/components/Footer";
import { getData } from "@/lib/getData";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { Category, Product } from "@prisma/client";
import { getAllProducts } from "@/actions/products";
import { Toaster } from "react-hot-toast";

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
    const session = await getServerSession(authOptions);
    const [allCategories, products] = await Promise.all([
      getData("categories") as Promise<Category[]>,  
      getAllProducts() as Promise<Product[]>         
    ]);
  return (
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative lg:px-0 md:px-0 px-0 min-h-screen`}
      >
        <SubNav/>
  
        <div className="overflow-hidden lg:mt-0 md:mt-0 mt-[10%]">{children}</div>
        <Footer />

        <Toaster
           position="top-center"
           reverseOrder={false}
         />
      </body>
  );
}
