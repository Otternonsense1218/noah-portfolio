import { CSSProperties } from 'react'
import { ProjectsSectionProps } from '@/types'
import SectionWrapper from './SectionWrapper'
import ProjectCard from './ProjectCard'

const DEFAULT_PROJECTS = [
  { title: 'Portfolio Website', description: 'This site — a modular React + TypeScript component system with a refined retro-futuristic aesthetic. Built as a reusable framework.', tags: ['React', 'TypeScript', 'CSS'], liveHref: 'https://otternonsense1218.github.io/noah-portfolio/', repoHref: 'https://github.com/Otternonsense1218/noah-portfolio' },
  { title: 'Ticketing system with Asset Management', description: `AssetDesk is an on-premise web application for managing IT support tickets, tracking hardware assets, and automating routine helpdesk workflows. It integrates directly with Active Directory for authentication and runs entirely within the hospital network — no cloud dependency.`, tags: ['React/TS', 'SQLite', 'PowerShell'], repoHref: 'https://github.com/Otternonsense1218/assetDesk' },
  { title: 'MedicPal', description: `MedicPal is a streamlined, user-friendly application designed to assist paramedics and medical professionals during high-stress, task-saturated situations. Engineered with simplicity in mind, it ensures ease of use even under the most intense circumstances, offering a vital reference tool and event tracker for better decision-making and accurate documentation.`, tags: ['HTML', 'JS', 'CSS'], liveHref: 'https://otternonsense1218.github.io/MedicPal_1.0.0-alpha/',repoHref: 'https://github.com/Otternonsense1218/MedicPal_1.0.0-alpha' },
  { title: 'Contributions', description: `Contributions to react-ts-ui-lib on GitHub. A collection of open-source React and TypeScript components.`, tags: ['React', 'TypeScript', 'Open Source'], repoHref: 'https://github.com/Karel-cz/react-ts-ui-lib' },
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