"use client";

import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import Player from "video.js/dist/types/player";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface VideoPlayerProps {
  options: typeof videojs.options;
  onReady?: (player: Player) => void;
  title?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  options,
  onReady,
  title,
}) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      // videoElement.classList.add("vjs-theme-sea"); // Can add custom theme here
      
      if (videoRef.current) {
        videoRef.current.appendChild(videoElement);
      }

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        onReady && onReady(player);
      }));
    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay || false);
      player.src(options.sources || []);
    }
  }, [options, videoRef, onReady]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden group">
      {/* Custom Header overlay that appears on hover/interaction */}
      <div className="absolute top-0 left-0 w-full p-6 z-50 flex items-center gap-4 bg-gradient-to-b from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button 
          onClick={() => router.back()}
          className="text-white hover:text-brand transition-colors"
        >
          <ArrowLeft className="w-8 h-8" />
        </button>
        {title && <h1 className="text-white text-xl font-bold">{title}</h1>}
      </div>
      
      <div data-vjs-player className="w-full h-full">
        <div ref={videoRef} className="w-full h-full [&>.video-js]:w-full [&>.video-js]:h-full" />
      </div>
    </div>
  );
};

export default VideoPlayer;
