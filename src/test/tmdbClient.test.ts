import { getTmdbImageUrl } from '../utils/tmdbClient';

// 模拟 TMDB 配置
const mockConfig = {
  base_url: 'http://image.tmdb.org/t/p/',
  secure_base_url: 'https://image.tmdb.org/t/p/',
  backdrop_sizes: ['w300', 'w780', 'w1280', 'original'],
  logo_sizes: ['w45', 'w92', 'w154', 'w185', 'w300', 'w500', 'original'],
  poster_sizes: ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'],
  profile_sizes: ['w45', 'w185', 'h632', 'original'],
  still_sizes: ['w92', 'w185', 'w300', 'original'],
};

describe('getTmdbImageUrl', () => {
  it('应该返回空字符串当 path 为 null', () => {
    expect(getTmdbImageUrl(null, 'poster', mockConfig)).toBe('');
  });

  it('应该返回空字符串当 path 为 undefined', () => {
    expect(getTmdbImageUrl(undefined, 'poster', mockConfig)).toBe('');
  });

  it('应该返回空字符串当 path 为空字符串', () => {
    expect(getTmdbImageUrl('', 'poster', mockConfig)).toBe('');
  });

  it('应该正确生成 poster 类型的图片 URL（默认类型）', () => {
    const path = '/test-poster.jpg';
    const result = getTmdbImageUrl(path, 'poster', mockConfig);
    // 默认使用中间索引（Math.floor(7/2) = 3，即 'w342'）
    expect(result).toBe('https://image.tmdb.org/t/p/w342/test-poster.jpg');
  });

  it('应该正确生成 backdrop 类型的图片 URL', () => {
    const path = '/test-backdrop.jpg';
    const result = getTmdbImageUrl(path, 'backdrop', mockConfig);
    // 默认使用中间索引（Math.floor(4/2) = 2，即 'w1280'）
    expect(result).toBe('https://image.tmdb.org/t/p/w1280/test-backdrop.jpg');
  });

  it('应该正确生成 profile 类型的图片 URL', () => {
    const path = '/test-profile.jpg';
    const result = getTmdbImageUrl(path, 'profile', mockConfig);
    // 默认使用中间索引（Math.floor(4/2) = 2，即 'h632'）
    expect(result).toBe('https://image.tmdb.org/t/p/h632/test-profile.jpg');
  });

  it('应该正确生成 still 类型的图片 URL', () => {
    const path = '/test-still.jpg';
    const result = getTmdbImageUrl(path, 'still', mockConfig);
    // 默认使用中间索引（Math.floor(4/2) = 2，即 'w300'）
    expect(result).toBe('https://image.tmdb.org/t/p/w300/test-still.jpg');
  });

  it('应该使用指定的 sizeIndex 生成 URL', () => {
    const path = '/test-poster.jpg';
    const result = getTmdbImageUrl(path, 'poster', mockConfig, 0);
    expect(result).toBe('https://image.tmdb.org/t/p/w92/test-poster.jpg');
  });

  it('应该使用指定的 sizeIndex 生成 URL（中间索引）', () => {
    const path = '/test-poster.jpg';
    const result = getTmdbImageUrl(path, 'poster', mockConfig, 3);
    expect(result).toBe('https://image.tmdb.org/t/p/w342/test-poster.jpg');
  });

  it('应该使用最后一个 size 当 sizeIndex 超出范围', () => {
    const path = '/test-poster.jpg';
    const result = getTmdbImageUrl(path, 'poster', mockConfig, 100);
    // 应该使用最后一个 size（original）
    expect(result).toBe('https://image.tmdb.org/t/p/original/test-poster.jpg');
  });

  it('应该使用最后一个 size 当 sizeIndex 等于数组长度', () => {
    const path = '/test-poster.jpg';
    const result = getTmdbImageUrl(path, 'poster', mockConfig, 7);
    // poster_sizes 长度为 7，索引 7 超出范围，应该使用最后一个
    expect(result).toBe('https://image.tmdb.org/t/p/original/test-poster.jpg');
  });

  it('应该正确处理路径以 / 开头的情况', () => {
    const path = '/abc123.jpg';
    const result = getTmdbImageUrl(path, 'poster', mockConfig);
    expect(result).toBe('https://image.tmdb.org/t/p/w342/abc123.jpg');
  });

  it('应该正确处理不同的图片路径格式', () => {
    const path = '/path/to/image.png';
    const result = getTmdbImageUrl(path, 'backdrop', mockConfig, 1);
    expect(result).toBe('https://image.tmdb.org/t/p/w780/path/to/image.png');
  });

  it('应该使用 secure_base_url 而不是 base_url', () => {
    const path = '/test.jpg';
    const result = getTmdbImageUrl(path, 'poster', mockConfig);
    expect(result).toContain('https://');
    expect(result).not.toContain('http://');
  });
});
