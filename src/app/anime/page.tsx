import CategoryLayout from "@/components/CategoryLayout";
import { getAnime } from "@/lib/tmdb";
import type { Metadata } from "next";

const BASE_URL = "https://9ineflix.com";

export const metadata: Metadata = {
  title: "Anime",
  description:
    "Watch the best anime online for free on 9ineflix. From classic series to the latest seasonal releases — all genres covered.",
  alternates: { canonical: `${BASE_URL}/anime` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Anime | 9ineflix",
    description: "Watch the best anime online for free on 9ineflix.",
    url: `${BASE_URL}/anime`,
    images: [{ url: `${BASE_URL}/9ineflix-site-icon.png`, width: 512, height: 512, alt: "9ineflix Anime" }],
  },
};

export default async function AnimePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const page = typeof resolvedParams.page === 'string' ? resolvedParams.page : "1";
  const sort = typeof resolvedParams.sort === 'string' ? resolvedParams.sort : undefined;
  const year = typeof resolvedParams.year === 'string' ? resolvedParams.year : undefined;

  const filters: Record<string, string> = {};
  if (sort) filters.sort_by = sort;
  if (year) filters.first_air_date_year = year;

  const tmdbPage1 = ((parseInt(page) - 1) * 2 + 1).toString();
  const tmdbPage2 = ((parseInt(page) - 1) * 2 + 2).toString();

  const [page1Data, page2Data] = await Promise.all([
    getAnime({ ...filters, page: tmdbPage1 }),
    getAnime({ ...filters, page: tmdbPage2 })
  ]);
  
  const animeList = [...page1Data, ...page2Data];
  
  if (!animeList || animeList.length === 0) {
    return <div className="min-h-screen flex items-center justify-center text-white">No Anime found for these filters.</div>;
  }

  const heroAnime = animeList.slice(0, 5);
  const remainingAnime = animeList.slice(5, 23); // Exactly 18 movies for a 3x6 grid

  return (
    <CategoryLayout 
      title="Anime Releases" 
      category="Anime" 
      heroMovies={heroAnime} 
      gridMovies={remainingAnime} 
      hideGenrePills={true}
      currentPage={parseInt(page)}
      searchParams={resolvedParams}
    />
  );
}
