import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
            <div className="w-[220px] h-[124px] overflow-hidden">
              {item.backdrop_path && (
                <img
                  className="object-cover w-full h-full"
                  src={getTmdbImageUrl(
                    item.backdrop_path,
                    'backdrop',
                    cfg?.images
                  )}
                  alt={item.title}
                />
              )}
              {!item.backdrop_path && (
                <div className="w-full h-full bg-base-200 flex items-center justify-center border rounded-lg">
                  <FontAwesomeIcon icon={faImage} className="text-4xl" />
                </div>
              )}
            </div>
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
