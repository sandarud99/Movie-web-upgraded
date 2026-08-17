"use client";

import { useEffect, useState } from "react";
import { Movie } from "@/types/tmdb";
import { History, Film, Tv, Info } from "lucide-react";
import HistoryCard from "@/components/HistoryCard";

export default function HistoryPage() {
  const [history, setHistory] = useState<Movie[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const stored = localStorage.getItem("watchHistory");
      if (stored) setHistory(JSON.parse(stored));
    } catch (e) {
      console.error("Failed to parse history", e);
    }
  }, []);

  if (!isClient) return null; // Avoid hydration mismatch

  const movies = history.filter((m) => m.type !== "SERIES" && m.type !== "tv");
  const tvShows = history.filter((m) => m.type === "SERIES" || m.type === "tv");

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] to-[#141414] pt-32 pb-24 px-6 md:px-12">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <History className="w-8 h-8 text-brand" />
        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">History</h1>
      </div>

      {/* Info Banner */}
      <div className="mb-12 flex items-start gap-3 bg-[#0a1526] border border-blue-900/50 p-4 rounded-xl text-blue-200">
        <Info className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-400" />
        <p className="text-sm leading-relaxed">
          <strong className="text-blue-300">Note:</strong> Your watch history is saved locally in your browser, not on our servers. If you clear your browser data or cache, this list will be permanently removed.
        </p>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-20">
          <History className="w-16 h-16 text-gray-700 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-400">Your history is empty</h2>
          <p className="text-gray-500 mt-2">Movies and TV shows you watch will appear here.</p>
        </div>
      ) : (
        <div className="space-y-16">
          {/* Movies Section */}
          {movies.length > 0 && (
            <div className="movie-grid">
              <div className="flex items-center gap-2 mb-6">
                <Film className="w-5 h-5 text-brand" />
                <h2 className="text-xl font-bold text-white">Movies</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {movies.map((movie) => (
                  <HistoryCard key={movie.id} movie={movie} />
                ))}
              </div>
            </div>
          )}

          {/* TV Shows Section */}
          {tvShows.length > 0 && (
            <div className="movie-grid">
              <div className="flex items-center gap-2 mb-6">
                <Tv className="w-5 h-5 text-brand" />
                <h2 className="text-xl font-bold text-white">TV Shows</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {tvShows.map((show) => (
                  <HistoryCard key={show.id} movie={show} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
