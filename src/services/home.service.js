import { getRecentlyLikedMovies } from "../repositories/movie.repository.js";
import { getNowPlayingMovies } from "../repositories/movie.repository.js";
import { getTopRatedMovies } from "../repositories/movie.repository.js";

export const fetchRecommendedMovies = async () => {
 console.log("🧠 [service] fetchNowPlayingMovies 호출됨");
  const movies = await getRecentlyLikedMovies();
  return movies;
};

export const fetchNowPlayingMovies = async () => {
    return await getNowPlayingMovies();
  };

export const fetchTopRatedMovies = async () => {
    return await getTopRatedMovies();
  };