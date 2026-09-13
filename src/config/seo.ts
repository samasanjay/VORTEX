import type { Project } from '../types/project';

export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://workvortex.studio').replace(/\/$/, '');

export const DEFAULT_SEO = {
  siteName: 'WORKVORTEX',
  title: 'WORKVORTEX — Digital Experiences, UI/UX & Product Engineering Studio',
  description:
    'WORKVORTEX is a modern digital product studio crafting high-performance web applications, luxury e-commerce platforms, SaaS dashboards, and design systems.',
  canonical: SITE_URL,
  ogImage: `${SITE_URL}/assets/projects/digital_lab.jpg`,
  ogType: 'website' as const,
  twitterCard: 'summary_large_image' as const,
  twitterCreator: '@workvortex',
  locale: 'en_US',
  keywords: [
    'WORKVORTEX',
    'digital product studio',
    'UI/UX design',
    'web application development',
    'SaaS dashboard design',
    'Next.js development',
    'React engineering',
    'design systems',
    'interactive experiences',
    'mobile app interfaces',
  ].join(', '),
};

/**
 * Generates Schema.org Organization structured data
 */
export const buildOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'WORKVORTEX',
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/assets/workvortex-logo.png`,
    width: '512',
    height: '512',
  },
  image: `${SITE_URL}/assets/projects/digital_lab.jpg`,
  description:
    'Digital product studio specializing in high-performance web platforms, SaaS interfaces, mobile applications, and design systems.',
  email: 'workvortex01@gmail.com',
  sameAs: [
    'https://github.com/workvortex',
    'https://twitter.com/workvortex',
    'https://linkedin.com/company/workvortex',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'workvortex01@gmail.com',
    contactType: 'customer support and client inquiries',
    availableLanguage: ['English'],
  },
});

/**
 * Generates Schema.org WebSite structured data with SearchAction
 */
export const buildWebSiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'WORKVORTEX',
  description: DEFAULT_SEO.description,
  publisher: {
    '@id': `${SITE_URL}/#organization`,
  },
  inLanguage: 'en-US',
});

/**
 * Generates Schema.org BreadcrumbList structured data
 */
export const buildBreadcrumbSchema = (breadcrumbs: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: crumb.path.startsWith('http') ? crumb.path : `${SITE_URL}${crumb.path}`,
  })),
});

/**
 * Generates Schema.org CreativeWork / SoftwareApplication structured data for project case studies
 */
export const buildProjectSchema = (project: Project) => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  '@id': `${SITE_URL}/work/${project.slug}#creativework`,
  headline: `${project.name} — ${project.category}`,
  name: project.name,
  description: project.description,
  url: `${SITE_URL}/work/${project.slug}`,
  image: project.featuredImage.startsWith('http')
    ? project.featuredImage
    : `${SITE_URL}${project.featuredImage}`,
  genre: project.category,
  keywords: project.technologies.join(', '),
  creator: {
    '@type': 'Organization',
    name: 'WORKVORTEX',
    url: SITE_URL,
  },
  datePublished: `${project.year}-01-01`,
  about: {
    '@type': 'Thing',
    name: project.category,
    description: project.overview || project.highlightSummary,
  },
  mainEntityOfPage: `${SITE_URL}/work/${project.slug}`,
});

/**
 * Generates Schema.org CollectionPage / ItemList for directories
 */
export const buildCollectionSchema = (
  name: string,
  description: string,
  url: string,
  items: { name: string; url: string; image?: string; description?: string }[]
) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${url}#collection`,
  name,
  description,
  url,
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      url: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
      description: item.description,
      image: item.image ? (item.image.startsWith('http') ? item.image : `${SITE_URL}${item.image}`) : undefined,
    })),
  },
});

/**
 * Generates Schema.org AboutPage structured data
 */
export const buildAboutSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${SITE_URL}/about#aboutpage`,
  url: `${SITE_URL}/about`,
  name: 'About WORKVORTEX — Digital Product Studio Philosophy & Capabilities',
  description:
    'Learn about WORKVORTEX studio philosophy, core engineering pillars, design principles, and full-stack technical capabilities.',
  mainEntity: {
    '@id': `${SITE_URL}/#organization`,
  },
});

/**
 * Generates Schema.org ContactPage / ProfessionalService structured data
 */
export const buildContactSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${SITE_URL}/contact#contactpage`,
  url: `${SITE_URL}/contact`,
  name: 'Start a Project & Client Consultation — WORKVORTEX',
  description:
    'Connect with WORKVORTEX for web application development, UI/UX design, SaaS dashboard engineering, and digital product consultation.',
  mainEntity: {
    '@type': 'ProfessionalService',
    name: 'WORKVORTEX Studio Inquiries',
    email: 'workvortex01@gmail.com',
    url: `${SITE_URL}/contact`,
    priceRange: '₹4,000 - ₹30,000+ / $48 - $360+',
    areaServed: 'Worldwide',
    knowsAbout: [
      'Web Application Development',
      'UI/UX Design',
      'E-commerce Solutions',
      'SaaS Dashboards',
      'Design Systems',
      'AI Workflow Integrations',
    ],
  },
});

/**
 * Generates Schema.org TechArticle for Design System
 */
export const buildTechArticleSchema = (name: string, description: string, url: string) => ({
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  '@id': `${url}#techarticle`,
  headline: name,
  description,
  url,
  author: {
    '@type': 'Organization',
    name: 'WORKVORTEX',
    url: SITE_URL,
  },
  publisher: {
    '@type': 'Organization',
    name: 'WORKVORTEX',
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/assets/workvortex-logo.png`,
    },
  },
  inLanguage: 'en-US',
});
