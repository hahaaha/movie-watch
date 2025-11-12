import { useQuery } from "@tanstack/react-query"
import { getMovieCredits } from "../../api/movie"

export const useMovieCredits = (id: number) => {
  return useQuery({
    queryKey: ["movieCredits", id],
    queryFn: () => getMovieCredits(id),
  })
}
