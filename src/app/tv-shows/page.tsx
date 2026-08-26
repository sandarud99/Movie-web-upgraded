import CategoryLayout from "@/components/CategoryLayout";
import { getTVShows } from "@/lib/tmdb";
import type { Metadata } from "next";

const BASE_URL = "https://9ineflix.com";

export const metadata: Metadata = {
  title: "TV Shows",
  description:
    "Stream the best TV shows online for free on 9ineflix. Browse trending series, top-rated dramas, and new episodes.",
  alternates: { canonical: `${BASE_URL}/tv-shows` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "TV Shows | 9ineflix",
    description: "Stream the best TV shows online for free on 9ineflix.",
    url: `${BASE_URL}/tv-shows`,
    images: [{ url: `${BASE_URL}/9ineflix-site-icon.png`, width: 512, height: 512, alt: "9ineflix TV Shows" }],
  },
};

export default async function TVShowsPage({
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
  if (year) filters.first_air_date_year = year;
  if (genre) filters.with_genres = genre;

  const tmdbPage1 = ((parseInt(page) - 1) * 2 + 1).toString();
  const tmdbPage2 = ((parseInt(page) - 1) * 2 + 2).toString();

  const [page1Data, page2Data] = await Promise.all([
    getTVShows({ ...filters, page: tmdbPage1 }),
    getTVShows({ ...filters, page: tmdbPage2 })
  ]);
  
  const moviesList = [...page1Data, ...page2Data];
  
  if (!moviesList || moviesList.length === 0) {
    return <div className="min-h-screen flex items-center justify-center text-white">No TV Shows found for these filters.</div>;
  }

  const heroMovies = moviesList.slice(0, 5);
  const remainingMovies = moviesList.slice(5, 23); // Exactly 18 movies for a 3x6 grid

  return (
    <CategoryLayout 
      title="TV Series" 
      category="TV Shows" 
      heroMovies={heroMovies} 
      gridMovies={remainingMovies} 
      currentPage={parseInt(page)}
      searchParams={resolvedParams}
    />
  );
}
