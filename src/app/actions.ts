"use server";

import { discoverMovies } from "@/lib/tmdb";
import { Movie } from "@/types/tmdb";

export async function loadMoreMovies(filters: Record<string, string>, page: number): Promise<Movie[]> {
  // Ensure the page parameter is passed to TMDB
  const tmdbFilters = { ...filters, page: page.toString() };
  return await discoverMovies(tmdbFilters);
}

export async function searchMoviesAction(query: string, page: number = 1, sort?: string, year?: string): Promise<Movie[]> {
  if (!query || query.trim() === "") return [];
  const { searchMulti } = await import("@/lib/tmdb");
  let results = await searchMulti(query, page);

  if (year) {
    results = results.filter(m => m.year?.toString() === year);
  }

  if (sort) {
    if (sort === "vote_average.desc" || sort === "popularity.desc") {
      results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sort === "primary_release_date.desc") {
      results.sort((a, b) => (b.year || 0) - (a.year || 0));
    }
  }

  return results;
}

export async function fetchMoreHomePageMovies(section: string, category: string | undefined, page: number): Promise<Movie[]> {
  const { getTrendingMovies, getTopRatedMovies, getNewReleases } = await import("@/lib/tmdb");
  switch (section) {
    case "trending":
      return await getTrendingMovies(category, page);
    case "top-rated":
      return await getTopRatedMovies(category, page);
    case "new-releases":
      return await getNewReleases(category, page);
    default:
      return [];
  }
}
