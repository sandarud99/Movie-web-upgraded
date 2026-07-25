"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Loader2 } from "lucide-react";
import { Movie } from "@/types/tmdb";
import { searchMoviesAction } from "@/app/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [isOpen, setIsOpen] = useState(false); // Dropdown open
  const [isExpanded, setIsExpanded] = useState(false); // Search bar expanded
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Handle click outside to close dropdown and shrink search bar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        if (query.trim() === "") {
          setIsExpanded(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [query]);

  // Debounced Search API Call
  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      setIsLoading(true);
      try {
        const data = await searchMoviesAction(query);
        setResults(data.slice(0, 5)); // Limit dropdown to top 5 results
        setIsOpen(true);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchResults();
    }, 400); // 400ms delay

    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSelect = (movieId: string) => {
    setIsOpen(false);
    setIsExpanded(false);
    setQuery("");
    router.push(`/watch/${movieId}`);
  };

  const handleExpand = () => {
    setIsExpanded(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  return (
    <div ref={wrapperRef} className="relative z-[100] flex justify-end h-[40px] items-center">
      <div
        className={`flex items-center transition-all duration-300 ease-out h-[40px] ${
          isExpanded 
            ? "w-[200px] md:w-[300px] bg-black/40 backdrop-blur-md rounded-full border px-4 overflow-hidden " + (isOpen || query ? "border-brand shadow-[0_0_15px_rgba(229,9,20,0.4)]" : "border-white/20")
            : "w-[40px] bg-transparent border-transparent px-0 overflow-visible"
        }`}
      >
        {!isExpanded ? (
          <button 
            onClick={handleExpand}
            className="text-gray-300 hover:text-white transition-all w-[40px] h-[40px] flex items-center justify-center hover:bg-brand/20 hover:border-brand/50 rounded-full backdrop-blur-sm border border-transparent hover:shadow-[0_0_15px_rgba(229,9,20,0.5)] flex-shrink-0"
          >
            <Search className="w-5 h-5" />
          </button>
        ) : (
          <>
            {isLoading ? (
              <Loader2 className="w-4 h-4 text-gray-400 animate-spin flex-shrink-0 mr-2" />
            ) : (
              <Search className={`w-4 h-4 flex-shrink-0 mr-2 transition-colors ${isOpen || query ? "text-brand" : "text-gray-400"}`} />
            )}
            <input
              ref={inputRef}
              type="text"
              placeholder="Titles, people, genres"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (!isOpen && e.target.value) setIsOpen(true);
              }}
              onFocus={() => {
                if (query) setIsOpen(true);
              }}
              className="bg-transparent border-none outline-none text-white text-sm w-full placeholder-gray-500"
            />
          </>
        )}
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && query.trim() !== "" && isExpanded && (
        <div className="absolute top-full mt-2 right-0 w-[250px] md:w-[350px] bg-[#121212] border border-white/10 rounded-xl shadow-2xl overflow-hidden py-2 custom-scrollbar max-h-[70vh] overflow-y-auto origin-top-right">
          {results.length > 0 ? (
            <>
              {results.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => handleSelect(movie.id)}
                  className="flex items-center gap-4 p-3 hover:bg-white/10 transition-colors cursor-pointer border-b border-white/5 last:border-none"
                >
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="w-12 h-16 object-cover rounded shadow-md"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=200&auto=format&fit=crop";
                    }}
                  />
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-sm line-clamp-1">{movie.title}</span>
                    <span className="text-gray-400 text-xs mt-1">
                      {movie.type === "SERIES" ? "TV Show" : "Movie"} • {movie.year}
                    </span>
                  </div>
                </div>
              ))}
              
              {/* View all results button */}
              <div 
                className="w-full text-center p-4 border-t border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <span className="text-brand font-bold text-sm">
                  View all results for &quot;{query}&quot;
                </span>
              </div>
            </>
          ) : (
            <div className="p-4 text-center text-gray-400 text-sm">
              {!isLoading && "No results found."}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
