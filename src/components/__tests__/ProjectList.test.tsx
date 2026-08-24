import { $, component$, useContextProvider, useSignal, useStore } from '@builder.io/qwik'
import { createDOM } from '@builder.io/qwik/testing'
import { describe, expect, test } from 'vitest'
import { SelectedProjectsTypeContext } from '~/contexts'
import type { IProject } from '~/routes/index'
import { hasClass } from '~/testing/hasClass'
import { makeProject } from '~/testing/makeProject'
import { ProjectList } from '../ProjectList'

const Host = component$(
  (props: { projectList: IProject[]; isArtSelected?: boolean }) => {
    const isArtSelected = useSignal(props.isArtSelected ?? false)
    useContextProvider(SelectedProjectsTypeContext, isArtSelected)
    const calls = useStore<{ log: string[] }>({ log: [] })

    return (
      <>
        <div data-testid="calls">{calls.log.join(',')}</div>
        <ProjectList
          projectList={props.projectList}
          updateList$={$((project: IProject, type) => {
            calls.log.push(`${project.id}:${type}`)
          })}
        />
      </>
    )
  }
)

describe('ProjectList', () => {
  test('renders every project name in the list', async () => {
    const { screen, render } = await createDOM()
    const projects = [
      makeProject({ id: 'a', position: 0, name: 'Alpha' }),
      makeProject({ id: 'b', position: 1, name: 'Beta' }),
    ]

    await render(<Host projectList={projects} />)

    expect(screen.outerHTML).toContain('Alpha')
    expect(screen.outerHTML).toContain('Beta')
  })

  test('clicking a project in the design category calls updateList$ with "design"', async () => {
    const { screen, render, userEvent } = await createDOM()
    const project = makeProject({ id: 'a', position: 0, name: 'Alpha' })

    await render(<Host projectList={[project]} isArtSelected={false} />)
    const projectTitle = screen.querySelector('.cursor-finger')! as HTMLElement
    projectTitle.scrollIntoView = () => {}
    await userEvent('.cursor-finger', 'click', { target: projectTitle })

    const calls = screen.querySelector('[data-testid="calls"]')
    expect(calls?.textContent).toBe('a:design')
  })

  test('clicking a project in the art category calls updateList$ with "art"', async () => {
    const { screen, render, userEvent } = await createDOM()
    const project = makeProject({ id: 'a', position: 0, name: 'Alpha' })

    await render(<Host projectList={[project]} isArtSelected={true} />)
    const projectTitle = screen.querySelector('.cursor-finger')! as HTMLElement
    projectTitle.scrollIntoView = () => {}
    await userEvent('.cursor-finger', 'click', { target: projectTitle })

    const calls = screen.querySelector('[data-testid="calls"]')
    expect(calls?.textContent).toBe('a:art')
  })

  test('toggles opacity on hover for a project that has not been opened yet', async () => {
    const { screen, render, userEvent } = await createDOM()
    const project = makeProject({
      id: 'a',
      isOpened: false,
      hasBeenOpened: false,
    })

    await render(<Host projectList={[project]} />)
    const wrapper = screen.querySelector('.z-0') as HTMLElement
    expect(wrapper.style.opacity).toBe('')

    await userEvent(wrapper, 'mouseenter', { target: wrapper })
    expect(wrapper.style.opacity).toBe('1')

    await userEvent(wrapper, 'mouseleave', { target: wrapper })
    expect(wrapper.style.opacity).toBe('0')
  })

  test('leaves opacity alone on hover once a project has been opened', async () => {
    const { screen, render, userEvent } = await createDOM()
    const project = makeProject({
      id: 'a',
      isOpened: false,
      hasBeenOpened: true,
    })

    await render(<Host projectList={[project]} />)
    const wrapper = screen.querySelector('.z-0') as HTMLElement
    expect(wrapper.style.opacity).toBe('1')

    await userEvent(wrapper, 'mouseenter', { target: wrapper })
    expect(wrapper.style.opacity).toBe('1')
  })

  test('shows expanded content only for the opened project', async () => {
    const { screen, render } = await createDOM()
    const projects = [
      makeProject({ id: 'a', position: 0, isOpened: true }),
      makeProject({ id: 'b', position: 1, isOpened: false }),
    ]

    await render(<Host projectList={projects} />)
    const [openedWrapper, collapsedWrapper] = Array.from(
      screen.querySelectorAll('.z-0')
    )
    const openedContent = openedWrapper.children[1] as HTMLElement
    const collapsedContent = collapsedWrapper.children[1] as HTMLElement

    expect(hasClass(openedContent, 'h-full')).toBe(true)
    expect(hasClass(openedContent, 'block')).toBe(true)
    expect(hasClass(collapsedContent, 'h-0')).toBe(true)
    expect(hasClass(collapsedContent, 'hidden')).toBe(true)
  })
})
