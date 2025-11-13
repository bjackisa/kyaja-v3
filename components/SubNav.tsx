"use client";

import {
  Search,
  MapPin,
  ShoppingCart,
  MessageSquare,
  User,
  LogIn,
  X,
  Menu,
  Phone,
  Package,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useFetchDepartments } from "@/hooks/use-departments";
import { useCategories } from "@/hooks/use-categories";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getProfileByUserId } from "@/actions/UpdateUser";
import CategoryNav from "./ShopHeader";
import { MobileNavBar } from "./MobileNavBar";
import UserAvatar from "./UserAvatar";

const PROMO_MESSAGES = [
  "🎁 A Gift Today, A Memory Forever!! Share a Gift Hamper from Kyaja",
  "⚡ Expedited Delivery within Greater Kampala. Get your items in 3 hours",
  "🔥 Black November Deals!! Up to 60% off Genuine Products this Month!!"
];

export default function ModernHeader() {
  const { departments, isLoading } = useFetchDepartments();
  const { data: categories, isLoading: isLoadingCat } = useCategories();
  const cartItems = useSelector((store: any) => store.cart);
  const router = useRouter();
  const { data: Session } = useSession();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [profile, setProfile] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  
  const user = Session?.user;
  const profileImage = profile?.image || "https://utfs.io/f/8b034fb4-1f45-425a-8c57-a7a68835311f-2558r.png";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromoIndex((prev) => (prev + 1) % PROMO_MESSAGES.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) return;
      try {
        const fetchedProfile = await getProfileByUserId(user.id);
        setProfile(fetchedProfile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [user?.id]);

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  return (
    <>
      {/* Rotating Promotional Bar */}
      <div className="bg-gradient-to-r from-orange-500 to-black text-white py-3 px-4 overflow-hidden relative">
        <div className="max-w-screen-2xl mx-auto relative h-6">
          {PROMO_MESSAGES.map((message, index) => (
            <div
              key={index}
              className={`text-center text-sm font-medium transition-all duration-700 absolute inset-0 flex items-center justify-center ${
                index === currentPromoIndex
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{
                pointerEvents: index === currentPromoIndex ? "auto" : "none",
              }}
            >
              <div className="hidden sm:block whitespace-nowrap">
                {message}
              </div>
              <div className="sm:hidden w-full overflow-hidden">
                <div className="animate-scroll-text whitespace-nowrap inline-block">
                  {message}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Promo Navigation Dots - Desktop Only */}
        <div className="hidden sm:flex absolute bottom-1 left-1/2 -translate-x-1/2 gap-1.5">
          {PROMO_MESSAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPromoIndex(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                index === currentPromoIndex
                  ? "bg-white w-4"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to promotion ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 bg-white border-b transition-shadow duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-sm'}`}>
        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <div className="max-w-screen-2xl mx-auto px-4 lg:px-6">
            <div className="flex items-center justify-between h-20">
              {/* Left Section - Logo */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <Image
                    src="/logo.svg"
                    alt="Kyaja"
                    width={48}
                    height={48}
                    className="w-12 h-12 transition-transform group-hover:scale-110"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-black text-gray-900 tracking-tight">KYAJA</h1>
                  <p className="text-xs text-gray-500 -mt-1">Shop Smart, Live Better</p>
                </div>
              </Link>

              {/* Center Section - Search */}
              <div className="flex flex-1 max-w-2xl mx-8">
                <div className="w-full">
                  <div className="relative group">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Search for products, brands, categories..."
                      className="w-full h-12 pl-12 pr-12 rounded-full border-2 border-gray-200 focus:border-orange-500 focus:outline-none transition-colors bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-500"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    <button
                      onClick={handleSearchSubmit}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium transition-colors"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Section - Actions */}
              <div className="flex items-center gap-2 lg:gap-4">
                {/* Location */}
                <button className="hidden xl:flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors group">
                  <MapPin className="w-5 h-5 text-gray-600 group-hover:text-orange-500 transition-colors" />
                  <div className="text-left">
                    <p className="text-xs text-gray-500">Deliver to</p>
                    <p className="text-sm font-semibold text-gray-900">Uganda</p>
                  </div>
                </button>

                {/* Account Section */}
                {user ? (
                  <UserAvatar user={user} />
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors group"
                  >
                    <LogIn className="w-5 h-5 text-gray-700 group-hover:text-orange-500 transition-colors" />
                    <div className="text-left">
                      <p className="text-xs text-gray-500">Hello, Sign in</p>
                      <p className="text-sm font-semibold text-gray-900">Account</p>
                    </div>
                  </Link>
                )}

                {/* Support */}
                <button
                  onClick={() => setShowSupportModal(true)}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors group"
                >
                  <MessageSquare className="w-5 h-5 text-gray-600 group-hover:text-orange-500 transition-colors" />
                  <div className="text-left">
                    <p className="text-xs text-gray-500">Customer</p>
                    <p className="text-sm font-semibold text-gray-900">Support</p>
                  </div>
                </button>

                {/* Cart */}
                <Link
                  href="/cart"
                  className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors group"
                >
                  <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-orange-500 transition-colors" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>

          {/* Category Navigation */}
          <CategoryNav departments={departments} isLoading={isLoading || isLoadingCat} />
        </div>

        {/* Mobile Navigation - Simplified */}
        <div className="lg:hidden">
          <div className="px-3 py-2">
            {/* Logo Only - Compact */}
            <Link href="/" className="flex items-center justify-center gap-2 group mb-2">
              <Image
                src="/logo.svg"
                alt="Kyaja"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <div>
                <h1 className="text-lg font-black text-gray-900 tracking-tight leading-none">KYAJA</h1>
                <p className="text-[10px] text-gray-500 leading-none">Shop Smart, Live Better</p>
              </div>
            </Link>

            {/* Search Bar - Compact */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search products..."
                className="w-full h-9 pl-9 pr-16 rounded-full border border-gray-300 focus:border-orange-500 focus:outline-none transition-colors bg-gray-50 focus:bg-white text-gray-900 text-sm"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <button
                onClick={handleSearchSubmit}
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-medium transition-colors"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Menu */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-[9999]">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowMobileMenu(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl animate-slide-in-right">
            {/* Sidebar Header */}
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">
                  {user ? "My Account" : "Welcome!"}
                </h2>
                <button
                  onClick={() => setShowMobileMenu(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {user && (
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-lg p-3">
                  <Avatar className="w-12 h-12 border-2 border-white">
                    <AvatarImage src={profileImage} className="object-cover" />
                    <AvatarFallback className="bg-white text-orange-500">
                      {user.name?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{user.name}</p>
                    <p className="text-xs text-white/80 truncate">{user.email}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Content */}
            <div className="p-6 space-y-6 overflow-y-auto h-[calc(100%-200px)]">
              {user ? (
                <>
                  <div className="space-y-2">
                    <Link
                      href="/dashboard"
                      onClick={() => setShowMobileMenu(false)}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-500 transition-colors">
                        <User className="w-5 h-5 text-orange-500 group-hover:text-white transition-colors" />
                      </div>
                      <span className="font-medium text-gray-900">My Dashboard</span>
                    </Link>

                    <button
                      onClick={() => {
                        setShowMobileMenu(false);
                        setShowSupportModal(true);
                      }}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group w-full"
                    >
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                        <Package className="w-5 h-5 text-blue-500 group-hover:text-white transition-colors" />
                      </div>
                      <span className="font-medium text-gray-900">Orders & Returns</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-10 h-10 text-orange-500" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Join Kyaja Today
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Sign in to unlock exclusive deals and personalized shopping
                    </p>
                  </div>

                  <Link
                    href="/login"
                    onClick={() => setShowMobileMenu(false)}
                    className="block w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 rounded-xl font-semibold text-center hover:shadow-lg transition-all"
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/register"
                    onClick={() => setShowMobileMenu(false)}
                    className="block w-full border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-semibold text-center hover:bg-gray-50 transition-colors"
                  >
                    Create Account
                  </Link>
                </div>
              )}

              {/* Quick Links */}
              <div className="pt-6 border-t space-y-2">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Quick Links
                </h3>
                <button
                  onClick={() => {
                    setShowMobileMenu(false);
                    setShowSupportModal(true);
                  }}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors w-full"
                >
                  <MessageSquare className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-900">Customer Support</span>
                </button>
              </div>
            </div>

            {/* Mobile Categories */}
            <div className="p-6 border-t">
              <MobileNavBar allCategories={categories} />
            </div>
          </div>
        </div>
      )}

      {/* Support Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowSupportModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full animate-scale-in">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-1">We're Here to Help</h2>
                  <p className="text-white/90 text-sm">
                    Choose the best way to reach our support team
                  </p>
                </div>
                <button
                  onClick={() => setShowSupportModal(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="tel:0752815998"
                  className="group p-6 rounded-xl border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-all"
                >
                  <div className="w-12 h-12 bg-orange-100 group-hover:bg-orange-500 rounded-lg flex items-center justify-center mb-4 transition-colors">
                    <Phone className="w-6 h-6 text-orange-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Call Us Direct</h3>
                  <p className="text-sm text-gray-600">
                    Speak with our team now
                  </p>
                  <p className="text-orange-500 font-semibold mt-2">0752815998</p>
                </Link>

                <button
                  onClick={() => {
                    setShowSupportModal(false);
                  }}
                  className="group p-6 rounded-xl border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-all text-left"
                >
                  <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-500 rounded-lg flex items-center justify-center mb-4 transition-colors">
                    <Package className="w-6 h-6 text-blue-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Returns & Refunds</h3>
                  <p className="text-sm text-gray-600">
                    Manage your orders easily
                  </p>
                </button>

                <Link
                  href="https://wa.me/0752815998"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 rounded-xl border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all md:col-span-2"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 group-hover:bg-green-500 rounded-lg flex items-center justify-center transition-colors flex-shrink-0">
                      <MessageSquare className="w-6 h-6 text-green-500 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Chat on WhatsApp</h3>
                      <p className="text-sm text-gray-600">
                        Get instant support via WhatsApp messaging
                      </p>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600 text-center">
                  <span className="font-semibold text-gray-900">Support Hours:</span> Available 24/7 for your convenience
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes scroll-text {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }

        .animate-scroll-text {
          animation: scroll-text 12s linear infinite;
        }
      `}</style>
    </>
  );
}
