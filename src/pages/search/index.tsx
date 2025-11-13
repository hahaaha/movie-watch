import {
  faArrowDownWideShort,
  faArrowUpWideShort,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useInfiniteQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useQueryState } from 'nuqs';
import { useMemo, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getMoviesList } from '../../api/movie';
import CommonError from '../../components/CommonError';
import GlobalLoading from '../../components/GlobalLoading';
import ListItem from '../../components/ListItem';
import type { Movie } from '../../types/movie';

export default function Search() {
  const [sortBy, setSortBy] = useState<'asc' | 'desc' | null>(null);
  const [query, setQuery] = useQueryState('query');
  const [inputValue, setInputValue] = useState<string>(query ?? '');

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ['movies', query],
      initialPageParam: 1,
      queryFn: ({ pageParam }) => getMoviesList(query ?? '', pageParam),
      getNextPageParam: lastPage => {
        if (lastPage.page < lastPage.total_pages) {
          return lastPage.page + 1;
        }
        return undefined;
      },
      select: data => {
        const allItems = data?.pages?.flatMap(page => page.results);
        const uniqueItems = Array.from(
          new Map(allItems.map(item => [item.id, item])).values()
        );
        return {
          pages: { items: uniqueItems },
          pageParams: data.pageParams,
        };
      },
    });

  const movies = useMemo(
    () =>
      (data?.pages?.items ?? []).sort((a, b) => {
        if (sortBy === null) {
          return 0;
        }
        if (sortBy === 'desc') {
          return dayjs(b.release_date).diff(dayjs(a.release_date));
        }
        return dayjs(a.release_date).diff(dayjs(b.release_date));
      }),
    [data?.pages?.items, sortBy]
  );

  if (isLoading) return <GlobalLoading />;
  if (error) return <CommonError error={error} />;

  const handleSearch = () => {
    if (!inputValue.trim()) {
      warnToast('请输入搜索关键词');
      return;
    }
    setQuery(inputValue);
  };

  const loadMore = () => {
    if (hasNextPage && !isFetching) {
      setSortBy(null);
      fetchNextPage();
    }
  };

  const warnToast = (text: string) => {
    toast(text);
  };

  return (
    <div className="list p-8 space-y-8">
      <div className="flex items-center justify-between gap-8">
        <div className="flex items-center flex-1">
          <input
            type="text"
            className="input input-bordered w-full"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={() => handleSearch()}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          >
            Search
          </button>
        </div>
        {sortBy === null && (
          <div className="tooltip tooltip-bottom" data-tip="时间排序">
            <FontAwesomeIcon
              className="cursor-pointer"
              icon={faArrowUpWideShort}
              onClick={() => setSortBy('asc')}
            />
          </div>
        )}
        {sortBy === 'desc' && (
          <div
            className="tooltip tooltip-bottom text-primary"
            data-tip="时间降序"
          >
            <FontAwesomeIcon
              className="cursor-pointer"
              icon={faArrowDownWideShort}
              onClick={() => setSortBy(null)}
            />
          </div>
        )}
        {sortBy === 'asc' && (
          <div
            className="tooltip tooltip-bottom text-primary"
            data-tip="时间升序"
          >
            <FontAwesomeIcon
              className="cursor-pointer"
              icon={faArrowUpWideShort}
              onClick={() => setSortBy('desc')}
            />
          </div>
        )}
      </div>
      <InfiniteScroll
        dataLength={movies.length}
        next={loadMore}
        hasMore={hasNextPage}
        loader={
          <div className="flex justify-center items-center">
            <span className="loading loading-dots loading-xl"></span>
          </div>
        }
      >
        {movies.map((movie: Movie) => (
          <ListItem key={movie.id} movie={movie} />
        ))}
        {movies.length === 0 && (
          <div className="text-center text-2xl font-bold">No movies found</div>
        )}
      </InfiniteScroll>
      <Toaster />
    </div>
  );
}
