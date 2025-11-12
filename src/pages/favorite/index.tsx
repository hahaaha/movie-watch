import {
  faArrowDownWideShort,
  faArrowUpWideShort,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getWatchListMovies } from '../../api/account';
import type { Movie } from '../../types/movie';
import ListItem from '../search/components/ListItem';

export default function Favorite() {
  const [sortBy, setSortBy] = useState<'created_at.asc' | 'created_at.desc'>(
    'created_at.asc'
  );
  const { data, isLoading, error } = useQuery({
    queryKey: ['watchListMovies', sortBy],
    queryFn: () => getWatchListMovies({ sort_by: sortBy }),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="flex items-center justify-between px-8 pt-4">
        <div className="text-2xl font-bold">我的待看</div>
        {sortBy === 'created_at.desc' && (
          <div className="tooltip tooltip-bottom" data-tip="时间降序">
            <FontAwesomeIcon
              className="cursor-pointer"
              icon={faArrowDownWideShort}
              onClick={() => setSortBy('created_at.asc')}
            />
          </div>
        )}
        {sortBy === 'created_at.asc' && (
          <div className="tooltip tooltip-bottom" data-tip="时间升序">
            <FontAwesomeIcon
              className="cursor-pointer"
              icon={faArrowUpWideShort}
              onClick={() => setSortBy('created_at.desc')}
            />
          </div>
        )}
      </div>
      <ul className="list p-8">
        {data?.results.map((movie: Movie) => (
          <ListItem key={movie.id} movie={movie} />
        ))}
      </ul>
    </div>
  );
}
