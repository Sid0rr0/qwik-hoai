import type { Result } from '~/interfaces/api'
import type { IProject, IProjectList, ProjectCategory } from './index'

export function groupProjectsByCategory(results: Result[]): IProjectList {
  return results.reduce<IProjectList>(
    (grouped, result, position) => {
      const category: ProjectCategory =
        result.data.type === 'art' ? 'art' : 'design'

      const project: IProject = {
        id: result.id,
        position,
        hasBeenOpened: false,
        isOpened: false,
        ...result.data,
      }

      return {
        ...grouped,
        [category]: [...grouped[category], project],
      }
    },
    { art: [], design: [] }
  )
}
