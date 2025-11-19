const API_KEY = "345809b366f65d62245f19b675a53776";
const BASE_URL = "https://api.themoviedb.org/3";

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
}

export interface MoviesResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export async function getMovies(page = 1, query = "") {
    const url = query
        ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            query
        )}&page=${page}`
        : `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Erro ao buscar filmes");
    }

    const data: MoviesResponse = await response.json();
    return data;
}