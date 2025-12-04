"use client"
import Link from "next/link"
import { ArrowUp, Facebook, Instagram, Youtube, Music2 } from "lucide-react"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-[#f5f5f5] border-t border-gray-200 mt-8">
      {/* Back to Top Button */}
      <div className="flex justify-center bg-white border-b border-gray-200">
        <button
          onClick={scrollToTop}
          className="group flex items-center gap-2 px-8 py-3 text-xs font-semibold text-gray-600 transition-all hover:text-[#ff6a00] uppercase tracking-wide"
          aria-label="Back to top"
        >
          <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
          <span>BACK TO TOP</span>
        </button>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-screen-2xl mx-auto px-6 py-8">
        {/* Social Icons */}
        <div className="flex justify-center items-center gap-2.5 mb-6">
          <Link
            href="https://www.facebook.com/profile.php?id=61561792047966&mibextid=ZbWKwL"
            className="group relative p-2 rounded-full bg-white border border-gray-300 text-gray-600 transition-all hover:bg-[#ff6a00] hover:text-white hover:border-[#ff6a00] hover:scale-105 shadow-sm"
            aria-label="Facebook"
          >
            <Facebook className="h-4 w-4" />
          </Link>
          <Link
            href="https://youtube.com/@kyajacom?si=ifzRHWSyzvtCcUFL"
            className="group relative p-2 rounded-full bg-white border border-gray-300 text-gray-600 transition-all hover:bg-[#ff6a00] hover:text-white hover:border-[#ff6a00] hover:scale-105 shadow-sm"
            aria-label="YouTube"
          >
            <Youtube className="h-4 w-4" />
          </Link>
          <Link
            href="https://www.tiktok.com/@kyajalogistics?_t=8p0SZ58LZlV&_r=1"
            className="group relative p-2 rounded-full bg-white border border-gray-300 text-gray-600 transition-all hover:bg-[#ff6a00] hover:text-white hover:border-[#ff6a00] hover:scale-105 shadow-sm"
            aria-label="TikTok"
          >
            <Music2 className="h-4 w-4" />
          </Link>
          <Link
            href="https://www.instagram.com/kyaja_logistics?igsh=MWpldmgwcWdpdDFxMA=="
            className="group relative p-2 rounded-full bg-white border border-gray-300 text-gray-600 transition-all hover:bg-[#ff6a00] hover:text-white hover:border-[#ff6a00] hover:scale-105 shadow-sm"
            aria-label="Instagram"
          >
            <Instagram className="h-4 w-4" />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-3 text-xs mb-6 px-3">
          <Link
            href="https://wa.me/+256752815998?text=Hello%20Customer%20Care"
            className="text-gray-600 transition-colors hover:text-[#ff6a00] font-medium"
          >
            Chat With Us
          </Link>
          <span className="text-gray-300">|</span>
          <Link
            href="https://wa.me/+256752815998?text=Hello%20Customer%20Care"
            className="text-gray-600 transition-colors hover:text-[#ff6a00] font-medium"
          >
            Help Center
          </Link>
          <span className="text-gray-300">|</span>
          <Link
            href="https://wa.me/+256752815998?text=Hello%20Customer%20Care"
            className="text-gray-600 transition-colors hover:text-[#ff6a00] font-medium"
          >
            Contact Us
          </Link>
          <span className="text-gray-300">|</span>
          <Link
            href="https://wa.me/+256752815998?text=Hello%20Customer%20Care"
            className="text-gray-600 transition-colors hover:text-[#ff6a00] font-medium"
          >
            Terms & Conditions
          </Link>
          <span className="text-gray-300">|</span>
          <Link
            href="https://wa.me/+256752815998?text=Hello%20Customer%20Care"
            className="text-gray-600 transition-colors hover:text-[#ff6a00] font-medium"
          >
            Report a Product
          </Link>
        </nav>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-4 text-center">
          <p className="text-xs text-gray-500">
            © {currentYear} Kyaja Logistics • URSB: G240605-2816 • All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
