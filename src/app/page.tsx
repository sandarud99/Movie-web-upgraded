import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import MovieGrid from "@/components/MovieGrid";
import FilterBar from "@/components/FilterBar";
import SearchResults from "@/components/SearchResults";
import { getTrendingMovies, getTopRatedMovies, getNewReleases, discoverMovies } from "@/lib/tmdb";
import { Movie } from "@/types/tmdb";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const year = typeof resolvedParams.year === 'string' ? resolvedParams.year : undefined;
  const sort = typeof resolvedParams.sort === 'string' ? resolvedParams.sort : undefined;

  const hasFilters = year || sort;

  // Always fetch trending for the Hero slider
  const trendingMovies = await getTrendingMovies();
  const heroMovies = trendingMovies.slice(0, 5);

  let filteredMovies: Movie[] = [];
  let topRatedMovies: Movie[] = [];
  let newReleases: Movie[] = [];

  if (hasFilters) {
    const filters: Record<string, string> = {};
    if (year) filters.primary_release_year = year;
    if (sort) filters.sort_by = sort;

    // Fetch page 1 and page 2 concurrently to get exactly 40 items (20 per page)
    const [page1, page2] = await Promise.all([
      discoverMovies({ ...filters, page: "1" }),
      discoverMovies({ ...filters, page: "2" })
    ]);
    
    filteredMovies = [...page1, ...page2];
  } else {
    topRatedMovies = await getTopRatedMovies();
    newReleases = await getNewReleases();
  }

  return (
    <main className="min-h-screen pb-20">
      {heroMovies.length > 0 && <Hero movies={heroMovies} />}
      <div className="relative z-10">
        <Categories />
        <FilterBar />
        
        {hasFilters ? (
          <SearchResults initialMovies={filteredMovies} filters={{ primary_release_year: year || "", sort_by: sort || "" }} />
        ) : (
          <>
            <MovieGrid title="Trending Now" movies={trendingMovies.slice(0, 14)} />
            <MovieGrid title="Top Rated" movies={topRatedMovies.slice(0, 14)} />
            <MovieGrid title="New Releases" movies={newReleases.slice(0, 14)} />
          </>
        )}
      </div>
    </main>
  );
}
