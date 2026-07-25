import Hero from "@/components/Hero";
import MovieGrid from "@/components/MovieGrid";
import { getTVShows } from "@/lib/tmdb";

export default async function TVShowsPage() {
  const shows = await getTVShows();
  
  if (!shows || shows.length === 0) {
    return <div className="min-h-screen flex items-center justify-center text-white">No TV Shows found.</div>;
  }

  const heroShow = shows[0];
  const remainingShows = shows.slice(1);

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Hero movie={heroShow} />
      <div className="relative z-20 -mt-32 pb-24">
        <MovieGrid title="Popular TV Shows" movies={remainingShows} />
      </div>
    </main>
  );
}
