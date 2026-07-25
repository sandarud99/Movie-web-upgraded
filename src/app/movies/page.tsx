import CategoryLayout from "@/components/CategoryLayout";
import { getMovies } from "@/lib/tmdb";

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

  const filters: Record<string, string> = { page };
  if (sort) filters.sort_by = sort;
  if (year) filters.primary_release_year = year;
  if (genre) filters.with_genres = genre;

  const moviesList = await getMovies(filters);
  
  if (!moviesList || moviesList.length === 0) {
    return <div className="min-h-screen flex items-center justify-center text-white">No Movies found for these filters.</div>;
  }

  const heroMovies = moviesList.slice(0, 5);
  const remainingMovies = moviesList.slice(5);

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
