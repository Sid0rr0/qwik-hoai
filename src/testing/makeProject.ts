import type { IProject } from '~/routes/index'

export function makeProject(overrides: Partial<IProject> = {}): IProject {
  return {
    id: 'a',
    position: 0,
    hasBeenOpened: false,
    isOpened: false,
    image: [],
    name: 'Alpha',
    description: 'A description',
    ...overrides,
  }
}
