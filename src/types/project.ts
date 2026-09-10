export type ProjectType = 'SAMPLE PROJECT' | 'CONCEPT PROJECT' | 'EXPERIMENTAL CONCEPT';

export type ProjectCategory = 
  | 'E-COMMERCE EXPERIENCE'
  | 'PROJECT MANAGEMENT PLATFORM'
  | 'FINANCE DASHBOARD'
  | 'REAL ESTATE PLATFORM'
  | 'MOBILE APP'
  | 'RESTAURANT EXPERIENCE'
  | '3D DIGITAL EXPERIENCE'
  | 'AI WORKFLOW CANVAS'
  | 'SPATIAL COMPUTING';

export type FilterCategory = 
  | 'ALL'
  | 'WEBSITES'
  | 'WEB APPS'
  | 'MOBILE APPS'
  | 'SAAS'
  | 'DASHBOARDS'
  | '3D'
  | 'EXPERIMENTS';

export interface ProjectScreen {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  metrics?: { label: string; value: string }[];
  highlights?: string[];
}

export interface CaseStudySection {
  number: string;
  title: string;
  content: string;
  bullets?: string[];
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  category: ProjectCategory;
  filterTags: FilterCategory[];
  description: string;
  type: ProjectType;
  year: string;
  status: 'PROTOTYPE COMPLETED' | 'DESIGN SYSTEM FINAL' | 'ACTIVE LAB EXPERIMENT';
  technologies: string[];
  featuredImage: string;
  featuredNumber?: string;
  highlightSummary: string;
  
  // Case Study 9-Section breakdown
  overview: string;
  idea: string;
  designDirection: string;
  userExperience: string;
  interfaceNotes: string;
  responsiveDesign: string;
  techArchitecture: string;
  keyFeatures: string[];
  finalExperience: string;

  // Interactive screen viewer
  screens: ProjectScreen[];
  colorPalette: { hex: string; name: string }[];
  typography: { role: string; family: string; weight: string }[];
}

export interface UIArchiveItem {
  id: string;
  title: string;
  category: string;
  badge: 'SAMPLE UI' | 'CONCEPT UI' | 'MICRO STUDY';
  description: string;
  tags: string[];
  image: string;
  accentColor: string;
}

export interface TechItem {
  name: string;
  category: 'Frontend' | 'Backend & DB' | '3D & Motion' | 'Architecture';
  description: string;
  iconName: string;
  featuredIn: string[];
}
