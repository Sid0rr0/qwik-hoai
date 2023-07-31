import type { IProject } from '~/routes/index'
import type { QwikMouseEvent } from '@builder.io/qwik'
import { component$, $, useContext, type PropFunction } from '@builder.io/qwik'
import { Project } from '~/integrations/react/Project'
import { SelectedProjectsTypeContext } from '~/routes/layout'

export interface ProjectListProps {
  projectList: Array<IProject>
  updateList$: PropFunction<(project: IProject, type: string) => void>
}

export const ProjectList = component$<ProjectListProps>(
  ({ projectList, updateList$ }) => {
    const isArtSelectedContext = useContext(SelectedProjectsTypeContext)
    
    // TODO close other projects when opening a new one
    const handleClick = $(
      (e: QwikMouseEvent<HTMLDivElement, MouseEvent>, project: IProject) => {
        updateList$(project, isArtSelectedContext.value ? 'art' : 'design')
        const el = e.target as HTMLDivElement
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 350)
        // el.parentElement!.style.opacity === '1'
        //   ? (el.parentElement!.style.opacity = '0')
        //   : (el.parentElement!.style.opacity = '1')
      }
    )

    function getColor(id: number, len: number) {
      const colors = [
        `linear-gradient(0deg, rgba(255,255,255,1) ${len}%, rgba(0,0,255,0.6) 100%)`,
        `linear-gradient(0deg, rgba(255,255,255,1) ${len}%, rgba(0,255,139,0.6) 100%)`,
        `linear-gradient(0deg, rgba(255,255,255,1) ${len}%, rgba(161,0,255,0.6) 100%)`,
        `linear-gradient(0deg, rgba(255,255,255,1) ${len}%, rgba(255,0,0,0.6) 100%)`,
      ]

      return colors[id % colors.length]
    }

    const onHover = $(
      (e: QwikMouseEvent<HTMLDivElement, MouseEvent>, project: IProject) => {
        const el = e.target as HTMLDivElement
        // const el = e.target.parentEvent
        if (!project.isOpened && !project.hasBeenOpened)
          el.style.opacity === '1'
            ? (el.style.opacity = '0')
            : (el.style.opacity = '1')
      }
    )

    const p = projectList.map((project) => {
      return (
        <div
          key={project.position}
          class="z-0 lg:opacity-0"
          style={
            project.isOpened || project.hasBeenOpened
              ? { backgroundImage: getColor(project.position, 80), opacity: 1 }
              : undefined
          }
          onMouseEnter$={(e) => onHover(e, project)}
          onMouseLeave$={(e) => onHover(e, project)}
        >
          <div
            onClick$={(e) => handleClick(e, project)}
            style={
              project.isOpened
                ? undefined
                : { backgroundImage: getColor(project.position, 18) }
            }
            class="h-cust px-padd flex items-center text-3xl cursor-finger"
          >
            {project.name}
          </div>
          <div
            class={[
              project.isOpened ? 'h-full block' : 'h-0 hidden',
              'transition-[height] ease-in-out duration-700',
            ]}
          >
            <Project client:load project={project} />
          </div>
        </div>
      )
    })

    return (
      <div class="h-[calc(100vh-2*theme('spacing.cust'))] absolute top-[theme('spacing.cust'))] w-full overflow-auto">
        {p}
      </div>
    )
  }
)
