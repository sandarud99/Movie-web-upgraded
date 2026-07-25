export interface Movie {
  id: string;
  title: string;
  description: string;
  year: number;
  genre: string;
  duration: string;
  posterUrl: string;
  backdropUrl: string;
  fileId?: string;
  rating?: number;
  quality?: string;
  type?: string;
}

export interface TMDBMovie {
  id: number;
  title?: string;
  name?: string; // For TV shows
  overview: string;
  release_date?: string;
  first_air_date?: string; // For TV shows
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  genre_ids: number[];
  media_type?: string;
}
