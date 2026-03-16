import { useState, CSSProperties } from 'react'
import { ProjectCardProps } from '@/types'

function LinkButton({ href, label, primary = false }: { href: string; label: string; primary?: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        ...s.linkBtn,
        ...(primary ? s.linkBtnPrimary : {}),
        ...(hovered ? (primary ? s.linkBtnPrimaryHovered : s.linkBtnHovered) : {}),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </a>
  )
}

export default function ProjectCard({
  title,
  description,
  tags,
  liveHref,
  repoHref,
  index = 1,
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <article
      style={{ ...s.card, ...(hovered ? s.cardHovered : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={s.imageArea}>
        <div style={s.imageGrid} aria-hidden="true" />
        <span style={s.projectNumber}>{String(index).padStart(2, '0')}</span>
        <div style={{ ...s.cornerAccent, boxShadow: hovered ? 'var(--shadow-accent-glow)' : 'none' }} />
      </div>
      <div style={s.body}>
        <div style={s.tags}>
          {tags.map((tag, i) => (
            <span key={i} style={s.tag}>{tag}</span>
          ))}
        </div>
        <h3 style={{ ...s.title, color: hovered ? 'var(--color-accent)' : 'var(--color-text-primary)' }}>
          {title}
        </h3>
        <p style={s.description}>{description}</p>
        <div style={s.links}>
          {liveHref && <LinkButton href={liveHref} label="Live \u2197" primary />}
          {repoHref && <LinkButton href={repoHref} label="GitHub \u2192" />}
        </div>
      </div>
    </article>
  )
}

const s: Record<string, CSSProperties> = {
  card:             { display: 'flex', flexDirection: 'column', background: 'var(--color-bg-surface)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--color-bg-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', transition: 'all var(--transition-base)', cursor: 'default' },
  cardHovered:      { borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--color-accent-dim)', transform: 'translateY(-3px)', boxShadow: 'var(--shadow-card), 0 0 40px rgba(78,205,196,0.06)' },
  imageArea:        { position: 'relative', height: '180px', background: 'var(--color-bg-alt)', overflow: 'hidden', flexShrink: 0 },
  imageGrid:        { position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(78,205,196,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(78,205,196,0.05) 1px, transparent 1px)', backgroundSize: '32px 32px' },
  projectNumber:    { position: 'absolute', bottom: '1rem', left: '1rem', fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 800, color: 'rgba(78,205,196,0.08)', lineHeight: 1, userSelect: 'none' },
  cornerAccent:     { position: 'absolute', top: '1rem', right: '1rem', width: '24px', height: '24px', borderTop: '2px solid var(--color-accent)', borderRight: '2px solid var(--color-accent)', borderRadius: '0 var(--radius-sm) 0 0', transition: 'box-shadow var(--transition-base)' },
  body:             { padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 },
  tags:             { display: 'flex', flexWrap: 'wrap', gap: '0.4rem' },
  tag:              { padding: '0.2rem 0.6rem', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)', background: 'var(--color-bg-border)', borderRadius: 'var(--radius-sm)' },
  title:            { fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, margin: 0, letterSpacing: '-0.01em', transition: 'color var(--transition-fast)' },
  description:      { fontSize: '0.88rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, margin: 0, flex: 1 },
  links:            { display: 'flex', gap: '0.75rem', marginTop: '0.25rem', flexWrap: 'wrap' },
  linkBtn:          { padding: '0.4rem 0.9rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', color: 'var(--color-text-muted)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--color-bg-border)', borderRadius: 'var(--radius-sm)', transition: 'all var(--transition-fast)' },
  linkBtnHovered:   { color: 'var(--color-text-secondary)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--color-text-muted)' },
  linkBtnPrimary:   { color: 'var(--color-accent)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'rgba(78,205,196,0.3)', background: 'rgba(78,205,196,0.06)' },
  linkBtnPrimaryHovered: { background: 'rgba(78,205,196,0.12)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--color-accent)' },
}