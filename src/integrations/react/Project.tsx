/** @jsxImportSource react */

import { qwikify$ } from '@builder.io/qwik-react'
// import { Collapse } from 'react-collapse'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import YouTube from 'react-youtube'
import type { IProject } from '~/routes'
// import { useState } from 'react'

export interface ProjectProps {
  project: IProject
}

const sizes = [
  ['178', '333'],
  ['267', '500'],
  ['534', '1000'],
  ['1068', '2000'],
]

const RProject = ({ project }: { project: IProject }) => {
  // const [isHovering, setIsHovering] = useState(false)
  const carousel = project.image.map((image) => (
    // <img src={image.image} key={image.image} width="2000" height="1068" />

    <picture key={image.image}>
      <source
        srcSet={`${sizes.reduce(
          (acc, [height, width]) =>
            acc +
            `${image.image}?height=${height}&width=${width}&format=webp ${width}w, `,
          ''
        )}`}
        type="image/webp"
      />
      <img
        srcSet={`${image.image}?height=534&width=1000&format=webp`}
        width="1000"
        height="534"
      />
    </picture>
  ))

  if (project.videoLink) {
    const pattern =
      /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|v\/|watch\?v=)|youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^\s&?/]+)/
    const match = project.videoLink.match(pattern)

    if (match && match[1]) {
      carousel.push(
        <YouTube key={match[1]} videoId={match[1]} className="h-full" />
      )
    }
  }

  return (
    // <Collapse isOpened={true}>
    // onMouseOver={() => setIsHovering(true)}
    // onMouseOut={() => setIsHovering(false)}
    <>
      <div className="h-[calc(100vh-3*theme('spacing.cust')/1.5)] md:h-[calc(100vh-3*theme('spacing.cust'))] flex flex-col lg:grid lg:grid-cols-[70%,30%]">
        <div className="lg:h-full p-padd md:pl-padd md:pt-0 md:pr-0">
          <Carousel
            dynamicHeight={false}
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            renderArrowNext={(onClickHandler, hasNext, label) =>
              hasNext && (
                <input
                  onClick={onClickHandler}
                  className="absolute top-2/4 right-0 w-6 lg:w-8 z-10 mr-2 cursor-finger drop-shadow-md"
                  type="image"
                  alt={label}
                  src="/arrow-right.png"
                />
              )
            }
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
              hasPrev && (
                <input
                  onClick={onClickHandler}
                  className="absolute top-2/4 left-0n w-6 lg:w-8 z-10 ml-2 cursor-finger"
                  type="image"
                  alt={label}
                  src="/arrow-left.png"
                />
              )
            }
          >
            {carousel}
          </Carousel>
        </div>
        <div className="h-3/6">
        <p className="p-padd pb-0 lg:py-0 whitespace-pre-wrap overflow-y-scroll text-base md:text-lg">
          {project.description}
        </p>
        <ul className="px-padd pt-padd text-base md:text-xl">
          {project.links && project.links.map((link) => (
            <li key={link.link}>
              {link.text}:{' '}
              <a href={link.link} className="text-design">
                {link.linkText ? link.linkText : link.link}
              </a>
            </li>
          ))}
        </ul>
        </div>
      </div>
      {/* </Collapse> */}
    </>
  )
}

export const Project = qwikify$(RProject, { eagerness: 'load' })
