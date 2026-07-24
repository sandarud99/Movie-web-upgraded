import { NextResponse } from "next/server";
import { featuredMovie, trendingMovies, newReleases } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json({
    featured: featuredMovie,
    trending: trendingMovies,
    newReleases: newReleases,
  });
}
