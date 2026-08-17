"use client";

import { useState, useEffect, useRef } from "react";
import { Movie } from "@/types/tmdb";
import MovieCard from "./MovieCard";
import { searchMoviesAction } from "@/app/actions";
import { ChevronDown, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface SearchGridProps {
  query: string;
  initialMovies: Movie[];
  sort?: string;
  year?: string;
}

export default function SearchGrid({ query, initialMovies, sort, year }: SearchGridProps) {
  const [loadedMovies, setLoadedMovies] = useState<Movie[]>(initialMovies);
  const [visibleCount, setVisibleCount] = useState(21); // 3 rows of 7
  // We already fetched pages 1 and 2 on the server, so next page to fetch is 3
  const [pageToFetch, setPageToFetch] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialMovies.length >= 20); // rough heuristic

  const lastQueryRef = useRef(query);

  useEffect(() => {
    if (lastQueryRef.current !== query) {
      // New search query - completely reset
      setLoadedMovies(initialMovies);
      setVisibleCount(21);
      setPageToFetch(3);
      setHasMore(initialMovies.length >= 20);
      lastQueryRef.current = query;
    } else {
      // Only filters changed - preserve visible rows by fetching missing pages
      const fetchMissingPages = async () => {
        setIsLoading(true);
        try {
          let allMovies = [...initialMovies];
          // If we had already loaded more pages (e.g. pages 3 and 4), fetch them with the new filter!
          const promises = [];
          for (let p = 3; p < pageToFetch; p++) {
            promises.push(searchMoviesAction(query, p, sort, year));
          }
          const results = await Promise.all(promises);
          results.forEach(res => {
            allMovies = [...allMovies, ...res];
          });
          setLoadedMovies(allMovies);
        } catch (error) {
          console.error("Failed to fetch missing pages for filter", error);
        } finally {
          setIsLoading(false);
        }
      };

      if (pageToFetch > 3) {
        fetchMissingPages();
      } else {
        setLoadedMovies(initialMovies);
      }
    }
  }, [query, initialMovies, sort, year]);

  const handleLoadMore = async () => {
    const nextVisibleCount = visibleCount + 21; // Reveal 3 more rows (21 items)
    
    setIsLoading(true);
    try {
      // Fetch 2 pages at a time to ensure we have enough for 3 rows (21 items)
      // because 1 TMDB page is 20 items.
      const newMovies1 = await searchMoviesAction(query, pageToFetch, sort, year);
      const newMovies2 = await searchMoviesAction(query, pageToFetch + 1, sort, year);
      
      const combined = [...newMovies1, ...newMovies2];
      if (combined.length === 0) {
        setHasMore(false);
      } else {
        setLoadedMovies((prev) => [...prev, ...combined]);
        setPageToFetch((prev) => prev + 2);
      }
      setVisibleCount(nextVisibleCount);
    } catch (error) {
      console.error("Failed to load more movies", error);
    } finally {
      setIsLoading(false);
    }
  };

  const visibleMovies = loadedMovies.slice(0, visibleCount);

  if (loadedMovies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500 border border-white/5 rounded-2xl bg-white/5">
        <h3 className="text-xl font-bold text-gray-400 mb-2">No matches found</h3>
        <p>Try adjusting your search terms or browsing our categories.</p>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          visible: {
            transition: { staggerChildren: 0.05 }
          }
        }}
        className="movie-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2 sm:gap-4 md:gap-6"
      >
        {visibleMovies.map((movie, index) => (
          <motion.div
            key={`${movie.id}-${index}`}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 150, damping: 20 } }
            }}
          >
            <MovieCard movie={movie} />
          </motion.div>
        ))}
      </motion.div>
      
      {/* Load More Button */}
      {hasMore && visibleCount <= loadedMovies.length && (
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
