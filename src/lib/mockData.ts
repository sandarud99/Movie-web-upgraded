export interface Movie {
  id: string;
  title: string;
  description: string;
  year: number;
  genre: string;
  duration: string;
  posterUrl: string;
  backdropUrl: string;
  fileId: string;
}

export const featuredMovie: Movie = {
  id: "m1",
  title: "Inception",
  description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
  year: 2010,
  genre: "Sci-Fi",
  duration: "2h 28m",
  posterUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
  backdropUrl: "https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
  fileId: "telegram_file_id_inception"
};

export const trendingMovies: Movie[] = [
  {
    id: "m2",
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    year: 2014,
    genre: "Sci-Fi",
    duration: "2h 49m",
    posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/pbrkL804c8yAv3zBZR4QPEafpAR.jpg",
    fileId: "telegram_file_id_interstellar"
  },
  {
    id: "m3",
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    year: 2008,
    genre: "Action",
    duration: "2h 32m",
    posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg",
    fileId: "telegram_file_id_darkknight"
  },
  {
    id: "m4",
    title: "Dune",
    description: "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people.",
    year: 2021,
    genre: "Sci-Fi",
    duration: "2h 35m",
    posterUrl: "https://image.tmdb.org/t/p/w500/d5NXSklXoPeZyMWu51edXF9zU5J.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/jye1v123x3G9qBntkivZfXbUaM5.jpg",
    fileId: "telegram_file_id_dune"
  },
  {
    id: "m5",
    title: "Spider-Man: Across the Spider-Verse",
    description: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
    year: 2023,
    genre: "Animation",
    duration: "2h 20m",
    posterUrl: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
    fileId: "telegram_file_id_spiderverse"
  },
  {
    id: "m6",
    title: "The Matrix",
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    year: 1999,
    genre: "Action",
    duration: "2h 16m",
    posterUrl: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/ncEsesgOJDNrTUED89hYbA117jy.jpg",
    fileId: "telegram_file_id_matrix"
  }
];

export const newReleases: Movie[] = [
  {
    id: "m7",
    title: "Oppenheimer",
    description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    year: 2023,
    genre: "Drama",
    duration: "3h",
    posterUrl: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/fm6KqXn3pHA6F3tQ36l1956D3z.jpg",
    fileId: "telegram_file_id_oppenheimer"
  },
  {
    id: "m8",
    title: "Avatar: The Way of Water",
    description: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home.",
    year: 2022,
    genre: "Sci-Fi",
    duration: "3h 12m",
    posterUrl: "https://image.tmdb.org/t/p/w500/t6HIqrHezINNdqIG0DflSyWKp2L.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/8rpDcsfLJypbO6vtecsmEZzp3D.jpg",
    fileId: "telegram_file_id_avatar2"
  },
  {
    id: "m9",
    title: "Top Gun: Maverick",
    description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission that demands the ultimate sacrifice.",
    year: 2022,
    genre: "Action",
    duration: "2h 10m",
    posterUrl: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
    backdropUrl: "https://image.tmdb.org/t/p/original/AaV1YIdWKnjAIAOe8UUKBFm327v.jpg",
    fileId: "telegram_file_id_topgun"
  }
];
