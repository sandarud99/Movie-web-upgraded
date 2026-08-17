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
  collectionId?: number | null;
  trailerUrl?: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profileUrl: string;
}

export interface MovieImage {
  url: string;
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
  belongs_to_collection?: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  } | null;
  runtime?: number; // Added for duration
}
