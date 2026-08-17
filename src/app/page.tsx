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
  const category = typeof resolvedParams.category === 'string' ? resolvedParams.category : undefined;

  const hasFilters = year || sort;

  // Always fetch generic trending for the Hero slider
  const genericTrending = await getTrendingMovies();
  const heroMovies = genericTrending.slice(0, 5);

  // Fetch categorized sections
  const trendingMovies = category ? await getTrendingMovies(category) : genericTrending;

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
    topRatedMovies = await getTopRatedMovies(category);
    newReleases = await getNewReleases(category);
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
            <MovieGrid section="trending" category={category} title={category ? `Trending ${category}` : "Trending Now"} movies={trendingMovies} />
            <MovieGrid section="top-rated" category={category} title={category ? `Top Rated ${category}` : "Top Rated"} movies={topRatedMovies} />
            <MovieGrid section="new-releases" category={category} title={category ? `New ${category}` : "New Releases"} movies={newReleases} />
          </>
        )}
      </div>
    </main>
  );
}
