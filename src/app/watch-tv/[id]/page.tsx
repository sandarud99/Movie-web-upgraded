import { getTVShowDetails, getMovieCredits, getMovieImages, getMovieCollection } from "@/lib/tmdb";
import VideoPlayerClient from "@/app/watch/[id]/VideoPlayerClient";
import MovieMetadataSection from "@/components/MovieMetadataSection";
import TopCast from "@/components/TopCast";
import MovieStills from "@/components/MovieStills";
import SeasonEpisodesSelector from "@/components/SeasonEpisodesSelector";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function WatchTVPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const resolvedParams = await searchParams;
  const season = resolvedParams.s ? parseInt(resolvedParams.s as string) : 1;
  const episode = resolvedParams.e ? parseInt(resolvedParams.e as string) : 1;
  
  // Fetch data in parallel
  const [show, cast, stills] = await Promise.all([
    getTVShowDetails(id),
    getMovieCredits(id, "tv"),
    getMovieImages(id, "tv")
  ]);

  if (!show) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#0a050a] text-white">
        <h1 className="text-2xl font-bold font-heading">TV Show not found</h1>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-[#130b18] via-[#0a050a] to-[#11050a] overflow-x-hidden font-sans">
      
      {/* Video Hero Section */}
      <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 pt-24 md:pt-32">
        
        {/* Video Player Container with glowing red border */}
        <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(229,9,20,0.15)] border border-brand/30 z-10 bg-black group">
          
          {/* Top Controls (Inside Player) */}
          <div className="absolute top-4 left-4 md:top-6 md:left-6 lg:left-8 z-20 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
            <Link 
              href="/" 
              className="flex items-center gap-2 px-4 py-2 bg-black/50 border border-white/10 rounded-full text-white text-xs font-bold hover:bg-black/80 hover:border-brand transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              BACK TO HOME
            </Link>
          </div>
          
          <div className="hidden sm:flex absolute top-4 right-4 md:top-6 md:right-6 lg:right-8 z-20 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-black/50 border border-white/10 rounded-lg">
              <span className="text-[10px] text-gray-400 font-bold tracking-wider">POWERED BY</span>
              <span className="text-xs text-white font-black">9ineflix</span>
            </div>
          </div>

          <VideoPlayerClient movie={show} season={season} episode={episode} />
          
          {/* Watch Online Button Overlay (Bottom Left) */}
          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 lg:left-8 z-20 pointer-events-none opacity-100 lg:group-hover:opacity-0 transition-opacity duration-300">
            <div className="px-4 py-1.5 md:px-6 md:py-2 bg-brand text-white text-xs md:text-sm font-black rounded-lg shadow-lg uppercase">
              WATCH ONLINE
            </div>
          </div>
        </div>
        
        {/* Background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-brand/20 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      </div>

      <MovieMetadataSection movie={show} />
      
      {/* Seasons and Episodes Selector */}
      {show.seasons && show.seasons.length > 0 && (
        <SeasonEpisodesSelector showId={show.id} seasons={show.seasons} />
      )}

      <TopCast cast={cast} />
      
      <MovieStills images={stills} />
      
      {/* Gradient transition to match footer color smoothly */}
      <div className="w-full h-48 bg-gradient-to-b from-transparent to-[#141414] pointer-events-none mt-12" />
    </main>
  );
}
