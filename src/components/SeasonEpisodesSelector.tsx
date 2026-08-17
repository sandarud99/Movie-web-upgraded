"use client";

import { useState, useEffect, useRef } from "react";
import { TVSeason, TVEpisode } from "@/types/tmdb";
import { fetchTVEpisodesAction } from "@/app/actions";
import { ChevronDown, Play, Clock, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface SeasonEpisodesSelectorProps {
  showId: string;
  seasons: TVSeason[];
}

export default function SeasonEpisodesSelector({ showId, seasons }: SeasonEpisodesSelectorProps) {
  const [selectedSeason, setSelectedSeason] = useState<TVSeason | null>(seasons[0] || null);
  const [episodes, setEpisodes] = useState<TVEpisode[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    async function loadEpisodes() {
      if (!selectedSeason) return;
      setIsLoading(true);
      const data = await fetchTVEpisodesAction(showId, selectedSeason.seasonNumber);
      setEpisodes(data);
      setIsLoading(false);
    }
    loadEpisodes();
  }, [showId, selectedSeason]);

  if (!seasons || seasons.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 150, damping: 20 } },
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 mt-16 mb-24 font-sans relative z-30">
      
      {/* Header and Season Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <h2 className="text-3xl font-black text-white font-heading shadow-sm">Episodes</h2>
        
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center justify-between gap-3 bg-gray-900 border border-white/10 px-5 py-3 rounded-full text-white text-sm font-bold min-w-[200px] hover:border-white/30 transition-colors shadow-lg"
          >
            <span>{selectedSeason?.name || "Select Season"}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>
          
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full mt-2 left-0 w-full bg-gray-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-80 overflow-y-auto custom-scrollbar"
              >
                {seasons.map((season) => (
                  <button
                    key={season.id}
                    onClick={() => {
                      setSelectedSeason(season);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-5 py-3 text-sm font-bold transition-colors ${
                      selectedSeason?.id === season.id
                        ? "bg-brand/20 text-brand"
                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {season.name} <span className="text-gray-500 font-normal ml-1">({season.episodeCount} Episodes)</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Episodes Grid */}
      {isLoading ? (
        <div className="w-full h-64 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-white/10 border-t-brand rounded-full animate-spin"></div>
        </div>
      ) : (
        <motion.div
          key={selectedSeason?.id}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
        >
          {episodes.map((episode) => (
            <motion.div
              key={episode.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              className="group cursor-pointer bg-[#141414] rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-colors shadow-lg hover:shadow-2xl flex flex-col"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video w-full overflow-hidden bg-gray-900">
                <img
                  src={episode.stillUrl || "https://placehold.co/500x281/141414/FFF?text=No+Image"}
                  alt={episode.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-brand text-white p-3 rounded-full scale-90 group-hover:scale-100 transition-transform">
                    <Play className="w-6 h-6 fill-white" />
                  </div>
                </div>
                <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-black text-white">
                  E{episode.episodeNumber}
                </div>
              </div>

              {/* Details */}
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-white font-bold text-sm mb-1 line-clamp-1">{episode.name}</h3>
                <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {episode.runtime}m
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-gray-400" />
                    {episode.voteAverage}
                  </span>
                  <span>{episode.airDate}</span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed line-clamp-3 mt-auto">
                  {episode.overview}
                </p>
              </div>
            </motion.div>
          ))}
          {episodes.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500 font-bold">
              No episodes available for this season.
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
