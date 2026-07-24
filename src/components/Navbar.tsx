"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Bell, User } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 flex justify-center pt-6 px-6 md:px-12 transition-all duration-300">
      <div
        className={`w-full rounded-full border border-white/20 flex items-center justify-between px-6 md:px-10 py-3 transition-all duration-300 ${
          isScrolled 
            ? "bg-[#141414]/50 backdrop-blur-3xl shadow-[0_10px_30px_rgba(0,0,0,0.8)]" 
            : "bg-white/5 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
        }`}
      >
        <div className="flex items-center gap-8">
          <Link href="/">
            <h1 className="text-brand font-black text-2xl md:text-3xl tracking-tighter cursor-pointer drop-shadow-md">
              9INEFLIX
            </h1>
          </Link>
          <nav className="hidden lg:flex gap-6 text-sm font-medium text-gray-300">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              TV Shows
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Movies
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              New & Popular
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              My List
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4 text-gray-300">
          <button className="hover:text-white transition-all p-2 hover:bg-brand/20 hover:border-brand/50 rounded-full backdrop-blur-sm border border-transparent hover:shadow-[0_0_15px_rgba(229,9,20,0.5)]">
            <Search className="w-5 h-5" />
          </button>
          <button className="hover:text-white transition-all p-2 hover:bg-brand/20 hover:border-brand/50 rounded-full backdrop-blur-sm border border-transparent hover:shadow-[0_0_15px_rgba(229,9,20,0.5)]">
            <Bell className="w-5 h-5" />
          </button>
          <button className="hover:text-white transition-all p-2 hover:bg-brand/20 hover:border-brand/50 rounded-full backdrop-blur-sm bg-white/5 border border-white/10 hover:shadow-[0_0_15px_rgba(229,9,20,0.5)]">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
