import { useState, CSSProperties } from 'react'
import { ExperienceTimelineProps, ExperienceItem, ExperienceType } from '@/types'
import SectionWrapper from './SectionWrapper'

const TYPE_COLOR: Record<ExperienceType, string> = {
  work:       'var(--color-accent)',
  education:  'var(--color-amber)',
  freelance:  '#4d26fa',
  volunteer: '#f467f9',
}

const DEFAULT_ITEMS: ExperienceItem[] = [
  { role: 'Help Desk Technician', company: 'Eaton Rapids medical Center', period: '2025 — Present', type: 'work', description: 'Supported the full technology stack of a live medical center — from user-facing software and EMR systems to network infrastructure and endpoint hardware. Working in healthcare IT sharpened my ability to diagnose problems methodically, communicate technical concepts to non-technical users, and operate with precision in high-stakes environments. This role bridged my clinical background with the technical world and pointed me directly toward software development.', 
    tags: ['MS Office', 'Active Directory', 'End-User Support'] },
  { role: 'Director of Information Technology', company: 'Compress and Shock Foundation', period: '2018 — 2023', type: 'volunteer', description: 'Architected and maintained a public-facing website for event registration and student tracking, improving operational efficiency. Managed social media platforms and produced digital marketing materials, growing community outreach and engagement.', 
    tags: ['Website Development', 'Social Media Management', 'Marketing'] },
  { role: 'Web Development', company: 'Self-study', period: '2026 — Present', type: 'freelance', description: 'Continually building projects and web designs to gain and refine my development skills. I\'m passionate about crafting clean, efficient code and intuitive user experiences. I\'m currently focused on mastering React and TypeScript, and I\'m excited to take on freelance projects that challenge me to apply what I\'ve learned in real-world scenarios.',
    tags: ['React', 'HTML/CSS', 'TypeScript'] },
  { role: 'B.S. Software Engineering', company: 'Western Governors University', period: '2015 — Present', type: 'education', description: 'Studying fundamentals, data structures, algorithms, and software engineering. Working towards my B.S. and further hone my skills as a developer.', 
    tags: ['Algorithms', 'Systems', 'Web Dev'] },
]

export default function ExperienceTimeline({ items = DEFAULT_ITEMS }: ExperienceTimelineProps) {
  return (
    <SectionWrapper
      id="experience"
      label="04 / Experience"
      heading="Where I've Been"
      subheading="A timeline of roles, projects, and education that shaped how I think."
    >
      <div style={s.timeline}>
        {items.map((item, i) => (
          <TimelineItem key={i} item={item} isLast={i === items.length - 1} />
        ))}
      </div>
    </SectionWrapper>
  )
}

function TimelineItem({ item, isLast }: { item: ExperienceItem; isLast: boolean }) {
  const [expanded, setExpanded] = useState(false)
  const dotColor = TYPE_COLOR[item.type]

  return (
    <div style={s.item}>
      <div style={s.spine}>
        <div style={{ ...s.dot, background: dotColor, boxShadow: `0 0 8px ${dotColor}` }} />
        {!isLast && <div style={s.line} />}
      </div>
      <div
        style={{ ...s.content, cursor: 'pointer' }}
        onClick={() => setExpanded(e => !e)}
        role="button"
        aria-expanded={expanded}
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setExpanded(v => !v)}
      >
        <div style={s.header}>
          <div style={s.headerLeft}>
            <span style={s.period}>{item.period}</span>
            <div style={s.typeTag}>
              <span style={{ ...s.typeDot, background: dotColor }} />
              <span style={{ ...s.typeLabel, color: dotColor }}>{item.type}</span>
            </div>
          </div>
          <span style={s.expandIcon}>{expanded ? '\u2212' : '+'}</span>
        </div>
        <h3 style={s.role}>{item.role}</h3>
        <p style={s.company}>{item.company}</p>
        {expanded && (
          <div style={s.expandedContent}>
            <p style={s.description}>{item.description}</p>
            <div style={s.tags}>
              {item.tags.map((tag, i) => (
                <span key={i} style={s.tag}>{tag}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const s: Record<string, CSSProperties> = {
  timeline:       { display: 'flex', flexDirection: 'column', maxWidth: '720px' },
  item:           { display: 'flex', gap: '1.5rem', position: 'relative' },
  spine:          { display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, paddingTop: '1.5rem' },
  dot:            { width: '12px', height: '12px', borderRadius: '50%', flexShrink: 0, zIndex: 1 },
  line:           { width: '1px', flex: 1, background: 'var(--color-bg-border)', marginTop: '6px', minHeight: '32px' },
  content:        { flex: 1, padding: '1.5rem', background: 'var(--color-bg-surface)', border: '1px solid var(--color-bg-border)', borderRadius: 'var(--radius-lg)', marginBottom: '1rem', transition: 'border-color var(--transition-fast)', userSelect: 'none' },
  header:         { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' },
  headerLeft:     { display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' },
  period:         { fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.08em', color: 'var(--color-text-muted)' },
  typeTag:        { display: 'flex', alignItems: 'center', gap: '0.35rem' },
  typeDot:        { width: '5px', height: '5px', borderRadius: '50%', display: 'block' },
  typeLabel:      { fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase' },
  expandIcon:     { fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--color-text-muted)', lineHeight: 1 },
  role:           { fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.01em', margin: '0 0 0.2rem' },
  company:        { fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: 0 },
  expandedContent:{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--color-bg-border)', display: 'flex', flexDirection: 'column', gap: '0.75rem', animation: 'fadeIn 0.2s ease' },
  description:    { fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, margin: 0 },
  tags:           { display: 'flex', flexWrap: 'wrap', gap: '0.4rem' },
  tag:            { padding: '0.2rem 0.6rem', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)', background: 'var(--color-bg-border)', borderRadius: 'var(--radius-sm)' },
}
