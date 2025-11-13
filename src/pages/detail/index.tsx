import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { addWatchList } from '../../api/account';
import { getMovieDetail } from '../../api/movie';
import CommonError from '../../components/CommonError';
import GlobalLoading from '../../components/GlobalLoading';
import { MOVIE_STATUS } from '../../const';
import { useAccountStates } from '../../hooks/api/useAccountStates';
import { useConfiguration } from '../../hooks/api/useConfiguration';
import { useMovieCredits } from '../../hooks/api/useMovieCredits';
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
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 relative p-4 md:p-8">
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
        <div className="w-full md:w-[300px] mx-auto md:mx-0 shrink-0 flex justify-center md:justify-start">
          <img
            className="w-[200px] md:w-[300px] h-auto"
            src={getTmdbImageUrl(data?.poster_path, 'poster', cfg?.images)}
            alt={data?.title}
          />
        </div>
        <div className="flex-1 space-y-3 md:space-y-2">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{data?.title}</h1>
            <div className="flex flex-wrap gap-2 items-center text-sm md:text-base mt-2">
              <div className="">{data?.release_date}</div>
              <div className="hidden sm:inline">
                {data?.genres.map(genre => genre.name).join(', ')}
              </div>
              <div className="sm:hidden">
                {data?.genres
                  .slice(0, 2)
                  .map(genre => genre.name)
                  .join(', ')}
              </div>
              <div>{calMovieTime(data?.runtime ?? 0)}</div>
            </div>
            <div className="mt-2">
              <div className="text-lg md:text-xl text-yellow-500 font-bold opacity-60">
                评分：{data?.vote_average?.toFixed(1)}
              </div>
            </div>
          </div>

          {isWatchlist !== null && (
            <div>
              {!isWatchlist && (
                <div
                  onClick={addToFavorite}
                  className="btn btn-primary btn-sm md:btn-md"
                >
                  加入待看
                </div>
              )}
              {isWatchlist && (
                <div
                  onClick={removeFromWatchlist}
                  className="btn btn-sm md:btn-md"
                >
                  取消待看
                </div>
              )}
            </div>
          )}
          {data?.overview && (
            <div className="">
              <div className="text-base md:text-lg font-bold mb-1">简介</div>
              <p className="text-sm md:text-base leading-relaxed">
                {data?.overview}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 py-6 md:py-8">
          <div className="flex-1 min-w-0">
            <div className="space-y-6 md:space-y-8">
              <CastList list={movieCredits?.cast} />
              <Reviews />
              <RecommendList />
            </div>
          </div>
          <div className="w-full lg:w-[280px] lg:shrink-0">
            <div className="lg:sticky lg:top-4">
              <div className="space-y-4 md:space-y-2">
                <div className="">
                  <div className="text-base md:text-lg font-bold mb-1">
                    原名
                  </div>
                  <div className="text-sm md:text-base wrap-break-word">
                    {data?.original_title}
                  </div>
                </div>
                {data?.status && (
                  <div>
                    <div className="text-base md:text-lg font-bold mb-1">
                      状态
                    </div>
                    <div className="text-sm md:text-base">
                      {MOVIE_STATUS[data.status]}
                    </div>
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
