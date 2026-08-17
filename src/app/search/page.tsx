import { searchMoviesAction } from "@/app/actions";
import Breadcrumbs from "@/components/Breadcrumbs";
import SearchGrid from "@/components/SearchGrid";
import FilterBar from "@/components/FilterBar";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const query = typeof resolvedParams.q === 'string' ? resolvedParams.q : "";
  const sort = typeof resolvedParams.sort === 'string' ? resolvedParams.sort : undefined;
  const year = typeof resolvedParams.year === 'string' ? resolvedParams.year : undefined;

  // Execute the search for page 1 and 2 to ensure we have enough for 3 full rows (21 cards)
  let searchResults: any[] = [];
  if (query) {
    const [page1, page2] = await Promise.all([
      searchMoviesAction(query, 1, sort, year),
      searchMoviesAction(query, 2, sort, year)
    ]);
    searchResults = [...page1, ...page2];
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 md:pt-32 pb-24 px-6 md:px-12">
      <div className="w-full">
        <Breadcrumbs paths={[{ name: `Search Results for "${query}"` }]} />
        
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white font-heading tracking-tight mb-2">
              Search Archive
            </h1>
            <p className="text-sm md:text-base text-gray-400">
              {searchResults.length > 0 
                ? `Found multiple results for "${query}"` 
                : query 
                  ? `No results found for "${query}"`
                  : "Enter a search term to find movies and TV shows."}
            </p>
          </div>
          <FilterBar variant="compact" />
        </div>

        <SearchGrid query={query} initialMovies={searchResults} sort={sort} year={year} />
      </div>
    </div>
  );
}
