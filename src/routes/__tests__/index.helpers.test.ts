import { describe, expect, test } from 'vitest'
import type { Result } from '~/interfaces/api'
import { groupProjectsByCategory } from '../index.helpers'

function makeResult(overrides: Partial<Result> & { id: string }): Result {
  return {
    lastUpdatedBy: '',
    folders: [],
    modelId: '',
    query: [],
    published: '',
    firstPublished: 0,
    testRatio: 0,
    lastUpdated: 0,
    createdDate: 0,
    createdBy: '',
    meta: { lastPreviewUrl: '', kind: '' },
    variations: {},
    name: '',
    rev: '',
    data: { image: [], name: '', description: '' },
    ...overrides,
  }
}

describe('groupProjectsByCategory', () => {
  test('sorts results into art and design by data.type', () => {
    const results = [
      makeResult({
        id: 'a',
        data: { image: [], name: 'A', description: '', type: 'art' },
      }),
      makeResult({
        id: 'd',
        data: { image: [], name: 'D', description: '', type: 'design' },
      }),
    ]

    const grouped = groupProjectsByCategory(results)

    expect(grouped.art.map((p) => p.id)).toEqual(['a'])
    expect(grouped.design.map((p) => p.id)).toEqual(['d'])
  })

  test('falls back to design when type is missing', () => {
    const results = [
      makeResult({ id: 'x', data: { image: [], name: 'X', description: '' } }),
    ]

    const grouped = groupProjectsByCategory(results)

    expect(grouped.design.map((p) => p.id)).toEqual(['x'])
    expect(grouped.art).toEqual([])
  })

  test('falls back to design when type is neither art nor design', () => {
    const results = [
      makeResult({
        id: 'y',
        data: { image: [], name: 'Y', description: '', type: 'sculpture' },
      }),
    ]

    const grouped = groupProjectsByCategory(results)

    expect(grouped.design.map((p) => p.id)).toEqual(['y'])
  })

  test('assigns position as the index in the source results array', () => {
    const results = [
      makeResult({
        id: 'a',
        data: { image: [], name: 'A', description: '', type: 'art' },
      }),
      makeResult({
        id: 'b',
        data: { image: [], name: 'B', description: '', type: 'design' },
      }),
    ]

    const grouped = groupProjectsByCategory(results)

    expect(grouped.art[0].position).toBe(0)
    expect(grouped.design[0].position).toBe(1)
  })

  test('initializes isOpened and hasBeenOpened to false', () => {
    const results = [
      makeResult({
        id: 'a',
        data: { image: [], name: 'A', description: '', type: 'art' },
      }),
    ]

    const [project] = groupProjectsByCategory(results).art

    expect(project.isOpened).toBe(false)
    expect(project.hasBeenOpened).toBe(false)
  })

  test('returns empty art and design lists for no results', () => {
    expect(groupProjectsByCategory([])).toEqual({ art: [], design: [] })
  })
})
