"use client";

import { Movie } from "@/types/tmdb";
import { Star, Play } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const rating = movie.rating || ((parseInt(movie.id) % 30) / 10 + 6).toFixed(1);
  const quality = movie.quality || ["WEB-RIP", "HD-RIP", "BLURAY"][parseInt(movie.id) % 3];
  const type = movie.type || "MOVIE";

  return (
    <motion.div
      whileHover={{ 
        scale: 1.05, 
        y: -5,
        boxShadow: "0px 10px 40px rgba(229, 9, 20, 0.5)",
        borderColor: "rgba(229, 9, 20, 0.5)"
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="movie-card relative group cursor-pointer aspect-[2/3] rounded-2xl overflow-hidden bg-gray-900 border border-white/20"
    >
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="w-full h-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=500&auto=format&fit=crop";
        }}
      />
      
      {/* Top Badges */}
      <div className="absolute top-0 left-0 w-full p-3 flex justify-between items-start">
        <div className="bg-brand text-white text-[10px] font-black px-2 py-1 rounded shadow-md">
          {quality}
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="bg-black/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded shadow-md">
            {type}
          </div>
          <div className="bg-yellow-500 text-black text-[11px] font-black px-2 py-1 rounded flex items-center gap-1 shadow-md">
            <Star className="w-3 h-3 fill-black" />
            {rating}
          </div>
        </div>
      </div>

      {/* Bottom Text Gradient */}
      <div className="absolute bottom-0 left-0 w-full p-4 pt-16 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col justify-end">
        <h3 className="text-white font-bold text-sm md:text-base leading-tight mb-1 line-clamp-2">
          {movie.title}
        </h3>
        <p className="text-gray-300 text-xs font-bold uppercase tracking-wider">
          {movie.year} • {movie.genre.split(',')[0]}
        </p>
      </div>

      {/* Hover Play Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex flex-col justify-center items-center z-10">
        <Link href={`/watch/${movie.id}`}>
          <div className="bg-brand text-white p-4 rounded-full hover:scale-110 hover:shadow-[0_0_20px_rgba(229,9,20,0.8)] transition-all">
            <Play className="w-8 h-8 fill-white" />
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
