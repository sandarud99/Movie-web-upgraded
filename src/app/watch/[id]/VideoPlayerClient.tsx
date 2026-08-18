"use client";

import { useEffect } from "react";
import { Movie } from "@/types/tmdb";

interface VideoPlayerClientProps {
  movie: Movie;
  season?: number;
  episode?: number;
}

export default function VideoPlayerClient({ movie, season, episode }: VideoPlayerClientProps) {
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

  let embedUrl = `https://vidapi.xyz/embed/movie/${movie.id}`;
  if (movie.type === "SERIES") {
    const s = season || 1;
    const e = episode || 1;
    embedUrl = `https://vidapi.xyz/embed/tv/${movie.id}/${s}/${e}`;
  }

  return (
    <div className="w-full h-full bg-black relative">
      <iframe 
        src={embedUrl}
        width="100%"
        height="100%"
        frameBorder="0"
        scrolling="no"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
      />
    </div>
  );
}
