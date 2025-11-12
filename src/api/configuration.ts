import { request } from "../utils/request"

export const getConfiguration = async () => {
  const response = await request.get("/configuration")
  return response.data
}
