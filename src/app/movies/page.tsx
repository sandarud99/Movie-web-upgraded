import Hero from "@/components/Hero";
import MovieGrid from "@/components/MovieGrid";
import { getMovies } from "@/lib/tmdb";

export default async function MoviesPage() {
  const moviesList = await getMovies();
  
  if (!moviesList || moviesList.length === 0) {
    return <div className="min-h-screen flex items-center justify-center text-white">No Movies found.</div>;
  }

  const heroMovie = moviesList[0];
  const remainingMovies = moviesList.slice(1);

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Hero movie={heroMovie} />
      <div className="relative z-20 -mt-32 pb-24">
        <MovieGrid title="Blockbuster Movies" movies={remainingMovies} />
      </div>
    </main>
  );
}
