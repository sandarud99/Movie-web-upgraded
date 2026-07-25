import CategoryLayout from "@/components/CategoryLayout";
import { getAnime } from "@/lib/tmdb";

export default async function AnimePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const page = typeof resolvedParams.page === 'string' ? resolvedParams.page : "1";
  const sort = typeof resolvedParams.sort === 'string' ? resolvedParams.sort : undefined;
  const year = typeof resolvedParams.year === 'string' ? resolvedParams.year : undefined;

  const filters: Record<string, string> = { page };
  if (sort) filters.sort_by = sort;
  if (year) filters.first_air_date_year = year;

  const animeList = await getAnime(filters);
  
  if (!animeList || animeList.length === 0) {
    return <div className="min-h-screen flex items-center justify-center text-white">No Anime found for these filters.</div>;
  }

  const heroAnime = animeList.slice(0, 5);
  const remainingAnime = animeList.slice(5);

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
