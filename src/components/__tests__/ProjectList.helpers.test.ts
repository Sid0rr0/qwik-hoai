import { describe, expect, test } from 'vitest'
import { getColor } from '../ProjectList.helpers'

describe('getColor', () => {
  test('returns a gradient string with the given length baked in', () => {
    const result = getColor(0, 42)

    expect(result).toContain('42%')
    expect(result).toMatch(/^linear-gradient\(/)
  })

  test('cycles through the palette as id increases', () => {
    const first = getColor(0, 10)
    const wrapped = getColor(4, 10)

    expect(wrapped).toBe(first)
  })

  test('returns a different color for a different id within the palette', () => {
    const first = getColor(0, 10)
    const second = getColor(1, 10)

    expect(second).not.toBe(first)
  })
})
