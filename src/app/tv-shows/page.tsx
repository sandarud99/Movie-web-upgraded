import CategoryLayout from "@/components/CategoryLayout";
import { getTVShows } from "@/lib/tmdb";

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

  const filters: Record<string, string> = { page };
  if (sort) filters.sort_by = sort;
  if (year) filters.first_air_date_year = year;
  if (genre) filters.with_genres = genre;

  // We need enough items to show 5 heroes and a grid.
  // Standard page is 20 items. 
  const shows = await getTVShows(filters);
  
  if (!shows || shows.length === 0) {
    return <div className="min-h-screen flex items-center justify-center text-white">No TV Shows found for these filters.</div>;
  }

  const heroShows = shows.slice(0, 5);
  const remainingShows = shows.slice(5);

  return (
    <CategoryLayout 
      title="TV Shows Releases" 
      category="TV Shows" 
      heroMovies={heroShows} 
      gridMovies={remainingShows} 
      currentPage={parseInt(page)}
      searchParams={resolvedParams}
    />
  );
}
