import { faShuffle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { getWatchListMovies } from '../../../api/account';
import { getConfiguration } from '../../../api/configuration';
import type { Movie } from '../../../types/movie';
import { getTmdbImageUrl } from '../../../utils/tmdbClient';

export default function RandomPicker() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isPicking, setIsPicking] = useState(false);
  const navigate = useNavigate();

  const {
    data: moviesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['watchListMovies', 'randomPicker', 'created_at.asc'],
    queryFn: ({ pageParam }) =>
      getWatchListMovies({ sort_by: 'created_at.asc', page: pageParam }),
    getNextPageParam: lastPage => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
  });

  // 自动获取所有页面
  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const { data: cfg } = useQuery({
    queryKey: ['tmdbConfig'],
    queryFn: getConfiguration,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const movies = useMemo(() => {
    return moviesData?.pages?.flatMap(page => page.results) || [];
  }, [moviesData?.pages]);

  const handleRandomPick = () => {
    if (movies.length === 0) {
      return;
    }

    setIsPicking(true);
    setSelectedMovie(null);

    // 模拟抽奖动画效果
    const animationDuration = 2000; // 2秒动画
    const interval = 100; // 每100ms切换一次
    const steps = animationDuration / interval;
    let currentStep = 0;

    const pickInterval = setInterval(() => {
      // 在动画过程中随机显示电影
      const randomIndex = Math.floor(Math.random() * movies.length);
      setSelectedMovie(movies[randomIndex]);
      currentStep++;

      if (currentStep >= steps) {
        clearInterval(pickInterval);
        // 最终结果
        const finalIndex = Math.floor(Math.random() * movies.length);
        setSelectedMovie(movies[finalIndex]);
        setIsPicking(false);
      }
    }, interval);
  };

  const goToDetail = () => {
    if (selectedMovie) {
      navigate(`/detail/${selectedMovie.id}`);
    }
  };

  if (movies.length === 0) {
    return (
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title">暂无待看电影</h2>
          <p>请先添加一些电影到待看列表</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-200 shadow-xl">
      <div className="card-body items-center text-center space-y-4">
        <h2 className="card-title text-2xl">随机观看</h2>
        <p className="text-sm opacity-60">
          从 {movies.length} 部待看电影中随机选择一部
        </p>

        <button
          className={`btn btn-primary btn-lg ${isPicking ? 'loading' : ''}`}
          onClick={handleRandomPick}
          disabled={isPicking || movies.length === 0}
        >
          {!isPicking && <FontAwesomeIcon icon={faShuffle} className="mr-2" />}
          {isPicking ? '随机中...' : '开始随机'}
        </button>

        {selectedMovie && (
          <div
            className={`card bg-base-100 shadow-xl w-full max-w-md transition-all duration-300 ${
              isPicking ? 'opacity-50' : 'opacity-100'
            } ${selectedMovie ? 'cursor-pointer hover:scale-105' : ''}`}
            onClick={!isPicking ? goToDetail : undefined}
          >
            <div className="card-body">
              <div className="flex gap-4">
                {cfg?.images && selectedMovie.poster_path && (
                  <img
                    width={120}
                    className="rounded-lg"
                    src={getTmdbImageUrl(
                      selectedMovie.poster_path,
                      'poster',
                      cfg.images
                    )}
                    alt={selectedMovie.title}
                  />
                )}
                <div className="flex-1 space-y-2">
                  <h3 className="card-title text-xl">{selectedMovie.title}</h3>
                  {selectedMovie.release_date && (
                    <p className="text-sm opacity-60">
                      {selectedMovie.release_date}
                    </p>
                  )}
                  {selectedMovie.overview && (
                    <p className="text-xs opacity-70 line-clamp-3">
                      {selectedMovie.overview}
                    </p>
                  )}
                  {!isPicking && (
                    <p className="text-xs text-primary mt-2">点击查看详情 →</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
