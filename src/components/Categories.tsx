"use client";

import { motion } from "framer-motion";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const categories = [
  "Movies", "TV Shows", "Trending", "18+", "Action", 
  "Adventure", "Animation", "Comedy", 
  "Crime", "Documentary", "Drama", "Family", "Fantasy", 
  "History", "Horror", "Music", "Mystery", "Romance", 
  "Sci-Fi", "Thriller", "War", "Western", "Kids", "News", "Reality"
];

export default function Categories() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  const handleCategoryClick = (category: string) => {
    // Only act as filters on the home page. On other pages, perhaps navigate home first, but for now we update the query.
    const params = new URLSearchParams(searchParams.toString());
    
    if (currentCategory === category) {
      params.delete("category"); // Toggle off
    } else {
      params.set("category", category);
    }
    
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="px-6 md:px-12 py-8 mt-4">
      <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-md">Explore Categories</h2>
      <div className="flex flex-wrap gap-3 md:gap-4">
        {categories.map((category) => {
          const isActive = currentCategory === category;
          return (
            <button key={category} onClick={() => handleCategoryClick(category)}>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.2 }}
                className={`cursor-pointer relative overflow-hidden rounded-full border px-4 py-2 md:px-6 md:py-2.5 flex items-center justify-center transition-all duration-300 group ${
                  isActive 
                    ? "bg-brand border-brand shadow-[0_0_20px_rgba(229,9,20,0.5)]" 
                    : "border-white/20 bg-[#141414]/60 backdrop-blur-md hover:border-brand/50 hover:shadow-[0_0_20px_rgba(229,9,20,0.3)]"
                }`}
              >
                {!isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-brand/0 via-brand/0 to-brand/0 group-hover:from-brand/10 group-hover:to-brand/5 transition-all duration-300" />
                )}
                <span className="text-white font-bold text-[11px] md:text-sm tracking-wider relative z-10 whitespace-nowrap">
                  {category}
                </span>
              </motion.div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
