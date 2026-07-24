import { featuredMovie, trendingMovies, newReleases } from "@/lib/mockData";
import VideoPlayerClient from "./VideoPlayerClient";

export default async function WatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  // Find the movie from our mock data
  const allMovies = [featuredMovie, ...trendingMovies, ...newReleases];
  const movie = allMovies.find((m) => m.id === id);

  if (!movie) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black text-white">
        <h1 className="text-2xl font-bold">Movie not found</h1>
      </div>
    );
  }

  return (
    <main className="w-full h-screen bg-black overflow-hidden">
      <VideoPlayerClient movie={movie} />
    </main>
  );
}
