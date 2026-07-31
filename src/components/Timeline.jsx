import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useReducedMotion from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
   {
    phase: 'Office Automation',
    period: '2020 — 2024',
    detail:
      'I began my journey in office automation by mastering various software tools like Excel, Word, Powerpoint, Access and Outlook, to streamline tasks and improve productivity.',
  },
   {
    phase: 'Web Designing',
    period: '2020 — 2022',
    detail:
      'Spent this time in learning the fundamentals of web design, front-end development, and user experience from different academies and online platforms.',
  },
  {
    phase: 'C and C++ Programming',
    period: '2021 — 2023',
    detail:
      'Moved into C and C++ programming, focusing on system-level development and performance optimization.',
  },
  {
    phase: 'Python Development',
    period: '2025 — Present',
    detail:
      'Currently working on Python development, building applications and scripts to automate tasks, enhance productivity and diving deep into the world of data science and machine learning.',
  },
  {
    phase: 'CLI and Terminal Basics',
    period: '2026 — present',
    detail:
      'As of my personal interest, I have been exploring the command line interface (CLI) and terminal basics, learning how to navigate and manipulate files and directories efficiently.',
  }
];

export default function Timeline() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Progress line fills as the section scrolls through view
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: 'top',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'bottom 80%',
              scrub: 0.5,
            },
          }
        );
      }

      gsap.utils.toArray('.timeline-row').forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: reducedMotion ? 0 : 40, scale: reducedMotion ? 1 : 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
              start: 'top 82%',
            },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative mx-auto max-w-[1200px] px-6 py-28 md:px-14 md:py-40"
    >
      <p className="font-mono-label mb-4 text-xs text-cyber-cyan/80">Trajectory</p>
      <h2 className="mb-20 font-display text-display-lg text-bone">
        How I got<span className="text-cyber-lime">.</span> here
      </h2>

      <div className="relative pl-10 md:pl-16">
        {/* Track + animated progress fill */}
        <div className="absolute left-0 top-0 h-full w-px bg-line md:left-0" />
        <div
          ref={lineRef}
          className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-cyber-cyan to-cyber-lime md:left-0"
        />

        <div className="flex flex-col gap-16 md:gap-24">
          {STAGES.map((stage) => (
            <div key={stage.phase} className="timeline-row relative">
              <span className="absolute -left-[42px] top-1 h-2.5 w-2.5 rounded-full bg-cyber-cyan md:-left-[66px]" />
              <p className="font-mono-label mb-2 text-[10px] text-bone-dim">
                {stage.period}
              </p>
              <h3 className="font-display text-2xl text-bone md:text-3xl">
                {stage.phase}
              </h3>
              <p className="mt-3 max-w-lg font-mono text-sm leading-relaxed text-bone-dim">
                {stage.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
