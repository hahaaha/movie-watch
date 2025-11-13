import { useQuery } from '@tanstack/react-query';
import { getMovieReviews } from '../../api/movie';

export const useMovieReviews = (id: number) => {
  return useQuery({
    queryKey: ['movieReviews', id],
    queryFn: () => getMovieReviews(id),
  });
};
