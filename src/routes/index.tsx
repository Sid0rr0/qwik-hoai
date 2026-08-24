import { component$, useStore, $, useContext } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import type { BuilderAPI, Data } from '~/interfaces/api'

import { routeLoader$ } from '@builder.io/qwik-city'
import { ProjectList } from '~/components/ProjectList'
import { InfoOpenedContext, SelectedProjectsTypeContext } from './layout'
import Info from '~/components/Info'
import { groupProjectsByCategory } from './index.helpers'

export type ProjectCategory = 'art' | 'design'

export interface IProject extends Data {
  id: string
  hasBeenOpened: boolean
  isOpened: boolean
  position: number
}

export interface IProjectList {
  art: IProject[]
  design: IProject[]
}

export const useProjectData = routeLoader$(async (requestEvent) => {
  // This code runs only on the server, after every navigation
  // const res = await fetch(
  //   `https://cdn.builder.io/api/v3/content/project?apiKey=${
  //     import.meta.env.PUBLIC_API_KEY
  //   }`
  // )

  const res = await fetch(
    `https://cdn.builder.io/api/v3/content/project?apiKey=${requestEvent.env.get(
      'PUBLIC_API_KEY'
    )}`
  )
  const product = (await res.json()) as BuilderAPI

  return groupProjectsByCategory(product.results)
})

export default component$(() => {
  const signal = useProjectData()
  // const isArtSelected = useSignal(false)
  const isArtSelected = useContext(SelectedProjectsTypeContext)
  const isInfoOpened = useContext(InfoOpenedContext)
  const designList = useStore(signal.value.design)
  const artList = useStore(signal.value.art)

  const updateProjectList$ = $((project: IProject, type: ProjectCategory) => {
    if (type === 'art') {
      const index = artList.findIndex((p) => p.id === project.id)
      artList[index].isOpened = !artList[index].isOpened
      artList[index].hasBeenOpened = true
    } else {
      const index = designList.findIndex((p) => p.id === project.id)
      designList[index].isOpened = !designList[index].isOpened
      designList[index].hasBeenOpened = true
    }

    // console.log(designList, artList)
  })

  return (
    <>
      {/* <div
        class={`translate-x-full transition-transform relative z-10 ${
          isInfoOpened.value ? 'translate-x-0' : ''
        }`}
      >
        <Info />
      </div> */}
      {isInfoOpened.value && <Info />}
      <ProjectList
        projectList={isArtSelected.value ? artList : designList}
        updateList$={updateProjectList$}
      />

      {/* {isArtSelected.value ? (
        <ProjectList projectList={artList} updateList$={updateProjectList$} />
      ) : (
        <ProjectList
          projectList={designList}
          updateList$={updateProjectList$}
        />
      )} */}
    </>
  )
})

export const head: DocumentHead = {
  title: 'Hoai Le Thi | Portfolio',
  meta: [
    {
      name: 'Hoai Le Thi | Portfolio',
      content: 'Hoai Le Thi | Portfolio',
    },
  ],
}
