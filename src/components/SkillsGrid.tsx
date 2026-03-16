import { useState, CSSProperties } from 'react'
import { SkillsGridProps, SkillCategory, Skill } from '@/types'
import SectionWrapper from './SectionWrapper'

const LEVEL_LABELS: Record<number, string> = {
  1: 'Learning', 2: 'Familiar', 3: 'Proficient', 4: 'Advanced', 5: 'Expert',
}

const DEFAULT_CATEGORIES: SkillCategory[] = [
  {
    name: 'Frontend', icon: '◈',
    skills: [
      { name: 'React',      level: 4 }, { name: 'JavaScript', level: 3 },
      { name: 'TypeScript', level: 4 }, { name: 'CSS / SCSS',  level: 5 },
      { name: 'Next.js',    level: 3 }, { name: 'Tailwind',    level: 3 },
    ],
  },
  {
    name: 'Backend', icon: '◇',
    skills: [
      { name: 'Node.js',    level: 2 }, { name: 'Express',     level: 1 },
      { name: 'REST APIs',  level: 2 }, { name: 'PostgreSQL',  level: 1 },
      { name: 'MongoDB',    level: 1 }, { name: 'GraphQL',     level: 1 },
    ],
  },
  {
    name: 'Tooling', icon: '◉',
    skills: [
      { name: 'Git / GitHub', level: 4 }, { name: 'Vite',        level: 4 },
      { name: 'Webpack',      level: 2 }, { name: 'Jest',         level: 1 },
      { name: 'Docker',       level: 1 }, { name: 'Vercel / CI',  level: 1 },
    ],
  },
]

export default function SkillsGrid({ categories = DEFAULT_CATEGORIES }: SkillsGridProps) {
  return (
    <SectionWrapper
      id="skills"
      label="02 / Skills"
      heading="What I Work With"
      subheading="Frontend is home. Backend is where I'm heading."
    >
      <div style={s.grid}>
        {categories.map((cat, i) => (
          <CategoryCard key={i} category={cat} />
        ))}
      </div>
    </SectionWrapper>
  )
}

function CategoryCard({ category }: { category: SkillCategory }) {
  const [hovered, setHovered] = useState<number | null>(null)
  return (
    <div style={s.card}>
      <div style={s.cardHeader}>
        <span style={s.cardIcon}>{category.icon}</span>
        <span style={s.cardName}>{category.name}</span>
      </div>
      <div style={s.skillList}>
        {category.skills.map((skill, i) => (
          <SkillRow
            key={i}
            skill={skill}
            isHovered={hovered === i}
            onHover={() => setHovered(i)}
            onLeave={() => setHovered(null)}
          />
        ))}
      </div>
    </div>
  )
}

interface SkillRowProps {
  skill: Skill
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}

function SkillRow({ skill, isHovered, onHover, onLeave }: SkillRowProps) {
  const barColor =
    skill.level >= 4 ? 'linear-gradient(90deg, var(--color-accent-dim), var(--color-accent))'
    : skill.level >= 3 ? 'linear-gradient(90deg, var(--color-amber-dim), var(--color-amber))'
    : 'linear-gradient(90deg, #2a3340, #3a4455)'

  return (
    <div
      style={{ ...s.skillRow, ...(isHovered ? s.skillRowHovered : {}) }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div style={s.skillTop}>
        <span style={s.skillName}>{skill.name}</span>
        <span style={s.skillLevel}>{LEVEL_LABELS[skill.level]}</span>
      </div>
      <div style={s.barTrack}>
        <div style={{ ...s.barFill, width: `${(skill.level / 5) * 100}%`, background: barColor }} />
      </div>
    </div>
  )
}

const s: Record<string, CSSProperties> = {
  grid:           { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' },
  card:           { padding: '1.75rem', background: 'var(--color-bg-surface)', border: '1px solid var(--color-bg-border)', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '1.25rem' },
  cardHeader:     { display: 'flex', alignItems: 'center', gap: '0.6rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-bg-border)' },
  cardIcon:       { color: 'var(--color-accent)', fontSize: '1rem' },
  cardName:       { fontFamily: 'var(--font-display)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-text-primary)' },
  skillList:      { display: 'flex', flexDirection: 'column', gap: '0.85rem' },
  skillRow:       { display: 'flex', flexDirection: 'column', gap: '0.4rem', padding: '0.5rem', borderRadius: 'var(--radius-sm)', transition: 'background var(--transition-fast)', cursor: 'default' },
  skillRowHovered:{ background: 'rgba(255,255,255,0.02)' },
  skillTop:       { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' },
  skillName:      { fontSize: '0.85rem', color: 'var(--color-text-primary)', fontWeight: 500 },
  skillLevel:     { fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.08em', color: 'var(--color-text-muted)', textTransform: 'uppercase' },
  barTrack:       { height: '3px', background: 'var(--color-bg-border)', borderRadius: '2px', overflow: 'hidden' },
  barFill:        { height: '100%', borderRadius: '2px', transition: 'width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' },
}
