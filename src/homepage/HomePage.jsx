import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './HomePage.css'
import ExteriorDesigns from './ExteriorDesigns'
import InteriorDesigns from './InteriorDesigns'
import Contact from './Contact'

function HomePage({ introDone }) {
  const headingRef = useRef(null)
  const buttonRef = useRef(null)
  const arrowRef = useRef(null)

  useEffect(() => {
    if (introDone) {
      gsap.to(headingRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out'
      })
      gsap.to(buttonRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        delay: 0.3,
        ease: 'power2.out'
      })
      gsap.to(arrowRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        delay: 0.6,
        ease: 'power2.out',
        onComplete: () => {
          document.body.classList.remove('scroll-locked')
          if (window.__lenis) window.__lenis.start()
          gsap.to(arrowRef.current, {
            y: 10,
            duration: 0.6,
            ease: 'power1.inOut',
            yoyo: true,
            repeat: -1
          })
        }
      })
    }
  }, [introDone])

  return (
    <div className="homepage">
      <div className="h-screen w-full relative overflow-hidden">
        <img
          src="/erasmus-proje/intro2.webp"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="homepage-content">
          <h1 ref={headingRef} className="homepage-heading">
            live your <br /> dream home
          </h1>
          <button
            ref={buttonRef}
            className="homepage-explore-btn"
            onClick={() => {
              const target = document.getElementById('exterior-designs')
              if (target && window.__lenis) {
                window.__lenis.scrollTo(target, { duration: 2 })
              }
            }}
          >
            Explore
          </button>
          <div ref={arrowRef} className="homepage-arrow">
            <i className="fa-solid fa-chevron-down"></i>
          </div>
        </div>
      </div>
      <ExteriorDesigns />
      <InteriorDesigns />
      <Contact />
    </div>
  )
}

export default HomePage
