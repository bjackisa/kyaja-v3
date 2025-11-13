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
    <footer className="w-full bg-gradient-to-b from-neutral-900 to-black border-t border-orange-500/20">
      {/* Back to Top Button */}
      <div className="flex justify-center border-b border-orange-500/10">
        <button
          onClick={scrollToTop}
          className="group flex items-center gap-2 px-6 py-3 text-sm font-medium text-white/80 transition-all hover:text-orange-500"
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
          <span>BACK TO TOP</span>
        </button>
      </div>

      {/* Main Footer Content */}
      <div className="px-6 py-6">
        {/* Social Icons */}
        <div className="flex justify-center items-center gap-3 mb-6">
          <Link
            href="https://www.facebook.com/profile.php?id=61561792047966&mibextid=ZbWKwL"
            className="group relative p-2.5 rounded-full bg-black border border-orange-500/30 text-orange-500 transition-all hover:bg-orange-500 hover:text-black hover:scale-110 hover:shadow-lg hover:shadow-orange-500/30"
            aria-label="Facebook"
          >
            <Facebook className="h-4 w-4" />
          </Link>
          <Link
            href="https://youtube.com/@kyajacom?si=ifzRHWSyzvtCcUFL"
            className="group relative p-2.5 rounded-full bg-black border border-orange-500/30 text-orange-500 transition-all hover:bg-orange-500 hover:text-black hover:scale-110 hover:shadow-lg hover:shadow-orange-500/30"
            aria-label="YouTube"
          >
            <Youtube className="h-4 w-4" />
          </Link>
          <Link
            href="https://www.tiktok.com/@kyajalogistics?_t=8p0SZ58LZlV&_r=1"
            className="group relative p-2.5 rounded-full bg-black border border-orange-500/30 text-orange-500 transition-all hover:bg-orange-500 hover:text-black hover:scale-110 hover:shadow-lg hover:shadow-orange-500/30"
            aria-label="TikTok"
          >
            <Music2 className="h-4 w-4" />
          </Link>
          <Link
            href="https://www.instagram.com/kyaja_logistics?igsh=MWpldmgwcWdpdDFxMA=="
            className="group relative p-2.5 rounded-full bg-black border border-orange-500/30 text-orange-500 transition-all hover:bg-orange-500 hover:text-black hover:scale-110 hover:shadow-lg hover:shadow-orange-500/30"
            aria-label="Instagram"
          >
            <Instagram className="h-4 w-4" />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-4 text-xs mb-6 px-3">
          <Link
            href="https://wa.me/+256752815998?text=Hello%20Customer%20Care"
            className="text-white/70 transition-colors hover:text-orange-500"
          >
            Chat With Us
          </Link>
          <span className="text-orange-500/30">•</span>
          <Link
            href="https://wa.me/+256752815998?text=Hello%20Customer%20Care"
            className="text-white/70 transition-colors hover:text-orange-500"
          >
            Help Center
          </Link>
          <span className="text-orange-500/30">•</span>
          <Link
            href="https://wa.me/+256752815998?text=Hello%20Customer%20Care"
            className="text-white/70 transition-colors hover:text-orange-500"
          >
            Contact Us
          </Link>
          <span className="text-orange-500/30">•</span>
          <Link
            href="https://wa.me/+256752815998?text=Hello%20Customer%20Care"
            className="text-white/70 transition-colors hover:text-orange-500"
          >
            Terms & Conditions
          </Link>
          <span className="text-orange-500/30">•</span>
          <Link
            href="https://wa.me/+256752815998?text=Hello%20Customer%20Care"
            className="text-white/70 transition-colors hover:text-orange-500"
          >
            Report a Product
          </Link>
        </nav>

        {/* Copyright */}
        <div className="border-t border-orange-500/10 pt-4 text-center">
          <p className="text-xs text-white/60">
            © {currentYear} Kyaja Logistics • URSB: G240605-2816 • All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
