import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

function Contact() {
    const sectionRef = useRef(null)
    const titleRef = useRef(null)
    const brandRef = useRef(null)
    const socialsRef = useRef(null)
    const formRef = useRef(null)
    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                    end: 'top top',
                    scrub: 1,
                }
            })

            tl.from(titleRef.current, {
                y: -120, opacity: 0, duration: 1, ease: 'none'
            }, 0)
                .from(brandRef.current, {
                    x: -150, opacity: 0, duration: 1, ease: 'none'
                }, 0)
                .from(formRef.current, {
                    x: 150, opacity: 0, duration: 1, ease: 'none'
                }, 0)
                .from(socialsRef.current, {
                    y: 80, opacity: 0, duration: 1, ease: 'none'
                }, 0)

        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={sectionRef} className="contact-section min-h-screen flex flex-col items-center justify-center px-16 py-24 relative font-[Syne] overflow-hidden">
            <div className="absolute inset-0 z-0" style={{ backgroundImage: 'url(/erasmus-proje/exterior-d4.webp)', backgroundSize: 'cover', backgroundPosition: 'center 90%', opacity: 0.5 }}></div>

            <span ref={titleRef} className="contact-title absolute top-20 uppercase font-black tracking-wide text-gray-900 z-10" style={{ left: '50%', transform: 'translateX(-50%)', fontSize: 'clamp(3rem, 7vw, 5rem)' }}>
                Contact
            </span>

            <div className="flex flex-col w-full max-w-[1200px] gap-12 z-10">
                <div className="flex w-full gap-16 items-start">
                    <div className="w-1/2 shrink-0 flex flex-col justify-center gap-12 overflow-visible">
                        <div ref={brandRef} className="contact-brand flex flex-col" style={{ marginLeft: '-20rem' }}>
                            <span className="contact-brand-name font-[Syne] font-black uppercase leading-none text-gray-900" style={{ fontSize: 'clamp(4.5rem, 8vw, 8rem)', letterSpacing: '-0.02em' }}>
                                Temnyy
                            </span>
                            <span className="contact-brand-sub font-[Syne] font-black uppercase text-gray-700" style={{ fontSize: 'clamp(2rem, 3vw, 4rem)', lineHeight: '1.1', letterSpacing: '0.05em' }}>
                                Architecture
                            </span>
                        </div>

                        <div ref={socialsRef} className="contact-socials-section flex flex-col gap-3 mt-8" style={{ marginLeft: '-20rem' }}>
                            <span className="font-[Syne] font-black uppercase tracking-wider text-gray-400 text-3xl">
                                Socials
                            </span>
                            <div className="flex gap-10 items-center">
                                <a href="#" className="contact-social-link social-instagram flex items-center justify-center text-gray-500 no-underline" aria-label="Instagram">
                                    <i className="fa-brands fa-instagram text-[3rem]"></i>
                                </a>
                                <a href="#" className="contact-social-link social-linkedin flex items-center justify-center text-gray-500 no-underline" aria-label="LinkedIn">
                                    <i className="fa-brands fa-linkedin-in text-[3rem]"></i>
                                </a>
                                <a href="#" className="contact-social-link social-x flex items-center justify-center text-gray-500 no-underline" aria-label="X">
                                    <i className="fa-brands fa-x-twitter text-[3rem]"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div ref={formRef} className="contact-right w-1/2 shrink-0 flex flex-col gap-8 pt-4">
                        <div className="relative">
                            <input type="text" placeholder="Name" className="contact-input w-full bg-transparent border-0 border-b border-gray-300 py-4 text-base text-gray-900 outline-none font-[Syne] placeholder:uppercase placeholder:tracking-widest placeholder:text-sm placeholder:text-gray-400 focus:border-gray-900 transition-colors" />
                        </div>
                        <div className="relative">
                            <input type="email" placeholder="Email" className="contact-input w-full bg-transparent border-0 border-b border-gray-300 py-4 text-base text-gray-900 outline-none font-[Syne] placeholder:uppercase placeholder:tracking-widest placeholder:text-sm placeholder:text-gray-400 focus:border-gray-900 transition-colors" />
                        </div>
                        <div className="relative">
                            <textarea placeholder="Message" className="contact-input w-full bg-transparent border-0 border-b border-gray-300 py-4 text-base text-gray-900 outline-none font-[Syne] resize-none min-h-[120px] placeholder:uppercase placeholder:tracking-widest placeholder:text-sm placeholder:text-gray-400 focus:border-gray-900 transition-colors"></textarea>
                        </div>
                        <button className="contact-submit self-start px-10 py-3.5 text-sm font-semibold uppercase tracking-wider bg-gray-900 text-white border-none cursor-pointer transition-all hover:bg-gray-700 hover:-translate-y-0.5 mt-2 font-[Syne] rounded-lg">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact
