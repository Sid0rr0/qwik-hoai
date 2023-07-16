import { component$, useStore, $, useContext } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import type { BuilderAPI, Data } from '~/interfaces/api'

import { routeLoader$ } from '@builder.io/qwik-city'
import { ProjectList } from '~/components/ProjectList'
import { SelectedProjectsTypeContext } from './layout'

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
  const res = await fetch(
    `https://cdn.builder.io/api/v3/content/project?apiKey=${requestEvent.env.get(
      'API_KEY'
    )}`
  )
  const product = (await res.json()) as BuilderAPI

  const data: IProjectList = {
    art: [],
    design: [],
  }

  product.results.forEach((result, i) => {
    const type = result.data.type ? result.data.type : 'design'
    data[type as keyof IProjectList].push({
      id: result.id,
      position: i,
      hasBeenOpened: false,
      isOpened: false,
      ...result.data,
    })
  })

  return data as IProjectList
})

export default component$(() => {
  const signal = useProjectData()
  // const isArtSelected = useSignal(false)
  const isArtSelected = useContext(SelectedProjectsTypeContext)
  const designList = useStore(signal.value.design)
  const artList = useStore(signal.value.art)

  const updateProjectList$ = $((project: IProject, type: string) => {
    if (type === 'art') {
      const index = artList.findIndex((p) => p.id === project.id)
      artList[index].isOpened = !artList[index].isOpened
      artList[index].hasBeenOpened = true
    } else {
      const index = designList.findIndex((p) => p.id === project.id)
      designList[index].isOpened = !designList[index].isOpened
      designList[index].hasBeenOpened = true
    }

    console.log(designList, artList)
  })

  return (
    <>
      {/* <ProjectList
        projectList={isArtSelected.value ? artList : designList}
        updateList$={updateProjectList$}
      /> */}

      {isArtSelected.value ? (
        <ProjectList projectList={artList} updateList$={updateProjectList$} />
      ) : (
        <ProjectList
          projectList={designList}
          updateList$={updateProjectList$}
        />
      )}
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
