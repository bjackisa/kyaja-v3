"use client";

import { useEffect, useState } from "react";
import { X, Gift, Sparkles, ShoppingBag } from "lucide-react";
import Image from "next/image";

interface SeasonalTheme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  icon: any;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
  emoji: string;
}

const getSeasonalTheme = (): SeasonalTheme => {
  const now = new Date();
  const month = now.getMonth(); // 0-11
  const day = now.getDate();

  // Christmas Season (December 1 - 26)
  if (month === 11 && day <= 26) {
    return {
      name: "christmas",
      colors: {
        primary: "#c41e3a",
        secondary: "#165b33",
        accent: "#ffd700",
      },
      icon: Gift,
      title: "🎄 Holiday Season Sale!",
      subtitle: "Get up to 70% OFF on selected items. Limited time offer!",
      ctaText: "Shop Christmas Deals",
      ctaLink: "/deals",
      emoji: "🎅",
    };
  }

  // New Year (December 27 - January 7)
  if ((month === 11 && day > 26) || (month === 0 && day <= 7)) {
    return {
      name: "newyear",
      colors: {
        primary: "#ff6a00",
        secondary: "#ffd700",
        accent: "#ff4747",
      },
      icon: Sparkles,
      title: "🎊 New Year, New Deals!",
      subtitle: "Start 2025 with amazing discounts. Up to 60% OFF!",
      ctaText: "Explore New Year Offers",
      ctaLink: "/deals",
      emoji: "🎉",
    };
  }

  // Valentine's Day (February 1-14)
  if (month === 1 && day <= 14) {
    return {
      name: "valentine",
      colors: {
        primary: "#ff1744",
        secondary: "#ff4081",
        accent: "#f50057",
      },
      icon: Gift,
      title: "💝 Valentine's Special",
      subtitle: "Show your love with perfect gifts. Special discounts inside!",
      ctaText: "Find Perfect Gifts",
      ctaLink: "/deals",
      emoji: "❤️",
    };
  }

  // Black Friday (November 20-30)
  if (month === 10 && day >= 20) {
    return {
      name: "blackfriday",
      colors: {
        primary: "#000000",
        secondary: "#ff6a00",
        accent: "#ffd700",
      },
      icon: ShoppingBag,
      title: "🛍️ Black Friday Mega Sale!",
      subtitle: "Biggest discounts of the year! Up to 80% OFF!",
      ctaText: "Shop Black Friday",
      ctaLink: "/deals",
      emoji: "🔥",
    };
  }

  // Default/Regular promotion
  return {
    name: "default",
    colors: {
      primary: "#ff6a00",
      secondary: "#ff4747",
      accent: "#00c9a7",
    },
    icon: ShoppingBag,
    title: "🌟 Special Offers Just For You!",
    subtitle: "Discover amazing deals on thousands of products!",
    ctaText: "Start Shopping",
    ctaLink: "/deals",
    emoji: "✨",
  };
};

const COOKIE_NAME = "kyaja_seasonal_popup";
const COOKIE_DURATION_DAYS = 7;

export default function SeasonalPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [theme, setTheme] = useState<SeasonalTheme | null>(null);

  useEffect(() => {
    // Get seasonal theme
    const currentTheme = getSeasonalTheme();
    setTheme(currentTheme);

    // Check if popup was already shown
    const checkPopupStatus = () => {
      const cookies = document.cookie.split(";");
      const popupCookie = cookies.find((cookie) =>
        cookie.trim().startsWith(`${COOKIE_NAME}=`)
      );

      if (!popupCookie) {
        // Show popup after 2 seconds
        setTimeout(() => {
          setIsVisible(true);
          setTimeout(() => setIsAnimating(true), 50);
        }, 2000);
      }
    };

    checkPopupStatus();
  }, []);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
      // Set cookie to expire in 7 days
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + COOKIE_DURATION_DAYS);
      document.cookie = `${COOKIE_NAME}=closed; expires=${expiryDate.toUTCString()}; path=/`;
    }, 300);
  };

  const handleCTA = () => {
    handleClose();
    window.location.href = theme?.ctaLink || "/deals";
  };

  if (!isVisible || !theme) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] transition-opacity duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Popup */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 pointer-events-none">
        <div
          className={`relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden pointer-events-auto transform transition-all duration-500 ${
            isAnimating
              ? "scale-100 opacity-100 translate-y-0"
              : "scale-90 opacity-0 translate-y-8"
          }`}
          style={{
            animation: isAnimating ? "scaleIn 0.5s var(--ease-bounce)" : "none",
          }}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg transition-all hover:scale-110 hover:rotate-90"
            aria-label="Close popup"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>

          {/* Decorative Background */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
            }}
          />

          {/* Floating Emojis Animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute text-4xl animate-float opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              >
                {theme.emoji}
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="relative p-8 text-center">
            {/* Icon */}
            <div
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 animate-bounce-subtle"
              style={{
                background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
              }}
            >
              <theme.icon className="w-10 h-10 text-white" />
            </div>

            {/* Title */}
            <h2
              className="text-3xl font-extrabold mb-3 animate-fade-in-down"
              style={{ color: theme.colors.primary }}
            >
              {theme.title}
            </h2>

            {/* Subtitle */}
            <p className="text-gray-600 text-base mb-8 leading-relaxed animate-fade-in-up">
              {theme.subtitle}
            </p>

            {/* CTA Button */}
            <button
              onClick={handleCTA}
              className="group relative px-8 py-4 rounded-xl font-bold text-white text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl animate-pulse-glow"
              style={{
                background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {theme.ctaText}
                <ShoppingBag className="w-5 h-5 group-hover:animate-bounce-subtle" />
              </span>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </button>

            {/* Small text */}
            <p className="text-xs text-gray-400 mt-4">
              This offer won't show again for 7 days
            </p>
          </div>

          {/* Decorative Bottom Wave */}
          <div className="absolute bottom-0 left-0 right-0 h-2" style={{
            background: `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary}, ${theme.colors.accent}, ${theme.colors.primary})`,
            backgroundSize: '200% 100%',
            animation: 'shimmer 3s linear infinite'
          }} />
        </div>
      </div>
    </>
  );
}
