"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  Plus,
  Power,
  Users,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ExternalLink,
  Home,
  Layers2,
  LayoutGrid,
  LayoutList,
  Presentation,
  Settings,
  Truck,
  User,
  Users2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
// import { sidebarLinks } from "@/config/sidebar";
import Image from "next/image";
import { MdEmail } from "react-icons/md";

export default function Sidebar({ session }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const role = session?.user?.role;
  const userId = session?.user?.id;

  const sidebarLinks = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
      dropdown: false,
      roles: ["ADMIN", "USER", "SECRETARY"],
    },
    {
      title: "Banners",
      href: "/dashboard/banners",
      icon: Presentation,
      dropdown: false,
      roles: ["ADMIN", "SECRETARY"],
    },
    {
      title: "Departments",
      href: "/dashboard/departments",
      icon: LayoutList,
      dropdown: false,
      roles: ["ADMIN", "SECRETARY"],
    },
    {
      title: "Products",
      icon: LayoutGrid,
      href: "/dashboard/products",
      dropdown: false,
      roles: ["ADMIN", "SECRETARY"],
    },
    {
      title: "Categories",
      icon: Layers2,
      href: "/dashboard/categories",
      dropdown: false,
      roles: ["ADMIN", "SECRETARY"],
    },
    {
      title: "Sub Categories",
      icon: LayoutList,
      href: "/dashboard/sub-categories",
      dropdown: false,
      roles: ["ADMIN", "SECRETARY"],
    },
    // {
    //   title: "App Theme",
    //   icon: LayoutList,
    //   href: "/dashboard/styles/new",
    //   dropdown: false,
    //   roles: ["ADMIN"],
    // },
    // {
    //   title: "Users",
    //   icon: Users,
    //   href: "/dashboard/users",
    //   dropdown: false,
    //   roles: ["ADMIN"],
    // },
    {
      title: "Customers",
      icon: Users2,
      href: "/dashboard/customers",
      dropdown: false,
      roles: ["ADMIN" , "SECRETARY"],
    },
    {
      title: "Prospects",
      icon: Users2,
      href: "/dashboard/prospects",
      dropdown: false,
      roles: ["ADMIN", "SECRETARY"],
    },
    {
      title: "Staff",
      icon: Users,
      href: "/dashboard/staff",
      dropdown: false,
      roles: ["ADMIN"],
    },
    {
      title: "Orders",
      icon: Truck,
      href: "/dashboard/orders",
      dropdown: false,
      roles: ["ADMIN"],
    },
    {
      title: "My Orders",
      icon: Truck,
      href: `/dashboard/customers/${userId}`,
      dropdown: false,
      roles: ["USER"],
    },
    {
      title: "Coming Soon",
      icon: MdEmail,
      href: `/dashboard/bulk-emails`,
      dropdown: false,
      roles: ["USER","ADMIN","SECRETARY"],
    },
    {
      title: "Profile",
      icon: User,
      href: "/dashboard/settings",
      dropdown: false,
      roles: ["ADMIN", "USER", "SECRETARY"],
    },
    {
      title: "Online Store",
      icon: ExternalLink,
      href: "/",
      dropdown: false,
      roles: ["ADMIN", "USER", "SECRETARY"],
    },
    // {
    //   title: "Settings",
    //   href: "/dashboard/settings",
    //   icon: Settings,
    //   dropdown: false,
    //   roles: ["ADMIN"],
    // },

    // {
    //   title: "Styles",
    //   href: "/dashboard/styles/new",
    //   icon: Settings,
    //   dropdown: false,
    //   roles: ["ADMIN"],
    // },
  ];
  const filteredSidebarLinks = sidebarLinks.filter((link) =>
    link.roles.includes(role)
  );
  return (
    <div className="hidden md:block relative bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700/50">
      <div className="flex h-full max-h-screen flex-col gap-2">
        {/* Header with Logo */}
        <div className="flex flex-shrink-0 h-16 items-center px-4 lg:px-6 border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
          <Link href="/" className="flex items-center gap-3 font-bold group">
            <div className="relative">
              <Image
                src="/logo.svg"
                alt="kyaja logo"
                className="w-10 h-10 transition-transform group-hover:scale-110 group-hover:rotate-12"
                width={300}
                height={300}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff6a00] to-[#ff4747] opacity-0 group-hover:opacity-20 rounded-full blur-xl transition-opacity" />
            </div>
            <span className="text-xl bg-gradient-to-r from-[#ff6a00] to-[#ff4747] bg-clip-text text-transparent">Kyaja Admin</span>
          </Link>
          <Button variant="ghost" size="icon" className="ml-auto h-9 w-9 hover:bg-slate-700/50 text-slate-300 hover:text-[#ff6a00] transition-all hover:scale-110 relative">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#ff4747] rounded-full animate-pulse" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        {/* Navigation */}
        <div className="flex-1 overflow-y-auto scrollbar-hide py-4">
          <nav className="grid items-start px-3 text-sm font-medium lg:px-4 gap-1">
            {filteredSidebarLinks.map((item: any, i: any) => {
              const Icon = item.icon;
              const isHrefIncluded =
                item.dropdownMenu &&
                item.dropdownMenu.some((link: any) => link.href === pathname);

              return (
                <div key={i}>
                  {item.dropdown ? (
                    <Collapsible>
                      <CollapsibleTrigger
                        onClick={() => setIsOpen(!isOpen)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-300 transition-all hover:bg-slate-700/50 hover:text-[#ff6a00] w-full group",
                          isHrefIncluded && "bg-gradient-to-r from-[#ff6a00]/10 to-[#ff4747]/10 text-[#ff6a00] border-l-2 border-[#ff6a00]"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.title}
                        {isOpen ? (
                          <ChevronDown className=" h-5 w-5 ml-auto flex shrink-0 items-center justify-center rounded-full" />
                        ) : (
                          <ChevronRight className=" h-5 w-5 ml-auto flex shrink-0 items-center justify-center rounded-full" />
                        )}
                      </CollapsibleTrigger>
                      <CollapsibleContent className="dark:bg-slate-950 rounded mt-1">
                        {item.dropdownMenu &&
                          item.dropdownMenu.map((item: any, i: any) => {
                            return (
                              <Link
                                key={i}
                                href={item.href}
                                className={cn(
                                  "mx-4 flex items-center gap-3 rounded-lg px-3 py-1 text-muted-foreground transition-all hover:text-primary justify-between text-xs ml-6",
                                  pathname === item.href &&
                                    "bg-muted text-primary"
                                )}
                              >
                                {item.title}
                                <span className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                  <Plus className="w-4 h-4" />
                                </span>
                              </Link>
                            );
                          })}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <Link
                      href={item.href ?? "#"}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-300 transition-all hover:bg-slate-700/50 hover:text-[#ff6a00] group relative overflow-hidden",
                        pathname === item.href && "bg-gradient-to-r from-[#ff6a00]/10 to-[#ff4747]/10 text-[#ff6a00] border-l-2 border-[#ff6a00] shadow-lg shadow-[#ff6a00]/20"
                      )}
                    >
                      <Icon className={cn(
                        "h-4 w-4 transition-transform group-hover:scale-110",
                        pathname === item.href && "text-[#ff6a00]"
                      )} />
                      <span className="font-medium">{item.title}</span>
                      {pathname === item.href && (
                        <div className="absolute inset-0 bg-gradient-to-r from-[#ff6a00]/5 to-transparent animate-shimmer" />
                      )}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="mt-auto p-4 border-t border-slate-700/50">
          <Button size="sm" className="w-full bg-gradient-to-r from-[#ff6a00] to-[#ff4747] hover:from-[#ff8534] hover:to-[#ff6a00] text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 group">
            <Power className="h-4 w-4 mr-2 group-hover:rotate-180 transition-transform duration-300" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}
