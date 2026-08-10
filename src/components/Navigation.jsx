import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import useReducedMotion from '../hooks/useReducedMotion';

const LINKS = [
  { label: 'Work', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
];
function MagneticLink({ href, label }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;

    const strength = 0.4;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: 'power3.out',
      });
    };

    const handleLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [reducedMotion]);

  return (
    <a
      ref={ref}
      href={href}
      className="magnetic-btn font-mono-label text-xs text-bone-dim transition-colors duration-300 hover:text-cyber-lime focus-visible:text-cyber-lime focus-visible:outline-none"
    >
      {label}
    </a>
  );
}

export default function Navigation() {
  return (
    // Navigation responsive notes:
    // - Mobile: outer header uses `px-3` and brand `text-sm` for compact layout
    // - md (tablet): `md:px-18` and `md:text-lg` restore larger spacing
    // - Adjust `gap-6` / `gap-10` and CTA `px-3`/`px-4` to control wrapping on narrow widths
    <header className="fixed inset-x-0 top-0 z-50 px-3 md:px-18 md:pt-0">
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between pb-[10px] rounded-full border border-line/80 bg-obsidian/60 px-3 pt-3 pb-2 md:px-6 md:pt-4 md:pb-2 backdrop-blur-md">
        <a href="#hero" className="font-display text-sm md:text-lg tracking-tight text-bone leading-tight">
          {/* Brand sizing: change `text-sm` (mobile) and `md:text-lg` (tablet/desktop) here. */}
          M<span className="text-cyber-cyan">-</span>ALI ABEER KHAN <span className="text-cyber-cyan">.</span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {/* Nav links spacing: `gap-6` on mobile, `md:flex` shows links on md+.
              Increase gap for wider screens or reduce to prevent overlap on tablets. */}
          {LINKS.map((link) => (
            <MagneticLink key={link.href} {...link} />
          ))}
        </div>

        <a
          href="#contact"
          className="hidden font-mono-label text-xs text-bone md:inline-flex items-center gap-2 border border-line px-3 py-2 rounded-full transition-colors duration-300 hover:border-cyber-cyan hover:text-cyber-cyan"
        >
          {/* CTA button padding: `px-3` for compact mobile, change to `px-4` for more breathing room on tablets. */}
          Let&apos;s Talk
        </a>
        
        <a href="#contact" className="font-mono-label text-xs text-bone md:hidden">
          Menu
        </a>
      </nav>
    </header>
  );
}
