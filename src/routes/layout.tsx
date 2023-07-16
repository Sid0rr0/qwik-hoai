import type { Signal } from '@builder.io/qwik'
import { component$, Slot, useSignal } from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'
import type { RequestHandler } from '@builder.io/qwik-city'
import { useContextProvider, createContextId } from '@builder.io/qwik'
import Navbar from '~/components/Navbar'

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  })
}

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  }
})

export const SelectedProjectsTypeContext = createContextId<Signal<boolean>>(
  'SelectedProjectsTypeContext'
)

export default component$(() => {
  const isArtSelected = useSignal(false)
  useContextProvider(SelectedProjectsTypeContext, isArtSelected)
  return (
    <>
      <Navbar />
      <main>
        <Slot />
      </main>
      <footer class="bg-gradient-to-t from-pink-500 absolute bottom-0 left-0 h-cust w-screen" />
    </>
  )
})
