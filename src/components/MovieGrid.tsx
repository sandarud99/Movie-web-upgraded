"use client";

import { useState, useEffect, useRef } from "react";
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
  const [visibleCount, setVisibleCount] = useState(21);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMoreClicks, setLoadMoreClicks] = useState(0);
  const [newFromIndex, setNewFromIndex] = useState<number>(movies.length);
  const gridRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState<number>(0);

  // Dynamically measure active grid columns so rows are always 100% filled
  useEffect(() => {
    const updateColumns = () => {
      if (!gridRef.current) return;
      const style = window.getComputedStyle(gridRef.current);
      const gridTemplateColumns = style.getPropertyValue("grid-template-columns");
      if (gridTemplateColumns) {
        const colCount = gridTemplateColumns.split(" ").filter(Boolean).length;
        if (colCount > 0) setColumns(colCount);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // Reset state when category or initial movies change
  useEffect(() => {
    setLoadedMovies(movies);
    setVisibleCount(21);
    setPage(1);
    setLoadMoreClicks(0);
    setNewFromIndex(movies.length);
  }, [category, movies]);

  const handleLoadMore = async () => {
    setLoadMoreClicks((prev) => prev + 1);
    const cols = columns > 0 ? columns : 7;
    // Add 2 complete rows on each click
    const nextVisibleCount = visibleCount + (cols * 2);

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
          setNewFromIndex(prev.length);
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

  // Ensure visible count is ALWAYS an exact multiple of columns so the last row is never partially empty
  const effectiveCount = columns > 0
    ? Math.max(columns, Math.floor(Math.min(visibleCount, loadedMovies.length) / columns) * columns)
    : visibleCount;

  const visibleMovies = loadedMovies.slice(0, effectiveCount);

  return (
    <div className="movie-grid px-6 md:px-12 py-8">
      <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-md">{title}</h2>
      <div 
        ref={gridRef}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2 sm:gap-4 md:gap-6"
      >
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

      {/* Load More Button - Only works twice, then hides */}
      {section && loadMoreClicks < 2 && (
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
