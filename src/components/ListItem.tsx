import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';
import { memo, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { getConfiguration } from '../api/configuration';
import type { Movie } from '../types/movie';
import { getTmdbImageUrl } from '../utils/tmdbClient';

function ListItem({ movie }: { movie: Movie }) {
  const { data: cfg } = useQuery({
    queryKey: ['tmdbConfig'],
    queryFn: getConfiguration,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const imageUrl =
    cfg?.images && movie?.poster_path
      ? getTmdbImageUrl(movie.poster_path, 'poster', cfg.images)
      : null;

  useEffect(() => {
    setImageLoaded(false);
  }, [movie?.id, movie?.poster_path, imageUrl]);

  // 检查图片是否已经从缓存中加载完成
  useEffect(() => {
    if (!imageUrl) return;

    // 使用 setTimeout 确保在 DOM 更新后检查
    const checkImageLoaded = () => {
      if (imgRef.current) {
        // 如果图片已经加载完成（从缓存中），立即设置 loaded 状态
        if (imgRef.current.complete && imgRef.current.naturalWidth > 0) {
          setImageLoaded(true);
        }
      }
    };

    // 立即检查一次
    checkImageLoaded();

    // 如果还没加载，等待下一个事件循环再检查一次
    const timer = setTimeout(checkImageLoaded, 0);

    return () => clearTimeout(timer);
  }, [imageUrl]);

  const navigate = useNavigate();

  const goToDetail = () => {
    navigate(`/detail/${movie.id}`);
  };

  return (
    <li
      className="list-row cursor-pointer hover:bg-base-200"
      key={movie.id}
      onClick={goToDetail}
    >
      <div className="w-[100px] h-[150px] overflow-hidden relative">
        {(!cfg?.images ||
          (cfg?.images && movie?.poster_path && !imageLoaded)) && (
          <div className="skeleton h-full w-full absolute inset-0"></div>
        )}
        {imageUrl && (
          <img
            ref={imgRef}
            className={`object-cover w-full h-full ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            width={100}
            src={imageUrl}
            alt={movie.title}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(false)}
          />
        )}
        {cfg?.images && !movie?.poster_path && (
          <div className="w-full h-full bg-base-200 flex items-center justify-center border rounded-lg">
            <FontAwesomeIcon icon={faImage} className="text-4xl" />
          </div>
        )}
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">{movie.title}</h2>
        <div>{movie.release_date}</div>
        <p className="text-xs opacity-60 uppercase text-ellipsis overflow-hidden line-clamp-4">
          {movie.overview}
        </p>
      </div>
    </li>
  );
}

export default memo(ListItem);
