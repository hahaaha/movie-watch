/** TMDB API 配置类型 */
interface TmdbImageConfig {
  base_url: string
  secure_base_url: string
  backdrop_sizes: string[]
  logo_sizes: string[]
  poster_sizes: string[]
  profile_sizes: string[]
  still_sizes: string[]
}

/** TMDB 配置响应 */
// interface TmdbConfigResponse {
//   images: TmdbImageConfig
//   change_keys: string[]
// }

/** 图片类型可选值 */
type TmdbImageType = "poster" | "backdrop" | "profile" | "still"

/**
 * 根据 TMDB 配置生成图片 URL
 */
export function getTmdbImageUrl(
  path: string | null,
  type: TmdbImageType = "poster",
  cfg: TmdbImageConfig,
  sizeIndex?: number
): string {
  if (!path) return "/images/placeholder.svg"

  const base = cfg.secure_base_url

  const sizeMap: Record<TmdbImageType, string[]> = {
    poster: cfg.poster_sizes,
    backdrop: cfg.backdrop_sizes,
    profile: cfg.profile_sizes,
    still: cfg.still_sizes,
  }

  const sizes = sizeMap[type] || cfg.poster_sizes
  const selectedSize =
    typeof sizeIndex === "number"
      ? sizes[Math.min(sizeIndex, sizes.length - 1)]
      : sizes[Math.floor(sizes.length / 2)]

  return `${base}${selectedSize}${path}`
}
