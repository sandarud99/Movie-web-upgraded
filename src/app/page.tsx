import Hero from "@/components/Hero";
import MovieGrid from "@/components/MovieGrid";
import { featuredMovie, trendingMovies, newReleases } from "@/lib/mockData";

export default function Home() {
  return (
    <main className="min-h-screen pb-20">
      <Hero movie={featuredMovie} />
      <div className="-mt-16 md:-mt-24 relative z-10">
        <MovieGrid title="Trending Now" movies={trendingMovies} />
        <MovieGrid title="New Releases" movies={newReleases} />
      </div>
    </main>
  );
}
