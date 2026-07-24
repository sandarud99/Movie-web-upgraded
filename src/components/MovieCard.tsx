"use client";

import { Movie } from "@/lib/mockData";
import { Play } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className="relative group cursor-pointer aspect-[2/3] rounded-md overflow-hidden bg-gray-900 hover:shadow-[0_0_25px_rgba(229,9,20,0.5)] transition-shadow duration-300 ring-1 ring-white/5 hover:ring-brand/50"
    >
      <img
        src={movie.posterUrl}
        alt={movie.title}
        className="w-full h-full object-cover"
      />
      
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4">
        <Link href={`/watch/${movie.id}`}>
          <div className="bg-brand text-white p-4 rounded-full mb-4 hover:scale-110 hover:shadow-[0_0_20px_rgba(229,9,20,0.8)] transition-all">
            <Play className="w-8 h-8 fill-white" />
          </div>
        </Link>
        <h3 className="text-white font-bold text-center mb-1">{movie.title}</h3>
        <p className="text-gray-300 text-sm">{movie.year} • {movie.genre}</p>
      </div>
    </motion.div>
  );
}
