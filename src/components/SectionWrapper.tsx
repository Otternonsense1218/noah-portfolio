import { useEffect, useRef, useState, CSSProperties } from 'react'
import { SectionWrapperProps } from '@/types'

export default function SectionWrapper({
  id,
  label,
  heading,
  subheading,
  align     = 'left',
  children,
  noPadTop  = false,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.12 }
    )
    const el = ref.current
    if (el) observer.observe(el)
    return () => { if (el) observer.unobserve(el) }
  }, [])

  const centered = align === 'center'

  return (
    <section
      id={id}
      ref={ref}
      style={{ ...s.section, paddingTop: noPadTop ? 0 : '6rem' }}
    >
      <div style={s.container}>
        {(label || heading || subheading) && (
          <div style={{
            ...s.header,
            alignItems: centered ? 'center' : 'flex-start',
            textAlign:  centered ? 'center' : 'left',
            opacity:    visible ? 1 : 0,
            transform:  visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}>
            {label     && <span style={s.label}>{label}</span>}
            {heading   && <h2 style={s.heading}>{heading}</h2>}
            {subheading && <p style={s.subheading}>{subheading}</p>}
            <div style={{ ...s.divider, margin: centered ? '0.25rem auto 0' : '0.25rem 0 0' }} />
          </div>
        )}

        <div style={{
          opacity:    visible ? 1 : 0,
          transform:  visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s',
        }}>
          {children}
        </div>
      </div>
    </section>
  )
}

const s: Record<string, CSSProperties> = {
  section:    { paddingBottom: '6rem', position: 'relative' },
  container:  { maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', flexDirection: 'column', gap: '3rem' },
  header:     { display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '640px' },
  label:      { fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-accent)' },
  heading:    { fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', fontWeight: 700, lineHeight: 1.1, color: 'var(--color-text-primary)', letterSpacing: '-0.02em', margin: 0 },
  subheading: { fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, margin: 0 },
  divider:    { width: '48px', height: '2px', background: 'linear-gradient(90deg, var(--color-accent), transparent)' },
}
