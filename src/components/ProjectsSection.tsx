import { CSSProperties } from 'react'
import { ProjectsSectionProps } from '@/types'
import SectionWrapper from './SectionWrapper'
import ProjectCard from './ProjectCard'

const DEFAULT_PROJECTS = [
  { title: 'Portfolio Website', description: 'This site — a modular React + TypeScript component system with a refined retro-futuristic aesthetic. Built as a reusable framework.', tags: ['React', 'TypeScript', 'CSS'], liveHref: '#', repoHref: '#' },
  { title: 'Project Two', description: `Describe your project. What problem does it solve? Who is it for? What's the interesting technical challenge?`, tags: ['React', 'Node.js', 'API'], liveHref: '#', repoHref: '#' },
  { title: 'Project Three', description: `A tool, a visualization, an experiment. What's the interesting part? What did you learn building it?`, tags: ['TypeScript', 'Canvas', 'CSS'], repoHref: '#' },
  { title: 'Project Four', description: `Keep shipping. Describe what you built, what you chose, and what you'd do differently with what you know now.`, tags: ['React', 'Tailwind', 'Firebase'], liveHref: '#', repoHref: '#' },
]

export default function ProjectsSection({ projects = DEFAULT_PROJECTS }: ProjectsSectionProps) {
  return (
    <SectionWrapper
      id="projects"
      label="03 / Projects"
      heading="Things I've Built"
      subheading="A selection of projects — from explorations to real tools."
    >
      <div style={s.grid}>
        {projects.map((project, i) => (
          <ProjectCard key={i} index={i + 1} {...project} />
        ))}
      </div>
    </SectionWrapper>
  )
}

const s: Record<string, CSSProperties> = {
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' },
}