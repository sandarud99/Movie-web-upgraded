"use client";

import { useState, useEffect } from "react";
import { Movie } from "@/types/tmdb";
import { Play, Info } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface HeroProps {
  movies: Movie[];
}

export default function Hero({ movies }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [movies.length]);

  if (!movies || movies.length === 0) return null;

  const movie = movies[currentIndex];

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={movie.id}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={movie.backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/50 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative h-full flex flex-col justify-end pb-24 px-6 md:px-12 w-full md:w-2/3 lg:w-1/2 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${movie.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 shadow-sm font-heading">
              {movie.title}
            </h1>
            <div className="flex items-center gap-4 text-sm md:text-base font-medium text-gray-300 mb-6">
              <span className="text-green-500 font-bold">98% Match</span>
              <span>{movie.year}</span>
              <span>{movie.duration}</span>
              <span className="border border-gray-600 px-2 py-0.5 rounded text-xs uppercase tracking-wider">{movie.genre.split(',')[0]}</span>
            </div>
            <p className="text-gray-200 text-lg md:text-xl line-clamp-3 mb-8 max-w-2xl font-sans">
              {movie.description}
            </p>
            <div className="flex items-center gap-4">
              <Link
                href={`/watch/${movie.id}`}
                className="flex items-center justify-center gap-2 bg-brand text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition-all w-32 md:w-40 text-lg hover:shadow-[0_0_25px_rgba(229,9,20,0.6)] hover:-translate-y-1"
              >
                <Play className="w-6 h-6 fill-white" />
                Play
              </Link>
              <button className="flex items-center justify-center gap-2 bg-gray-500/30 text-white px-6 py-3 rounded-full font-bold hover:bg-gray-500/50 transition-all md:w-48 text-lg backdrop-blur-md border border-white/10 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:-translate-y-1">
                <Info className="w-6 h-6" />
                More Info
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-12 right-6 md:right-12 z-20 flex gap-3">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-brand w-8 shadow-[0_0_10px_rgba(229,9,20,0.8)]"
                : "bg-white/30 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
