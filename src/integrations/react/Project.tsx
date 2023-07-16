/** @jsxImportSource react */

import { qwikify$ } from '@builder.io/qwik-react'
// import { Collapse } from 'react-collapse'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import YouTube from 'react-youtube'
import type { IProject } from '~/routes'

export interface ProjectProps {
  project: IProject
}

const sizes = [["178", "333"], ["267", "500"], ["534", "1000"], ["1068", "2000"]]

const RProject = ({ project }: { project: IProject }) => {
  const carousel = project.image.map((image) => (
    // <img src={image.image} key={image.image} width="2000" height="1068" />
		
    <picture>
      <source srcSet={`${sizes.reduce((acc, [height, width]) => acc + `${image.image}?height=${height}&width=${width}&format=webp ${width}w, `, "")}`} type="image/webp" />
      <img
        srcSet={`${image.image}?height=267&width=500&format=webp`}
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

  const arrowStyles = {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    width: '2.5em',
    height: '100%',
    cursor: 'pointer',
    outline: 'none',
    paddingBottom: '2em',
  } as React.CSSProperties

  const arrowRight = {
    width: 0,
    height: 0,
    borderTop: '1em solid transparent',
    borderBottom: '1em solid transparent',
    borderLeft: '1em solid grey',
    cursor: 'pointer',
  }

  const arrowLeft = {
    width: 0,
    height: 0,
    borderTop: '1em solid transparent',
    borderBottom: '1em solid transparent',
    borderRight: '1em solid grey',
    cursor: 'pointer',
    paddingLeft: '1em',
  }

  return (
    // <Collapse isOpened={true}>
    <>
      <div className="h-[calc(100vh-3*theme('spacing.cust'))] grid grid-cols-[70%,30%]">
        <div className="h-full pl-padd">
          <Carousel
            dynamicHeight={false}
            showThumbs={false}
            showIndicators={false}
            showStatus={false}
            renderArrowNext={(onClickHandler, hasNext, label) =>
              hasNext && (
                <button
                  type="button"
                  onClick={onClickHandler}
                  title={label}
                  style={{ ...arrowStyles, right: 0 }}
                >
                  <div style={{ ...arrowRight }}></div>
                </button>
              )
            }
            renderArrowPrev={(onClickHandler, hasPrev, label) =>
              hasPrev && (
                <button
                  type="button"
                  onClick={onClickHandler}
                  title={label}
                  style={{ ...arrowStyles, left: 0 }}
                >
                  <div style={{ ...arrowLeft }}></div>
                </button>
              )
            }
          >
            {carousel}
          </Carousel>
        </div>
        <div className="px-padd whitespace-pre-wrap">{project.description}</div>
      </div>
      {/* </Collapse> */}
    </>
  )
}

export const Project = qwikify$(RProject, { eagerness: 'load' })
