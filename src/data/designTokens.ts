export interface ColorToken {
  name: string;
  role: string;
  hex: string;
  hsl: string;
  usage: string;
}

export interface TypeScaleToken {
  tag: string;
  name: string;
  family: string;
  size: string;
  weight: string;
  sample: string;
}

export const COLOR_TOKENS: ColorToken[] = [
  {
    name: 'Obsidian Deep',
    role: 'Primary Background',
    hex: '#06080D',
    hsl: 'hsl(223, 37%, 4%)',
    usage: 'Core canvas & hero depth layer'
  },
  {
    name: 'Midnight Slate',
    role: 'Container Surface',
    hex: '#0D111A',
    hsl: 'hsl(222, 34%, 8%)',
    usage: 'Cards, navigation dock, inspector panels'
  },
  {
    name: 'Electric Blue',
    role: 'Brand Accent & Focus',
    hex: '#3B82F6',
    hsl: 'hsl(217, 91%, 60%)',
    usage: 'Primary CTAs, active indicators, focus rings'
  },
  {
    name: 'Vortex Violet',
    role: 'Gradient & Secondary Accent',
    hex: '#8B5CF6',
    hsl: 'hsl(258, 90%, 66%)',
    usage: 'Gradients, highlight glows, 3D shader vertices'
  },
  {
    name: 'Neon Cyan',
    role: 'Telemetry & Lab Accent',
    hex: '#06B6D4',
    hsl: 'hsl(189, 94%, 43%)',
    usage: 'Real-time metrics, spatial HUD, status ticks'
  },
  {
    name: 'Off-White Pure',
    role: 'Primary Typography',
    hex: '#F8FAFC',
    hsl: 'hsl(210, 40%, 98%)',
    usage: 'Headlines, active labels, high-contrast numbers'
  },
  {
    name: 'Muted Silver',
    role: 'Secondary Typography',
    hex: '#94A3B8',
    hsl: 'hsl(215, 16%, 65%)',
    usage: 'Body copy, descriptions, editorial subtitles'
  },
  {
    name: 'Border Subdued',
    role: 'Structural Dividers',
    hex: 'rgba(255, 255, 255, 0.08)',
    hsl: 'hsla(0, 0%, 100%, 0.08)',
    usage: '1px crisp borders, gridlines, separators'
  }
];

export const TYPE_TOKENS: TypeScaleToken[] = [
  {
    tag: 'Display 01',
    name: 'Cinematic Editorial',
    family: 'Syne',
    size: '72px / 4.5rem',
    weight: '800 Bold',
    sample: 'DIGITAL EXPERIENCES BUILT DIFFERENT.'
  },
  {
    tag: 'Heading 02',
    name: 'Section Title',
    family: 'Syne',
    size: '36px / 2.25rem',
    weight: '700 SemiBold',
    sample: 'SELECTED WORK & INTERFACE ARCHIVE'
  },
  {
    tag: 'Heading 03',
    name: 'Project Card Title',
    family: 'Syne',
    size: '24px / 1.5rem',
    weight: '600 Medium',
    sample: 'VELORA LUXURY E-COMMERCE'
  },
  {
    tag: 'Body Regular',
    name: 'Paragraph Content',
    family: 'Plus Jakarta Sans',
    size: '16px / 1.0rem',
    weight: '400 Regular',
    sample: 'WORKVORTEX explores the intersection of design, technology and digital product development.'
  },
  {
    tag: 'Code & Mono',
    name: 'Technical Metric / SKU',
    family: 'JetBrains Mono',
    size: '13px / 0.8125rem',
    weight: '500 Medium',
    sample: 'SAMPLE PROJECT // LATENCY <16ms // Next.js + Three.js'
  }
];
