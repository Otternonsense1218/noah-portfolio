/**
 * types/index.ts - Noah Dean Portfolio
 * Shared TypeScript interfaces and types for all components.
 */

export interface LinkItem {
  label: string
  href: string
}

export interface SocialLink {
  label: string
  href: string
  icon: string
}

export interface NavLink {
  label: string
  href: string
}

export interface NavBarProps {
  name?: string
  links?: NavLink[]
  ctaLabel?: string
  ctaHref?: string
}

export interface HeroStat {
  value: string
  label: string
}

export interface HeroSplashProps {
  name?: string
  title?: string
  subtitle?: string
  tagline?: string
  ctaPrimary?: LinkItem
  ctaSecondary?: LinkItem
  statusText?: string
  stats?: HeroStat[]
}

export interface Highlight {
  icon: string
  label: string
  value: string
}

export interface AboutSectionProps {
  bio?: string[]
  highlights?: Highlight[]
  focusItems?: string[]
}

export type SkillLevel = 1 | 2 | 3 | 4 | 5

export interface Skill {
  name: string
  level: SkillLevel
}

export interface SkillCategory {
  name: string
  icon: string
  skills: Skill[]
}

export interface SkillsGridProps {
  categories?: SkillCategory[]
}

export interface Project {
  title: string
  description: string
  tags: string[]
  liveHref?: string
  repoHref?: string
  featured?: boolean
}

export interface ProjectCardProps extends Project {
  index?: number
}

export interface ProjectsSectionProps {
  projects?: Project[]
}

export type ExperienceType = "work" | "education" | "freelance" | "volunteer"

export interface ExperienceItem {
  role: string
  company: string
  period: string
  type: ExperienceType
  description: string
  tags: string[]
}

export interface ExperienceTimelineProps {
  items?: ExperienceItem[]
}

export interface SectionWrapperProps {
  id?: string
  label?: string
  heading?: string
  subheading?: string
  align?: "left" | "center"
  children?: React.ReactNode
  noPadTop?: boolean
}

export interface ContactSectionProps {
  email?: string
  message?: string
  socials?: SocialLink[]
}
