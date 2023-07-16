import { component$, useSignal,  } from '@builder.io/qwik'

export default component$(() => {
  const isInfoOpen = useSignal(false)

  return (
    <>
      <header class="bg-gradient-to-b from-pink-500">
        <ul class="flex justify-between items-center px-2 h-cust text-3xl px-padd">
          <li>
            <a href="#">L&#234; Th&#x1ECB; Ho&#224;i</a>
          </li>
          {/* <li>
            <button
              onClick$={(e) => {
                e.stopPropagation()
                changeList(false)
              }}
            >
              <Image src="/fire1.png" width={30} height={30} alt="Art" />
            </button>
          </li>
          <li>
            <button
              onClick$={(e) => {
                e.stopPropagation()
                changeList(true)
              }}
            >
              <Image src="/fire2.png" width={30} height={30} alt="Art" />
            </button>
          </li> */}
          <li>
            <a
              href="#"
              preventdefault:click
              onClick$={() => (isInfoOpen.value = !isInfoOpen.value)}
            >
              info
            </a>
          </li>
        </ul>
      </header>

      {/* <Info isOpen={isInfoOpen} about={about} /> */}
    </>
  )
})
