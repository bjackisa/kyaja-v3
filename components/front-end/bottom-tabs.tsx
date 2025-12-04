"use client";
import { usePathname } from "next/navigation";
import { Home, ShoppingCart, Grid } from "lucide-react";

const BottomTabs = () => {
  const pathname = usePathname();

  const tabs = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/deals", icon: Grid, label: "Deals" },
    { href: "/cart", icon: ShoppingCart, label: "Cart" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 shadow-lg md:hidden bg-white border-t border-gray-200">
      <nav className="flex justify-around items-center h-14 px-2 pb-safe">
        {tabs.map((tab) => (
          <a
            key={tab.href}
            href={tab.href}
            className={`flex flex-col items-center justify-center min-w-0 flex-1 py-1.5 px-1 transition-all duration-200 ${
              pathname === tab.href
                ? "text-[#ff6a00]"
                : "text-gray-500 hover:text-[#ff6a00]"
            }`}
          >
            <tab.icon size={20} className="mb-0.5 flex-shrink-0" />
            <span className="text-[9px] font-semibold leading-tight text-center truncate max-w-full">
              {tab.label}
            </span>
          </a>
        ))}
      </nav>
      {/* Safe area padding for devices with home indicator */}
      <div className="h-safe-area-inset-bottom bg-white"></div>
    </div>
  );
};

export default BottomTabs;