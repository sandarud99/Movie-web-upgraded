"use client";

import { useState, useEffect } from "react";
import { Movie, TMDBMovie } from "@/types/tmdb";
import { Star, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { adaptTMDBMovie } from "@/lib/tmdb";
import { CustomDropdown } from "./FilterBar";

interface CategorySidebarProps {
  title: string;
  items: Movie[]; // Initial server-rendered items (fallback/initial)
  category: "Movies" | "TV Shows" | "Anime";
}

export default function CategorySidebar({ title, items, category }: CategorySidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const currentSort = searchParams.get("sort") || "popularity.desc";
  const currentYear = searchParams.get("year") || "";

  const [period, setPeriod] = useState("Weekly");
  const [topItems, setTopItems] = useState<Movie[]>(items.slice(0, 10));
  const [loading, setLoading] = useState(false);

  // Quick Filter Handlers
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    params.delete("page");
    router.push(`?${params.toString()}`);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value) {
      params.set("year", e.target.value);
    } else {
      params.delete("year");
    }
    params.delete("page");
    router.push(`?${params.toString()}`);
  };

  // Client-side Top 10 fetch
  useEffect(() => {
    const fetchTop10 = async () => {
      setLoading(true);
      try {
        const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
        let endpoint = "";
        
        // Base API type
        const type = category === "Movies" ? "movie" : "tv";
        
        if (period === "Weekly") {
          endpoint = `https://api.themoviedb.org/3/trending/${type}/week?api_key=${apiKey}`;
        } else if (period === "Monthly") {
          // TMDB doesn't have exact 'monthly', 'popular' is a good proxy for current month trends
          endpoint = `https://api.themoviedb.org/3/${type}/popular?api_key=${apiKey}`;
        } else {
          // "All" time
          endpoint = `https://api.themoviedb.org/3/${type}/top_rated?api_key=${apiKey}`;
        }

        if (category === "Anime") {
          // If we are looking for Anime specifically, we shouldn't use trending/movie since it mixes everything.
          // Instead we must use discover/tv with animation genre.
          endpoint = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=16&with_original_language=ja`;
          if (period === "Weekly") endpoint += "&sort_by=popularity.desc&air_date.gte=" + new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
          else if (period === "Monthly") endpoint += "&sort_by=popularity.desc&air_date.gte=" + new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
          else endpoint += "&sort_by=vote_average.desc&vote_count.gte=1000";
        }

        const res = await fetch(endpoint);
        const data = await res.json();
        
        if (data && data.results) {
          // We have to mock the adaptTMDBMovie slightly here or import it
          setTopItems(data.results.slice(0, 10).map(adaptTMDBMovie));
        }
      } catch (err) {
        console.error("Failed to fetch top 10:", err);
      } finally {
        setLoading(false);
      }
    };

    // Don't refetch on initial load for Weekly if we just use server items, 
    // but fetching ensures exactness. Let's just fetch always when period changes.
    fetchTop10();
  }, [period, category]);

  // Generate Year options
  const currentYearNum = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYearNum - i);

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Quick Filters */}
      <div>
        <h3 className="text-white font-bold text-lg mb-4">Quick filter</h3>
        <div className="flex flex-col gap-3">
          <div className="relative">
            <CustomDropdown
              label="Most Popular"
              value={currentSort}
              options={[
                { label: "Most Popular", value: "popularity.desc" },
                { label: "Highest Rated", value: "vote_average.desc" },
                { label: "Newest First", value: "primary_release_date.desc" }
              ]}
              onChange={(val) => {
                const params = new URLSearchParams(searchParams.toString());
                params.set("sort", val);
                params.delete("page");
                router.push(`?${params.toString()}`);
              }}
              buttonClassName="w-full bg-black/40 border-white/10 rounded-lg px-4 py-3 text-sm text-gray-300 hover:border-brand"
              widthClass="w-full"
            />
          </div>
          
          <div className="relative">
            <CustomDropdown
              label="All Years"
              value={currentYear}
              options={years.map(y => ({ label: y.toString(), value: y.toString() }))}
              onChange={(val) => {
                const params = new URLSearchParams(searchParams.toString());
                if (val) {
                  params.set("year", val);
                } else {
                  params.delete("year");
                }
                params.delete("page");
                router.push(`?${params.toString()}`);
              }}
              buttonClassName="w-full bg-black/40 border-white/10 rounded-lg px-4 py-3 text-sm text-gray-300 hover:border-brand"
              widthClass="w-full"
            />
          </div>
        </div>
      </div>

      {/* Top 10 List */}
      <div className="bg-[#141414] rounded-2xl p-6 border border-white/5">
        <h3 className="text-white font-bold text-xl mb-6">{title}</h3>
        
        {/* Toggle */}
        <div className="flex bg-black/50 p-1 rounded-lg mb-6">
          {["Weekly", "Monthly", "All"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`flex-1 text-xs font-bold py-2 rounded-md transition-all ${
                period === p 
                  ? "bg-brand text-white shadow-md" 
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* List Items */}
        <div className={`flex flex-col gap-4 transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}>
          {topItems.map((item, index) => (
            <Link key={item.id} href={`/watch/${item.id}`} className="group flex items-center gap-4">
              {/* Rank Number */}
              <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center border border-white/10 rounded-md text-gray-400 text-sm font-bold bg-black/30 group-hover:bg-brand group-hover:text-white group-hover:border-brand transition-colors">
                {index + 1}
              </div>
              
              {/* Thumbnail */}
              <div className="w-12 h-12 flex-shrink-0 rounded-md overflow-hidden bg-gray-900">
                <img 
                  src={item.posterUrl} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/100x100/141414/FFF?text=No+Img";
                  }}
                />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-gray-200 truncate group-hover:text-brand transition-colors">
                  {item.title}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-3 h-3 fill-yellow-500 mr-1" />
                    <span className="text-xs font-bold">{item.rating || "8.5"}</span>
                  </div>
                  <span className="text-xs text-gray-500 capitalize">{item.type.toLowerCase()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
