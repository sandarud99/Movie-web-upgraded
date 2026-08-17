"use client";

import { Movie } from "@/types/tmdb";
import { Star, Film, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

interface CollectionTimelineProps {
  collectionName: string;
  movies: Movie[];
  currentMovieId: string;
}

export default function CollectionTimeline({ collectionName, movies, currentMovieId }: CollectionTimelineProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    };
    
    if (scrollRef.current) {
      handleScroll();
    }
    
    const ref = scrollRef.current;
    ref?.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      ref?.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [movies]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!movies || movies.length <= 1) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 mt-16 relative group/timeline">
      <div className="flex items-center gap-3 mb-6">
        <Film className="w-5 h-5 text-gray-400" />
        <h2 className="text-sm font-bold text-white tracking-widest uppercase">
          {collectionName || "Collection"} TIMELINE
        </h2>
      </div>

      <div className="relative">
        {showLeftArrow && (
          <button 
            onClick={() => scroll('left')}
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-black/90 hover:bg-brand text-white p-2.5 rounded-full border border-white/20 hover:border-brand shadow-[0_0_20px_rgba(0,0,0,0.8)] opacity-0 group-hover/timeline:opacity-100 transition-all items-center justify-center"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        
        {showRightArrow && movies.length > 4 && (
          <button 
            onClick={() => scroll('right')}
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-black/90 hover:bg-brand text-white p-2.5 rounded-full border border-white/20 hover:border-brand shadow-[0_0_20px_rgba(0,0,0,0.8)] opacity-0 group-hover/timeline:opacity-100 transition-all items-center justify-center"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-4 pt-6 pb-8 px-4 -mx-4 scrollbar-hide snap-x scroll-smooth"
        >
          {movies.map((movie) => {
            const isPlaying = movie.id === currentMovieId;
            
            return (
              <Link 
                key={movie.id} 
                href={`/watch/${movie.id}`}
                className={`relative flex-shrink-0 flex items-center gap-4 p-3 pr-4 rounded-2xl bg-black border transition-all duration-300 snap-start
                  w-[75vw] sm:w-[calc(50%-0.5rem)] md:w-[calc(25%-0.75rem)]
                  ${isPlaying 
                    ? 'border-brand shadow-[0_0_20px_rgba(229,9,20,0.3)] scale-105 z-10' 
                    : 'border-white/5 hover:border-white/20 opacity-70 hover:opacity-100'
                  }
                `}
              >
                {/* Playing Badge */}
                {isPlaying && (
                  <div className="absolute -top-3 -right-3 bg-brand text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                    PLAYING
                  </div>
                )}

                {/* Thumbnail */}
                <div className="w-16 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-900">
                  <img 
                    src={movie.posterUrl} 
                    alt={movie.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col overflow-hidden">
                  <h3 className="text-white font-bold text-sm truncate w-full mb-2 leading-tight pr-2">
                    {movie.title}
                  </h3>
                  <div className="flex items-center gap-3 text-[10px] font-bold">
                    <span className="px-2 py-0.5 bg-white/10 rounded text-gray-300">{movie.year}</span>
                    <div className="flex items-center text-yellow-500">
                      <span className="text-yellow-500 mr-1">★</span>
                      {movie.rating}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      
      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-8"></div>
    </div>
  );
}
