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
  10762: "Kids",
  10763: "News",
  10764: "Reality",
  10759: "Action & Adventure",
  10765: "Sci-Fi & Fantasy",
  10768: "War & Politics",
};

function getGenresFromIds(ids: number[]): string {
  if (!ids || ids.length === 0) return "Movie";
  return ids.map((id) => genreMap[id] || "Unknown").join(", ");
}

export function getGenreIdByName(name: string): string | undefined {
  const entry = Object.entries(genreMap).find(([id, genreName]) => genreName.toLowerCase() === name.toLowerCase());
  return entry ? entry[0] : undefined;
}

export function adaptTMDBMovie(tmdb: TMDBMovie, defaultType: "movie" | "tv" = "movie"): Movie {
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
    type: tmdb.media_type === "tv" || defaultType === "tv" ? "SERIES" : "MOVIE",
    collectionId: tmdb.belongs_to_collection?.id || null,
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

export async function getTrendingMovies(category?: string, page: number = 1): Promise<Movie[]> {
  let endpoint = "/trending/all/day";
  let params: Record<string, string> = { page: page.toString() };

  if (category) {
    if (category.toLowerCase() === "movies") {
      endpoint = "/trending/movie/day";
    } else if (category.toLowerCase() === "tv shows") {
      endpoint = "/trending/tv/day";
    } else if (category.toLowerCase() === "trending" || category === "18+") {
      // Keep default endpoint for Trending/18+
    } else {
      const genreId = getGenreIdByName(category);
      if (genreId) {
        endpoint = "/discover/movie";
        params = { sort_by: "popularity.desc", with_genres: genreId, page: page.toString() };
      }
    }
  }

  const data = await fetchFromTMDB(endpoint, params);
  const defaultType = endpoint.includes("/tv") ? "tv" : "movie";
  return data.results.map((m: any) => adaptTMDBMovie(m, defaultType));
}

export async function getTopRatedMovies(category?: string, page: number = 1): Promise<Movie[]> {
  let endpoint = "/movie/top_rated";
  let params: Record<string, string> = { page: page.toString() };

  if (category) {
    if (category.toLowerCase() === "movies") {
      endpoint = "/movie/top_rated";
    } else if (category.toLowerCase() === "tv shows") {
      endpoint = "/tv/top_rated";
    } else if (category.toLowerCase() === "trending" || category === "18+") {
      // Keep default endpoint for Trending/18+
    } else {
      const genreId = getGenreIdByName(category);
      if (genreId) {
        endpoint = "/discover/movie";
        params = { sort_by: "vote_average.desc", "vote_count.gte": "200", with_genres: genreId, page: page.toString() };
      }
    }
  }

  const data = await fetchFromTMDB(endpoint, params);
  const defaultType = endpoint.includes("/tv") ? "tv" : "movie";
  return data.results.map((m: any) => adaptTMDBMovie(m, defaultType));
}

export async function getNewReleases(category?: string, page: number = 1): Promise<Movie[]> {
  let endpoint = "/movie/now_playing";
  let params: Record<string, string> = { page: page.toString() };

  if (category) {
    if (category.toLowerCase() === "movies") {
      endpoint = "/movie/now_playing";
    } else if (category.toLowerCase() === "tv shows") {
      endpoint = "/tv/on_the_air"; // closest to now playing for TV
    } else if (category.toLowerCase() === "trending" || category === "18+") {
      // Keep default endpoint for Trending/18+
    } else {
      const genreId = getGenreIdByName(category);
      if (genreId) {
        endpoint = "/discover/movie";
        params = { sort_by: "primary_release_date.desc", "vote_count.gte": "10", with_genres: genreId, page: page.toString() };
      }
    }
  }

  const data = await fetchFromTMDB(endpoint, params);
  const defaultType = endpoint.includes("/tv") ? "tv" : "movie";
  return data.results.map((m: any) => adaptTMDBMovie(m, defaultType));
}

export async function getTVShows(filters: Record<string, string> = {}): Promise<Movie[]> {
  const data = await fetchFromTMDB("/discover/tv", { sort_by: "popularity.desc", ...filters });
  return data.results.map((m: any) => adaptTMDBMovie(m, "tv"));
}

export async function getMovies(filters: Record<string, string> = {}): Promise<Movie[]> {
  const data = await fetchFromTMDB("/discover/movie", { sort_by: "popularity.desc", ...filters });
  return data.results.map(adaptTMDBMovie);
}

export async function getAnime(filters: Record<string, string> = {}): Promise<Movie[]> {
  // TMDB Animation Genre is 16, Japanese is 'ja'
  const data = await fetchFromTMDB("/discover/tv", { 
    with_genres: "16", 
    with_original_language: "ja", 
    sort_by: "popularity.desc",
    ...filters 
  });
  return data.results.map((m: any) => adaptTMDBMovie(m, "tv"));
}

export async function discoverMovies(filters: Record<string, string>): Promise<Movie[]> {
  const data = await fetchFromTMDB("/discover/movie", filters);
  return data.results.map(adaptTMDBMovie);
}

export async function searchMulti(query: string, page: number = 1): Promise<Movie[]> {
  const data = await fetchFromTMDB("/search/multi", { query, page: page.toString() });
  // Filter out people or other media types that aren't movie/tv
  return data.results
    .filter((item: any) => item.media_type === "movie" || item.media_type === "tv")
    .map(adaptTMDBMovie);
}

export async function getMovieDetails(id: string, type: "movie" | "tv" = "movie"): Promise<Movie | null> {
  try {
    const data = await fetchFromTMDB(`/${type}/${id}`, { append_to_response: "videos" });
    
    let trailerUrl: string | undefined;
    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find((v: any) => v.type === "Trailer" && v.site === "YouTube");
      if (trailer) {
        trailerUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
      }
    }

    // Convert single movie data
    return {
      ...adaptTMDBMovie(data),
      duration: data.runtime ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}m` : "Unknown",
      trailerUrl,
    };
  } catch (error) {
    return null;
  }
}

export async function getMovieCredits(id: string, type: "movie" | "tv" = "movie"): Promise<import("@/types/tmdb").CastMember[]> {
  try {
    const data = await fetchFromTMDB(`/${type}/${id}/credits`);
    if (!data.cast) return [];
    
    return data.cast.slice(0, 15).map((member: any) => ({
      id: member.id,
      name: member.name,
      character: member.character,
      profileUrl: member.profile_path 
        ? `https://image.tmdb.org/t/p/w185${member.profile_path}`
        : "https://placehold.co/185x185/141414/FFF?text=No+Img",
    }));
  } catch (error) {
    return [];
  }
}

export async function getMovieImages(id: string, type: "movie" | "tv" = "movie"): Promise<import("@/types/tmdb").MovieImage[]> {
  try {
    // We don't specify language to ensure we get a lot of backdrops (many are null language)
    const data = await fetchFromTMDB(`/${type}/${id}/images`, { include_image_language: 'en,null' });
    if (!data.backdrops) return [];
    
    return data.backdrops.slice(0, 10).map((img: any) => ({
      url: `https://image.tmdb.org/t/p/w780${img.file_path}`,
    }));
  } catch (error) {
    return [];
  }
}

export async function getMovieCollection(collectionId: number): Promise<Movie[]> {
  try {
    const data = await fetchFromTMDB(`/collection/${collectionId}`);
    if (!data.parts) return [];
    
    // The parts array inside a collection contains movie objects similar to standard results
    return data.parts.map(adaptTMDBMovie).sort((a: Movie, b: Movie) => (a.year || 0) - (b.year || 0));
  } catch (error) {
    return [];
  }
}

export async function getTVShowDetails(id: string): Promise<Movie | null> {
  try {
    const data = await fetchFromTMDB(`/tv/${id}`, { append_to_response: "videos" });
    
    let trailerUrl: string | undefined;
    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find((v: any) => v.type === "Trailer" && v.site === "YouTube");
      if (trailer) {
        trailerUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
      }
    }

    const seasons = data.seasons 
      ? data.seasons
          .filter((s: any) => s.season_number > 0)
          .map((s: any) => ({
            id: s.id,
            name: s.name,
            seasonNumber: s.season_number,
            episodeCount: s.episode_count,
            posterUrl: s.poster_path ? `https://image.tmdb.org/t/p/w342${s.poster_path}` : null,
          }))
      : [];

    return {
      ...adaptTMDBMovie({ ...data, media_type: "tv" }),
      duration: data.episode_run_time?.[0] ? `${data.episode_run_time[0]}m` : "Unknown",
      trailerUrl,
      seasons,
    };
  } catch (error) {
    return null;
  }
}

export async function getTVSeasonEpisodes(id: string, seasonNumber: number): Promise<import("@/types/tmdb").TVEpisode[]> {
  try {
    const data = await fetchFromTMDB(`/tv/${id}/season/${seasonNumber}`);
    if (!data.episodes) return [];
    
    return data.episodes.map((ep: any) => ({
      id: ep.id,
      name: ep.name,
      overview: ep.overview || "No description available.",
      episodeNumber: ep.episode_number,
      seasonNumber: ep.season_number,
      stillUrl: ep.still_path ? `https://image.tmdb.org/t/p/w500${ep.still_path}` : "https://placehold.co/500x281/141414/FFF?text=No+Image",
      airDate: ep.air_date || "",
      runtime: ep.runtime || 0,
      voteAverage: ep.vote_average ? parseFloat(ep.vote_average.toFixed(1)) : 0,
    }));
  } catch (error) {
    return [];
  }
}
