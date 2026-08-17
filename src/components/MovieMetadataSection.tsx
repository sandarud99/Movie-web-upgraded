"use client";

import { Movie } from "@/types/tmdb";
import { Calendar, Clock, Film, Share2, Play, Eye, Download, FileText } from "lucide-react";
import Image from "next/image";

interface MovieMetadataSectionProps {
  movie: Movie;
}

export default function MovieMetadataSection({ movie }: MovieMetadataSectionProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: movie.title,
          text: `Check out ${movie.title} on 9ineflix!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 mt-12 md:mt-24">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        {/* Poster */}
        <div className="flex-shrink-0 w-[240px] md:w-[320px] mx-auto md:mx-0">
          <div className="relative aspect-[2/3] w-full rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(229,9,20,0.3)] border border-brand/20">
            <img 
              src={movie.posterUrl} 
              alt={movie.title} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Details */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Top Badges */}
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-black border border-white/10 rounded text-[10px] font-bold text-gray-300 tracking-wider">
              {movie.quality || "WEB-RIP"}
            </span>
            <span className="px-3 py-1 bg-black border border-yellow-500/30 rounded flex items-center gap-1.5 text-[10px] font-bold text-yellow-500">
              <span className="text-yellow-500 text-[10px]">★</span> {movie.rating || "8.5"}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white font-heading tracking-tight leading-tight mb-6">
            {movie.title}
          </h1>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-8 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 bg-black border border-white/10 rounded-lg text-gray-300">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>{movie.year}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-black border border-white/10 rounded-lg text-gray-300">
              <Clock className="w-4 h-4 text-gray-500" />
              <span>{movie.duration}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-black border border-white/10 rounded-lg text-gray-300">
              <Film className="w-4 h-4 text-gray-500" />
              <span>{movie.genre}</span>
            </div>
            
            {movie.trailerUrl ? (
              <a 
                href={movie.trailerUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2 bg-brand/20 border border-brand/50 text-brand rounded-lg font-bold hover:bg-brand hover:text-white transition-colors"
              >
                <Play className="w-4 h-4 fill-current" />
                WATCH TRAILER
              </a>
            ) : (
              <button disabled className="flex items-center gap-2 px-5 py-2 bg-brand/10 border border-brand/20 text-brand/50 rounded-lg font-bold cursor-not-allowed">
                <Play className="w-4 h-4 fill-current" />
                NO TRAILER
              </button>
            )}

            <button 
              onClick={handleShare}
              className="p-2 bg-black border border-white/10 rounded-lg text-gray-300 hover:text-white transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>


          <p className="text-gray-300 leading-relaxed mb-8 max-w-4xl text-sm md:text-base">
            {movie.description}
          </p>


        </div>
      </div>
    </div>
  );
}
