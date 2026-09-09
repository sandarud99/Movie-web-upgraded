import CategoryLayout from "@/components/CategoryLayout";
import { discoverMovies } from "@/lib/tmdb";
import type { Metadata } from "next";

const BASE_URL = "https://9ineflix.com";

export const metadata: Metadata = {
  title: "New & Popular",
  description:
    "Explore the newest and most popular movies and TV shows streaming right now on 9ineflix. Filter by genre, year, and popularity.",
  alternates: { canonical: `${BASE_URL}/new-popular` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "New & Popular | 9ineflix",
    description: "Explore the newest and most popular movies and TV shows on 9ineflix.",
    url: `${BASE_URL}/new-popular`,
    images: [{ url: `${BASE_URL}/9ineflix-site-icon.png`, width: 512, height: 512, alt: "9ineflix New & Popular" }],
  },
};

export default async function NewPopularPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const page = typeof resolvedParams.page === 'string' ? resolvedParams.page : "1";
  const sort = typeof resolvedParams.sort === 'string' ? resolvedParams.sort : "popularity.desc";
  const year = typeof resolvedParams.year === 'string' ? resolvedParams.year : undefined;
  const genre = typeof resolvedParams.genre === 'string' ? resolvedParams.genre : undefined;

  const filters: Record<string, string> = { page };
  if (sort) filters.sort_by = sort;
  if (year) filters.primary_release_year = year;
  if (genre) filters.with_genres = genre;

  const moviesList = await discoverMovies(filters);
  
  if (!moviesList || moviesList.length === 0) {
    return <div className="min-h-screen flex items-center justify-center text-white">No items found for these filters.</div>;
  }

  const heroMovies = moviesList.slice(0, 5);
  const remainingMovies = moviesList.slice(5);

  return (
    <CategoryLayout 
      title="New & Popular" 
      category="Trending" 
      heroMovies={heroMovies} 
      gridMovies={remainingMovies} 
      currentPage={parseInt(page)}
      searchParams={resolvedParams}
    />
  );
}
