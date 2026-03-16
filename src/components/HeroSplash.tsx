import { useEffect, useRef, useState, CSSProperties } from 'react'
import { HeroSplashProps } from '@/types'

const DEFAULT_STATS = [
  { value: '2+',  label: 'Years building'    },
  { value: '3+', label: 'Projects shipped'  },
  { value: '\u221e',   label: 'Things to learn'  },
]

// ── BlinkCursor ───────────────────────────────────────────────
function BlinkCursor() {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const id = setInterval(() => setVisible(v => !v), 530)
    return () => clearInterval(id)
  }, [])
  return <span style={{ ...s.cursor, opacity: visible ? 1 : 0 }}>&#9607;</span>
}

// ── StatusBadge ───────────────────────────────────────────────
function StatusBadge({ text }: { text: string }) {
  return (
    <div style={s.badge}>
      <span style={s.badgeDot} />
      <span style={s.badgeText}>{text}</span>
    </div>
  )
}

// ── ButtonPrimary ─────────────────────────────────────────────
function ButtonPrimary({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      style={{ ...s.btnPrimary, ...(hovered ? s.btnPrimaryHover : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label} <span style={s.btnArrow}>\u2192</span>
    </a>
  )
}

// ── ButtonGhost ───────────────────────────────────────────────
function ButtonGhost({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      style={{ ...s.btnGhost, ...(hovered ? s.btnGhostHover : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </a>
  )
}

// ── Main Component ────────────────────────────────────────────
export default function HeroSplash({
  name         = 'Noah Dean',
  title        = 'Frontend Developer',
  subtitle     = 'Building toward full-stack',
  tagline      = 'I craft interfaces that feel as good as they look.',
  ctaPrimary   = { label: 'View My Work', href: '#projects'  },
  ctaSecondary = { label: 'Get In Touch', href: '#contact'   },
  statusText   = 'Open to opportunities',
  stats        = DEFAULT_STATS,
}: HeroSplashProps) {
  const heroRef = useRef<HTMLElement>(null)
  const [mounted,   setMounted]   = useState(false)
  const [mousePos,  setMousePos]  = useState({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!heroRef.current) return
      const { width, height } = heroRef.current.getBoundingClientRect()
      setMousePos({ x: e.clientX / width, y: e.clientY / height })
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  const parallax: CSSProperties = {
    transform:  `translate(${(mousePos.x - 0.5) * -12}px, ${(mousePos.y - 0.5) * -8}px)`,
    transition: 'transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  }

  const fadeItem = (delay: string): CSSProperties => ({
    animation:         `fadeUp 0.7s ease ${delay} both`,
    animationFillMode: 'both',
    opacity:           mounted ? 1 : 0,
  })

  return (
    <section ref={heroRef} style={s.section} id="hero">
      <div style={s.container}>
        {/* Left */}
        <div style={s.left}>
          <div style={fadeItem('0ms')}>
            <StatusBadge text={statusText} />
          </div>

          <div style={{ ...s.preLabel, ...fadeItem('100ms') }}>
            <span style={s.preLabelLine} />
            <span style={s.preLabelText}>PORTFOLIO \u2014 2025</span>
          </div>

          <h1 style={{ ...s.name, ...fadeItem('200ms') }}>
            {name}<BlinkCursor />
          </h1>

          <p style={{ ...s.roleTitle, ...fadeItem('300ms') }}>
            <span style={s.roleAccent}>{title}</span>
            <span style={s.roleDivider}> / </span>
            <span style={s.roleSecondary}>{subtitle}</span>
          </p>

          <p style={{ ...s.tagline, ...fadeItem('400ms') }}>{tagline}</p>

          <div style={{ ...s.ctaRow, ...fadeItem('500ms') }}>
            <ButtonPrimary label={ctaPrimary.label}   href={ctaPrimary.href} />
            <ButtonGhost   label={ctaSecondary.label} href={ctaSecondary.href} />
          </div>

          <div style={{ ...s.statsRow, ...fadeItem('650ms') }}>
            {stats.map((stat, i) => (
              <div key={i} style={s.statPill}>
                <span style={s.statValue}>{stat.value}</span>
                <span style={s.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — decorative orb */}
        <div style={{ ...s.right, ...parallax }}>
          <div style={s.orb} aria-hidden="true">
            <div style={s.orbRingOuter} />
            <div style={s.orbRingMid} />
            <div style={s.orbCore} />
            <div style={s.codeTag1}><span style={s.codeText}>{'<Noah />'}</span></div>
            <div style={s.codeTag2}><span style={s.codeTextAmber}>{'// Designing the Future'}</span></div>
            <div style={s.codeTag3}><span style={s.codeText}>{'{ creative: true }'}</span></div>
            <div style={s.codeTag4}><span style={s.codeText}>{'</Code>'}</span></div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ ...s.scrollIndicator, ...fadeItem('900ms') }}>
        <div style={s.scrollDot} />
        <span style={s.scrollText}>scroll</span>
      </div>
    </section>
  )
}

const s: Record<string, CSSProperties> = {
  section:         { position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden', zIndex: 1 },
  container:       { position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: '4rem', paddingTop: '6rem', paddingBottom: '6rem' },
  left:            { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  right:           { display: 'flex', justifyContent: 'center', alignItems: 'center' },
  badge:           { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.85rem', background: 'rgba(78,205,196,0.08)', border: '1px solid rgba(78,205,196,0.2)', borderRadius: '9999px', width: 'fit-content' },
  badgeDot:        { width: '7px', height: '7px', borderRadius: '50%', backgroundColor: 'var(--color-accent)', boxShadow: '0 0 6px rgba(78,205,196,0.8)', animation: 'glowPulse 2s ease infinite', display: 'block' },
  badgeText:       { fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.08em', color: 'var(--color-accent)', textTransform: 'uppercase' },
  preLabel:        { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  preLabelLine:    { display: 'block', width: '32px', height: '1px', backgroundColor: 'var(--color-text-muted)' },
  preLabelText:    { fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--color-text-muted)', textTransform: 'uppercase' },
  name:            { fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--color-text-primary)', margin: 0 },
  cursor:          { color: 'var(--color-accent)', marginLeft: '2px', display: 'inline-block', transition: 'opacity 0.1s' },
  roleTitle:       { fontSize: '1rem', lineHeight: 1.5, margin: 0 },
  roleAccent:      { color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 500 },
  roleDivider:     { color: 'var(--color-text-muted)', margin: '0 0.25rem' },
  roleSecondary:   { color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' },
  tagline:         { fontSize: '1.15rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, maxWidth: '480px', margin: 0 },
  ctaRow:          { display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' },
  btnPrimary:      { display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.85rem 1.75rem', background: 'var(--color-accent)', color: '#0a0d12', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 'var(--radius-sm)', transition: 'all var(--transition-base)', border: '2px solid var(--color-accent)' },
  btnPrimaryHover: { background: 'transparent', color: 'var(--color-accent)', boxShadow: 'var(--shadow-accent-glow)' },
  btnArrow:        { transition: 'transform var(--transition-fast)' },
  btnGhost:        { display: 'inline-flex', alignItems: 'center', padding: '0.85rem 1.75rem', background: 'transparent', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.78rem', letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 'var(--radius-sm)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--color-bg-border)', transition: 'all var(--transition-base)' },
  btnGhostHover:   { borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--color-text-muted)', color: 'var(--color-text-primary)' },
  statsRow:        { display: 'flex', gap: '1.5rem', paddingTop: '0.5rem', borderTop: '1px solid var(--color-bg-border)', flexWrap: 'wrap' },
  statPill:        { display: 'flex', flexDirection: 'column', gap: '0.1rem' },
  statValue:       { fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1 },
  statLabel:       { fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)' },
  orb:             { position: 'relative', width: '420px', height: '420px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  orbRingOuter:    { position: 'absolute', inset: 0, borderRadius: '50%', border: '1px solid rgba(78,205,196,0.12)', animation: 'spin 20s linear infinite' },
  orbRingMid:      { position: 'absolute', inset: '40px', borderRadius: '50%', border: '1px solid rgba(240,165,0,0.15)', animation: 'spin 14s linear infinite reverse' },
  orbCore:         { position: 'absolute', inset: '120px', borderRadius: '50%', background: 'radial-gradient(circle at 35% 35%, rgba(78,205,196,0.18), rgba(78,205,196,0.04) 60%, transparent)', border: '1px solid rgba(78,205,196,0.25)', boxShadow: '0 0 60px rgba(78,205,196,0.12), inset 0 0 40px rgba(78,205,196,0.06)' },
  codeTag1:        { position: 'absolute', top: '18%', right: '8%', padding: '0.4rem 0.8rem', background: 'rgba(14,19,24,0.9)', border: '1px solid var(--color-bg-border)', borderRadius: 'var(--radius-sm)', backdropFilter: 'blur(8px)', animation: 'float1 6s ease-in-out infinite' },
  codeTag2:        { position: 'absolute', bottom: '22%', left: '5%', padding: '0.4rem 0.8rem', background: 'rgba(14,19,24,0.9)', border: '1px solid var(--color-bg-border)', borderRadius: 'var(--radius-sm)', backdropFilter: 'blur(8px)', animation: 'float2 7s ease-in-out infinite' },
  codeTag3:        { position: 'absolute', bottom: '38%', right: '0%', padding: '0.4rem 0.8rem', background: 'rgba(14,19,24,0.9)', border: '1px solid var(--color-bg-border)', borderRadius: 'var(--radius-sm)', backdropFilter: 'blur(8px)', animation: 'float3 8s ease-in-out infinite' },
  codeTag4:        { position: 'absolute', top: '22%', left: '0%', padding: '0.4rem 0.8rem', background: 'rgba(14,19,24,0.9)', border: '1px solid var(--color-bg-border)', borderRadius: 'var(--radius-sm)', backdropFilter: 'blur(8px)', animation: 'float4 5s ease-in-out infinite' },
  codeText:        { fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--color-accent)' },
  codeTextAmber:   { fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--color-amber)' },
  scrollIndicator: { position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', zIndex: 1 },
  scrollDot:       { width: '1px', height: '48px', background: 'linear-gradient(to bottom, var(--color-accent), transparent)', animation: 'glowPulse 2s ease infinite' },
  scrollText:      { fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-text-muted)' },
}