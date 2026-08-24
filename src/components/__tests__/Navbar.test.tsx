import { component$, useContextProvider, useSignal } from '@builder.io/qwik'
import { createDOM } from '@builder.io/qwik/testing'
import { describe, expect, test } from 'vitest'
import { InfoOpenedContext, SelectedProjectsTypeContext } from '~/contexts'
import { hasClass } from '~/testing/hasClass'
import Navbar from '../Navbar'

const Host = component$(() => {
  const isArtSelected = useSignal(false)
  const isInfoOpen = useSignal(false)
  useContextProvider(SelectedProjectsTypeContext, isArtSelected)
  useContextProvider(InfoOpenedContext, isInfoOpen)

  return (
    <>
      <div data-testid="info-open">{String(isInfoOpen.value)}</div>
      <Navbar />
    </>
  )
})

describe('Navbar', () => {
  test('defaults to the design category, with the design button highlighted', async () => {
    const { screen, render } = await createDOM()

    await render(<Host />)

    expect(screen.querySelector('header')?.className).toContain('from-design')
    const [designButton, artButton] = Array.from(
      screen.querySelectorAll('button')
    )
    expect(hasClass(designButton, 'cust-shadow')).toBe(true)
    expect(hasClass(artButton, 'cust-shadow')).toBe(false)
  })

  test('clicking the art button switches the category and highlight', async () => {
    const { screen, render, userEvent } = await createDOM()

    await render(<Host />)
    const [, artButton] = Array.from(screen.querySelectorAll('button'))
    await userEvent(artButton, 'click')

    expect(screen.querySelector('header')?.className).toContain('from-art')
    const [designButton, artButtonAfter] = Array.from(
      screen.querySelectorAll('button')
    )
    expect(hasClass(artButtonAfter, 'cust-shadow')).toBe(true)
    expect(hasClass(designButton, 'cust-shadow')).toBe(false)
  })

  test('clicking the info button toggles the info-open context', async () => {
    const { screen, render, userEvent } = await createDOM()

    await render(<Host />)
    const infoButton = Array.from(screen.querySelectorAll('button')).find(
      (button) => button.textContent === 'info'
    )!
    await userEvent(infoButton, 'click')

    expect(screen.querySelector('[data-testid="info-open"]')?.textContent).toBe(
      'true'
    )

    await userEvent(infoButton, 'click')

    expect(screen.querySelector('[data-testid="info-open"]')?.textContent).toBe(
      'false'
    )
  })

  test('clicking the art button closes an open info panel', async () => {
    const { screen, render, userEvent } = await createDOM()

    await render(<Host />)
    const buttons = () => Array.from(screen.querySelectorAll('button'))
    const infoButton = buttons().find((b) => b.textContent === 'info')!
    await userEvent(infoButton, 'click')
    expect(screen.querySelector('[data-testid="info-open"]')?.textContent).toBe(
      'true'
    )

    const [, artButton] = Array.from(screen.querySelectorAll('button'))
    await userEvent(artButton, 'click')

    expect(screen.querySelector('[data-testid="info-open"]')?.textContent).toBe(
      'false'
    )
  })
})
