import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useReducedMotion from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/ctrl-shift-ali' },
  { label: 'Instagram', href: 'https://instagram.com/aliii_abeer' },
  { label: 'E-mail/G-mail', href: 'mailto:maliabeerkhan1127@gmail.com' },
];

export default function ContactFooter() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-reveal',
        { opacity: 0, y: reducedMotion ? 0 : 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex min-h-[40vh] flex-col justify-between overflow-hidden border-t border-line bg-obsidian px-6 py-20 md:px-14"
    >
      {/* Background Graphic Layer */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(199,255,62,0.06),transparent_60%)]" />
      <a
        href="mailto:maliabeerkhan1127@gmail.com"
        className="contact-reveal group relative z-10 mx-auto block w-fit text-center"
      >
        <span className="font-display text-[clamp(11vw,15vw,13vw)] leading-[1.05] tracking-tightest text-bone transition-colors duration-500 group-hover:text-cyber-lime">
          LET&apos;S&nbsp;&nbsp;WORK
          <br />
          TOGETHER
        </span>
        <span className="mt-6 block h-[2px] w-full origin-left scale-x-0 bg-cyber-lime transition-transform duration-700 ease-cinematic group-hover:scale-x-100" />
      </a>

      {/* Footer Links Section: Added z-10 */}
      <div className="contact-reveal relative z-10 mt-20 flex flex-col items-center justify-between gap-8 border-t border-line pt-8 font-mono-label text-[10px] text-bone-dim md:flex-row">
        <span>© Muhammad-Ali-Abeer-Khan</span>

        <div className="flex flex-wrap items-center justify-center gap-6">
          {SOCIALS.map((social) => {
            const isMail = social.href.startsWith('mailto:');
            return (
              <a
                key={social.label}
                href={social.href}
                target={isMail ? undefined : '_blank'}
                rel={isMail ? undefined : 'noreferrer'}
                className="transition-colors duration-300 hover:text-cyber-cyan"
              >
                {social.label}
              </a>
            );
          })}
        </div>

        <span>Karachi · Remote Worldwide</span>
      </div>
    </section>
  );
}
