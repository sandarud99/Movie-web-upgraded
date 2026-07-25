"use client";

import { Movie } from "@/types/tmdb";
import { Star, Play } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface HistoryCardProps {
  movie: Movie;
}

export default function HistoryCard({ movie }: HistoryCardProps) {
  const rating = movie.rating || (Math.random() * 3 + 6).toFixed(1);

  return (
    <Link href={`/watch/${movie.id}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="movie-card relative group flex items-center gap-4 bg-[#141414] border border-white/10 rounded-xl overflow-hidden hover:bg-white/5 hover:border-brand/50 transition-all cursor-pointer h-28"
      >
        <div className="w-20 h-full flex-shrink-0 relative overflow-hidden bg-gray-900">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=200&auto=format&fit=crop";
            }}
          />
          {/* Hover Play Icon overlay on image */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Play className="w-6 h-6 text-white fill-white" />
          </div>
        </div>
        
        <div className="flex-1 flex flex-col justify-center py-2 pr-4 min-w-0">
          <h3 className="text-white font-bold text-sm md:text-base leading-tight mb-2 truncate">
            {movie.title}
          </h3>
          <div className="flex items-center gap-3">
            <span className="bg-white/10 text-gray-300 text-xs font-bold px-2 py-0.5 rounded">
              {movie.year}
            </span>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-3 h-3 fill-yellow-500" />
              <span className="text-xs font-bold text-gray-300">{rating}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
