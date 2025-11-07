"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Session } from "next-auth";
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
  ChevronDown,
  ChevronRight,
  Menu,
  Plus,
  Power,
  Search,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import UserAvatar from "../UserAvatar";

interface HeaderProps {
  session: Session | null | any;
}

interface SidebarLink {
  title: string;
  href?: string;
  icon: React.ComponentType;
  roles: string[];
  dropdownMenu?: Array<{ title: string; href: string }>;
}

export default function Header({ session }: HeaderProps) {
  const user = session?.user;
  const userId = user?.id;
  const [isOpen, setIsOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const sidebarLinks = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
      dropdown: false,
      roles: ["ADMIN", "USER"],
    },
    {
      title: "Banners",
      href: "/dashboard/banners",
      icon: Presentation,
      dropdown: false,
      roles: ["ADMIN"],
    },
    {
      title: "Products",
      icon: LayoutGrid,
      href: "/dashboard/products",
      dropdown: false,
      roles: ["ADMIN"],
    },
    {
      title: "Categories",
      icon: Layers2,
      href: "/dashboard/categories",
      dropdown: false,
      roles: ["ADMIN"],
    },
    {
      title: "Sub Categories",
      icon: LayoutList,
      href: "/dashboard/sub-categories",
      dropdown: false,
      roles: ["ADMIN"],
    },
    {
      title: "App Theme",
      icon: LayoutList,
      href: "/dashboard/styles/new",
      dropdown: false,
      roles: ["ADMIN"],
    },
    {
      title: "Users",
      icon: Users2,
      href: "/dashboard/customers",
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
      title: "Profile",
      icon: User,
      href: "/dashboard/settings",
      dropdown: false,
      roles: ["ADMIN", "USER"],
    },
    {
      title: "Online Store",
      icon: ExternalLink,
      href: "/",
      dropdown: false,
      roles: ["ADMIN", "USER"],
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      dropdown: false,
      roles: ["ADMIN"],
    },
  ];

  const pathname = usePathname();
  const role = session?.user?.role;
  const filteredSidebarLinks = sidebarLinks.filter((link: SidebarLink) =>
    link.roles.includes(role)
  );

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link href="/" className="flex items-center gap-2 font-semibold" onClick={handleLinkClick}>
              <Image src="/logo.svg" alt="kyaja logo" className="w-14 h-14 mt-2" width={300} height={300}/>
              <span className="">Kyaja</span>
            </Link>
            {filteredSidebarLinks.map((item: any, i) => {
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
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary  w-full",
                          isHrefIncluded && "bg-muted text-primary"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {item.title}
                        {isOpen ? (
                          <ChevronDown className="h-5 w-5 ml-auto flex shrink-0 items-center justify-center rounded-full" />
                        ) : (
                          <ChevronRight className="h-5 w-5 ml-auto flex shrink-0 items-center justify-center rounded-full" />
                        )}
                      </CollapsibleTrigger>
                      <CollapsibleContent className="dark:bg-slate-950 rounded mt-1">
                        {item.dropdownMenu?.map((dropdownItem: { title: string; href: string }, index: number) => (
                          <Link
                            key={index}
                            href={dropdownItem.href}
                            onClick={handleLinkClick}
                            className={cn(
                              "mx-4 flex items-center gap-3 rounded-lg px-3 py-1 text-muted-foreground transition-all hover:text-primary justify-between text-xs ml-6",
                              pathname === dropdownItem.href && "bg-muted text-primary"
                            )}
                          >
                            {dropdownItem.title}
                            <span className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                              <Plus className="w-4 h-4" />
                            </span>
                          </Link>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <Link
                      href={item.href ?? "#"}
                      onClick={handleLinkClick}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                        pathname === item.href && "bg-muted text-primary"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.title}
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>
          <div className="mt-auto">
            <Button size="sm" className="w-full" onClick={handleLinkClick}>
              <Power className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <UserAvatar user={session?.user} />
    </header>
  );
}