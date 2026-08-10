import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useReducedMotion from '../hooks/useReducedMotion';

const BASE_URL = import.meta.env.BASE_URL;

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: '01',
    title: 'CUSTOM COMMAND LINE INTERFACE / TERMINAL',
    category: ' CLI + Terminal',
    year: '2026',
    span: 'md:col-span-6',
    height: 'md:h-[400px]',
    image: 'https://images.unsplash.com/photo-1650600538903-ec09f670c391?q=80&w=771&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    href: 'https://github.com/ctrl-shift-ali/BashByAbeer'
  },
  {
    id: '02',
    title: 'LIBRARY MANAGEMENT SYSTEM',
    category: 'Python Based',
    year: '2026',
    span: 'md:col-span-6',
    height: 'md:h-[400px]',
    image: 'https://images.unsplash.com/photo-1568667256531-7d5ac92eaa7a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8TGlicmFyeSUyME1hbmFnZW1lbnQlMjBTeXN0ZW18ZW58MHx8MHx8fDA%3D',
    href: 'https://github.com/ctrl-shift-ali/Library-Management-System'
  },
  {
    id: '03',
    title: 'E-COMMERCE CART MANAGEMENT SYSTEM',
    category: 'Product Interface - Python Based',
    year: '2026',
    span: 'md:col-span-5',
    height: 'md:h-[500px]',
    image: 'https://plus.unsplash.com/premium_photo-1675660733755-c224251a058b?q=80&w=327&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    href: 'https://github.com/ctrl-shift-ali/E-Commerce-Cart-Management-System'
  },
  {
    id: '04',
    title: 'CINEMA TICKET BOOKING SYSTEM',
    category: 'Interactive Website',
    year: '2026',
    span: 'md:col-span-7',
    height: 'md:h-[540px]',
    image: 'https://plus.unsplash.com/premium_photo-1710961232986-36cead00da3c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2luZW1hfGVufDB8fDB8fHww',
    href: 'https://cinema-ticket-managing-system.vercel.app'
  },
  {
    id: '05',
    title: 'BANK MANAGEMENT SYSTEM',
    category: 'Python Based',
    year: '2026',
    span: 'md:col-span-7',
    height: 'md:h-[520px]',
    image : 'https://images.unsplash.com/photo-1633265486064-086b219458ec?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    href: 'https://github.com/ctrl-shift-ali/Bank-Management-System'
  },
  
];

const SKILLS = [
  {
    label: 'Python',
    iconUrl: `${BASE_URL}assets/python.png`,
  },
  {
    label: 'HTML-5',
    iconUrl: `${BASE_URL}assets/html.png`,
  },
  {
    label: 'CSS-3',
    iconUrl: `${BASE_URL}assets/css.png`,
  },
  {
    label: 'C & C++ Programming',
    iconUrl: `${BASE_URL}assets/c++.jpeg`,
  },
  {
    label: 'React',
    iconUrl: `${BASE_URL}assets/react.jpeg`,
  },
  {
    label: 'JavaScript (ES6+)',
    iconUrl: `${BASE_URL}assets/JavaScript.png`,
  },
  {
    label: 'Tailwind CSS',
    iconUrl: `${BASE_URL}assets/Tailwind.webp`,
  },
  {
    label: 'Git & GitHub',
    iconUrl: `${BASE_URL}assets/Github.jpeg`,
  },
  {
    label: 'Responsive Design',
    iconUrl: `${BASE_URL}assets/responsive.jpeg`,
  },
  {
    label: 'UI/UX Principles',
    iconUrl: `${BASE_URL}assets/ui-ux.jpeg`,
  },
  {
    label: 'Web Performance',
    iconUrl: `${BASE_URL}assets/web.jpeg`,
  },
  {
    label: 'Problem Solving',
    iconUrl: `${BASE_URL}assets/problemSolving.png`,
  },
  {
    label: 'CLI Development',
    iconUrl: `${BASE_URL}assets/cli.jpeg`,
  },
  {
    label: 'Terminal Applications',
    iconUrl: `${BASE_URL}assets/terminal.jpg`,
  },
  {
    label: 'Database Management',
    iconUrl: `${BASE_URL}assets/dbms.jpg`,
  },
  {
    label: 'Machine Learning',
    iconUrl: `${BASE_URL}assets/machineLearning.jpg`,
  },
  {
    label: 'Data Analysis',
    iconUrl: `${BASE_URL}assets/dataAnalysis.jpg`,
  },
  {
    label: 'Object-Oriented Programming',
    iconUrl: `${BASE_URL}assets/oop.png`,
  },
  {
    label: 'My SQL',
    iconUrl: `${BASE_URL}assets/sql.png`,
  },
  {
    label: 'Ascii Art Designing',
    iconUrl: `${BASE_URL}assets/ascii.jpeg`,
  },
];

function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const handleMove = (e) => {
    if (reducedMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(cardRef.current, {
      rotateX: py * -6,
      rotateY: px * 8,
      scale: 1.015,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 900,
    });
  };

  const handleLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.7,
      ease: 'power3.out',
    });
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`project-card group relative flex flex-col justify-end overflow-hidden rounded-2xl border border-line bg-obsidian-100 p-7 ${project.span} ${project.height} h-[340px] transition-colors duration-500 hover:border-cyber-cyan/50`}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      {/* Ambient gradient wash, brightens on hover */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(92,244,232,0.08),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <span className="absolute right-7 top-7 font-mono text-xs text-bone-dim">
        {project.id}
      </span>
      {project.image && (
        <img
          src={project.image}
          alt={project.title}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30 transition-transform duration-500 group-hover:opacity-50"
        />
      )}
      <div className="relative z-10">
        <p className="font-mono-label mb-3 text-[12px] text-cyber-cyan/80">
          {project.category} — {project.year}
        </p>
        <h3 className="font-display text-3xl text-bone md:text-4xl transition-all duration-300 group-hover:text-white group-hover:[text-shadow:0_0_8px_rgba(92,244,232,0.6),0_0_20px_rgba(92,244,232,0.3)]">
  {project.title}
        </h3>
      </div>

      <div className="relative z-10 mt-5 flex items-center gap-2 font-mono-label text-[10px] text-bone-dim opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-hover:text-cyber-lime">
      <a
        href = {project.href}
        target = "_blank"
        rel = "noopener noreferrer"
        className = "hover: underline cursor-pointer"
      >
        View Project <span>→</span>
      </a> 
      </div>
    </article>
  );
}

export default function ProjectsGrid() {
  const sectionRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: reducedMotion ? 0 : 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
            },
            delay: (i % 2) * 0.08,
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <>
      <section
        ref={sectionRef}
        id="projects"
        className="relative mx-auto max-w-[1600px] px-6 pt-28 pb-10 md:px-14 md:pt-40 md:pb-24"
      >
        <div className="mb-16 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono-label mb-4 text-xs text-cyber-cyan/80">My Workings...</p>
            <h2 className="font-display text-display-lg text-bone">
              Recent Projects<span className="text-cyber-lime">.</span>
            </h2>
          </div>
          <p className="max-w-xs font-mono text-xs leading-relaxed text-bone-dim">
            A selection of my most recent work, showcasing a range of projects that highlight my skills and expertise in various areas of design and development.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section
        id="skills"
        className="relative mx-auto max-w-[1600px] px-6 pt-28 pb-10 md:px-14 md:pt-20 md:pb-10"
      >
        <div className="rounded-[2rem] border border-line bg-obsidian-100/70 p-8 backdrop-blur-xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono-label mb-4 text-xs text-cyber-cyan/80 width-max-content">Skills</p>
              <h3 className="font-display text-display-lg text-bone">
                My Skills<span className="text-cyber-lime">.</span>
              </h3>
            </div>
            <p className="max-w-xl font-mono text-xs leading-relaxed text-bone-dim">
              A summary of the technologies, languages, and tools I rely on to build polished, modern web experiences.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 pt-6">
            {SKILLS.map((skill) => (
              <div
                key={skill.label}
                className="rounded-2xl border border-cyber-cyan/10 bg-[#0a1018] px-5 py-4 text-sm font-medium text-bone transition hover:border-cyber-cyan/40 hover:bg-[#0e1622]"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={skill.iconUrl}
                    alt={`${skill.label} logo`}
                    className="h-10 w-10 object-contain"
                    loading="lazy"
                  />
                  <span>{skill.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
