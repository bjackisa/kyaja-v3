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
    <div className="fixed bottom-0 left-0 right-0 z-50 shadow-lg md:hidden bg-[#131921] border-t border-gray-700">
      <nav className="flex justify-around items-center h-16 px-2 pb-safe">
        {tabs.map((tab) => (
          <a
            key={tab.href}
            href={tab.href}
            className={`flex flex-col items-center justify-center min-w-0 flex-1 py-1 px-1 transition-colors duration-200 ${
              pathname === tab.href
                ? "text-[#febd69]"
                : "text-gray-400 hover:text-[#febd69]"
            }`}
          >
            <tab.icon size={20} className="mb-1 flex-shrink-0" />
            <span className="text-[10px] font-medium leading-tight text-center truncate max-w-full">
              {tab.label}
            </span>
          </a>
        ))}
      </nav>
      {/* Safe area padding for devices with home indicator */}
      <div className="h-safe-area-inset-bottom bg-[#131921]"></div>
    </div>
  );
};

export default BottomTabs;