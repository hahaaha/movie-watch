import { useQuery } from "@tanstack/react-query"
import { getConfiguration } from "../api/configuration"

export const useConfiguration = () => {
  return useQuery({
    queryKey: ["tmdbConfig"],
    queryFn: getConfiguration,
  })
}
