"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, History, Bookmark, Mail, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

export default function Sidebar() {
  const pathname = usePathname();
  const [spotlightEnabled, setSpotlightEnabled] = useState(true);

  // Define the menu items
  const menuItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "History", href: "/history", icon: History },
    { name: "Watchlist", href: "#", icon: Bookmark },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  const handleSpotlightToggle = () => {
    setSpotlightEnabled((prev) => !prev);
    window.dispatchEvent(new Event("toggle-spotlight"));
  };

  return (
    <div className="fixed left-2 top-1/2 -translate-y-1/2 z-[60] flex flex-col items-center gap-4">
      {/* Pill Glass Island */}
      <div className="bg-black/40 backdrop-blur-3xl border border-white/5 rounded-full p-1 flex flex-col gap-1 shadow-2xl shadow-black/80 w-12">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link key={item.name} href={item.href} className="relative group w-10 h-10 rounded-full flex justify-center items-center">
              {/* Sliding Background Highlight */}
              {isActive && (
                <motion.div
                  layoutId="active-bg"
                  className="absolute inset-0 bg-brand/20 border border-brand/40 rounded-full shadow-[0_0_15px_rgba(229,9,20,0.2)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              
              <Icon 
                className={`relative z-10 w-5 h-5 transition-all duration-300 ${
                  isActive 
                    ? "text-brand drop-shadow-[0_0_8px_rgba(229,9,20,0.8)] scale-110" 
                    : "text-gray-400 group-hover:text-white group-hover:scale-110"
                }`} 
              />
              
              {/* Tooltip */}
              <div className="absolute left-full ml-4 px-3 py-1.5 bg-[#121212] border border-white/10 text-white text-xs font-bold rounded opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none transition-all duration-300 shadow-xl whitespace-nowrap">
                {item.name}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Spotlight Toggle (Circular Glass Button) */}
      <button
        onClick={handleSpotlightToggle}
        className={`w-12 h-12 rounded-full backdrop-blur-3xl border transition-all duration-300 group relative flex justify-center items-center shadow-xl ${
          spotlightEnabled 
            ? "bg-brand/20 border-brand/40 shadow-[0_0_20px_rgba(229,9,20,0.3)]" 
            : "bg-black/40 border-white/5"
        }`}
      >
        <Lightbulb className={`w-5 h-5 transition-all duration-300 ${spotlightEnabled ? "text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,1)]" : "text-gray-500 group-hover:text-white"}`} />
        
        {/* Tooltip */}
        <div className="absolute left-full ml-4 px-3 py-1.5 bg-[#121212] border border-white/10 text-white text-xs font-bold rounded opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none transition-all duration-300 shadow-xl whitespace-nowrap">
          {spotlightEnabled ? "Disable Spotlight" : "Enable Spotlight"}
        </div>
      </button>
    </div>
  );
}
