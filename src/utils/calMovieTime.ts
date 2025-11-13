import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const calMovieTime = (minutes: number) => {
  if (minutes === 0) return '';
  const duration = dayjs.duration(minutes, 'minutes');
  const hours = duration.hours();
  const mins = duration.minutes();

  if (hours === 0) {
    return `${mins}分钟`;
  }
  return `${hours}小时${mins}分钟`;
};
