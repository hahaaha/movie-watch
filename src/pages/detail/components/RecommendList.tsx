import { useParams } from 'react-router';
import { useRelatedMovies } from '../../../hooks/api/useRelatedMovies';
import { useConfiguration } from '../../../hooks/useConfiguration';
import type { Movie } from '../../../types/movie';
import { getTmdbImageUrl } from '../../../utils/tmdbClient';

export default function RecommendList() {
  const { data: cfg } = useConfiguration();
  const { id } = useParams();

  const { data: relatedMovies } = useRelatedMovies(Number(id));

  return (
    <div className="space-y-2">
      <div className="text-2xl font-bold">相关推荐</div>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {relatedMovies?.results?.map((item: Movie) => (
          <div
            key={item.id}
            className="card min-w-[220px] overflow-hidden bg-base-200 shadow-lg text-center"
          >
            <img
              src={getTmdbImageUrl(item.backdrop_path, 'backdrop', cfg?.images)}
              alt={item.title}
            />
            <div className="card-body">
              <div className="text-xs text-ellipsis overflow-hidden line-clamp-1">
                {item.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
