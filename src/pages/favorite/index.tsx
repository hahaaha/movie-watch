import {
  faArrowDownWideShort,
  faArrowUpWideShort,
  faShuffle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getWatchListMovies } from '../../api/account';
import ListItem from '../../components/ListItem';
import type { Movie } from '../../types/movie';
import RandomPicker from './components/RandomPicker';

export default function Favorite() {
  const [sortBy, setSortBy] = useState<'created_at.asc' | 'created_at.desc'>(
    'created_at.asc'
  );
  const [showRandomPicker, setShowRandomPicker] = useState(false);
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
        <div className="flex items-center gap-4">
          <div className="tooltip tooltip-bottom" data-tip="随机观看">
            <button
              className="btn btn-primary btn-circle"
              onClick={() => setShowRandomPicker(true)}
            >
              <FontAwesomeIcon icon={faShuffle} />
            </button>
          </div>
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
      </div>
      <ul className="list p-8">
        {data?.results.map((movie: Movie) => (
          <ListItem key={movie.id} movie={movie} />
        ))}
      </ul>

      {/* 随机抽奖弹窗 */}
      <dialog
        className={`modal ${showRandomPicker ? 'modal-open' : ''}`}
        open={showRandomPicker}
      >
        <div className="modal-box max-w-2xl">
          <form method="dialog">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setShowRandomPicker(false)}
            >
              ✕
            </button>
          </form>
          <RandomPicker />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setShowRandomPicker(false)}>关闭</button>
        </form>
      </dialog>
    </div>
  );
}
