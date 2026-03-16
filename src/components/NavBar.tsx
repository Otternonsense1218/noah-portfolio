import { useEffect, useState, CSSProperties } from 'react'
import { NavBarProps } from '@/types'

const DEFAULT_LINKS = [
  { label: 'About',      href: '#about'      },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
]

export default function NavBar({
  name      = 'ND',
  links     = DEFAULT_LINKS,
  ctaLabel  = 'Resume',
  ctaHref   = '/resume.pdf',
}: NavBarProps) {
  const [scrolled,    setScrolled]    = useState(false)
  const [activeLink,  setActiveLink]  = useState('')
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [ctaHovered,  setCtaHovered]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const targets = links
      .map(l => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveLink('#' + e.target.id)
        })
      },
      { threshold: 0.5 }
    )
    targets.forEach(t => observer.observe(t))
    return () => observer.disconnect()
  }, [links])

  return (
    <nav style={{ ...s.nav, ...(scrolled ? s.navScrolled : {}) }} role="navigation">
      <div style={s.inner}>
        <a href="#hero" style={s.logo}>
          <span style={s.logoBracket}>[</span>
          <span style={s.logoName}>{name}</span>
          <span style={s.logoBracket}>]</span>
        </a>

        <ul style={s.linkList} role="list">
          {links.map(link => {
            const isActive  = activeLink === link.href
            const isHovered = hoveredLink === link.href
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  style={{
                    ...s.link,
                    ...(isActive  ? s.linkActive  : {}),
                    ...(isHovered ? s.linkHovered : {}),
                  }}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                  {isActive && <span style={s.linkDot} />}
                </a>
              </li>
            )
          })}
        </ul>

        <div style={s.right}>
          <a
            href={ctaHref}
            target='_blank'
            rel='noopener noreferrer'
            style={{ ...s.cta, ...(ctaHovered ? s.ctaHovered : {}) }}
            onMouseEnter={() => setCtaHovered(true)}
            onMouseLeave={() => setCtaHovered(false)}
          >
            {ctaLabel} ↗
          </a>
          <button
            style={s.hamburger}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span style={{ ...s.bar, ...(menuOpen ? s.barTopOpen : {}) }} />
            <span style={{ ...s.bar, opacity: menuOpen ? 0 : 1 }} />
            <span style={{ ...s.bar, ...(menuOpen ? s.barBotOpen : {}) }} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div style={s.mobileMenu}>
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              style={s.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a href={ctaHref} style={s.mobileCta}>{ctaLabel} ↗</a>
        </div>
      )}
    </nav>
  )
}

const s: Record<string, CSSProperties> = {
  nav: {
    position:       'fixed',
    top:            0,
    left:           0,
    right:          0,
    zIndex:         100,
    transition:     'all var(--transition-base)',
    padding:        '0 2rem',
  },
  navScrolled: {
    background:     'rgba(10,13,18,0.88)',
    backdropFilter: 'blur(16px)',
    borderBottom:   '1px solid var(--color-bg-border)',
    boxShadow:      '0 4px 32px rgba(0,0,0,0.4)',
  },
  inner: {
    maxWidth:       '1200px',
    margin:         '0 auto',
    height:         '64px',
    display:        'flex',
    alignItems:     'center',
    justifyContent: 'space-between',
    gap:            '2rem',
  },
  logo: {
    fontFamily:     'var(--font-display)',
    fontSize:       '1rem',
    fontWeight:     700,
    textDecoration: 'none',
    letterSpacing:  '0.04em',
    display:        'flex',
    alignItems:     'center',
    gap:            '2px',
    flexShrink:     0,
  },
  logoBracket: { color: 'var(--color-accent)', fontSize: '1.1rem' },
  logoName:    { color: 'var(--color-text-primary)' },
  linkList: {
    display:    'flex',
    alignItems: 'center',
    gap:        '0.25rem',
    listStyle:  'none',
    margin:     0,
    padding:    0,
  },
  link: {
    display:        'inline-flex',
    alignItems:     'center',
    flexDirection:  'column',
    gap:            '2px',
    padding:        '0.4rem 0.75rem',
    fontFamily:     'var(--font-mono)',
    fontSize:       '0.72rem',
    letterSpacing:  '0.08em',
    textTransform:  'uppercase',
    color:          'var(--color-text-muted)',
    textDecoration: 'none',
    borderRadius:   'var(--radius-sm)',
    transition:     'color var(--transition-fast)',
    position:       'relative',
  },
  linkHovered: { color: 'var(--color-text-secondary)' },
  linkActive:  { color: 'var(--color-accent)' },
  linkDot: {
    position:        'absolute',
    bottom:          '2px',
    left:            '50%',
    transform:       'translateX(-50%)',
    width:           '3px',
    height:          '3px',
    borderRadius:    '50%',
    background:      'var(--color-accent)',
    boxShadow:       '0 0 4px var(--color-accent)',
  },
  right: {
    display:    'flex',
    alignItems: 'center',
    gap:        '1rem',
    flexShrink: 0,
  },
  cta: {
    padding:        '0.45rem 1rem',
    fontFamily:     'var(--font-mono)',
    fontSize:       '0.72rem',
    letterSpacing:  '0.08em',
    textTransform:  'uppercase',
    color:          'var(--color-accent)',
    textDecoration: 'none',
    borderWidth:    '1px',
    borderStyle:    'solid',
    borderColor:    'rgba(78,205,196,0.3)',
    borderRadius:   'var(--radius-sm)',
    transition:     'all var(--transition-fast)',
  },
  ctaHovered: {
    background:  'rgba(78,205,196,0.08)',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'var(--color-accent)',
    boxShadow:   'var(--shadow-accent-glow)',
  },
  hamburger: {
    display:        'none',
    flexDirection:  'column',
    gap:            '5px',
    background:     'none',
    border:         'none',
    cursor:         'pointer',
    padding:        '4px',
  },
  bar: {
    display:         'block',
    width:           '22px',
    height:          '2px',
    background:      'var(--color-text-secondary)',
    borderRadius:    '1px',
    transition:      'all var(--transition-base)',
  },
  barTopOpen: { transform: 'rotate(45deg) translate(5px, 5px)' },
  barBotOpen: { transform: 'rotate(-45deg) translate(5px, -5px)' },
  mobileMenu: {
    display:        'flex',
    flexDirection:  'column',
    padding:        '1rem 0 1.5rem',
    borderTop:      '1px solid var(--color-bg-border)',
    background:     'rgba(10,13,18,0.97)',
    backdropFilter: 'blur(16px)',
  },
  mobileLink: {
    padding:        '0.75rem 1.5rem',
    fontFamily:     'var(--font-mono)',
    fontSize:       '0.8rem',
    letterSpacing:  '0.1em',
    textTransform:  'uppercase',
    color:          'var(--color-text-secondary)',
    textDecoration: 'none',
  },
  mobileCta: {
    margin:         '0.5rem 1.5rem 0',
    padding:        '0.6rem 1rem',
    fontFamily:     'var(--font-mono)',
    fontSize:       '0.8rem',
    letterSpacing:  '0.08em',
    textTransform:  'uppercase',
    color:          'var(--color-accent)',
    textDecoration: 'none',
    border:         '1px solid rgba(78,205,196,0.3)',
    borderRadius:   'var(--radius-sm)',
    textAlign:      'center',
  },
}