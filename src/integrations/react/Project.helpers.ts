const YOUTUBE_URL_PATTERN =
  /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|v\/|watch\?v=)|youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^\s&?/]+)/

export function parseYouTubeVideoId(url: string): string | null {
  const match = url.match(YOUTUBE_URL_PATTERN)
  return match ? match[1] : null
}
