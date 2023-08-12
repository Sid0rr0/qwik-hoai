import { Resource, component$, useResource$ } from '@builder.io/qwik'
import type { Data, InfoAPI } from '~/interfaces/info'

export default component$(() => {
  console.log(import.meta.env.API_KEY, 'import.meta.env.API_KEY')
  const infoData = useResource$<Data>(async () => {
    // it will run first on mount (server), then re-run whenever prNumber changes (client)
    // this means this code will run on the server and the browser
    // track(() => prNumber.value);
    // console.log(import.meta.env.API_KEY, 'import.meta.env.API_KEY')

    const res = await fetch(
      `https://cdn.builder.io/api/v3/content/info?apiKey=${
        import.meta.env.PUBLIC_API_KEY
      }`
    )
    const result = (await res.json()) as InfoAPI

    if (result.results.length === 0) {
      return { text: 'Hoai', image: '' }
    }

    return result.results[0].data
  })

  const sizes = [
    ['178', '333'],
    ['267', '500'],
    ['534', '1000'],
    ['1068', '2000'],
  ]

  const body = (data: Data) => (
    <div class="h-[calc(100vh-2*theme('spacing.cust'))] absolute top-[theme('spacing.cust'))] w-full bg-white flex flex-col md:grid md:grid-cols-[55%,45%] z-50 overflow-auto">
      <picture>
        <source
          srcSet={`${sizes.reduce(
            (acc, [height, width]) =>
              acc +
              `${data.image}?height=${height}&width=${width}&format=webp ${width}w, `,
            ''
          )}`}
          type="image/webp"
        />
        <img
          srcSet={`${data.image}?height=534&width=1000&format=webp`}
          width="1000"
          height="534"
        />
      </picture>

      <p class="px-padd whitespace-pre-wrap overflow-auto pt-4 md:pt-0">{data.text}</p>
    </div>
  )

  return (
    <Resource
      value={infoData}
      onPending={() => <div>loading...</div>}
      onResolved={body}
    />
  )
})
