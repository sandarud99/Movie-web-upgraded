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

    const checkHover = (x: number, y: number) => {
      // Find the element currently under the mouse coordinates
      const el = document.elementFromPoint(x, y);
      setIsHovering(!!el?.closest(".movie-card, .movie-grid"));
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      // Update global CSS variables for the mouse position
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
      checkHover(e.clientX, e.clientY);
    };

    const handleScroll = () => {
      // Re-evaluate what is under the mouse when the page scrolls
      checkHover(mousePos.current.x, mousePos.current.y);
    };

    const handleToggle = () => setIsEnabled((prev) => !prev);
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("toggle-spotlight", handleToggle);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
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
