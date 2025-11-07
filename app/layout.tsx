import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { DM_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Providers from "@/context/Providers";
import { CartProvider } from "@/components/CartContext";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { ReactNode } from "react";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { Toaster } from "@/components/ui/sonner";

interface RootLayoutProps {
  children: ReactNode;
}

const inter = DM_Sans({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://kyajastoreug.com"),
  title: {
    default: "Kyaja Store Ug UG - Your One-Stop Shop for All Your Needs",
    template: "%s | Kyaja Store Ug UG",
  },
  description:
    "Discover a wide range of quality products at Kyaja-Store Ug UG, located in Kampala downtown. Explore our extensive collection, including fashion, electronics, and more. From the latest gadgets to trendy fashion, we've got it all. Call us at +256 752 815998 for personalized assistance and unbeatable deals.",
  applicationName: "Next.js",
  keywords: [
    "Kyaja Store Ug UG",
    "Kampala downtown",
    "electronics",
    "fashion",
    "gadgets",
    "trendy fashion",
    "personalized assistance",
    "unbeatable deals",
    "one-stop shop",
    "quality products",
    "tech accessories",
    "home appliances",
    "affordable fashion",
    "student discounts",
    "local business",
    "convenient shopping",
    "online store",
    "best prices",
    "customer satisfaction",
    "top brands",
    "latest trends",
  ],
  author: "Collinz",
  publisher: "Kyaja Store Ug UG",
  alternates: {
    canonical: "https://kyajastoreug.com",
    languages: {
      en: "https://kyajastoreug.com",
    },
  },
  creator: {
    name: "Collinz",
  },
  openGraph: {
    title: {
      default: "Kyaja Store UG - Your One-Stop Shop for All Your Needs",
      template: "%s | Kyaja Store Ug UG",
    },
    description:
      "Discover a wide range of quality products at Kyaja Store Ug UG, located in Kampala downtown. Explore our extensive collection, including fashion, electronics, and more. From the latest gadgets to trendy fashion, we've got it all. Call us at +256 752 815998 for personalized assistance and unbeatable deals.",
    url: "https://kyajastoreug.com",
    siteName: "Kyaja Store Ug",
    type: "website",
    locale: "en_US",
  },
};

// app/layout.tsx (Root Layout)
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <Providers>
            <CartProvider>
              <ToastContainer />
              {children}
              <Analytics />
              <Toaster />
            </CartProvider>
          </Providers>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
