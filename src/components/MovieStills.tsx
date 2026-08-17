"use client";

import { MovieImage } from "@/types/tmdb";
import { Image as ImageIcon, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface MovieStillsProps {
  images: MovieImage[];
}

export default function MovieStills({ images }: MovieStillsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Auto-scrolling logic
  useEffect(() => {
    let animationFrameId: number;

    const scroll = () => {
      if (scrollRef.current && !isHovering) {
        scrollRef.current.scrollLeft += 0.8; // Scrolling speed
        
        // Loop back to start if it hits the end
        if (
          scrollRef.current.scrollLeft >=
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth
        ) {
          scrollRef.current.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovering]);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 mt-16">
        <div className="flex items-center gap-3 mb-6">
        <ImageIcon className="w-5 h-5 text-gray-400" />
        <h2 className="text-sm font-bold text-white tracking-widest uppercase">
          MOVIE STILLS
        </h2>
      </div>

      <div 
        ref={scrollRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="flex overflow-x-auto gap-4 md:gap-6 pb-6 scrollbar-hide cursor-grab active:cursor-grabbing [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      >
        {images.map((img, idx) => (
          <div 
            key={idx} 
            onClick={() => setSelectedImage(img.url)}
            className="flex-shrink-0 w-[260px] md:w-[320px] aspect-video rounded-2xl overflow-hidden bg-gray-900 border border-white/5 hover:border-brand/50 transition-colors cursor-pointer"
          >
            <img 
              src={img.url} 
              alt={`Movie still ${idx + 1}`}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </div>

    {/* Full Screen Modal */}
    {selectedImage && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-12 animate-in fade-in duration-300">
        <button 
          onClick={() => setSelectedImage(null)}
          className="absolute top-6 right-6 md:top-12 md:right-12 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        <img 
          src={selectedImage} 
          alt="Full screen movie still"
          className="max-w-full max-h-full object-contain rounded-lg shadow-[0_0_100px_rgba(229,9,20,0.2)]"
        />
      </div>
    )}
    </>
  );
}
