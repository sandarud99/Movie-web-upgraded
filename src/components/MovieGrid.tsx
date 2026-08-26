"use client";

import { useState, useEffect } from "react";
import { Movie } from "@/types/tmdb";
import MovieCard from "./MovieCard";
import { fetchMoreHomePageMovies } from "@/app/actions";
import { ChevronDown, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface MovieGridProps {
  title: string;
  movies: Movie[];
  section?: "trending" | "top-rated" | "new-releases";
  category?: string;
}

export default function MovieGrid({ title, movies, section, category }: MovieGridProps) {
  const [loadedMovies, setLoadedMovies] = useState<Movie[]>(movies);
  const [visibleCount, setVisibleCount] = useState(14);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  // Track which index cards were newly added so we animate them in
  const [newFromIndex, setNewFromIndex] = useState<number>(movies.length);

  // Reset state when category or initial movies change
  useEffect(() => {
    setLoadedMovies(movies);
    setVisibleCount(14);
    setPage(1);
    setNewFromIndex(movies.length);
  }, [category, movies]);

  const handleLoadMore = async () => {
    const nextVisibleCount = visibleCount + 14;

    // If we already have enough loaded movies in memory, just increase visibility
    if (nextVisibleCount <= loadedMovies.length) {
      setVisibleCount(nextVisibleCount);
      return;
    }

    // Otherwise, we need to fetch the next page from TMDB
    if (section) {
      setIsLoading(true);
      try {
        const nextPage = page + 1;
        const newMovies = await fetchMoreHomePageMovies(section, category, nextPage);
        setLoadedMovies((prev) => {
          const updated = [...prev, ...newMovies];
          setNewFromIndex(prev.length); // mark where new ones start
          return updated;
        });
        setPage(nextPage);
        setVisibleCount(nextVisibleCount);
      } catch (error) {
        console.error("Failed to load more movies", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setVisibleCount(nextVisibleCount);
    }
  };

  const visibleMovies = loadedMovies.slice(0, visibleCount);

  return (
    <div className="movie-grid px-6 md:px-12 py-8">
      <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-md">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2 sm:gap-4 md:gap-6">
        {visibleMovies.map((movie, index) => (
          <motion.div
            key={`${movie.id}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 20,
              // Only stagger on initial load; newly loaded cards animate immediately
              delay: index < newFromIndex ? 0 : (index - newFromIndex) * 0.04,
            }}
          >
            <MovieCard movie={movie} />
          </motion.div>
        ))}
      </div>

      {/* Load More Button */}
      {section && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="flex items-center gap-2 px-8 py-3 bg-[#141414] hover:bg-[#1a1a1a] text-white border border-white/10 hover:border-brand/50 rounded-full font-semibold transition-all duration-300 disabled:opacity-50 group hover:shadow-[0_0_15px_rgba(229,9,20,0.3)] hover:-translate-y-1"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-brand" />
                Loading...
              </>
            ) : (
              <>
                Load More
                <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-brand transition-colors" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
