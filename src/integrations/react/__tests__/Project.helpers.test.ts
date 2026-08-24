import { describe, expect, test } from 'vitest'
import { parseYouTubeVideoId } from '../Project.helpers'

describe('parseYouTubeVideoId', () => {
  test('extracts the id from a watch URL', () => {
    expect(parseYouTubeVideoId('https://www.youtube.com/watch?v=abc123')).toBe(
      'abc123'
    )
  })

  test('extracts the id from a youtu.be short URL', () => {
    expect(parseYouTubeVideoId('https://youtu.be/abc123')).toBe('abc123')
  })

  test('extracts the id from an embed URL', () => {
    expect(parseYouTubeVideoId('https://www.youtube.com/embed/abc123')).toBe(
      'abc123'
    )
  })

  test('extracts the id from a URL without protocol or www', () => {
    expect(parseYouTubeVideoId('youtube.com/watch?v=abc123')).toBe('abc123')
  })

  test('returns null for a non-YouTube URL', () => {
    expect(parseYouTubeVideoId('https://vimeo.com/12345')).toBeNull()
  })
})
