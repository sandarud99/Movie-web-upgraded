"use client";

import { useState, useEffect } from "react";
import { Movie } from "@/types/tmdb";
import { Play } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface CategoryHeroProps {
  movies: Movie[];
}

export default function CategoryHero({ movies }: CategoryHeroProps) {
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
    <div className="relative w-full h-[400px] md:h-[450px] bg-gray-900 rounded-3xl overflow-hidden mb-8 md:mb-12 shadow-2xl shadow-black/50 border border-white/5">
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative h-full flex flex-col justify-end p-6 pb-12 md:p-12 z-10 w-full md:w-3/4">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${movie.id}`}
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.2 }
              },
              exit: { opacity: 0, transition: { duration: 0.2 } }
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            <motion.h2 
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 20 } } }}
              className="text-3xl leading-tight md:text-5xl font-black text-white mb-4 shadow-sm font-heading"
            >
              {movie.title}
            </motion.h2>
            <motion.p 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 20 } } }}
              className="text-gray-300 text-sm md:text-base line-clamp-3 mb-8 max-w-2xl leading-relaxed mx-auto md:mx-0"
            >
              {movie.description}
            </motion.p>
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 20 } } }}
              className="flex items-center gap-4"
            >
              <Link
                href={`/watch/${movie.id}`}
                className="flex items-center justify-center gap-2 bg-brand text-white px-8 py-3 rounded-full font-bold hover:bg-brand/80 transition-all w-auto whitespace-nowrap shadow-[0_0_15px_rgba(229,9,20,0.5)] hover:-translate-y-1"
              >
                <Play className="w-5 h-5 fill-white" />
                Play Now
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 md:left-auto md:right-8 -translate-x-1/2 md:-translate-x-0 z-20 flex gap-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-brand w-6 shadow-[0_0_10px_rgba(229,9,20,0.8)]"
                : "bg-white/30 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
