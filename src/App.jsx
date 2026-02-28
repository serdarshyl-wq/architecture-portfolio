import { useState, useRef, useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'
import Logo from './Logo'
import Intro from './Intro'
import HomePage from './homepage/HomePage'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [introDone, setIntroDone] = useState(false)
  const logoRef = useRef(null)
  const logoWrapperRef = useRef(null)
  const subtitleRef = useRef(null)
  const lenisRef = useRef(null)

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    ScrollTrigger.clearScrollMemory()
    ScrollTrigger.refresh()

    // Sayfa tamamen yüklendiğinde preloader'ı kaldır
    const removePreloader = () => {
      const preloader = document.getElementById('preloader')
      if (preloader) {
        preloader.style.opacity = '0'
        setTimeout(() => preloader.remove(), 500)
      }
    }

    if (document.readyState === 'complete') {
      removePreloader()
    } else {
      window.addEventListener('load', removePreloader)
      return () => window.removeEventListener('load', removePreloader)
    }
  }, [])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      autoRaf: false,
    })

    lenis.scrollTo(0, { immediate: true })
    lenis.stop()
    document.body.classList.add('scroll-locked')

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    lenisRef.current = lenis
    window.__lenis = lenis

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  useEffect(() => {
    if (!introDone || !logoWrapperRef.current) return

    gsap.to(subtitleRef.current, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power2.out'
    })

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '.homepage',
        start: 'top top',
        end: '100vh top',
        onLeave: () => gsap.to(logoWrapperRef.current, { opacity: 0, duration: 0.3 }),
        onEnterBack: () => gsap.to(logoWrapperRef.current, { opacity: 1, duration: 0.3 }),
      })
    })

    return () => ctx.revert()
  }, [introDone])

  return (
    <>
      {!introDone && (
        <Intro onAnimationEnd={() => setIntroDone(true)} logoRef={logoRef} />
      )}
      <div ref={logoWrapperRef} className="fixed bottom-8 left-8 z-60 logo-group">
        <Logo ref={logoRef} size="lg" />
        <h2 ref={subtitleRef} className="logo-subtitle">ARCHITECTURE</h2>
      </div>
      <HomePage introDone={introDone} />
    </>
  )
}

export default App
