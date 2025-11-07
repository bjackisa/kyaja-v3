"use client"
import Link from "next/link";
import { FaAngleUp, FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div style={{ backgroundColor:"#313133" }} className="w-full text-white text-center pb-6">
      <div className="flex justify-center mb-4 bg-[#3b3b3b] py-3 px-3">
        <button
          className="text-sm mb-2 bg-transparent text-white focus:outline-none flex flex-col items-center gap-2"
          onClick={scrollToTop}
        >
          <FaAngleUp size={20} />
          BACK TO TOP
        </button>
      </div>
      <div className="flex gap-2 justify-center items-center mt-5 mb-5">
        <Link className="p-2 rounded-[50%] bg-[#437bff]" href="https://www.facebook.com/profile.php?id=61561792047966&mibextid=ZbWKwL.">
          <FaFacebookF color="white" size={18} />
        </Link>
        <Link className="p-2 rounded-[50%] bg-[#d35d55]" href="https://youtube.com/@kyajacom?si=ifzRHWSyzvtCcUFL">
          <FaYoutube color="white" size={18} />
        </Link>
        <Link className="p-2 rounded-[50%] bg-[#34ea55]" href="https://www.tiktok.com/@kyajalogistics?_t=8p0SZ58LZlV&_r=1">
          <FaTiktok color="white" size={18} />
        </Link>
        <Link className="p-2 rounded-[50%] bg-[#bd32a2]" href="https://www.instagram.com/kyaja_logistics?igsh=MWpldmgwcWdpdDFxMA==">
          <FaInstagram color="white" size={18} />
        </Link>
      </div>

      <div className="flex flex-wrap justify-center gap-6 text-xs lg:text-sm mb-6 px-3">
        <Link href="https://wa.me/+256752815998?text=Hello%18Customer%20Care" className="hover:underline">CHAT WITH US</Link>
        <Link href="https://wa.me/+256752815998?text=Hello%20Customer%20Care" className="hover:underline">HELP CENTER</Link>
        <Link href="https://wa.me/+256752815998?text=Hello%20Customer%20Care" className="hover:underline">CONTACT US</Link>
        <Link href="https://wa.me/+256752815998?text=Hello%20Customer%20Care" className="hover:underline">TERMS & CONDITIONS</Link>
        <Link href="https://wa.me/+256752815998?text=Hello%20Customer%20Care" className="hover:underline">REPORT A PRODUCT</Link>
      </div>

      <div className="border-t border-[#6b6a6c] py-4 text-sm lg:mx-[30%] px-3">
        <p>All Rights Reserved</p>
      </div>
    </div>
  );
}
