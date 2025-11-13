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
      <div className="text-2xl font-bold">演员表</div>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {list?.map(item => (
          <div
            key={item.id}
            className="card min-w-[150px] overflow-hidden bg-base-200 shadow-lg text-center"
          >
            <div className="w-[150px] h-[225px] overflow-hidden">
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
                  <FontAwesomeIcon icon={faUser} className="text-4xl" />
                </div>
              )}
            </div>
            <div className="card-body">
              <div className="text-base font-bold">{item.name}</div>
              <div className="text-sm opacity-60">{item.character}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
