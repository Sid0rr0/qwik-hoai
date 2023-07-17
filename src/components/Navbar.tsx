import { component$, useContext, useSignal } from '@builder.io/qwik'
import { SelectedProjectsTypeContext } from '~/routes/layout'
// import ImgFire1 from '~/media/fire1.png?jsx';
// import ImgFire2 from '~/media/fire2.png?jsx';

export default component$(() => {
  const isInfoOpen = useSignal(false)
  const isArtSelected = useContext(SelectedProjectsTypeContext)

  return (
    <>
      <header class="bg-gradient-to-b from-pink-500">
        <ul class="flex justify-between items-center px-2 h-cust text-3xl px-padd">
          <li>
            <a href="#">L&#234; Th&#x1ECB; Ho&#224;i</a>
          </li>
          <li>
            <button
              onClick$={() => {
                isArtSelected.value = false
              }}
            >
              <img src="/fire1.png" width={30} height={30} alt="Design" />
            </button>
          </li>
          <li>
            <button
              onClick$={() => {
                isArtSelected.value = true
              }}
            >
              <img src="/fire2.png" width={30} height={30} alt="Art" />
              {/* <ImgFire2 /> */}
            </button>
          </li>
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
