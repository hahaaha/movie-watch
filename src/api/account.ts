import { request } from "../utils/request"

export const addFavoriteMovie = async (data: {
  media_type: string
  media_id: number
  favorite: boolean
}) => {
  const response = await request.post("/account/22457110/favorite", {
    ...data,
  })
  return response.data
}

export const getFavoriteMovies = async () => {
  const response = await request.get("/account/22457110/favorite/movies")
  return response.data
}

export const addWatchList = async (data: {
  media_type: string
  media_id: number
  watchlist: boolean
}) => {
  const response = await request.post("/account/22457110/watchlist", {
    ...data,
  })
  return response.data
}

export const getWatchListMovies = async () => {
  const response = await request.get("/account/22457110/watchlist/movies")
  return response.data
}
