import type { Movie } from '../types/movie';
import { request } from '../utils/request';

export const getMoviesList = async (query: string, page: number) => {
  const response = await request.get('/search/movie', {
    params: {
      language: 'zh-CN',
      query,
      page,
    },
  });
  return response.data;
};

export const getMovieDetail = async (id: number) => {
  const response = await request.get<Movie>(`/movie/${id}?language=zh-CN`);
  return response.data;
};

export const getMovieCredits = async (id: number) => {
  const response = await request.get(`/movie/${id}/credits?language=zh-CN`);
  return response.data;
};

export const getRelatedMovies = async (id: number) => {
  const response = await request.get(
    `/movie/${id}/recommendations?language=zh-CN`
  );
  return response.data;
};
