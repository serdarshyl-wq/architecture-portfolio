import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Intro.css'

function Intro({ onAnimationEnd, logoRef }) {
  const introRef = useRef(null)
  const image1Ref = useRef(null)
  const image2Ref = useRef(null)

  useEffect(() => {
    if (!logoRef?.current) return

    gsap.set(logoRef.current, { color: '#ffffff' })

    const ctx = gsap.context(() => {
      const letters = logoRef.current.querySelectorAll('.logo-letter')
      const wrappers = logoRef.current.querySelectorAll('.logo-letter-wrapper')

      letters.forEach((letter, i) => {
        if (i < 2) {
          gsap.set(letter, { x: '-110%' })
        } else if (i === 2) {
          gsap.set(letter, { x: '0%' })
        } else {
          gsap.set(letter, { x: '110%' })
        }
      })

      wrappers.forEach((wrapper, i) => {
        if (i !== 2) {
          gsap.set(wrapper, { width: 0 })
        }
      })

      const tl = gsap.timeline({
        delay: 0.5,
      })

      tl.to([wrappers[1], wrappers[3]], {
        width: 'auto',
        duration: 0.4,
        ease: 'power2.out'
      })
        .to([letters[1], letters[3]], {
          x: '0%',
          duration: 0.4,
          ease: 'power2.out'
        }, '<')

        .to([wrappers[0], wrappers[4]], {
          width: 'auto',
          duration: 0.4,
          ease: 'power2.out'
        }, '+=0.1')
        .to([letters[0], letters[4]], {
          x: '0%',
          duration: 0.4,
          ease: 'power2.out'
        }, '<')

        .to(wrappers[5], {
          width: 'auto',
          duration: 0.4,
          ease: 'power2.out'
        }, '+=0.1')
        .to(letters[5], {
          x: '0%',
          duration: 0.4,
          ease: 'power2.out'
        }, '<')

      const zoomStart = 0.8
      tl.to(image1Ref.current, {
        scale: 3,
        y: '40%',
        duration: 3,
        ease: 'power1.inOut'
      }, zoomStart)
        .to(image2Ref.current, {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: 'power1.inOut'
        }, zoomStart + 0.5)

        .call(() => { if (onAnimationEnd) onAnimationEnd() }, null, '-=0.5')

        .to(image1Ref.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power1.inOut'
        }, '-=0.3')

    })

    const logoTween = gsap.to(logoRef.current, {
      color: '#ffffff3b',
      duration: 1.5,
      delay: 2,
      ease: 'power1.inOut'
    })

    return () => {
      ctx.revert()
    }
  }, [onAnimationEnd, logoRef])

  return (
    <div ref={introRef} className="intro">
      <img
        ref={image1Ref}
        src="/erasmus-proje/intro1.webp"
        alt=""
        className="intro-image"
      />
      <img
        ref={image2Ref}
        src="/erasmus-proje/intro2.webp"
        alt=""
        className="intro-image-2"
      />
    </div>
  )
}

export default Intro
