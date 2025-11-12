import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { getConfiguration } from '../api/configuration';
import type { Movie } from '../types/movie';
import { getTmdbImageUrl } from '../utils/tmdbClient';

export default function ListItem({ movie }: { movie: Movie }) {
  const { data: cfg } = useQuery({
    queryKey: ['tmdbConfig'],
    queryFn: getConfiguration,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/detail/${movie.id}`);
  };

  return (
    <li
      className="list-row cursor-pointer hover:bg-base-200"
      key={movie.id}
      onClick={goToDetail}
    >
      <div>
        {cfg?.images && (
          <img
            width={100}
            src={getTmdbImageUrl(movie.poster_path, 'poster', cfg?.images)}
            alt={movie.title}
          />
        )}
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{movie.title}</h2>
        <div>{movie.release_date}</div>
        <p className="text-xs opacity-60 uppercase text-ellipsis overflow-hidden line-clamp-4">
          {movie.overview}
        </p>
      </div>
    </li>
  );
}
