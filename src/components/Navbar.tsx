import { component$, useContext } from '@builder.io/qwik'
import { InfoOpenedContext, SelectedProjectsTypeContext } from '~/routes/layout'
import DesignFire from '~/media/design_81x100.png?jsx'
import ArtFire from '~/media/art_81x100.png?jsx'

export default component$(() => {
  const isArtSelected = useContext(SelectedProjectsTypeContext)
  const isInfoOpen = useContext(InfoOpenedContext)
  // const isHovering = useSignal(false)

  return (
    <>
      <header class="bg-gradient-to-b from-lust w-full">
        <ul class="grid grid-cols-3 w-full px-2 h-cust text-3xl px-padd">
          <li class="flex items-center">
            <a
              class="cursor-finger"
              href="#"
              onClick$={() => (isInfoOpen.value = false)}
            >
              L&#234; Th&#x1ECB; Ho&#224;i
            </a>
          </li>
          <li class="flex gap-4 lg:gap-16 items-center justify-center">
            {/* drop-shodow in global.css */}
            {/* onMouseOver$={() => isHovering.value = true}
                onMouseOut$={() => isHovering.value = false} */}

            <button
              onClick$={() => {
                isArtSelected.value = false
              }}
              class="h-[calc(theme('spacing.cust')/2)] w-[calc(theme('spacing.cust')/2)] cursor-finger"
              id={!isArtSelected.value ? 'design-fire' : ''}
            >
              <DesignFire />
            </button>
            <button
              onClick$={() => {
                isArtSelected.value = true
              }}
              class="h-[calc(theme('spacing.cust')/2)] w-[calc(theme('spacing.cust')/2)] cursor-finger"
              id={isArtSelected.value ? 'art-fire' : ''}
            >
              <ArtFire />
            </button>
          </li>
          <li class="flex justify-end">
            <button
              onClick$={() => (isInfoOpen.value = !isInfoOpen.value)}
              class="cursor-finger"
            >
              info
            </button>
          </li>
        </ul>
      </header>

      {/* <Info isOpen={isInfoOpen} about={about} /> */}
    </>
  )
})
