"use client";

import {
  Search,
  MapPin,
  ChevronDown,
  ShoppingCart,
  MessageSquare,
  CornerDownLeft,
  User,
  LogIn,
  X,
  Menu,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";
import CategoryNav from "./ShopHeader";
import { MobileNavBar } from "./MobileNavBar";
import { useSession } from "next-auth/react";
import UserAvatar from "./UserAvatar";
import { Modal } from "flowbite-react";
import { useFetchDepartments } from "@/hooks/use-departments";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useCategories } from "@/hooks/use-categories";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Profile } from "next-auth";
import { getProfileByUserId } from "@/actions/UpdateUser";

export default function SubNav() {
  const { departments, isLoading } = useFetchDepartments();
  const { data: categories, isLoading: isLoadingCat } = useCategories();

  const cartItems = useSelector((store: any) => store.cart);
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const { data: Session } = useSession();
  const [openModal, setOpenModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [profile, setProfile] = useState(null);

  const [searchCategory, setSearchCategory] = useState("All");
  const user = Session?.user;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const profileImage =
    profile?.image ||
    "https://utfs.io/f/8b034fb4-1f45-425a-8c57-a7a68835311f-2558r.png";
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const fetchedProfile: Profile = await getProfileByUserId(user.id);
        setProfile(fetchedProfile);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [user?.id]);
  return (
    <header className="flex flex-col h-[60px] w-full">
      <div className="flex items-center bg-[#131921] px-4 text-white py-2 justify-between md:justify-center">
        {/* Logo */}
        <div className="flex items-center gap-1">
          <MobileNavBar allCategories={categories} />

          <a
            href="/"
            className="flex h-[50px] items-center border border-transparent px-2 py-1 hover:border-white"
          >
            <a className="flex items-center lg:gap-0 md:gap-0 gap-2" href="/">
              <Image
                src={"/logo.svg"}
                alt="kyaja logo"
                className="lg:w-[4rem] w-[3rem] h-[3rem] lg:h-[4rem] mt-4 "
                width={40}
                height={40}
              />
              <div className="flex flex-col">
                <span className="font-black text-xl uppercase text-white lg:block md:block hidden">
                  Kyaja
                </span>
              </div>
            </a>
          </a>
        </div>

        {/* Deliver To */}
        <button className="ml-2 hidden h-[50px] border border-transparent px-2 py-1 hover:border-white sm:flex cursor-not-allowed">
          <div className="flex items-end">
            <MapPin className="mr-1 h-4 w-4" />
            <div className="flex flex-col">
              <span className="text-xs text-gray-300">Deliver to</span>
              <span className="text-sm font-bold">Uganda</span>
            </div>
          </div>
        </button>

        {/* Search */}
        <div className="mx-4 flex-1 items-center md:flex hidden relative">
          <form onSubmit={handleSearch} className="flex h-10 w-full rounded-md">
            <button
              type="button"
              className="flex items-center justify-between rounded-l-md bg-[#f3f3f3] px-3 text-sm text-gray-700 hover:bg-gray-200"
            >
              {searchCategory}
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <input
              type="text"
              className="flex-1 border-none px-2 text-black outline-none"
              placeholder="Search products,categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="flex w-[45px] items-center justify-center rounded-r-md bg-[#febd69] hover:bg-orange-500"
            >
              <Search className="h-5 w-5 text-[#131921]" />
            </button>
          </form>
        </div>

        {/* Right Navigation */}
        <div className="flex items-center">
          {/* Language */}
          <div className="hidden h-[50px] border border-transparent px-2 py-1 hover:border-white lg:flex cursor-not-allowed">
            <div className="flex items-center">
              <Image
                src="https://cdn-icons-png.flaticon.com/128/555/555670.png"
                alt="US Flag"
                width={24}
                height={16}
                className="mr-1"
              />
              <span className="text-sm">EN</span>
              <ChevronDown className="ml-1 h-3 w-3" />
            </div>
          </div>

          {/* Account & Lists - Desktop */}
          {!user && (
            <Link
              href="/login"
              className="hidden h-[50px] border border-transparent px-2 py-1 hover:border-white lg:block"
            >
              <div className="flex flex-col">
                <span className="text-xs">Hello, sign in</span>
                <div className="flex items-center">
                  <span className="text-sm font-bold">Account & Lists</span>
                  <ChevronDown className="ml-1 h-3 w-3" />
                </div>
              </div>
            </Link>
          )}

          {/* Mobile Account Button */}
          <button
            onClick={() => setShowMobileMenu(true)}
            className="lg:hidden h-[50px] border border-transparent px-2 py-1 hover:border-white flex items-center"
          >
            {user ? (
              <div className="w-8 h-8 rounded-full bg-[#febd69] flex items-center justify-center">
                <Avatar>
                  <AvatarImage className="object-cover" src={profileImage} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            ) : (
              <LogIn className="h-6 w-6" />
            )}
          </button>
          {user && (
            <div className="lg:flex hidden">
              <UserAvatar user={user} />
            </div>
          )}
          {/* Returns & Orders */}
          <button
            onClick={() => setOpenModal(true)}
            className="hidden h-[50px] border border-transparent px-2 py-1 hover:border-white lg:block"
          >
            <div className="flex flex-col">
              <span className="text-xs">Returns</span>
              <span className="text-sm font-bold">& Orders</span>
            </div>
          </button>

          {/* Cart */}
          <Link
            href="/cart"
            className="flex h-[50px] items-center border border-transparent px-2 py-1 hover:border-white"
          >
            <div className="relative flex items-end">
              <ShoppingCart className="h-8 w-8" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#febd69] text-sm font-bold text-[#131921]">
                {cartItems.length}
              </span>
              <span className="ml-1 text-sm font-bold hidden sm:block">
                Cart
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="bg-[#131921]">
        <div className="mx-4 flex-1 items-center md:hidden flex relative">
          <form onSubmit={handleSearch} className="flex h-10 w-full rounded-md">
            <input
              type="text"
              className="flex-1 border-none px-2 text-black outline-none rounded-l-lg"
              placeholder="Search products,categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="flex w-[45px] items-center justify-center rounded-r-md bg-[#febd69] hover:bg-orange-500"
            >
              <Search className="h-5 w-5 text-[#131921]" />
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[10000] lg:hidden">
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 z-[10000]">
            <div className="flex items-center justify-between p-4 border-b bg-[#131921] text-white">
              <h2 className="text-lg font-semibold">
                {user ? "Account" : "Sign In"}
              </h2>
              <button
                onClick={() => setShowMobileMenu(false)}
                className="p-2 hover:bg-gray-700 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 ">
              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Avatar>
                      <AvatarImage
                        className="object-cover"
                        src={profileImage}
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Link
                      href="/dashboard"
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      <User className="h-5 w-5 text-gray-600" />
                      <span className="text-gray-900">My Account</span>
                    </Link>

                    <button
                      onClick={() => {
                        setShowMobileMenu(false);
                        setOpenModal(true);
                      }}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors w-full text-left"
                    >
                      <CornerDownLeft className="h-5 w-5 text-gray-600" />
                      <span className="text-gray-900">Returns & Orders</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center py-6">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <User className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Welcome to Kyaja
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Sign in to access your account and enjoy personalized
                      shopping
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Link
                      href="/login"
                      className="w-full bg-[#febd69] text-[#131921] py-3 px-4 rounded-lg font-medium text-center block hover:bg-orange-500 transition-colors"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      Sign In
                    </Link>

                    <Link
                      href="/register"
                      className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium text-center block hover:bg-gray-50 transition-colors"
                      onClick={() => setShowMobileMenu(false)}
                    >
                      Create Account
                    </Link>
                  </div>

                  <div className="pt-4 border-t">
                    <button
                      onClick={() => {
                        setShowMobileMenu(false);
                        setOpenModal(true);
                      }}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors w-full text-left"
                    >
                      <MessageSquare className="h-5 w-5 text-gray-600" />
                      <span className="text-gray-900">Customer Support</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Returns & Orders Modal */}
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          Need Help with Shopping, Talk to our Help Desk
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link
              href="tel:0752815998"
              className="flex items-center space-x-3 text-green-950 dark:text-slate-100 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center w-10 h-10 bg-lime-100 justify-center rounded-full">
                <MessageSquare className="w-6 h-6 text-lime-800" />
              </div>
              <span className="font-medium">Call Us Direct</span>
            </Link>

            <Link
              href="tel:0752815998"
              className="flex items-center space-x-3 text-green-950 dark:text-slate-100 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center w-10 h-10 bg-lime-100 justify-center rounded-full">
                <CornerDownLeft className="w-6 h-6 text-lime-800" />
              </div>
              <span className="font-medium">Returns and Refunds</span>
            </Link>

            <Link
              href="https://wa.me/0752815998"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-green-950 dark:text-slate-100 p-3 rounded-lg hover:bg-gray-50 transition-colors sm:col-span-2"
            >
              <div className="flex items-center w-10 h-10 bg-lime-100 justify-center rounded-full">
                <MessageSquare className="w-6 h-6 text-lime-800" />
              </div>
              <span className="font-medium">Chat with Us on WhatsApp</span>
            </Link>
          </div>
        </Modal.Body>
      </Modal>

      <CategoryNav
        departments={departments}
        isLoading={isLoading || isLoadingCat}
      />
    </header>
  );
}
