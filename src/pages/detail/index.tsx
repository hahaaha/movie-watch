import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { addWatchList } from '../../api/account';
import { getMovieDetail } from '../../api/movie';
import CommonError from '../../components/CommonError';
import GlobalLoading from '../../components/GlobalLoading';
import { MOVIE_STATUS } from '../../const';
import { useAccountStates } from '../../hooks/api/useAccountStates';
import { useMovieCredits } from '../../hooks/api/useMovieCredits';
import { useConfiguration } from '../../hooks/useConfiguration';
import { calMovieTime } from '../../utils/calMovieTime';
import { getTmdbImageUrl } from '../../utils/tmdbClient';
import CastList from './components/CastList';
import RecommendList from './components/RecommendList';
import Reviews from './components/Reivews';

export default function Detail() {
  const { id } = useParams();
  const { data: cfg } = useConfiguration();
  const [isWatchlist, setIsWatchlist] = useState<boolean | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ['movieDetail', id],
    queryFn: () => getMovieDetail(Number(id)),
  });

  const { data: accountStates } = useAccountStates(Number(id));

  useEffect(() => {
    setIsWatchlist(accountStates?.watchlist ?? null);
  }, [accountStates]);

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
    setIsWatchlist(true);
  };

  const removeFromWatchlist = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    mutate({
      media_type: 'movie',
      media_id: Number(id),
      watchlist: false,
    });
    setIsWatchlist(false);
  };
  const { data: movieCredits } = useMovieCredits(Number(id));

  if (isLoading) return <GlobalLoading />;
  if (error) return <CommonError error={error} />;

  return (
    <div className="w-full">
      <div className="flex gap-6 relative p-8">
        <div className="absolute top-0 left-0 w-full h-full -z-10">
          {data?.backdrop_path && (
            <img
              className="object-cover w-full h-full object-top blur-xs"
              src={getTmdbImageUrl(
                data?.backdrop_path,
                'backdrop',
                cfg?.images
              )}
              alt={data?.title}
            />
          )}
          <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
        </div>
        <div className="w-[300px] shrink-0">
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

          {isWatchlist !== null && (
            <div>
              {!isWatchlist && (
                <div onClick={addToFavorite} className="btn btn-primary">
                  加入待看
                </div>
              )}
              {isWatchlist && (
                <div onClick={removeFromWatchlist} className="btn">
                  取消待看
                </div>
              )}
            </div>
          )}
          <div className="">
            <div className="text font-bold">简介</div>
            <p className="text-sm">{data?.overview}</p>
          </div>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 py-8">
          <div className="flex-1 min-w-0">
            <div className="space-y-8">
              <CastList list={movieCredits?.cast} />
              <Reviews />
              <RecommendList />
            </div>
          </div>
          <div className="w-full lg:w-[280px] lg:shrink-0">
            <div className="sticky top-4">
              <div className="space-y-2">
                <div className="">
                  <div className="font-base font-bold">原名</div>
                  <div className="text-sm">{data?.original_title}</div>
                </div>
                {data?.status && (
                  <div>
                    <div className="text-base font-bold">状态</div>
                    <div className="text-sm">{MOVIE_STATUS[data.status]}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
