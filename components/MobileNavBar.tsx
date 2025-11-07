"use client";
import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import Image from "next/image";
import logo from "../public/logo.svg";
import { Category } from "@/types";
import { TfiMenu } from "react-icons/tfi";


export function MobileNavBar({ allCategories }:Category[] | any) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          {/* <RxHamburgerMenu /> */}
          <TfiMenu size={26}/>
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <span className="font-bold"></span>
        </MobileLink>
        <ScrollArea className="!p-0  pb-3">
          <div className="flex h-screen flex-col justify-between border-e bg-white">
            <div className="">
              <Link className="flex items-center lg:gap-0 md:gap-0 gap-2" href="/">
                <Image
                  src={logo}
                  alt="kyaja logo"
                  className="lg:w-[4rem] w-[3rem] h-[3rem] lg:h-[4rem] mt-4"
                />
                <div className="flex flex-col">
                  <span className="font-black text-lg uppercase text-[#282828] block">
                    Kyaja
                  </span>
                </div>
              </Link>

              <ul className="mt-2 space-y-1">
                {allCategories?.map((category:any) => (
                  <li key={category.id}>
                    <MobileLink
                      href={`/c/${category.slug}`}
                      className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      onOpenChange={setOpen}
                    >
                      {category.title}
                    </MobileLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

function MobileLink({ href, onOpenChange, className, children, ...props }:any) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
