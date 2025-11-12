export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  release_date: string | null
  vote_average: number | null
}

export interface Cast {
  id: number
  name: string
  character: string
  profile_path: string | null
}
