import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import MovieGrid from "@/components/MovieGrid";
import { getTrendingMovies, getTopRatedMovies, getNewReleases } from "@/lib/tmdb";

export default async function Home() {
  const trendingMovies = await getTrendingMovies();
  const topRatedMovies = await getTopRatedMovies();
  const newReleases = await getNewReleases();

  // Use top 5 trending movies for the Hero slider
  const heroMovies = trendingMovies.slice(0, 5);

  return (
    <main className="min-h-screen pb-20">
      {heroMovies.length > 0 && <Hero movies={heroMovies} />}
      <div className="relative z-10">
        <Categories />
        <MovieGrid title="Trending Now" movies={trendingMovies} />
        <MovieGrid title="Top Rated" movies={topRatedMovies} />
        <MovieGrid title="New Releases" movies={newReleases} />
      </div>
    </main>
  );
}
