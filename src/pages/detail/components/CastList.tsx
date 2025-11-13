import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';
import { getConfiguration } from '../../../api/configuration';
import type { Cast } from '../../../types/movie';
import { getTmdbImageUrl } from '../../../utils/tmdbClient';

export default function CastList({ list }: { list: Cast[] }) {
  const { data: cfg } = useQuery({
    queryKey: ['tmdbConfig'],
    queryFn: getConfiguration,
  });

  return (
    <div className="space-y-2">
      <div className="text-xl md:text-2xl font-bold">演员表</div>
      <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {list?.map(item => (
          <div
            key={item.id}
            className="card min-w-[120px] md:min-w-[150px] overflow-hidden bg-base-200 shadow-lg text-center"
          >
            <div className="w-[120px] md:w-[150px] h-[180px] md:h-[225px] overflow-hidden">
              {item.profile_path && (
                <img
                  src={getTmdbImageUrl(
                    item.profile_path,
                    'profile',
                    cfg?.images
                  )}
                  className="object-cover w-full h-full"
                  alt={item.name}
                />
              )}
              {!item.profile_path && (
                <div className="w-full h-full bg-base-200 flex items-center justify-center border rounded-lg">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-3xl md:text-4xl"
                  />
                </div>
              )}
            </div>
            <div className="card-body p-2 md:p-4">
              <div className="text-sm md:text-base font-bold line-clamp-2">
                {item.name}
              </div>
              <div className="text-xs md:text-sm opacity-60 line-clamp-2">
                {item.character}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
