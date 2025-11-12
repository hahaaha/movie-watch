import { useQuery } from '@tanstack/react-query';
import { getWatchListMovies } from '../../api/account';
import type { Movie } from '../../types/movie';
import ListItem from '../search/components/ListItem';

export default function Favorite() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['watchListMovies'],
    queryFn: getWatchListMovies,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <ul className="list p-8">
        {data?.results.map((movie: Movie) => (
          <ListItem key={movie.id} movie={movie} />
        ))}
      </ul>
    </div>
  );
}
