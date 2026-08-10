import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useReducedMotion from '../hooks/useReducedMotion';
import profilePic from './pfp_me.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const subRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-line',
        { yPercent: 120, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: reducedMotion ? 0.4 : 1.4,
          ease: 'power4.out',
          stagger: 0.12,
          delay: 0.2,
        }
      );

      gsap.fromTo(
        subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.9 }
      );

      if (!reducedMotion) {
        gsap.to('.hero-copy', {
          yPercent: -30,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '65% top',
            scrub: 0.6,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100svh] w-full overflow-hidden bg-obsidian pb-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_45%,rgba(92,244,232,0.10),transparent_55%)]" />

      <div className="relative z-10 mx-auto grid mt-10 max-w-[1600px] grid-cols-1 items-center gap-6 px-4 pt-16 sm:px-6 md:mt-[4.5rem] md:grid-cols-2 md:gap-8 md:px-14 md:pt-0">
        
        <div className="hero-copy order-2 md:order-1">
          <h1
            ref={headlineRef}
            className="top-5 -mt-4 font-display font-medium text-[12vw] leading-[1.1] tracking-tightest text-bone uppercase xs:text-[16vw] md:text-[8vw] lg:text-[7vw] xl:text-[6.5vw]"
          >
            <span className="block overflow-hidden">
              <span className="hero-line block">MUHAMMAD</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block text-outline">ALI ABEER</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block">KHAN</span>
            </span>
          </h1>

          <p
            ref={subRef}
            className="mt-4 max-w-sm font-mono text-[11px] leading-relaxed text-bone-dim xs:text-xs"
          >
            Diving into the world of web development, AI, Machine and Deep Learning. I craft innovative solutions that blend creativity with technology. My journey is fueled by a passion for learning and a commitment to excellence in every project I undertake.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 xs:gap-6">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2.5 border border-line px-4 py-2 font-mono-label text-[15px] text-bone transition-colors duration-300 hover:border-cyber-lime hover:text-cyber-lime xs:px-5 xs:py-2.5 xs:text-xs"
            >
              View Work
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
            <span className="font-mono text-[12px] text-bone-dim xs:text-xs">
              Scroll to explore ↓
            </span>
          </div>
        </div>

        <div className="relative order-1 w-full max-w-[28rem] justify-self-center overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#060606] transition-shadow duration-500 hover:shadow-[0_30px_140px_rgba(92,244,232,0.14)] xs:max-w-[30rem] xs:rounded-[2rem] md:order-2 md:max-w-[32rem]">
          <div className="absolute inset-0 border-[1px] border-white/10" />
          <div className="relative flex items-center justify-center p-3 xs:p-4 md:p-6">
              <div className="group relative w-full overflow-hidden rounded-[1.25rem] border border-cyber-lime/30 bg-transparent shadow-[0_30px_80px_rgba(92,244,232,0.18)] transition-transform duration-500 hover:-translate-y-1 xs:rounded-[2rem] flex flex-col h-[70vh] md:h-[87vh]">
                <div className="overflow-hidden h-[100%]">
                    <img
                      src={profilePic}
                      alt="Muhammad Ali Abeer Khan"
                      className="w-full h-full object-cover object-[75%_15%]"
                    />
                  </div>
                  <div className="border-t border-line/70 bg-[#090909]/90 px-4 py-3 xs:px-5 xs:py-4">
                <p className="text-[10px] uppercase tracking-[0.1em] text-bone-dim font-mono-label xs:text-xs">
                  Muhammad Ali Abeer Khan
                </p>
                <h2 className="mt-1 text-base font-semibold tracking-tight text-bone sm:text-xl md:mt-2">
                  Full-Stack Developer & AI Enthusiast
                </h2>
                <p className="mt-1 text-[11px] leading-relaxed text-bone-dim xs:mt-2 xs:text-xs">
                  Passionate about creating innovative web solutions and exploring the frontiers of artificial intelligence, Data Handling and Analysis, Automation and Machine Learning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden border-t border-line py-3">
        <div className="animate-marquee flex w-max gap-10 whitespace-nowrap font-mono-label text-[10px] text-bone-dim">
          {Array.from({ length: 2}).map((_, i) => (
            <span key={i} className="flex gap-10">
              <span>AI</span>
              <span>·</span>
              <span>MACHINE LEARNING</span>
              <span>·</span>
              <span>SOFTWARE DEVELOPMENT</span>
              <span>·</span>
              <span>BACK-END UNDERSTANDING</span>
              <span>·</span>
              <span>PROGRAMMING</span>
              <span>·</span>
              <span>PROJECT MANAGEMENT</span>
              <span>.</span>
              <span>2026</span>
              <span>·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
