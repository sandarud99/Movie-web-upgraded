"use client";

import { useEffect, useState } from "react";
import VideoPlayer from "@/components/VideoPlayer";
import { Movie } from "@/types/tmdb";
import Player from "video.js/dist/types/player";

interface VideoPlayerClientProps {
  movie: Movie;
}

export default function VideoPlayerClient({ movie }: VideoPlayerClientProps) {
  const [videoUrl, setVideoUrl] = useState<string>("");

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

    // Example: fetch(`/api/stream/${movie.id}`)
    setVideoUrl("http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4");
  }, [movie]);

  const playerOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: videoUrl,
        type: "video/mp4"
      }
    ]
  };

  const handlePlayerReady = (player: Player) => {
    player.on("waiting", () => {
      console.log("player is waiting");
    });
    
    player.on("dispose", () => {
      console.log("player will dispose");
    });
  };

  if (!videoUrl) return null;

  return (
    <VideoPlayer 
      options={playerOptions} 
      onReady={handlePlayerReady} 
      title={movie.title}
    />
  );
}
