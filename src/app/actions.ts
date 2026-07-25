"use server";

import { discoverMovies } from "@/lib/tmdb";
import { Movie } from "@/types/tmdb";

export async function loadMoreMovies(filters: Record<string, string>, page: number): Promise<Movie[]> {
  // Ensure the page parameter is passed to TMDB
  const tmdbFilters = { ...filters, page: page.toString() };
  return await discoverMovies(tmdbFilters);
}

export async function searchMoviesAction(query: string): Promise<Movie[]> {
  if (!query || query.trim() === "") return [];
  const { searchMulti } = await import("@/lib/tmdb");
  return await searchMulti(query);
}
