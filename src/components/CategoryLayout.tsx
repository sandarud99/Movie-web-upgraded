import { Movie } from "@/types/tmdb";
import Breadcrumbs from "./Breadcrumbs";
import GenrePills from "./GenrePills";
import CategoryHero from "./CategoryHero";
import CategorySidebar from "./CategorySidebar";
import MovieCard from "./MovieCard";
import Link from "next/link";

interface CategoryLayoutProps {
  title: string;
  category: "Movies" | "TV Shows" | "Anime";
  heroMovies: Movie[];
  gridMovies: Movie[];
  hideGenrePills?: boolean;
  currentPage?: number;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function CategoryLayout({ 
  title, 
  category, 
  heroMovies, 
  gridMovies, 
  hideGenrePills,
  currentPage = 1,
  searchParams = {} 
}: CategoryLayoutProps) {
  
  // Helper to build URL with updated page
  const buildPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (typeof value === 'string') params.append(key, value);
    });
    params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  // Generate pagination range (e.g. current - 2 to current + 2)
  const maxPages = 500; // TMDB limit
  const pages = [];
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(maxPages, startPage + 4);
  
  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 md:pt-32 pb-24 px-6 md:px-12">
      <div className="w-full flex flex-col xl:flex-row gap-8 xl:gap-12">
        
        {/* Left Column (Main Content) */}
        <div className="flex-1 min-w-0">
          <Breadcrumbs paths={[{ name: category }]} />
          {!hideGenrePills && <GenrePills />}
          
          <CategoryHero movies={heroMovies} />
          
          <h2 className="text-3xl font-black text-white mb-6 font-heading tracking-tight">{title}</h2>
          
          {/* Custom Grid (no padding, fits container) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4 md:gap-6 mb-12">
            {gridMovies.map((movie, index) => (
              <MovieCard key={`${movie.id}-${index}`} movie={movie} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {currentPage > 1 && (
              <Link 
                href={buildPageUrl(currentPage - 1)}
                className="px-4 h-10 flex items-center justify-center rounded-lg bg-black/40 border border-white/5 text-gray-400 font-bold hover:bg-white/10 hover:text-white transition-colors"
              >
                Prev
              </Link>
            )}
            
            {pages.map(num => (
              <Link 
                key={num} 
                href={buildPageUrl(num)}
                className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold transition-colors ${
                  num === currentPage 
                    ? "bg-brand text-white shadow-md" 
                    : "bg-black/40 border border-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {num}
              </Link>
            ))}
            
            {currentPage < maxPages && (
              <Link 
                href={buildPageUrl(currentPage + 1)}
                className="px-4 h-10 flex items-center justify-center rounded-lg bg-black/40 border border-white/5 text-gray-400 font-bold hover:bg-white/10 hover:text-white transition-colors"
              >
                Next
              </Link>
            )}
          </div>
        </div>

        {/* Right Column (Sidebar) */}
        <aside className="w-full xl:w-[350px] flex-shrink-0">
          <CategorySidebar title={`Popular ${category}`} items={heroMovies.concat(gridMovies)} category={category} />
        </aside>

      </div>
    </div>
  );
}
