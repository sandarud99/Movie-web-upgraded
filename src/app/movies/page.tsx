import CategoryLayout from "@/components/CategoryLayout";
import { getMovies } from "@/lib/tmdb";
import type { Metadata } from "next";

const BASE_URL = "https://9ineflix.com";

export const metadata: Metadata = {
  title: "Movies",
  description:
    "Browse and stream the latest movies online on 9ineflix. Filter by genre, year, and rating to find your next watch.",
  alternates: { canonical: `${BASE_URL}/movies` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Movies | 9ineflix",
    description: "Browse and stream the latest movies on 9ineflix.",
    url: `${BASE_URL}/movies`,
    images: [{ url: `${BASE_URL}/9ineflix-site-icon.png`, width: 512, height: 512, alt: "9ineflix Movies" }],
  },
};


export default async function MoviesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const page = typeof resolvedParams.page === 'string' ? resolvedParams.page : "1";
  const sort = typeof resolvedParams.sort === 'string' ? resolvedParams.sort : undefined;
  const year = typeof resolvedParams.year === 'string' ? resolvedParams.year : undefined;
  const genre = typeof resolvedParams.genre === 'string' ? resolvedParams.genre : undefined;

  const filters: Record<string, string> = {};
  if (sort) filters.sort_by = sort;
  if (year) filters.primary_release_year = year;
  if (genre) filters.with_genres = genre;

  const tmdbPage1 = ((parseInt(page) - 1) * 2 + 1).toString();
  const tmdbPage2 = ((parseInt(page) - 1) * 2 + 2).toString();

  const [page1Data, page2Data] = await Promise.all([
    getMovies({ ...filters, page: tmdbPage1 }),
    getMovies({ ...filters, page: tmdbPage2 })
  ]);
  
  const moviesList = [...page1Data, ...page2Data];
  
  if (!moviesList || moviesList.length === 0) {
    return <div className="min-h-screen flex items-center justify-center text-white">No Movies found for these filters.</div>;
  }

  const heroMovies = moviesList.slice(0, 5);
  const remainingMovies = moviesList.slice(5, 29); // Exactly 24 movies: 6 rows on laptop (4/row) and 4 rows on desktop (6/row)

  return (
    <CategoryLayout 
      title="Movies Releases" 
      category="Movies" 
      heroMovies={heroMovies} 
      gridMovies={remainingMovies} 
      currentPage={parseInt(page)}
      searchParams={resolvedParams}
    />
  );
}
