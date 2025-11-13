export const API_IMAGE_URL = import.meta.env.VITE_TMDB_IMG_URL;

export const MOVIE_STATUS = {
  Released: '已上映',
};

export type MovieStatus = keyof typeof MOVIE_STATUS;
