import { useInfiniteQuery } from "@tanstack/react-query"
import InfiniteScroll from "react-infinite-scroll-component"
import { useSearchParams } from "react-router"
import { getMoviesList } from "../../api/movie"
import type { Movie } from "../../types/movie"
import ListItem from "./components/ListItem"

export default function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("query")

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["movies", query],
      initialPageParam: 1,
      queryFn: ({ pageParam }) => getMoviesList(query ?? "", pageParam),
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.total_pages) {
          return lastPage.page + 1
        }
        return undefined
      },
    })

  const movies = data?.pages?.flatMap((page) => page.results) ?? []
  console.log(hasNextPage)
  console.log(movies.length)

  if (isLoading) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    )
  }
  if (error) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center">
        <div>Error: {(error as Error).message}</div>
      </div>
    )
  }

  return (
    <div className="list p-8">
      <InfiniteScroll
        dataLength={movies.length}
        next={() => hasNextPage && !isFetching && fetchNextPage()}
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
      </InfiniteScroll>
    </div>
  )
}
