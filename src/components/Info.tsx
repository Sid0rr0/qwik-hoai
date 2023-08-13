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
      return { text: 'Hoai', image: '', links: [] }
    }

    return result.results[0].data
  })

  const sizes = [
    ['172', '150'],
    ['430', '375'],
    ['825', '720'],
    ['1720', '1500'],
  ]

  const body = (data: Data) => (
    <div class="h-[calc(100vh-2*theme('spacing.cust')/1.5)] md:h-[calc(100vh-2*theme('spacing.cust'))] absolute top-[theme('spacing.cust'))] w-full bg-white flex flex-col md:grid md:grid-cols-[55%,45%] z-50 overflow-auto">
      <picture>
        <source
          srcSet={`${sizes.reduce(
            (acc, [width, height]) =>
              acc +
              `${data.image}?height=${height}&width=${width}&format=webp ${width}w, `,
            ''
          )}`}
          type="image/webp"
        />
        <img
          srcSet={`${data.image}?height=534&width=1000&format=webp`}
          width="825"
          height="720"
          class="max-h-[30dvh] md:max-h-[calc(100vh-2*theme('spacing.cust'))] object-contain"
        />
      </picture>

      <div class="md:max-h-[calc(100vh-2*theme('spacing.cust'))] overflow-y-auto">
        <p class="px-padd whitespace-pre-wrap overflow-auto pt-4 md:pt-0">
          {data.text}
        </p>
        <ul class="px-padd pt-padd text-base md:text-xl">
          <li>
            Contact me for collaborations via{' '}
            <a href="mailto:hoai.le.thi@icloud.com" class="text-design">
              hoai.le.thi@icloud.com
            </a>
          </li>
          {data.links.map((link) => (
            <li key={link.link}>
              {link.text}:{' '}
              <a href={link.link} class="text-design">
                {link.linkText ? link.linkText : link.link}
              </a>
            </li>
          ))}
        </ul>
      </div>
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
