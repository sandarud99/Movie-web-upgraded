"use client";

import { useEffect, useState } from "react";
import VideoPlayer from "@/components/VideoPlayer";
import { Movie } from "@/lib/mockData";
import Player from "video.js/dist/types/player";

interface VideoPlayerClientProps {
  movie: Movie;
}

export default function VideoPlayerClient({ movie }: VideoPlayerClientProps) {
  const [videoUrl, setVideoUrl] = useState<string>("");

  useEffect(() => {
    // In a real application, you would fetch the streaming URL from your API.
    // Example: fetch(`/api/stream/${movie.id}`)
    // For this mock, we'll use a sample public video URL.
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
