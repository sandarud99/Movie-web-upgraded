"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const categories = [
  "Movies", "TV Shows", "Trending", "18+", "Action", 
  "Action & Adventure", "Adventure", "Animation", "Comedy", 
  "Crime", "Documentary", "Drama", "Family", "Fantasy", 
  "Horror", "Music", "Mystery", "Romance", "Sci-Fi & Fantasy", 
  "Science Fiction", "Thriller", "War"
];

export default function Categories() {
  return (
    <div className="px-6 md:px-12 py-8 mt-4">
      <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-md">Explore Categories</h2>
      <div className="flex flex-wrap gap-3 md:gap-4">
        {categories.map((category) => (
          <Link key={category} href={`/category/${category.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`}>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ duration: 0.2 }}
              className="cursor-pointer relative overflow-hidden rounded-full border border-white/20 bg-[#141414]/60 backdrop-blur-md px-6 py-2.5 flex items-center justify-center transition-all duration-300 hover:border-brand/50 hover:shadow-[0_0_20px_rgba(229,9,20,0.3)] group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand/0 via-brand/0 to-brand/0 group-hover:from-brand/10 group-hover:to-brand/5 transition-all duration-300" />
              <span className="text-white font-bold text-sm tracking-wider relative z-10 whitespace-nowrap">
                {category}
              </span>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
