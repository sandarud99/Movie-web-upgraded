"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Search, Loader2, X } from "lucide-react";
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
  const inputRefDesktop = useRef<HTMLInputElement>(null);
  const inputRefMobile = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Handle click outside to close dropdown and shrink search bar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      const target = event.target as Node;
      const drawer = document.getElementById("mobile-search-drawer");
      
      if (
        wrapperRef.current && 
        !wrapperRef.current.contains(target) &&
        (!drawer || !drawer.contains(target))
      ) {
        setIsOpen(false);
        if (query.trim() === "") {
          setIsExpanded(false);
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
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

  const handleSelect = (movie: Movie) => {
    setIsOpen(false);
    setIsExpanded(false);
    setQuery("");
    if (movie.type === "SERIES") {
      router.push(`/watch-tv/${movie.id}`);
    } else {
      router.push(`/watch/${movie.id}`);
    }
  };

  const handleExpand = () => {
    setIsExpanded(true);
    setTimeout(() => {
      if (window.innerWidth < 768) {
        inputRefMobile.current?.focus();
      } else {
        inputRefDesktop.current?.focus();
      }
    }, 100);
  };

  return (
    <div ref={wrapperRef} className="relative z-[100] flex justify-end h-[40px] items-center">
      {!isExpanded ? (
        <button 
          onClick={handleExpand}
          className="group relative text-gray-300 hover:text-white transition-all w-[40px] h-[40px] flex items-center justify-center hover:bg-brand/20 hover:border-brand/50 rounded-full backdrop-blur-sm border border-transparent hover:shadow-[0_0_15px_rgba(229,9,20,0.5)] flex-shrink-0"
        >
          <Search className="w-5 h-5" />
          <div className="hidden md:block absolute top-full mt-4 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#121212] border border-white/10 text-white text-xs font-bold rounded opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 pointer-events-none transition-all duration-300 shadow-xl whitespace-nowrap z-50">
            Search
          </div>
        </button>
      ) : (
        <>
          {/* Desktop Search Bar */}
          <div className={`hidden md:flex items-center transition-all duration-300 ease-out h-[40px] w-[300px] bg-black/40 backdrop-blur-md rounded-full border px-4 overflow-hidden ${isOpen || query ? "border-brand shadow-[0_0_15px_rgba(229,9,20,0.4)]" : "border-white/20"}`}>
            {isLoading ? (
              <Loader2 className="w-4 h-4 text-gray-400 animate-spin flex-shrink-0 mr-2" />
            ) : (
              <Search className={`w-4 h-4 flex-shrink-0 mr-2 transition-colors ${isOpen || query ? "text-brand" : "text-gray-400"}`} />
            )}
            <input
              ref={inputRefDesktop}
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
              onKeyDown={(e) => {
                if (e.key === "Enter" && query.trim()) {
                  setIsOpen(false);
                  setIsExpanded(false);
                  router.push(`/search?q=${encodeURIComponent(query.trim())}`);
                }
              }}
              className="bg-transparent border-none outline-none text-white text-sm w-full placeholder-gray-500"
            />
          </div>

          {/* Mobile Search Drawer (Portaled to body to escape containing blocks) */}
          {typeof document !== "undefined" ? createPortal(
            <div id="mobile-search-drawer" className="md:hidden fixed inset-0 w-full h-[100dvh] bg-[#141414]/95 backdrop-blur-3xl z-[99999] flex flex-col">
              <div className="flex items-center p-6 border-b border-white/10 gap-4 mt-4 md:mt-0">
                <button onClick={() => { setIsExpanded(false); setIsOpen(false); setQuery(""); }} className="text-gray-400 hover:text-white p-2">
                  <X className="w-6 h-6" />
                </button>
                <div className="flex-1 bg-white/5 rounded-full px-4 py-3 flex items-center border border-white/10 focus-within:border-brand focus-within:shadow-[0_0_15px_rgba(229,9,20,0.3)] transition-all">
                  {isLoading ? <Loader2 className="w-5 h-5 text-gray-400 animate-spin mr-2" /> : <Search className="w-5 h-5 text-gray-400 mr-2" />}
                  <input
                    ref={inputRefMobile}
                    type="text"
                    placeholder="Search 9ineflix..."
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      if (!isOpen && e.target.value) setIsOpen(true);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && query.trim()) {
                        setIsOpen(false);
                        setIsExpanded(false);
                        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
                      }
                    }}
                    className="bg-transparent border-none outline-none text-white text-base w-full placeholder-gray-500"
                  />
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                {isOpen && query.trim() !== "" ? (
                  results.length > 0 ? (
                    <>
                      {results.map((movie) => (
                        <div
                          key={movie.id}
                          onClick={() => handleSelect(movie)}
                          className="flex items-center gap-4 p-3 hover:bg-white/10 transition-colors cursor-pointer rounded-xl mb-2"
                        >
                          <img
                            src={movie.posterUrl}
                            alt={movie.title}
                            className="w-14 h-20 object-cover rounded-lg shadow-md"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=200&auto=format&fit=crop";
                            }}
                          />
                          <div className="flex flex-col">
                            <span className="text-white font-bold text-base line-clamp-1">{movie.title}</span>
                            <span className="text-gray-400 text-sm mt-1">
                              {movie.type === "SERIES" ? "TV Show" : "Movie"} • {movie.year}
                            </span>
                          </div>
                        </div>
                      ))}
                      <div 
                        className="w-full text-center p-4 mt-2 bg-brand/10 hover:bg-brand/20 border border-brand/20 rounded-xl transition-colors cursor-pointer"
                        onClick={() => {
                          setIsOpen(false);
                          setIsExpanded(false);
                          router.push(`/search?q=${encodeURIComponent(query.trim())}`);
                        }}
                      >
                        <span className="text-brand font-bold text-sm">
                          View all results
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="p-4 text-center text-gray-400 text-sm mt-8">
                      {!isLoading && "No results found."}
                    </div>
                  )
                ) : (
                  <div className="p-4 text-center text-gray-500 text-sm mt-8">
                    Type to search for movies, TV shows, and anime...
                  </div>
                )}
              </div>
            </div>,
            document.body
          ) : null}
        </>
      )}

      {/* Autocomplete Dropdown (Desktop) */}
      {isOpen && query.trim() !== "" && isExpanded && (
        <div className="hidden md:block absolute top-full mt-2 right-0 w-[350px] bg-[#121212] border border-white/10 rounded-xl shadow-2xl overflow-hidden py-2 custom-scrollbar max-h-[70vh] overflow-y-auto origin-top-right">
          {results.length > 0 ? (
            <>
              {results.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => handleSelect(movie)}
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
              
              <div 
                className="w-full text-center p-4 border-t border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
                onClick={() => {
                  setIsOpen(false);
                  setIsExpanded(false);
                  router.push(`/search?q=${encodeURIComponent(query.trim())}`);
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
