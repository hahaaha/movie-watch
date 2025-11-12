import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const calMovieTime = (minutes: number) => {
  if (minutes === 0) return '';
  return dayjs.duration(minutes, 'minutes').format('H小时m分钟');
};
