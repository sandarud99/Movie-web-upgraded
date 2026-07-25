import Hero from "@/components/Hero";
import MovieGrid from "@/components/MovieGrid";
import { getAnime } from "@/lib/tmdb";

export default async function AnimePage() {
  const animeList = await getAnime();
  
  if (!animeList || animeList.length === 0) {
    return <div className="min-h-screen flex items-center justify-center text-white">No Anime found.</div>;
  }

  const heroAnime = animeList[0];
  const remainingAnime = animeList.slice(1);

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      <Hero movie={heroAnime} />
      <div className="relative z-20 -mt-32 pb-24">
        <MovieGrid title="Trending Anime" movies={remainingAnime} />
      </div>
    </main>
  );
}
