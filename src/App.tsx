import React from 'react'
import NavBar             from '@components/NavBar'
import HeroSplash          from '@components/HeroSplash'
import AboutSection        from '@components/AboutSection'
import SkillsGrid          from '@components/SkillsGrid'
import ProjectsSection     from '@components/ProjectsSection'
import ExperienceTimeline  from '@components/ExperienceTimeline'
import ContactSection      from '@components/ContactSection'
import type {
  Project,
} from '@/types'

// ── Data ─────────────────────────────────────────────────────
// Edit all content here — no need to touch individual components.

const PROJECTS: Project[] = [
  {
    title:       'Portfolio Website',
    description: 'This site — a modular React + TypeScript component system with a refined retro-futuristic aesthetic. Built as a reusable framework for future builds.',
    tags:        ['React', 'TypeScript', 'Vite', 'CSS'],
    liveHref:    '#',
    repoHref:    '#',
  },
  {
    title:       'Project Two',
    description: 'Describe your project. What problem does it solve? Who is it for? What\'s the most interesting technical challenge you solved?',
    tags:        ['React', 'Node.js', 'PostgreSQL'],
    liveHref:    '#',
    repoHref:    '#',
  },
  {
    title:       'Project Three',
    description: 'A tool, a visualization, an experiment. What\'s the interesting technical part? What did you learn building it?',
    tags:        ['TypeScript', 'Canvas API', 'CSS'],
    repoHref:    '#',
  },
  {
    title:       'Project Four',
    description: 'Keep shipping. Describe what you built, your stack choices, and what you\'d do differently with what you know now.',
    tags:        ['React', 'Tailwind', 'Firebase'],
    liveHref:    '#',
    repoHref:    '#',
  },
]



// ── Global background styles ─────────────────────────────────
const bgStyles: Record<string, React.CSSProperties> = {
  wrap: {
    position:      'fixed',
    inset:         0,
    zIndex:        0,
    pointerEvents: 'none',
    overflow:      'hidden',
  },
  // Flat grid — no perspective so lines stay uniform top to bottom
  grid: {
    position:        'absolute',
    inset:           0,
    backgroundImage: 'linear-gradient(rgba(78,205,196,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(78,205,196,0.045) 1px, transparent 1px)',
    backgroundSize:  '60px 60px',
  },
  // Radial vignette so the grid fades toward edges, improving readability
  gridMask: {
    position:  'absolute',
    inset:     0,
    background:'radial-gradient(ellipse 120% 80% at 50% 0%, transparent 40%, var(--color-bg) 100%)',
  },
  glowTeal: {
    position:     'absolute',
    top:          '5%',
    left:         '15%',
    width:        '600px',
    height:       '600px',
    background:   'radial-gradient(circle, rgba(78,205,196,0.08) 0%, transparent 70%)',
    borderRadius: '50%',
  },
  glowAmber: {
    position:     'absolute',
    bottom:       '15%',
    right:        '5%',
    width:        '450px',
    height:       '450px',
    background:   'radial-gradient(circle, rgba(240,165,0,0.06) 0%, transparent 70%)',
    borderRadius: '50%',
  },
  scanLine: {
    position:   'fixed',
    left:       0,
    right:      0,
    height:     '1px',
    background: 'linear-gradient(90deg, transparent, rgba(78,205,196,0.2), transparent)',
    animation:  'scanMove 12s linear infinite',
    top:        0,
    zIndex:     0,
  },
}


// ── App ───────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      {/* ── Global background — fixed, full page ── */}
      <div aria-hidden="true" style={bgStyles.wrap}>
        <div style={bgStyles.grid} />
        <div style={bgStyles.gridMask} />
        <div style={bgStyles.glowTeal} />
        <div style={bgStyles.glowAmber} />
        <div style={bgStyles.scanLine} />
      </div>

      {/* Sticky navigation */}
      <NavBar
        name="ND"
        ctaLabel="Resume"
        ctaHref="/resume.pdf"
      />

      {/* Hero splash */}
      <HeroSplash />

      <main style={{ position: 'relative', zIndex: 1 }}>
        {/* About */}
        <AboutSection />

        {/* Skills */}
        <SkillsGrid />

        {/* Projects */}
        <ProjectsSection projects={PROJECTS} />

        {/* Experience */}
        <ExperienceTimeline />

        {/* Contact */}
        <ContactSection />
      </main>
    </>
  )
}