import { useUserInfoStore } from '../store/useUserInfoStore';
import { request } from '../utils/request';

function getAccountId() {
  const accountId = useUserInfoStore.getState().userInfo?.id;
  return accountId;
}

export const getAccountDetails = async () => {
  const response = await request.get('/account');
  return response.data;
};

export const addFavoriteMovie = async (data: {
  media_type: string;
  media_id: number;
  favorite: boolean;
}) => {
  const response = await request.post(`/account/${getAccountId()}/favorite`, {
    ...data,
  });
  return response.data;
};

export const getFavoriteMovies = async () => {
  const response = await request.get(
    `/account/${getAccountId()}/favorite/movies`
  );
  return response.data;
};

export const addWatchList = async (data: {
  media_type: string;
  media_id: number;
  watchlist: boolean;
}) => {
  const response = await request.post(`/account/${getAccountId()}/watchlist`, {
    ...data,
  });
  return response.data;
};

export const getWatchListMovies = async (params: {
  sort_by: string;
  page?: number;
}) => {
  const response = await request.get(
    `/account/${getAccountId()}/watchlist/movies`,
    {
      params: {
        language: 'zh-CN',
        sort_by: params.sort_by,
        page: params.page,
      },
    }
  );
  return response.data;
};
