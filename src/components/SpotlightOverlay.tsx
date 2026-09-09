"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { Lightbulb, LightbulbOff } from "lucide-react";

export default function SpotlightOverlay() {
  const [isHovering, setIsHovering] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const pathname = usePathname();
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Spotlight works on all pages now
    if (!isEnabled) {
      setIsHovering(false);
      return;
    }

    let ticking = false;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      const target = e.target as HTMLElement | null;
      const hoveringCard = !!target?.closest?.(".movie-card, .movie-grid");
      setIsHovering(hoveringCard);

      if (!ticking) {
        requestAnimationFrame(() => {
          document.documentElement.style.setProperty("--mouse-x", `${mousePos.current.x}px`);
          document.documentElement.style.setProperty("--mouse-y", `${mousePos.current.y}px`);
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleToggle = () => setIsEnabled((prev) => !prev);
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("toggle-spotlight", handleToggle);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("toggle-spotlight", handleToggle);
    };
  }, [pathname, isEnabled]);

  // The spotlight will now run on all pages where .movie-grid exists

  return (
    <div 
      className={`pointer-events-none fixed inset-0 z-40 transition-opacity duration-700 ease-in-out ${isHovering && isEnabled ? "opacity-100" : "opacity-0"}`}
      style={{
        background: "radial-gradient(circle 350px at var(--mouse-x, 50vw) var(--mouse-y, 50vh), transparent 0%, rgba(0, 0, 0, 0.55) 100%)"
      }}
    />
  );
}
