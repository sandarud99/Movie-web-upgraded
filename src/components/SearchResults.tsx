"use client";

import { useState } from "react";
import { Movie } from "@/types/tmdb";
import MovieCard from "./MovieCard";
import { loadMoreMovies } from "@/app/actions";
import { Loader2 } from "lucide-react";

interface SearchResultsProps {
  initialMovies: Movie[];
  filters: Record<string, string>;
}

export default function SearchResults({ initialMovies, filters }: SearchResultsProps) {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [visibleCount, setVisibleCount] = useState(28); // Start with exactly 4 rows (4 * 7)
  const [page, setPage] = useState(3); // Since server fetches page 1 and 2 (40 items total)
  const [isLoading, setIsLoading] = useState(false);
  const [hasMorePages, setHasMorePages] = useState(true);

  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      const nextVisibleCount = visibleCount + 14; // Add exactly 2 rows per click
      
      let fetchedMovies = [...movies];
      let fetchPage = page;
      let moreAvailable = hasMorePages;
      
      // Keep fetching pages until we have enough movies to satisfy the new visible count
      while (fetchedMovies.length < nextVisibleCount && moreAvailable) {
        const newMovies = await loadMoreMovies(filters, fetchPage);
        if (newMovies.length === 0) {
          moreAvailable = false;
          setHasMorePages(false);
        } else {
          fetchedMovies = [...fetchedMovies, ...newMovies];
          fetchPage++;
        }
      }
      
      setMovies(fetchedMovies);
      setPage(fetchPage);
      setVisibleCount(Math.min(nextVisibleCount, fetchedMovies.length));
    } catch (error) {
      console.error("Failed to load more movies", error);
    } finally {
      setIsLoading(false);
    }
  };

  const visibleMovies = movies.slice(0, visibleCount);
  const showButton = visibleCount < movies.length || hasMorePages;

  return (
    <div className="movie-grid px-6 md:px-12 py-8">
      <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-md">Search Results</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-7 gap-4 md:gap-6">
        {visibleMovies.map((movie, index) => (
          <MovieCard key={`${movie.id}-${index}`} movie={movie} />
        ))}
      </div>
      
      {showButton && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="flex items-center gap-2 bg-brand/20 hover:bg-brand/30 border border-brand/50 text-white px-8 py-3 rounded-full font-bold transition-all shadow-[0_0_15px_rgba(229,9,20,0.2)] hover:shadow-[0_0_25px_rgba(229,9,20,0.4)] hover:-translate-y-1 disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
}
