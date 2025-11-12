import { useQuery } from "@tanstack/react-query"
import { getRelatedMovies } from "../../api/movie"

export const useRelatedMovies = (id: number) => {
  return useQuery({
    queryKey: ["relatedMovies", id],
    queryFn: () => getRelatedMovies(id),
  })
}
