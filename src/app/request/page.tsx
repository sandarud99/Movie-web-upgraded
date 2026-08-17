"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Film, Send, Tv } from "lucide-react";
import { searchMoviesAction } from "@/app/actions";
import { Movie } from "@/types/tmdb";

export default function RequestPage() {
  const [formData, setFormData] = useState({
    title: "",
    type: "movie",
    year: "",
    additionalInfo: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [suggestions, setSuggestions] = useState<Movie[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const skipSearchRef = useRef(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!formData.title.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    if (skipSearchRef.current) {
      skipSearchRef.current = false;
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await searchMoviesAction(formData.title);
        setSuggestions(results.slice(0, 5)); // Keep top 5 suggestions
        setShowSuggestions(true);
      } catch (error) {
        console.error("Failed to fetch suggestions", error);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.title]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (!selectedMovieId) {
      newErrors.title = "Please select a valid title from the suggestions dropdown";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
      setFormData({ title: "", type: "movie", year: "", additionalInfo: "" });
      setSelectedMovieId(null);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: "" }));
    }
    // If they change the title manually, clear the selected ID so they must pick from suggestions again
    if (e.target.name === "title") {
      setSelectedMovieId(null);
    }
  };

  const handleSelectSuggestion = (movie: Movie) => {
    skipSearchRef.current = true;
    let derivedType = "movie";
    if (movie.type?.toUpperCase() === "SERIES") {
      // Check if it's anime (often categorized under Animation)
      if (movie.genre && movie.genre.toLowerCase().includes("animation")) {
        derivedType = "anime";
      } else {
        derivedType = "tv";
      }
    } else if (movie.genre && movie.genre.toLowerCase().includes("animation")) {
      // Even some movies might be considered anime if they are animation
      derivedType = "anime";
    }

    setFormData(prev => ({
      ...prev,
      title: movie.title,
      type: derivedType,
      year: movie.year ? movie.year.toString() : ""
    }));
    setSelectedMovieId(movie.id);
    setShowSuggestions(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
      {/* Background Glowing Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand/20 rounded-full blur-[120px] pointer-events-none -z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[120px] pointer-events-none -z-0" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 mb-6 font-heading tracking-tight">
            Request a Title
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Can't find your favorite movie or TV show? Let us know what you're looking for, and we'll do our best to add it to our collection!
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#141414]/80 backdrop-blur-2xl p-8 md:p-12 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          {/* Form decorative element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2" />
          
          {isSubmitted && (
            <div className="mb-8 p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400 text-sm font-medium flex items-center justify-center">
              Thank you! Your request has been submitted successfully.
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
            
            <div className="flex flex-col gap-2 relative" ref={searchRef}>
              <label className="text-sm font-semibold text-gray-300 ml-1">Title of Movie / TV Show <span className="text-brand">*</span></label>
              <input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleChange}
                onFocus={() => {
                  if (suggestions.length > 0) setShowSuggestions(true);
                }}
                placeholder="e.g. Inception" 
                className={`bg-black/60 border ${errors.title ? 'border-red-500' : 'border-white/10'} rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all placeholder:text-gray-600`}
                autoComplete="off"
              />
              {isSearching && (
                <div className="absolute right-4 top-12">
                  <div className="w-5 h-5 border-2 border-brand border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full mt-2 left-0 w-full bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden">
                  {suggestions.map((movie) => (
                    <button
                      key={movie.id}
                      type="button"
                      onClick={() => handleSelectSuggestion(movie)}
                      className="w-full flex items-center gap-4 px-4 py-3 hover:bg-white/10 transition-colors text-left"
                    >
                      <div className="w-10 h-14 flex-shrink-0 bg-gray-800 rounded overflow-hidden">
                        <img 
                          src={movie.posterUrl} 
                          alt={movie.title}
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/100x150/141414/FFF?text=Img"; }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-bold text-sm truncate">{movie.title}</h4>
                        <p className="text-gray-400 text-xs mt-1">
                          {movie.year} • {movie.type === "SERIES" ? "TV Show" : "Movie"}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {errors.title && <span className="text-red-500 text-xs ml-1">{errors.title}</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-300 ml-1">Type</label>
                <div className="relative">
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    disabled
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-5 py-4 text-gray-400 focus:outline-none transition-all appearance-none cursor-not-allowed opacity-80"
                  >
                    <option value="movie">Movie</option>
                    <option value="tv">TV Show</option>
                    <option value="anime">Anime</option>
                    <option value="other">Other / Not Sure</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    {formData.type === 'movie' ? <Film className="w-5 h-5" /> : <Tv className="w-5 h-5" />}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-300 ml-1">Release Year (Optional)</label>
                <input 
                  type="text" 
                  name="year"
                  value={formData.year}
                  readOnly
                  placeholder="Auto-filled from selection" 
                  className="bg-black/60 border border-white/10 rounded-xl px-5 py-4 text-gray-400 focus:outline-none transition-all placeholder:text-gray-600 cursor-not-allowed opacity-80"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-300 ml-1">Additional Information (Optional)</label>
              <textarea 
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                placeholder="Any specific actors, directors, or links to help us find it?" 
                rows={4}
                className="bg-black/60 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all resize-none placeholder:text-gray-600"
              />
            </div>

            <button 
              type="submit"
              className="group flex items-center justify-center gap-3 bg-brand text-white font-bold py-4 rounded-xl hover:bg-brand/80 transition-all mt-4 shadow-[0_0_20px_rgba(229,9,20,0.4)] hover:shadow-[0_0_30px_rgba(229,9,20,0.6)] hover:-translate-y-1"
            >
              Submit Request
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>

      {/* Gradient transition to match footer color smoothly */}
      <div className="w-full h-48 bg-gradient-to-b from-transparent to-[#141414] pointer-events-none absolute bottom-0 left-0 z-0" />
    </div>
  );
}
