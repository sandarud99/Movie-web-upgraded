"use client";

import { useEffect, useState } from "react";
import { Movie } from "@/types/tmdb";
import { Loader2 } from "lucide-react";

interface VideoPlayerClientProps {
  movie: Movie;
  season?: number;
  episode?: number;
}

export default function VideoPlayerClient({ movie, season, episode }: VideoPlayerClientProps) {
  const [isIframeLoading, setIsIframeLoading] = useState(true);

  useEffect(() => {
    // Save to local watch history
    try {
      const historyStr = localStorage.getItem("watchHistory") || "[]";
      let history = JSON.parse(historyStr);
      
      // Remove if it already exists so we can bump it to the top
      history = history.filter((m: Movie) => m.id !== movie.id);
      
      // Add to beginning of array
      history.unshift(movie);
      
      // Keep only the last 50 items
      if (history.length > 50) history = history.slice(0, 50);
      
      localStorage.setItem("watchHistory", JSON.stringify(history));
    } catch (e) {
      console.error("Failed to save history", e);
    }
  }, [movie]);

  let embedUrl = `https://vidsrc.me/embed/movie?tmdb=${movie.id}`;
  if (movie.type === "SERIES") {
    const s = season || 1;
    const e = episode || 1;
    embedUrl = `https://vidsrc.me/embed/tv?tmdb=${movie.id}&season=${s}&episode=${e}`;
  }

  return (
    <div className="w-full h-full bg-black relative overflow-hidden">
      {/* Loading Skeleton */}
      {isIframeLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-b from-[#141414] to-black">
          <div className="relative flex items-center justify-center mb-4">
            <div className="absolute w-20 h-20 bg-brand/20 blur-xl rounded-full animate-pulse" />
            <Loader2 className="w-10 h-10 text-brand animate-spin relative z-10" />
          </div>
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase animate-pulse">
            Connecting Stream Server...
          </p>
        </div>
      )}

      <iframe 
        src={embedUrl}
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        allowFullScreen
        onLoad={() => setIsIframeLoading(false)}
        className="absolute top-0 left-0 w-full h-full transition-opacity duration-500"
      />
    </div>
  );
}
