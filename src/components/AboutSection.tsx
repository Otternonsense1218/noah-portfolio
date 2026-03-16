import { CSSProperties } from 'react'
import { AboutSectionProps, Highlight } from '@/types'
import SectionWrapper from './SectionWrapper'

const DEFAULT_BIO = [
  "I spent 10 years as a paramedic and served in the Army — two careers built entirely on staying calm under pressure, making fast decisions, and showing up for people when it matters most. Now I'm channeling that same discipline into software development. I build clean, thoughtful frontends and I'm actively working toward full-stack. I learn fast, I don't quit, and I'm ready to grow inside a team that takes their craft seriously.",
  "Right now I'm pushing into full-stack territory. I want to understand the whole system — not just what the user sees, but how the data moves, how the server thinks, and how to architect something that scales.",
]
const DEFAULT_HIGHLIGHTS: Highlight[] = [
  { icon: '\u26a1', label: 'Based in',   value: 'Tallahasse, FL' },
  { icon: '\ud83c\udfaf', label: 'Focused on',  value: 'React · TypeScript' },
  { icon: '\ud83d\udcda', label: 'Learning',    value: 'Backend & Systems' },
  { icon: '\ud83d\ude80', label: 'Goal',        value: 'Full-Stack Engineer' },
]
const DEFAULT_FOCUS = [
  'Building polished, accessible UIs with React',
  'Learning Node.js, Express, and REST API design',
  'Exploring databases — SQL and NoSQL patterns',
  'System design fundamentals and architecture',
  'Open source contributions and code review skills',
]

export default function AboutSection({
  bio         = DEFAULT_BIO,
  highlights  = DEFAULT_HIGHLIGHTS,
  focusItems  = DEFAULT_FOCUS,
}: AboutSectionProps) {
  return (
    <SectionWrapper
      id="about"
      label="01 / About"
      heading="Who I Am"
      subheading="A developer who cares about craft, process, and always growing."
    >
      <div style={s.grid}>
        <div style={s.bioCol}>
          {bio.map((para, i) => (
            <p key={i} style={s.para}>{para}</p>
          ))}
          <div style={s.highlights}>
            {highlights.map((h, i) => (
              <div key={i} style={s.highlight}>
                <span style={s.hlIcon}>{h.icon}</span>
                <div>
                  <div style={s.hlLabel}>{h.label}</div>
                  <div style={s.hlValue}>{h.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={s.focusCard}>
          <div style={s.focusHeader}>
            <span style={s.focusDot} />
            <span style={s.focusTitle}>Current Focus</span>
          </div>
          <ul style={s.focusList}>
            {focusItems.map((item, i) => (
              <li key={i} style={s.focusItem}>
                <span style={s.focusArrow}>\u2192</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionWrapper>
  )
}

const s: Record<string, CSSProperties> = {
  grid:        { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' },
  bioCol:      { display: 'flex', flexDirection: 'column', gap: '1.25rem' },
  para:        { fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.8, margin: 0 },
  highlights:  { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.5rem' },
  highlight:   { display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.75rem', background: 'var(--color-bg-surface)', border: '1px solid var(--color-bg-border)', borderRadius: 'var(--radius-md)' },
  hlIcon:      { fontSize: '1.1rem', flexShrink: 0, marginTop: '1px' },
  hlLabel:     { fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', marginBottom: '2px' },
  hlValue:     { fontSize: '0.82rem', color: 'var(--color-text-primary)', fontWeight: 500 },
  focusCard:   { padding: '1.75rem', background: 'var(--color-bg-surface)', border: '1px solid var(--color-bg-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' },
  focusHeader: { display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-bg-border)' },
  focusDot:    { width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-accent)', boxShadow: '0 0 8px rgba(78,205,196,0.8)', display: 'block', animation: 'glowPulse 2s ease infinite' },
  focusTitle:  { fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-accent)' },
  focusList:   { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: 0, padding: 0 },
  focusItem:   { display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 },
  focusArrow:  { color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', flexShrink: 0, marginTop: '1px' },
}
