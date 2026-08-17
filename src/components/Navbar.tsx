"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { History, Lightbulb, Mail, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [spotlightEnabled, setSpotlightEnabled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const handleSpotlightToggle = () => {
    setSpotlightEnabled((prev) => !prev);
    window.dispatchEvent(new Event("toggle-spotlight"));
  };

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="fixed top-0 w-full z-[100] flex justify-center pt-6 px-6 md:px-12 transition-all duration-300"
    >
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
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-300">
            <Link href="/tv-shows" className={`transition-colors ${pathname === '/tv-shows' ? 'text-brand font-bold drop-shadow-[0_0_10px_rgba(229,9,20,0.8)]' : 'hover:text-brand hover:drop-shadow-[0_0_8px_rgba(229,9,20,0.5)]'}`}>
              TV Shows
            </Link>
            <Link href="/movies" className={`transition-colors ${pathname === '/movies' ? 'text-brand font-bold drop-shadow-[0_0_10px_rgba(229,9,20,0.8)]' : 'hover:text-brand hover:drop-shadow-[0_0_8px_rgba(229,9,20,0.5)]'}`}>
              Movies
            </Link>
            <Link href="/anime" className={`transition-colors ${pathname === '/anime' ? 'text-brand font-bold drop-shadow-[0_0_10px_rgba(229,9,20,0.8)]' : 'hover:text-brand hover:drop-shadow-[0_0_8px_rgba(229,9,20,0.5)]'}`}>
              Anime
            </Link>
            <Link href="/request" className={`transition-colors ${pathname === '/request' ? 'text-brand font-bold drop-shadow-[0_0_10px_rgba(229,9,20,0.8)]' : 'hover:text-brand hover:drop-shadow-[0_0_8px_rgba(229,9,20,0.5)]'}`}>
              Request
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4 text-gray-300">
          <SearchBar />
          
          <Link href="/history" className="hidden md:block relative group hover:text-white transition-all p-2 hover:bg-brand/20 hover:border-brand/50 rounded-full backdrop-blur-sm border border-transparent hover:shadow-[0_0_15px_rgba(229,9,20,0.5)]">
            <History className="w-5 h-5" />
            <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#121212] border border-white/10 text-white text-xs font-bold rounded opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none transition-all duration-300 shadow-xl whitespace-nowrap z-50">
              History
            </div>
          </Link>
          
          <button 
            onClick={handleSpotlightToggle}
            className={`hidden md:block relative group transition-all p-2 rounded-full backdrop-blur-sm border ${spotlightEnabled ? 'bg-brand/20 border-brand/50 text-yellow-400 shadow-[0_0_15px_rgba(229,9,20,0.5)]' : 'hover:bg-brand/20 hover:border-brand/50 border-transparent hover:text-white hover:shadow-[0_0_15px_rgba(229,9,20,0.5)]'}`}
          >
            <Lightbulb className="w-5 h-5" />
            <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#121212] border border-white/10 text-white text-xs font-bold rounded opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none transition-all duration-300 shadow-xl whitespace-nowrap z-50">
              {spotlightEnabled ? "Disable Spotlight" : "Enable Spotlight"}
            </div>
          </button>
          
          <Link href="/contact" className="hidden md:flex ml-2 bg-brand text-white px-5 py-2 rounded-full font-semibold hover:bg-brand/80 transition-colors shadow-[0_0_15px_rgba(229,9,20,0.5)] border border-brand text-sm items-center gap-2">
            Contact
          </Link>

          <button 
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors ml-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[88px] left-6 right-6 md:hidden bg-[#141414]/95 backdrop-blur-3xl border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.8)] rounded-3xl p-6 flex flex-col gap-6 z-[100]"
          >
            <nav className="flex flex-col gap-4">
              <Link href="/history" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-2 text-lg font-bold ${pathname === '/history' ? 'text-brand drop-shadow-[0_0_10px_rgba(229,9,20,0.8)]' : 'text-gray-300 hover:text-brand'}`}>
                <History className="w-5 h-5" />
                Watch History
              </Link>
              <Link href="/tv-shows" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-bold ${pathname === '/tv-shows' ? 'text-brand drop-shadow-[0_0_10px_rgba(229,9,20,0.8)]' : 'text-gray-300 hover:text-brand'}`}>
                TV Shows
              </Link>
              <Link href="/movies" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-bold ${pathname === '/movies' ? 'text-brand drop-shadow-[0_0_10px_rgba(229,9,20,0.8)]' : 'text-gray-300 hover:text-brand'}`}>
                Movies
              </Link>
              <Link href="/anime" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-bold ${pathname === '/anime' ? 'text-brand drop-shadow-[0_0_10px_rgba(229,9,20,0.8)]' : 'text-gray-300 hover:text-brand'}`}>
                Anime
              </Link>
              <Link href="/request" onClick={() => setIsMobileMenuOpen(false)} className={`text-lg font-bold ${pathname === '/request' ? 'text-brand drop-shadow-[0_0_10px_rgba(229,9,20,0.8)]' : 'text-gray-300 hover:text-brand'}`}>
                Request
              </Link>
            </nav>
            <div className="h-px bg-white/10 w-full" />
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="w-full bg-brand text-white py-3 rounded-full font-bold text-center border border-brand shadow-[0_0_15px_rgba(229,9,20,0.5)]">
              Contact
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
