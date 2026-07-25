import { getMovieDetails } from "@/lib/tmdb";
import VideoPlayerClient from "./VideoPlayerClient";

export default async function WatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  // Fetch movie from TMDB
  const movie = await getMovieDetails(id);

  if (!movie) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black text-white">
        <h1 className="text-2xl font-bold font-heading">Movie not found</h1>
      </div>
    );
  }

  return (
    <main className="w-full h-screen bg-black overflow-hidden">
      <VideoPlayerClient movie={movie} />
    </main>
  );
}
