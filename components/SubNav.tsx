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
  Gift,
  Zap,
  CreditCard,
  BadgeCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import CustomImage from "./ui/CustomImage";
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

import { formatMoney } from "@/lib/formatMoney";

type SpotlightProduct = {
  title: string;
  slug: string;
  imageUrl: string | null;
  productPrice: number;
  salePrice: number;
  isDiscount: boolean;
  discount: number | null;
};

type PromoItem =
  | {
      type: "message";
      icon: LucideIcon;
      title: string;
      subtitle?: string;
      href?: string;
      badge?: string;
    }
  | {
      type: "spotlight";
      icon: LucideIcon;
      badge?: string;
    };

const BASE_PROMO_ITEMS: PromoItem[] = [
  {
    type: "message",
    icon: Gift,
    title: "Gift Hampers Available",
    subtitle: "A Gift Today, A Memory Forever",
    href: "/d/gift-hampers",
    badge: "HOT",
  },
  {
    type: "message",
    icon: Zap,
    title: "Expedited Delivery",
    subtitle: "Greater Kampala delivery in 3 hours",
    badge: "FAST",
  },
  {
    type: "message",
    icon: CreditCard,
    title: "Pay on Delivery",
    subtitle: "MTN Money / Airtel Money / Cash",
  },
  {
    type: "message",
    icon: BadgeCheck,
    title: "Genuine Products Only",
    subtitle: "Quality checked before delivery",
  },
  {
    type: "spotlight",
    icon: Sparkles,
    badge: "DEAL",
  },
];

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

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
  const [promoItems, setPromoItems] = useState<PromoItem[]>(() =>
    shuffle(BASE_PROMO_ITEMS)
  );
  const [isPromoPaused, setIsPromoPaused] = useState(false);
  const [spotlight, setSpotlight] = useState<SpotlightProduct | null>(null);
  
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
      if (isPromoPaused) return;
      setCurrentPromoIndex((prev) => (prev + 1) % promoItems.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isPromoPaused, promoItems.length]);

  useEffect(() => {
    const refresh = async () => {
      try {
        const res = await fetch("/api/products/spotlight", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as SpotlightProduct | null;
        setSpotlight(data);
      } catch {
        // ignore
      }
    };

    refresh();
    const interval = setInterval(refresh, 60_000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Occasionally reshuffle so it doesn't feel like a fixed loop.
    const interval = setInterval(() => {
      setPromoItems((prev) => shuffle(prev));
      setCurrentPromoIndex(0);
    }, 1000 * 60 * 5);
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
      <div
        className="bg-gradient-to-r from-[#ff6a00] via-[#ff4747] to-[#ff6a00] text-white px-3 sm:px-4 overflow-hidden relative"
        onMouseEnter={() => setIsPromoPaused(true)}
        onMouseLeave={() => setIsPromoPaused(false)}
      >
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-6 -left-10 h-20 w-40 bg-white/20 blur-2xl animate-pulse" />
          <div className="absolute -bottom-8 right-0 h-20 w-56 bg-black/20 blur-2xl animate-pulse" />
        </div>

        <div className="max-w-screen-2xl mx-auto relative py-2">
          <div className="relative min-h-10 sm:min-h-9">
            {promoItems.map((item, index) => {
              const isActive = index === currentPromoIndex;

              const baseClass = `absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${
                isActive
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-3 scale-[0.98]"
              }`;

              if (item.type === "spotlight") {
                const p = spotlight;
                const href = p?.slug ? `/p/${p.slug}` : "/deals";
                const displayPrice =
                  p && p.salePrice > 0 ? p.salePrice : p?.productPrice;
                const showDiscount =
                  !!p && (p.isDiscount || (p.salePrice > 0 && p.salePrice < p.productPrice));
                const discountPct =
                  p && p.productPrice > 0 && p.salePrice > 0 && p.salePrice < p.productPrice
                    ? Math.round(((p.productPrice - p.salePrice) / p.productPrice) * 100)
                    : p?.discount ?? null;

                return (
                  <Link
                    key={index}
                    href={href}
                    className={baseClass}
                    style={{ pointerEvents: isActive ? "auto" : "none" }}
                  >
                    <div className="group flex items-center justify-center gap-2 sm:gap-3 rounded-full bg-white/15 backdrop-blur-md px-3 py-2 ring-1 ring-white/20 hover:bg-white/20 transition-colors w-[95%] max-w-screen-2xl">
                      <item.icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                      <div className="flex items-center justify-center gap-2 min-w-0">
                        <span className="hidden sm:inline text-[11px] font-extrabold tracking-wider uppercase bg-black/25 px-2 py-0.5 rounded-full">
                          {item.badge ?? "SPOTLIGHT"}
                        </span>
                        <div className="min-w-0 text-center">
                          <div className="text-[11px] sm:text-xs font-extrabold tracking-wide uppercase truncate">
                            {p?.title ?? "Deal of the Moment"}
                          </div>
                          <div className="text-[10px] sm:text-[11px] text-white/90 font-semibold truncate">
                            UGX {displayPrice ? formatMoney(displayPrice) : "--"}
                            {showDiscount && discountPct ? (
                              <span className="ml-2 text-[10px] font-extrabold bg-white text-[#ff4747] px-1.5 py-0.5 rounded-full">
                                -{discountPct}%
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <span className="hidden sm:inline text-[10px] font-bold text-white/90 group-hover:text-white transition-colors">
                        Tap to view
                      </span>
                    </div>
                  </Link>
                );
              }

              return (
                <Link
                  key={index}
                  href={item.href ?? "#"}
                  className={baseClass}
                  style={{ pointerEvents: isActive && item.href ? "auto" : "none" }}
                >
                  <div className="group flex items-center justify-center gap-2 sm:gap-3 rounded-full bg-white/15 backdrop-blur-md px-3 py-2 ring-1 ring-white/20 hover:bg-white/20 transition-colors w-[95%] max-w-screen-2xl">
                    <item.icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                    <div className="min-w-0 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-[11px] sm:text-xs font-extrabold tracking-wide uppercase truncate">
                          {item.title}
                        </span>
                        {item.badge ? (
                          <span className="text-[10px] font-extrabold bg-black/25 px-2 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        ) : null}
                      </div>
                      {item.subtitle ? (
                        <div className="text-[10px] sm:text-[11px] text-white/90 font-semibold truncate">
                          {item.subtitle}
                        </div>
                      ) : null}
                    </div>
                    {item.href ? (
                      <span className="hidden sm:inline text-[10px] font-bold text-white/90 group-hover:text-white transition-colors">
                        Explore
                      </span>
                    ) : null}
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="hidden sm:flex justify-center gap-1.5 mt-1">
            {promoItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPromoIndex(index)}
                className={`h-1 rounded-full transition-all ${
                  index === currentPromoIndex
                    ? "bg-white w-4"
                    : "bg-white/40 w-1.5 hover:bg-white/60"
                }`}
                aria-label={`Go to promotion ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Header - AliExpress Style */}
      <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${isScrolled ? 'shadow-md' : 'border-b border-gray-200'}`}>
        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <div className="max-w-screen-2xl mx-auto px-6">
            <div className="flex items-center justify-between h-16">
              {/* Left Section - Logo */}
              <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
                <div className="relative">
                  <CustomImage
                    src="/logo.svg"
                    alt="Kyaja"
                    width={40}
                    height={40}
                    className="w-10 h-10 transition-transform group-hover:scale-105"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-extrabold text-[#ff6a00] tracking-tight">KYAJA</h1>
                  <p className="text-[10px] text-gray-500 -mt-0.5 font-medium">Shop Smart, Live Better</p>
                </div>
              </Link>

              {/* Center Section - Search */}
              <div className="flex flex-1 max-w-3xl mx-6">
                <div className="w-full">
                  <div className="relative group">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Search for products, brands and more..."
                      className="w-full h-10 pl-11 pr-24 rounded-md border border-gray-300 focus:border-[#ff6a00] focus:outline-none focus:ring-2 focus:ring-[#ff6a00]/20 transition-all bg-white text-sm text-gray-900 placeholder-gray-400"
                    />
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#ff6a00] transition-colors" />
                    <button
                      onClick={handleSearchSubmit}
                      className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#ff6a00] hover:bg-[#ff8534] text-white px-5 py-1.5 rounded text-sm font-semibold transition-colors shadow-sm"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Section - Actions */}
              <div className="flex items-center gap-1 flex-shrink-0">
                {/* Location */}
                <button className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 hover:bg-gray-50 rounded-md transition-colors group">
                  <MapPin className="w-4 h-4 text-gray-500 group-hover:text-[#ff6a00] transition-colors" />
                  <div className="text-left">
                    <p className="text-[10px] text-gray-400 leading-tight">Ship to</p>
                    <p className="text-xs font-semibold text-gray-700">Uganda</p>
                  </div>
                </button>

                {/* Account Section */}
                {user ? (
                  <UserAvatar user={user} />
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-1.5 px-3 py-1.5 hover:bg-gray-50 rounded-md transition-colors group"
                  >
                    <User className="w-4 h-4 text-gray-500 group-hover:text-[#ff6a00] transition-colors" />
                    <div className="text-left">
                      <p className="text-[10px] text-gray-400 leading-tight">Hello, Sign in</p>
                      <p className="text-xs font-semibold text-gray-700">Account</p>
                    </div>
                  </Link>
                )}

                {/* Support */}
                <button
                  onClick={() => setShowSupportModal(true)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 hover:bg-gray-50 rounded-md transition-colors group"
                >
                  <MessageSquare className="w-4 h-4 text-gray-500 group-hover:text-[#ff6a00] transition-colors" />
                  <div className="text-left">
                    <p className="text-[10px] text-gray-400 leading-tight">Customer</p>
                    <p className="text-xs font-semibold text-gray-700">Support</p>
                  </div>
                </button>

                {/* Cart */}
                <Link
                  href="/cart"
                  className="relative p-2 hover:bg-gray-50 rounded-md transition-colors group ml-1"
                >
                  <ShoppingCart className="w-5 h-5 text-gray-700 group-hover:text-[#ff6a00] transition-colors" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-[#ff4747] text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
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

        {/* Mobile Navigation - AliExpress Style */}
        <div className="lg:hidden">
          <div className="px-3 py-2.5">
            {/* Logo - Compact */}
            <Link href="/" className="flex items-center justify-center gap-2 group mb-2.5">
              <CustomImage
                src="/logo.svg"
                alt="Kyaja"
                width={28}
                height={28}
                className="w-7 h-7"
              />
              <div>
                <h1 className="text-base font-extrabold text-[#ff6a00] tracking-tight leading-none">KYAJA</h1>
                <p className="text-[9px] text-gray-500 leading-none font-medium">Shop Smart, Live Better</p>
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
                className="w-full h-9 pl-9 pr-16 rounded-md border border-gray-300 focus:border-[#ff6a00] focus:outline-none focus:ring-1 focus:ring-[#ff6a00]/30 transition-all bg-white text-gray-900 text-xs"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <button
                onClick={handleSearchSubmit}
                className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#ff6a00] hover:bg-[#ff8534] text-white px-3 py-1.5 rounded text-xs font-semibold transition-colors"
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
