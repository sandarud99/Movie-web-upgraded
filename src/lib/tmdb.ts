import { Movie, TMDBMovie } from "@/types/tmdb";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

// Map TMDB genre IDs to strings
export const genreMap: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
  10759: "Action & Adventure",
  10765: "Sci-Fi & Fantasy",
  10768: "War & Politics",
};

function getGenresFromIds(ids: number[]): string {
  if (!ids || ids.length === 0) return "Movie";
  return ids.map((id) => genreMap[id] || "Unknown").join(", ");
}

export function adaptTMDBMovie(tmdb: TMDBMovie): Movie {
  const title = tmdb.title || tmdb.name || "Unknown Title";
  const dateStr = tmdb.release_date || tmdb.first_air_date;
  const year = dateStr ? parseInt(dateStr.split("-")[0]) : new Date().getFullYear();
  
  // Randomly assign quality for visual flair on mock UI
  const qualityOptions = ["WEB-RIP", "HD-RIP", "BLURAY"];
  const quality = qualityOptions[Math.floor(Math.random() * qualityOptions.length)];

  return {
    id: tmdb.id.toString(),
    title,
    description: tmdb.overview || "No description available.",
    year,
    genre: getGenresFromIds(tmdb.genre_ids),
    duration: "2h 15m", // TMDB doesn't return runtime in standard lists
    posterUrl: tmdb.poster_path && tmdb.poster_path !== "null" ? `https://image.tmdb.org/t/p/w500${tmdb.poster_path}` : "https://placehold.co/500x750/141414/FFF?text=No+Poster",
    backdropUrl: tmdb.backdrop_path && tmdb.backdrop_path !== "null" ? `https://image.tmdb.org/t/p/original${tmdb.backdrop_path}` : "https://placehold.co/1920x1080/141414/FFF?text=No+Backdrop",
    rating: tmdb.vote_average ? parseFloat(tmdb.vote_average.toFixed(1)) : 0,
    quality,
    type: tmdb.media_type === "tv" ? "SERIES" : "MOVIE",
  };
}

async function fetchFromTMDB(endpoint: string, params: Record<string, string> = {}) {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.append("api_key", TMDB_API_KEY || "");
  
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const response = await fetch(url.toString(), {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`TMDB API Error: ${response.statusText}`);
  }

  return response.json();
}

export async function getTrendingMovies(): Promise<Movie[]> {
  const data = await fetchFromTMDB("/trending/all/day");
  return data.results.map(adaptTMDBMovie);
}

export async function getTopRatedMovies(): Promise<Movie[]> {
  const data = await fetchFromTMDB("/movie/top_rated");
  return data.results.map(adaptTMDBMovie);
}

export async function getNewReleases(): Promise<Movie[]> {
  const data = await fetchFromTMDB("/movie/now_playing");
  return data.results.map(adaptTMDBMovie);
}

export async function getTVShows(): Promise<Movie[]> {
  const data = await fetchFromTMDB("/discover/tv", { sort_by: "popularity.desc" });
  return data.results.map(adaptTMDBMovie);
}

export async function getMovies(): Promise<Movie[]> {
  const data = await fetchFromTMDB("/discover/movie", { sort_by: "popularity.desc" });
  return data.results.map(adaptTMDBMovie);
}

export async function getAnime(): Promise<Movie[]> {
  // TMDB Animation Genre is 16, Japanese is 'ja'
  const data = await fetchFromTMDB("/discover/tv", { 
    with_genres: "16", 
    with_original_language: "ja", 
    sort_by: "popularity.desc" 
  });
  return data.results.map(adaptTMDBMovie);
}

export async function discoverMovies(filters: Record<string, string>): Promise<Movie[]> {
  const data = await fetchFromTMDB("/discover/movie", filters);
  return data.results.map(adaptTMDBMovie);
}

export async function searchMulti(query: string): Promise<Movie[]> {
  const data = await fetchFromTMDB("/search/multi", { query });
  // Filter out people or other media types that aren't movie/tv
  return data.results
    .filter((item: any) => item.media_type === "movie" || item.media_type === "tv")
    .map(adaptTMDBMovie);
}

export async function getMovieDetails(id: string): Promise<Movie | null> {
  try {
    const data = await fetchFromTMDB(`/movie/${id}`);
    
    // Convert single movie data
    return {
      ...adaptTMDBMovie(data),
      duration: data.runtime ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m` : "Unknown",
    };
  } catch (error) {
    return null;
  }
}
