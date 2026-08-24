// @vitest-environment jsdom
/** @jsxImportSource react */
import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { makeProject } from '~/testing/makeProject'
import { RProject } from '../Project'

describe('RProject', () => {
  test('renders the project description', () => {
    render(<RProject project={makeProject({ description: 'Hello world' })} />)

    expect(screen.getByText('Hello world')).toBeTruthy()
  })

  test('renders each link, falling back to the raw URL when linkText is missing', () => {
    render(
      <RProject
        project={makeProject({
          links: [
            { link: 'https://a.example', text: 'Site', linkText: 'Visit A' },
            { link: 'https://b.example', text: 'Repo', linkText: '' },
          ],
        })}
      />
    )

    const visitLink = screen.getByRole('link', { name: 'Visit A' })
    expect(visitLink.getAttribute('href')).toBe('https://a.example')

    const fallbackLink = screen.getByRole('link', { name: 'https://b.example' })
    expect(fallbackLink.getAttribute('href')).toBe('https://b.example')
  })

  test('renders a carousel image for each valid entry, skipping malformed ones', () => {
    render(
      <RProject
        project={makeProject({
          image: [
            { image: 'https://cdn.example/one.png' },
            { image: '' },
            { image: 'https://cdn.example/two.png' },
          ],
        })}
      />
    )

    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(2)
  })

  test('renders a YouTube embed when videoLink is a recognizable YouTube URL', () => {
    const { container } = render(
      <RProject
        project={makeProject({
          videoLink: 'https://www.youtube.com/watch?v=abc123',
        })}
      />
    )

    expect(container.querySelector('.h-full')).toBeTruthy()
  })

  test('renders no video embed when videoLink is not a YouTube URL', () => {
    const { container } = render(
      <RProject project={makeProject({ videoLink: 'https://vimeo.com/1' })} />
    )

    expect(container.querySelector('.h-full')).toBeNull()
  })
})
