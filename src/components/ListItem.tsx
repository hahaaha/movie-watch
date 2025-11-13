import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
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

  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
  }, [movie?.id, movie?.poster_path]);

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
      <div className="w-[100px] h-[150px] overflow-hidden relative">
        {(!cfg?.images ||
          (cfg?.images && movie?.poster_path && !imageLoaded)) && (
          <div className="skeleton h-full w-full absolute inset-0"></div>
        )}
        {cfg?.images && movie?.poster_path && (
          <img
            className={`object-cover w-full h-full ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            width={100}
            src={getTmdbImageUrl(movie.poster_path, 'poster', cfg?.images)}
            alt={movie.title}
            onLoad={() => setImageLoaded(true)}
          />
        )}
        {cfg?.images && !movie?.poster_path && (
          <div className="w-full h-full bg-base-200 flex items-center justify-center border rounded-lg">
            <FontAwesomeIcon icon={faImage} className="text-4xl" />
          </div>
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
