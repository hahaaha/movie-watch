import { calMovieTime } from '../utils/calMovieTime';

describe('calMovieTime', () => {
  it('应该返回空字符串当分钟数为 0', () => {
    expect(calMovieTime(0)).toBe('');
  });

  it('应该只返回分钟数当小于 60 分钟', () => {
    expect(calMovieTime(30)).toBe('30分钟');
    expect(calMovieTime(45)).toBe('45分钟');
    expect(calMovieTime(59)).toBe('59分钟');
  });

  it('应该返回小时和分钟当大于等于 60 分钟', () => {
    expect(calMovieTime(60)).toBe('1小时0分钟');
    expect(calMovieTime(90)).toBe('1小时30分钟');
    expect(calMovieTime(120)).toBe('2小时0分钟');
    expect(calMovieTime(150)).toBe('2小时30分钟');
  });

  it('应该正确处理超过 2 小时的情况', () => {
    expect(calMovieTime(180)).toBe('3小时0分钟');
    expect(calMovieTime(195)).toBe('3小时15分钟');
    expect(calMovieTime(240)).toBe('4小时0分钟');
  });

  it('应该正确处理边界值', () => {
    expect(calMovieTime(1)).toBe('1分钟');
    expect(calMovieTime(61)).toBe('1小时1分钟');
    expect(calMovieTime(119)).toBe('1小时59分钟');
  });
});
