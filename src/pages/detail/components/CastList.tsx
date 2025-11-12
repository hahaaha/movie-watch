import { useQuery } from "@tanstack/react-query"
import { getConfiguration } from "../../../api/configuration"
import type { Cast } from "../../../types/movie"
import { getTmdbImageUrl } from "../../../utils/tmdbClient"

export default function CastList({ list }: { list: Cast[] }) {
  const { data: cfg } = useQuery({
    queryKey: ["tmdbConfig"],
    queryFn: getConfiguration,
  })

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {list?.map((item) => (
        <div
          key={item.id}
          className="card min-w-[150px] overflow-hidden bg-base-200 shadow-lg text-center"
        >
          <img
            src={getTmdbImageUrl(item.profile_path, "profile", cfg?.images)}
            alt={item.name}
          />
          <div className="card-body">
            <div className="text-lg font-bold">{item.name}</div>
            <div className="text-sm opacity-60">{item.character}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
