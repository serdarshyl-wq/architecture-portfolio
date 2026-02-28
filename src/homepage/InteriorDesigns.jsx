import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './InteriorDesigns.css'

gsap.registerPlugin(ScrollTrigger)

const IMAGES = [
  '/erasmus-proje/interior1.webp',
  '/erasmus-proje/interior2.webp',
  '/erasmus-proje/interior3.webp',
]

const WORDS = ['Design', 'For', 'Tomorrow']

function InteriorDesigns() {
  const sectionRef = useRef(null)
  const wrapperRef = useRef(null)
  const counterRef = useRef(null)
  const sloganRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const slides = gsap.utils.toArray('.interior-slide')
      const counterNumbers = gsap.utils.toArray('.interior-counter-number')
      const sloganWords = gsap.utils.toArray('.interior-slogan-word')

      counterNumbers.forEach((num, i) => {
        gsap.set(num, { y: i === 0 ? '0%' : '100%' })
      })
      const tl = gsap.timeline()

      // Phase 1: Zoom in (progress 0 → 1)
      tl.to(wrapperRef.current, {
        scale: 1 / 0.6,
        borderRadius: '0rem',
        duration: 1,
        ease: 'none'
      })
      tl.to(counterRef.current, { opacity: 1, duration: 0.3, ease: 'none' })
      tl.to(sloganRef.current, { opacity: 1, duration: 0.3, ease: 'none' }, '<')
      tl.to(sloganWords[0], { y: '0%', duration: 0.3, ease: 'none' }, '<')

      // Phase 2: Slide 1 → 2 (with counter + slogan)
      tl.to(slides[1], { y: '0%', duration: 1, ease: 'power2.inOut' })
      tl.to(counterNumbers[0], { y: '-100%', duration: 0.5, ease: 'power3.inOut' }, '<')
      tl.to(counterNumbers[1], { y: '0%', duration: 0.5, ease: 'power3.inOut' }, '<')
      tl.to(sloganWords[1], { y: '0%', duration: 0.5, ease: 'power3.inOut' }, '<')

      // Phase 3: Slide 2 → 3 (with counter + slogan)
      tl.to(slides[2], { y: '0%', duration: 1, ease: 'power2.inOut' })
      tl.to(counterNumbers[1], { y: '-100%', duration: 0.5, ease: 'power3.inOut' }, '<')
      tl.to(counterNumbers[2], { y: '0%', duration: 0.5, ease: 'power3.inOut' }, '<')
      tl.to(sloganWords[2], { y: '0%', duration: 0.5, ease: 'power3.inOut' }, '<')

      // ScrollTrigger — pin + scrub the whole timeline
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=350%',
        scrub: 0.8,
        pin: true,
        anticipatePin: 1,
        animation: tl,
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="interior-section relative h-screen bg-white flex flex-col items-center justify-center">
      <h1 className="interior-title font-[Syne] font-extrabold uppercase leading-tight absolute top-0 left-0 z-10 text-[#1A1A1B] p-8" style={{ fontSize: 'clamp(3rem, 5vw, 5rem)' }}>
        Interior<br />Designs
      </h1>
      <div ref={wrapperRef} className="interior-image-wrapper w-[60%] h-[60vh] rounded-3xl overflow-hidden relative will-change-transform" style={{ transform: 'translateZ(0)' }}>
        {IMAGES.map((src, i) => (
          <div
            key={i}
            className="interior-slide absolute inset-0 will-change-transform"
            style={i > 0 ? { transform: 'translateY(100%)' } : {}}
          >
            <img src={src} alt={`Interior Design ${i + 1}`} className="interior-image w-full h-full object-cover block" />
          </div>
        ))}

        <div ref={counterRef} className="interior-counter absolute bottom-0 right-8 z-20 flex items-end justify-end opacity-0">
          <div className="interior-counter-inner overflow-hidden relative" style={{ height: '20vh', width: '0.6em', fontSize: 'clamp(10rem, 20vh, 15rem)' }}>
            {IMAGES.map((_, i) => (
              <div
                key={i}
                className="interior-counter-number absolute top-0 right-0 font-[Space_Grotesk] font-bold text-white/50 text-right will-change-transform"
                style={{ fontSize: 'inherit', lineHeight: '20vh', height: '20vh' }}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        <div ref={sloganRef} className="interior-slogan absolute right-12 top-1/2 -translate-y-1/2 z-20 flex flex-col items-end opacity-0">
          {WORDS.map((word, i) => (
            <div key={i} className="overflow-hidden">
              <div
                className="interior-slogan-word font-[Syne] font-extrabold text-white uppercase will-change-transform"
                style={{ fontSize: 'clamp(3.5rem, 15vw, 4.5rem)', lineHeight: '1.15', transform: 'translateY(110%)' }}
              >
                {word}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default InteriorDesigns
