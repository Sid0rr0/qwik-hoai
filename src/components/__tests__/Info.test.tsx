import { createDOM } from '@builder.io/qwik/testing'
import { afterEach, describe, expect, test, vi } from 'vitest'
import type { InfoAPI } from '~/interfaces/info'
import Info from '../Info'

// createDOM().render() doesn't await pending useResource$ calls. userEvent's
// dispatch always ends with a scheduler flush, even for an event nothing
// listens for, so firing a harmless one is the documented way to wait for
// the resource to settle and the resolved view to render.
type CreateDOMResult = Awaited<ReturnType<typeof createDOM>>
function flushResources(dom: CreateDOMResult) {
  return dom.userEvent(dom.screen, 'noop')
}

function mockFetchOnce(response: InfoAPI) {
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      json: () => Promise.resolve(response),
    })
  )
}

function makeResult(
  overrides: Partial<InfoAPI['results'][number]['data']> = {}
): InfoAPI['results'][number] {
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
    id: '',
    rev: '',
    data: { image: '', links: [], text: '', ...overrides },
  }
}

describe('Info', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  test('renders the fetched text and links once resolved', async () => {
    mockFetchOnce({
      results: [
        makeResult({
          text: 'About me',
          links: [
            { link: 'https://a.example', text: 'Site', linkText: 'Visit' },
          ],
        }),
      ],
    })

    const dom = await createDOM()
    await dom.render(<Info />)
    await flushResources(dom)

    expect(dom.screen.outerHTML).toContain('About me')
    expect(dom.screen.outerHTML).toContain('https://a.example')
  })

  test('falls back to a default greeting when there are no results', async () => {
    mockFetchOnce({ results: [] })

    const dom = await createDOM()
    await dom.render(<Info />)
    await flushResources(dom)

    expect(dom.screen.outerHTML).toContain('Hoai')
  })
})
