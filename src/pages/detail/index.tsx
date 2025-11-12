import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { addWatchList } from '../../api/account';
import { getMovieDetail } from '../../api/movie';
import { useMovieCredits } from '../../hooks/api/useMovieCredits';
import { useConfiguration } from '../../hooks/useConfiguration';
import { calMovieTime } from '../../utils/calMovieTime';
import { getTmdbImageUrl } from '../../utils/tmdbClient';
import CastList from './components/CastList';
import RecommendList from './components/RecommendList';

export default function Detail() {
  const { id } = useParams();
  const { data: cfg } = useConfiguration();

  const { data, isLoading, error } = useQuery({
    queryKey: ['movieDetail', id],
    queryFn: () => getMovieDetail(Number(id)),
  });

  const { mutate } = useMutation({
    mutationFn: (data: {
      media_type: string;
      media_id: number;
      watchlist: boolean;
    }) => addWatchList(data),
  });

  const addToFavorite = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    mutate({
      media_type: 'movie',
      media_id: Number(id),
      watchlist: true,
    });
  };

  const { data: movieCredits } = useMovieCredits(Number(id));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="flex gap-6 relative p-8">
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          <img
            className="object-cover w-full h-full object-top blur-xs"
            src={getTmdbImageUrl(data?.backdrop_path, 'backdrop', cfg?.images)}
            alt={data?.title}
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
        </div>
        <div className="w-[300px]">
          <img
            src={getTmdbImageUrl(data?.poster_path, 'poster', cfg?.images)}
            alt={data?.title}
          />
        </div>
        <div className="flex-1 space-y-2">
          <div>
            <h1 className="text-3xl font-bold">{data?.title}</h1>
            <div className="flex gap-2 items-center">
              <div className="">{data?.release_date}</div>
              <div>{data?.genres.map(genre => genre.name).join(', ')}</div>
              <div>{calMovieTime(data?.runtime ?? 0)}</div>
            </div>
            <div>
              <div className="text-xl text-yellow-500 font-bold opacity-60">
                评分：{data?.vote_average?.toFixed(1)}
              </div>
            </div>
          </div>

          <div>
            <div onClick={addToFavorite} className="btn btn-primary">
              加入待看
            </div>
          </div>
          <div className="">
            <div className="text font-bold">简介</div>
            <p className="text-sm">{data?.overview}</p>
          </div>
        </div>
      </div>
      <div className="m-8 space-y-2">
        <div className="text-2xl font-bold">演员表</div>
        <CastList list={movieCredits?.cast} />
      </div>
      <RecommendList />
    </div>
  );
}
