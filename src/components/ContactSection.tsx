import { useState, CSSProperties } from 'react'
import { ContactSectionProps, SocialLink } from '@/types'
import SectionWrapper from './SectionWrapper'

const DEFAULT_SOCIALS: SocialLink[] = [
  { label: 'GitHub',   href: 'https://github.com/Otternonsense1218',   icon: 'GH' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/noah-dean1218',  icon: 'LI' },

]

function SocialButton({ label, href, icon }: SocialLink) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ ...s.social, ...(hovered ? s.socialHovered : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={s.socialIcon}>{icon}</span>
      <span style={s.socialLabel}>{label}</span>
    </a>
  )
}

export default function ContactSection({
  email   = 'noahdean@yahoo.com',
  message = 'I\'m currently open to new opportunities. Whether it\'s a role, a freelance project, or just a conversation — I\'d love to hear from you.',
  socials = DEFAULT_SOCIALS,
}: ContactSectionProps) {
  const [copied, setCopied] = useState(false)
  const [emailHovered, setEmailHovered] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard not available
    }
  }

  return (
    <SectionWrapper
      id="contact"
      label="05 / Contact"
      heading="Let\'s Talk"
      align="center"
    >
      <div style={s.center}>
        <p style={s.message}>{message}</p>

        <div style={s.emailBlock}>
          <a
            href={`mailto:${email}`}
            style={{ ...s.emailLink, ...(emailHovered ? s.emailLinkHovered : {}) }}
            onMouseEnter={() => setEmailHovered(true)}
            onMouseLeave={() => setEmailHovered(false)}
          >
            {email}
          </a>
          <button style={s.copyBtn} onClick={copyEmail}>
            {copied ? '\u2713 Copied' : 'Copy'}
          </button>
        </div>

        <div style={s.dividerRow}>
          <div style={s.dividerFill} />
          <span style={s.dividerText}>or find me on</span>
          <div style={s.dividerFill} />
        </div>

        <div style={s.socials}>
          {socials.map((social, i) => (
            <SocialButton key={i} {...social} />
          ))}
        </div>

        <p style={s.footerNote}>
          Built by Noah Dean&nbsp;&middot;&nbsp;2025&nbsp;&middot;&nbsp;React + TypeScript
        </p>
      </div>
    </SectionWrapper>
  )
}

const s: Record<string, CSSProperties> = {
  center:           { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', maxWidth: '560px', margin: '0 auto' },
  message:          { fontSize: '1.05rem', color: 'var(--color-text-secondary)', lineHeight: 1.8, textAlign: 'center', margin: 0 },
  emailBlock:       { display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem', background: 'var(--color-bg-surface)', border: '1px solid var(--color-bg-border)', borderRadius: 'var(--radius-lg)', flexWrap: 'wrap', justifyContent: 'center' },
  emailLink:        { fontFamily: 'var(--font-mono)', fontSize: '1rem', color: 'var(--color-text-primary)', textDecoration: 'none', letterSpacing: '0.02em', transition: 'color var(--transition-fast)' },
  emailLinkHovered: { color: 'var(--color-accent)' },
  copyBtn:          { padding: '0.3rem 0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)', background: 'var(--color-bg-border)', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', transition: 'all var(--transition-fast)' },
  dividerRow:       { display: 'flex', alignItems: 'center', gap: '1rem', width: '100%' },
  dividerFill:      { flex: 1, height: '1px', background: 'var(--color-bg-border)' },
  dividerText:      { fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' },
  socials:          { display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' },
  social:           { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.25rem', background: 'var(--color-bg-surface)', borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--color-bg-border)', borderRadius: 'var(--radius-md)', textDecoration: 'none', transition: 'all var(--transition-base)' },
  socialHovered:    { borderWidth: '1px', borderStyle: 'solid', borderColor: 'var(--color-accent-dim)', background: 'rgba(78,205,196,0.06)', transform: 'translateY(-2px)', boxShadow: 'var(--shadow-card)' },
  socialIcon:       { fontFamily: 'var(--font-display)', fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-accent)', letterSpacing: '0.05em' },
  socialLabel:      { fontSize: '0.85rem', color: 'var(--color-text-secondary)', fontWeight: 500 },
  footerNote:       { fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--color-text-muted)', letterSpacing: '0.08em', textAlign: 'center', margin: 0 },
}