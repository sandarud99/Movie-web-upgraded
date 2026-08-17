"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { genreMap } from "@/lib/tmdb";

// Invert the genreMap to get Name -> ID mapping
const invertedGenreMap = Object.entries(genreMap).reduce((acc, [id, name]) => {
  acc[name] = id;
  return acc;
}, {} as Record<string, string>);

const genres = [
  "All", "Action", "Adventure", "Animation", "Comedy", "Crime", 
  "Documentary", "Drama", "Family", "Fantasy", "History", 
  "Horror", "Music", "Mystery", "Romance", "Sci-Fi", 
  "Thriller", "War", "Western"
];

export default function GenrePills() {
  const searchParams = useSearchParams();
  const currentGenreId = searchParams.get("genre");

  // Determine current active genre name
  let activeName = "All";
  if (currentGenreId && genreMap[parseInt(currentGenreId)]) {
    activeName = genreMap[parseInt(currentGenreId)];
  }

  // Build URL helper preserving other params but resetting page
  const buildGenreUrl = (genreName: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page"); // Reset to page 1 when changing genre
    
    if (genreName === "All") {
      params.delete("genre");
    } else {
      const id = invertedGenreMap[genreName];
      if (id) params.set("genre", id);
    }
    
    return `?${params.toString()}`;
  };

  return (
    <div className="flex flex-wrap gap-3 pb-4 mb-6">
      {genres.map((genre) => (
        <Link
          key={genre}
          href={buildGenreUrl(genre)}
          className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${
            activeName === genre
              ? "bg-[#ff4060] border-[#ff4060] text-white shadow-[0_0_15px_rgba(255,64,96,0.5)]"
              : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white"
          }`}
        >
          {genre}
        </Link>
      ))}
    </div>
  );
}
