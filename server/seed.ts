import bcrypt from 'bcryptjs';
import { db, initDatabaseSchema } from './db.js';

export async function seedDatabase(force = false) {
  try {
    initDatabaseSchema();

    if (force) {
      db.exec(`
        DELETE FROM audit_logs;
        DELETE FROM settings;
        DELETE FROM seo_metadata;
        DELETE FROM page_content;
        DELETE FROM faqs;
        DELETE FROM testimonials;
        DELETE FROM services;
        DELETE FROM lead_activity;
        DELETE FROM lead_notes;
        DELETE FROM leads;
        DELETE FROM projects;
        DELETE FROM users;
        DELETE FROM permissions;
        DELETE FROM roles;
      `);
    }

  // 1. Roles & Permissions (Always ensure roles are up to date)
  const roles = [
    { id: 'SUPER_ADMIN', name: 'Super Administrator', description: 'Full system control, users, settings, and audits' },
    { id: 'ADMIN', name: 'Administrator', description: 'Manage projects, services, leads, and website content' },
    { id: 'EDITOR', name: 'Content Editor', description: 'Create and edit projects, services, and content' },
    { id: 'SALES', name: 'Sales / Lead Manager', description: 'Manage leads, qualifications, proposals, and CRM notes' },
    { id: 'TEAM_MEMBER', name: 'Team Member', description: 'Internal engineer or staff member' },
    { id: 'PUBLIC_USER', name: 'Client / Public User', description: 'Standard registered user with access to personal account portal' },
    { id: 'VIEWER', name: 'Viewer / Stakeholder', description: 'Read-only access to dashboard and analytics' },
  ];

  for (const role of roles) {
    db.prepare('INSERT OR REPLACE INTO roles (id, name, description) VALUES (?, ?, ?)').run(
      role.id, role.name, role.description
    );
  }

  // 2. Ensure Seed Accounts
  const salt = await bcrypt.genSalt(10);
  const adminPasswordHash = await bcrypt.hash('VortexAdmin2026!', salt);
  const editorPasswordHash = await bcrypt.hash('VortexEditor2026!', salt);
  const salesPasswordHash = await bcrypt.hash('VortexSales2026!', salt);
  const clientPasswordHash = await bcrypt.hash('VortexClient2026!', salt);

  const seedUsers = [
    {
      id: 'usr_admin_01',
      email: 'admin@workvortex.com',
      name: 'Sanjay (Lead Architect)',
      hash: adminPasswordHash,
      role: 'SUPER_ADMIN',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      job: 'Founder & Principal Engineer',
      phone: '+91 98765 43210'
    },
    {
      id: 'usr_editor_01',
      email: 'editor@workvortex.com',
      name: 'Elena Vance',
      hash: editorPasswordHash,
      role: 'EDITOR',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      job: 'Lead UI/UX Designer',
      phone: '+91 98765 43211'
    },
    {
      id: 'usr_sales_01',
      email: 'sales@workvortex.com',
      name: 'Marcus Thorne',
      hash: salesPasswordHash,
      role: 'SALES',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      job: 'Client Solutions Director',
      phone: '+91 98765 43212'
    },
    {
      id: 'usr_client_01',
      email: 'client@example.com',
      name: 'David Miller',
      hash: clientPasswordHash,
      role: 'PUBLIC_USER',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      job: 'Product Director',
      phone: '+1 555 123 4567'
    }
  ];

  for (const u of seedUsers) {
    db.prepare(`
      INSERT OR IGNORE INTO users (id, email, name, password_hash, role_id, avatar_url, job_title, phone, is_active, email_verified, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, 1, 'ACTIVE')
    `).run(u.id, u.email, u.name, u.hash, u.role, u.avatar, u.job, u.phone);

    // Update status & email_verified for existing accounts
    db.prepare(`
      UPDATE users SET email_verified = 1, status = 'ACTIVE' WHERE email = ?
    `).run(u.email);
  }

  // Check if content already seeded
  const projCount = (db.prepare('SELECT COUNT(*) as count FROM projects').get() as any).count;
  if (projCount > 0 && !force) {
    return;
  }

  // 3. Projects
  const projects = [
    {
      id: 'proj_velora',
      slug: 'velora',
      title: 'VELORA LUXURY E-COMMERCE',
      client: 'Maison Velora International',
      industry: 'Haute Couture & Luxury Retail',
      category: 'WEBSITES',
      filter_tags: JSON.stringify(['ALL', 'WEBSITES', 'SAAS']),
      short_description: 'A high-end editorial fashion e-commerce concept focusing on atmospheric typography, instant bag interactions, and sub-second page performance.',
      full_overview: 'VELORA balances high-impact editorial typography with frictionless transactional UX. Built to simulate high-end brand houses that prioritize curation and aesthetic presence over clutter.',
      challenge: 'High-resolution editorial media frequently slows down luxury retail storefronts, causing checkout drop-offs and poor mobile engagement.',
      strategy: 'Engineered an edge-cached Next.js App Router architecture with slide-over optimistic bag drawers and pre-warmed image caches.',
      solution: 'Constructed an adaptive layout running at 60+ FPS with responsive lookbook hotspots, currency switching, and instant guest tokenization checkout.',
      results: '0.8s Largest Contentful Paint (LCP), 0.00 Cumulative Layout Shift, and a 42% lift in simulated checkout conversion speed.',
      type: 'SAMPLE PROJECT',
      year: '2026',
      status: 'PUBLISHED',
      featured: 1,
      featured_number: '01',
      highlight_summary: 'Haute couture editorial aesthetics with instant cart drawers, dynamic lookbooks, and fluid micro-transitions.',
      featured_image: '/assets/projects/velora.jpg',
      technologies: JSON.stringify(['Next.js 15', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Zustand']),
      metrics: JSON.stringify([
        { label: 'LCP Load Speed', value: '0.8s' },
        { label: 'Cumulative Layout Shift', value: '0.00' },
        { label: 'Conversion Velocity', value: '+42%' }
      ]),
      color_palette: JSON.stringify([
        { name: 'Obsidian Black', hex: '#0D0E11' },
        { name: 'Linen White', hex: '#F7F6F2' },
        { name: 'Brushed Brass', hex: '#C29B63' },
        { name: 'Editorial Slate', hex: '#71717A' }
      ]),
      typography: JSON.stringify([
        { role: 'Headline', family: 'Syne / Editorial Display', weight: '700' },
        { role: 'Body & Meta', family: 'Plus Jakarta Sans', weight: '400 / 500' },
        { role: 'Product SKU', family: 'JetBrains Mono', weight: '400' }
      ]),
      screens: JSON.stringify([
        {
          id: 'velora-home',
          title: 'Editorial Catalog & Bag Drawer',
          category: 'Desktop Viewport',
          description: 'Main landing lookbook featuring AW26 capsule collection with slide-over bag summary.',
          image: '/assets/projects/velora.jpg'
        }
      ]),
      client_testimonial: JSON.stringify({
        quote: 'WORKVORTEX brought our editorial luxury vision to life with blistering speed and astonishing elegance.',
        author: 'Julian Moreau',
        title: 'Creative Director, Velora Paris'
      }),
      seo_title: 'Velora Luxury E-Commerce Case Study — WORKVORTEX',
      seo_description: 'How WORKVORTEX engineered a sub-second luxury e-commerce experience with Next.js and Tailwind CSS.',
      display_order: 1
    },
    {
      id: 'proj_taskflow',
      slug: 'taskflow',
      title: 'TASKFLOW AGILE WORKSPACE',
      client: 'Taskflow Systems Inc.',
      industry: 'Enterprise Productivity & SaaS',
      category: 'SAAS',
      filter_tags: JSON.stringify(['ALL', 'SAAS']),
      short_description: 'High-density agile engineering HUD with optimistic keyboard navigation, WebSocket live cursor collaboration, and sprint analytics.',
      full_overview: 'Taskflow provides engineering squads with an unbloated task management HUD featuring zero-latency drag-and-drop boards and deep GitHub/Linear sync.',
      challenge: 'Complex project management tools suffer from state lag, bloated memory usage, and cluttered navigation panels.',
      strategy: 'Utilized lightweight local state caching, virtualized canvas scrolling, and instant optimistic mutation pipelines.',
      solution: 'Developed a high-density dark/light interface with keyboard command pallete (Cmd+K) and real-time multiplayer cursors.',
      results: 'Sub-16ms render frames, 0ms perceived optimistic action delay, and 99.99% socket sync accuracy.',
      type: 'SAMPLE PROJECT',
      year: '2026',
      status: 'PUBLISHED',
      featured: 1,
      featured_number: '02',
      highlight_summary: 'Real-time collaborative agile canvas, velocity metrics, and sub-16ms response time.',
      featured_image: '/assets/projects/taskflow.jpg',
      technologies: JSON.stringify(['React 19', 'TypeScript', 'Tailwind CSS', 'WebSockets', 'Redis']),
      metrics: JSON.stringify([
        { label: 'Optimistic Delay', value: '0ms' },
        { label: 'Frame Rendering', value: '60 FPS' },
        { label: 'Socket Uptime', value: '99.99%' }
      ]),
      color_palette: JSON.stringify([
        { name: 'Core Slate', hex: '#0F172A' },
        { name: 'Electric Cyan', hex: '#06B6D4' },
        { name: 'Indigo Accent', hex: '#6366F1' },
        { name: 'Canvas White', hex: '#FFFFFF' }
      ]),
      seo_title: 'Taskflow Agile SaaS Case Study — WORKVORTEX',
      seo_description: 'Engineering a real-time collaborative agile HUD with React and WebSockets.',
      display_order: 2
    },
    {
      id: 'proj_finmate',
      slug: 'finmate',
      title: 'FINMATE AI WEALTH PORTAL',
      client: 'Finmate Technologies Corp',
      industry: 'Fintech & Autonomous Wealth',
      category: 'SAAS',
      filter_tags: JSON.stringify(['ALL', 'SAAS', 'AUTOMATION']),
      short_description: 'Real-time multi-asset liquidity dashboard featuring predictive cash-flow forecasting, risk analysis, and automated audit reporting.',
      full_overview: 'Finmate is a treasury and algorithmic cash-flow analytics platform engineered for modern venture funds and fintech startups.',
      challenge: 'Visualizing dense multi-currency asset charts without overwhelming executive decision-makers.',
      strategy: 'Built structured modular telemetry cards, contextual alert badges, and AI-driven summary digests.',
      solution: 'Clean typography, micro-charts, and exportable investor-ready reporting dossiers.',
      results: 'Over $40M simulated treasury volume processed with instant reconciliation.',
      type: 'SAMPLE PROJECT',
      year: '2026',
      status: 'PUBLISHED',
      featured: 1,
      featured_number: '03',
      highlight_summary: 'Predictive portfolio health metrics, automated reconciliation, and executive financial HUD.',
      featured_image: '/assets/projects/finmate.jpg',
      technologies: JSON.stringify(['Next.js', 'TypeScript', 'Chart.js', 'Python FastAPI', 'PostgreSQL']),
      metrics: JSON.stringify([
        { label: 'Reconciliation Speed', value: 'Instant' },
        { label: 'Telemetry Precision', value: '99.99%' }
      ]),
      color_palette: JSON.stringify([
        { name: 'Emerald Trust', hex: '#10B981' },
        { name: 'Navy Base', hex: '#0B132B' },
        { name: 'Cool Silver', hex: '#F1F5F9' }
      ]),
      seo_title: 'Finmate AI Wealth Portal Case Study — WORKVORTEX',
      seo_description: 'Real-time multi-asset treasury dashboard engineered by WORKVORTEX.',
      display_order: 3
    },
    {
      id: 'proj_fittrack',
      slug: 'fittrack',
      title: 'FITTRACK BIOMETRIC APP',
      client: 'Aura Athletics & Health',
      industry: 'Healthtech & Mobile Wearables',
      category: 'MOBILE',
      filter_tags: JSON.stringify(['ALL', 'MOBILE']),
      short_description: 'Native iOS and Android biometrics telemetry companion with concentric activity rings and heart-rate recovery tracking.',
      full_overview: 'FitTrack connects wearable Bluetooth telemetry to an ultra-responsive native mobile app designed with haptic micro-feedback.',
      challenge: 'High-frequency telemetry stream syncing drained battery life on legacy mobile clients.',
      strategy: 'Optimized Bluetooth LE buffer polling and batch-synced telemetry records.',
      solution: '120 FPS Reanimated 3 charts with customizable daily strain targets.',
      results: '120 FPS physics with 35% reduced battery draw during workout tracking.',
      type: 'SAMPLE PROJECT',
      year: '2026',
      status: 'PUBLISHED',
      featured: 0,
      featured_number: '04',
      highlight_summary: 'Concentric biometric telemetry rings and sleep stage tracking running at 120 FPS.',
      featured_image: '/assets/projects/fittrack.jpg',
      technologies: JSON.stringify(['React Native', 'Expo', 'TypeScript', 'Reanimated 3', 'BLE']),
      metrics: JSON.stringify([
        { label: 'FPS Performance', value: '120 FPS' },
        { label: 'Battery Efficiency', value: '+35%' }
      ]),
      seo_title: 'FitTrack Mobile Health Case Study — WORKVORTEX',
      seo_description: 'Native wearable telemetry mobile companion engineered by WORKVORTEX.',
      display_order: 4
    }
  ];

  for (const proj of projects) {
    db.prepare(`
      INSERT OR REPLACE INTO projects (
        id, slug, title, client, industry, category, filter_tags, short_description, full_overview,
        challenge, strategy, solution, results, type, year, status, featured, featured_number,
        highlight_summary, featured_image, technologies, metrics, color_palette, typography,
        screens, client_testimonial, seo_title, seo_description, display_order
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?
      )
    `).run(
      proj.id, proj.slug, proj.title, proj.client, proj.industry, proj.category, proj.filter_tags, proj.short_description, proj.full_overview,
      proj.challenge, proj.strategy, proj.solution, proj.results, proj.type, proj.year, proj.status, proj.featured, proj.featured_number,
      proj.highlight_summary, proj.featured_image, proj.technologies, proj.metrics, proj.color_palette || null, proj.typography || null,
      proj.screens || null, proj.client_testimonial || null, proj.seo_title, proj.seo_description, proj.display_order
    );
  }

  // 4. Services
  const services = [
    {
      id: 'srv_web_dev',
      slug: 'website-development',
      name: 'Custom Website Development',
      short_description: 'High-speed, SEO-optimized business websites and interactive brand flagships built with React and Next.js.',
      full_description: 'We engineer blazing-fast, responsive web flagships that establish authority, captivate visitors, and convert traffic into qualified clients. Every website is custom-coded for pristine performance, sub-second load times, and structured SEO compliance.',
      icon_name: 'Globe',
      hero_image: '/assets/projects/velora.jpg',
      starting_price_inr: '₹7,000 – ₹12,000',
      starting_price_usd: '$85 – $145',
      timeline: '1–2 Weeks',
      features: JSON.stringify([
        'Sub-second Core Web Vitals (95+ Lighthouse Score)',
        'Fully responsive layouts crafted down to 360px viewports',
        'Custom interactive micro-animations and typography',
        'Structured Google Rich Snippet JSON-LD metadata',
        'Content Management System (CMS) integration'
      ]),
      deliverables: JSON.stringify([
        'Production-ready React / Next.js codebase',
        'Responsive Figma design system and wireframes',
        'Automated CI/CD Edge deployment',
        'Full source code ownership and technical handoff'
      ]),
      process_steps: JSON.stringify([
        { step: '01', title: 'Discovery & Architecture', desc: 'Analyzing brand positioning, user flows, and wireframing site structure.' },
        { step: '02', title: 'High-Fidelity UI Design', desc: 'Drafting typography hierarchies, color systems, and interactive prototypes.' },
        { step: '03', title: 'Engineering & Integration', desc: 'Writing clean, typed TypeScript components with responsive CSS.' },
        { step: '04', title: 'Edge Deployment & QA', desc: 'Conducting cross-device audit, speed optimization, and domain launch.' }
      ]),
      faqs: JSON.stringify([
        { q: 'What tech stack do you use for websites?', a: 'We primarily use React 19, Next.js, TypeScript, and modern Tailwind CSS deployed on Cloudflare or Vercel edge networks.' },
        { q: 'Will I be able to update content myself?', a: 'Yes! We integrate full CMS capabilities so you can edit text, case studies, and images without touching code.' }
      ]),
      cta_heading: 'Ready to build your flagship website?',
      cta_subtext: 'Get an estimated proposal and timeline within 24 hours.',
      display_order: 1
    },
    {
      id: 'srv_saas_apps',
      slug: 'web-applications-saas',
      name: 'Web Applications & SaaS Platforms',
      short_description: 'Scalable cloud applications, administrative portals, and customer-facing software with real-time state sync.',
      full_description: 'From multi-tenant SaaS dashboards to complex internal operations platforms, we engineer reliable cloud software with type-safe APIs, authentication gates, and responsive data visualizations.',
      icon_name: 'Layers',
      hero_image: '/assets/projects/taskflow.jpg',
      starting_price_inr: '₹15,000 – ₹30,000+',
      starting_price_usd: '$180 – $360+',
      timeline: '3–6 Weeks',
      features: JSON.stringify([
        'Role-based access control (RBAC) & secure auth (JWT/OAuth)',
        'Real-time WebSocket multiplayer collaboration & state sync',
        'High-density data tables, filters, and analytics charts',
        'Type-safe REST and GraphQL API architectures',
        'Resilient background job queues & notification engines'
      ]),
      deliverables: JSON.stringify([
        'Complete full-stack application with database schemas',
        'Interactive administrative control dashboard',
        'Comprehensive API documentation & Postman collections',
        'Staging and production deployment pipelines'
      ]),
      process_steps: JSON.stringify([
        { step: '01', title: 'Database & Schema Modeling', desc: 'Designing normalized relational schemas and security access matrices.' },
        { step: '02', title: 'Design System & HUD Layouts', desc: 'Engineering modular component hierarchies and stateful UI patterns.' },
        { step: '03', title: 'Full-Stack Implementation', desc: 'Connecting frontend state managers with scalable backend microservices.' },
        { step: '04', title: 'Load Testing & Hardening', desc: 'Simulating multi-tenant concurrency and verifying token security.' }
      ]),
      faqs: JSON.stringify([
        { q: 'Can you integrate payment gateways?', a: 'Yes, we integrate Stripe, LemonSqueezy, Razorpay, and custom subscription billing flows.' }
      ]),
      cta_heading: 'Have a SaaS product or web application to build?',
      cta_subtext: 'Discuss technical requirements and architecture with our lead engineer.',
      display_order: 2
    },
    {
      id: 'srv_uiux_design',
      slug: 'ui-ux-design-systems',
      name: 'UI/UX & Design Systems',
      short_description: 'Product interfaces, tokenized design systems, and cohesive brand identities that elevate user engagement.',
      full_description: 'We translate complex software workflows into intuitive, visually breathtaking digital products. Our design systems unify typography, tokens, spacing, and micro-interactions for seamless developer implementation.',
      icon_name: 'Sparkles',
      hero_image: '/assets/projects/velora.jpg',
      starting_price_inr: '₹5,000 – ₹10,000',
      starting_price_usd: '$60 – $120',
      timeline: '1–3 Weeks',
      features: JSON.stringify([
        'Complete tokenized Figma design libraries',
        'High-fidelity interactive clickable prototypes',
        'Comprehensive accessibility audits (WCAG 2.1 AA)',
        'Custom iconography, micro-illustrations, and dark/light modes'
      ]),
      deliverables: JSON.stringify([
        'Organized Figma files with auto-layout and components',
        'Design token export (JSON/CSS variables)',
        'Interactive prototype links for user testing'
      ]),
      process_steps: JSON.stringify([
        { step: '01', title: 'User Research & Wireframing', desc: 'Mapping user journeys and low-fidelity structural blueprints.' },
        { step: '02', title: 'Visual Direction & Tokens', desc: 'Establishing typography, color palettes, and component states.' },
        { step: '03', title: 'Component Library Assembly', desc: 'Building comprehensive design systems with variants and props.' },
        { step: '04', title: 'Handoff & Specs', desc: 'Providing pixel-perfect specs and CSS token variables to engineers.' }
      ]),
      faqs: [],
      cta_heading: 'Need an extraordinary design system?',
      cta_subtext: 'Let us build an interface that users love to touch.',
      display_order: 3
    },
    {
      id: 'srv_automation_ai',
      slug: 'business-automation-ai',
      name: 'Business Automation & AI Solutions',
      short_description: 'Intelligent lead scoring funnels, custom OpenAI assistants, CRM integrations, and automated operational pipelines.',
      full_description: 'Eliminate repetitive manual workflows with bespoke AI integrations. We build intelligent chatbot assistants, autonomous lead qualification pipelines, WhatsApp/Email alert bridges, and custom AI agents.',
      icon_name: 'Cpu',
      hero_image: '/assets/projects/finmate.jpg',
      starting_price_inr: '₹8,000 – ₹18,000',
      starting_price_usd: '$95 – $220',
      timeline: '1–3 Weeks',
      features: JSON.stringify([
        'Custom OpenAI GPT-4o integration with proprietary knowledge bases',
        'Autonomous lead scoring, qualification, and routing pipelines',
        'Webhook synchronizers for CRM, Notion, Slack, and Google Sheets',
        'Automated multi-channel client notification workflows'
      ]),
      deliverables: JSON.stringify([
        'Secure server-side AI processing API',
        'Custom prompt engineering & context embeddings',
        'CRM sync connectors and webhook listeners',
        'Monitoring dashboard and usage telemetry'
      ]),
      process_steps: JSON.stringify([
        { step: '01', title: 'Workflow Audit', desc: 'Identifying operational bottlenecks and repetitive data entry points.' },
        { step: '02', title: 'AI Pipeline Design', desc: 'Configuring custom LLM prompts, fallback engines, and token limits.' },
        { step: '03', title: 'Integration & Testing', desc: 'Connecting APIs securely with server-side key encryption.' },
        { step: '04', title: 'Monitoring & Tuning', desc: 'Observing qualification accuracy and refining heuristic thresholds.' }
      ]),
      faqs: [],
      cta_heading: 'Ready to automate your operations with AI?',
      cta_subtext: 'Talk with our automation engineers to streamline your pipeline.',
      display_order: 4
    }
  ];

  for (const srv of services) {
    db.prepare(`
      INSERT OR REPLACE INTO services (
        id, slug, name, short_description, full_description, icon_name, hero_image,
        starting_price_inr, starting_price_usd, timeline, features, deliverables,
        process_steps, faqs, cta_heading, cta_subtext, is_published, display_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)
    `).run(
      srv.id,
      srv.slug,
      srv.name,
      srv.short_description,
      srv.full_description,
      srv.icon_name || 'Globe',
      srv.hero_image || null,
      srv.starting_price_inr,
      srv.starting_price_usd,
      srv.timeline,
      typeof srv.features === 'string' ? srv.features : JSON.stringify(srv.features || []),
      typeof srv.deliverables === 'string' ? srv.deliverables : JSON.stringify(srv.deliverables || []),
      typeof srv.process_steps === 'string' ? srv.process_steps : JSON.stringify(srv.process_steps || []),
      typeof srv.faqs === 'string' ? srv.faqs : JSON.stringify(srv.faqs || []),
      srv.cta_heading || null,
      srv.cta_subtext || null,
      srv.display_order || 0
    );
  }

  // 5. Testimonials
  const testimonials = [
    {
      id: 'tst_01',
      author_name: 'Julian Moreau',
      author_role: 'Creative Director',
      author_company: 'Maison Velora International',
      author_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      quote: 'WORKVORTEX engineered our luxury storefront with such precision that our page load time dropped to 0.8s while maintaining rich visual storytelling. The conversion speed improvement was immediate.',
      rating: 5,
      is_featured: 1,
      display_order: 1
    },
    {
      id: 'tst_02',
      author_name: 'Sophia Sterling',
      author_role: 'Head of Engineering',
      author_company: 'Taskflow Systems',
      author_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      quote: 'Their deep mastery of React 19, WebSockets, and state architecture gave our team an agile HUD that feels instantaneous. The code quality and documentation were unmatched.',
      rating: 5,
      is_featured: 1,
      display_order: 2
    },
    {
      id: 'tst_03',
      author_name: 'Arjun Mehta',
      author_role: 'Founder & CEO',
      author_company: 'Finmate Analytics',
      author_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      quote: 'From custom AI lead scoring to multi-currency asset visualization, WORKVORTEX delivered on time and within budget. Truly a world-class technology partner.',
      rating: 5,
      is_featured: 1,
      display_order: 3
    }
  ];

  for (const tst of testimonials) {
    db.prepare(`
      INSERT OR REPLACE INTO testimonials (
        id, author_name, author_role, author_company, author_avatar, quote, rating, is_featured, display_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(tst.id, tst.author_name, tst.author_role, tst.author_company, tst.author_avatar, tst.quote, tst.rating, tst.is_featured, tst.display_order);
  }

  // 6. FAQs
  const faqs = [
    {
      id: 'faq_01',
      category: 'General',
      question: 'What types of projects does WORKVORTEX specialize in?',
      answer: 'We specialize in high-performance web applications, digital product design (UI/UX), corporate flagship websites, SaaS platforms, and intelligent business automation solutions built with React, TypeScript, and Next.js.',
      display_order: 1
    },
    {
      id: 'faq_02',
      category: 'Pricing',
      question: 'How do project pricing and estimates work?',
      answer: 'We offer transparent, milestone-based pricing adhering to our published starting ranges (e.g. ₹4k–₹8k for starter websites, ₹7k–₹12k for professional websites, ₹15k–₹30k+ for custom SaaS apps). You receive a binding proposal with deliverables before kickoff.',
      display_order: 2
    },
    {
      id: 'faq_03',
      category: 'Process',
      question: 'What is the typical delivery timeline?',
      answer: 'Standard websites and landing pages take 1–2 weeks. High-density design systems take 1–3 weeks. Custom web applications and multi-tenant SaaS MVPs typically range from 3 to 6 weeks.',
      display_order: 3
    },
    {
      id: 'faq_04',
      category: 'Technology',
      question: 'Do you provide full source code and intellectual property ownership?',
      answer: 'Yes, 100%. Upon project completion, all source code repositories, design assets, Figma files, and deployment configurations are transferred directly to your organization.',
      display_order: 4
    },
    {
      id: 'faq_05',
      category: 'Support',
      question: 'Do you offer ongoing maintenance and engineering support?',
      answer: 'Yes! We provide structured monthly retainer plans covering performance monitoring, security patches, feature additions, and cloud infrastructure management.',
      display_order: 5
    }
  ];

  for (const f of faqs) {
    db.prepare(`
      INSERT OR REPLACE INTO faqs (id, category, question, answer, is_published, display_order)
      VALUES (?, ?, ?, ?, 1, ?)
    `).run(f.id, f.category, f.question, f.answer, f.display_order);
  }

  // 7. Initial Seed Leads
  const initialLeads = [
    {
      id: 'lead_seed_01',
      name: 'Claire Beauchamp',
      email: 'claire@lumiere-apparel.com',
      company: 'Lumière Atelier',
      phone: '+1 (555) 234-5678',
      website: 'https://lumiere-apparel.com',
      project_type: 'E-commerce Website',
      services_required: JSON.stringify(['Custom Website Development', 'UI/UX & Design Systems']),
      budget_range: '₹14,000 – ₹18,000 / $170 – $220',
      timeline: '2–4 Weeks',
      message: 'We are launching a new sustainable luxury fashion line and need a clean editorial storefront with instant cart drawer, lookbook hotspots, and sub-second load times on mobile.',
      status: 'QUALIFIED',
      score: 92,
      quality: 'HOT',
      ai_summary: 'High-intent sustainable luxury brand launching a new collection. Clear scope, defined budget, and fast turnaround requirement.',
      ai_pain_points: JSON.stringify(['Slow mobile checkout on legacy platforms', 'Need for editorial typography & lookbook hotspots']),
      ai_recommended_service: 'E-commerce Website & Luxury Lookbook Integration',
      ai_pricing_inr: '₹14,000 – ₹18,000',
      ai_pricing_usd: '$170 – $220',
      ai_closure_prob: '85%',
      ai_outreach_draft: 'Hi Claire, thank you for reaching out to WORKVORTEX. Our team recently architected the VELORA editorial e-commerce platform achieving 0.8s LCP. We would love to share a bespoke lookbook concept for Lumière Atelier.',
      assigned_to_user_id: 'usr_sales_01'
    },
    {
      id: 'lead_seed_02',
      name: 'Rohan Deshmukh',
      email: 'rohan@apexlogistics.in',
      company: 'Apex Freight Solutions',
      phone: '+91 98200 11223',
      website: 'https://apexlogistics.in',
      project_type: 'Web Applications & SaaS',
      services_required: JSON.stringify(['Web Applications & SaaS Platforms', 'Business Automation & AI Solutions']),
      budget_range: '₹22,000 – ₹30,000+ / $265 – $360+',
      timeline: '1–2 Months',
      message: 'Looking to build an internal dispatch operations HUD for our 45-truck fleet with driver telemetry, automated invoice generation, and WhatsApp delivery alerts for clients.',
      status: 'NEW',
      score: 88,
      quality: 'HOT',
      ai_summary: 'Enterprise logistics automation project with fleet telemetry, dynamic billing, and WhatsApp messaging triggers.',
      ai_pain_points: JSON.stringify(['Manual dispatch spreadsheets', 'Lack of real-time client tracking alerts']),
      ai_recommended_service: 'Custom Logistics HUD & WhatsApp Automation Pipeline',
      ai_pricing_inr: '₹22,000 – ₹30,000+',
      ai_pricing_usd: '$265 – $360+',
      ai_closure_prob: '80%',
      ai_outreach_draft: 'Hi Rohan, we reviewed your fleet management requirements. Our experience building real-time telemetry dashboards (like Taskflow and Finmate) makes WORKVORTEX an ideal engineering partner for Apex Logistics.',
      assigned_to_user_id: 'usr_admin_01'
    }
  ];

  for (const lead of initialLeads) {
    db.prepare(`
      INSERT OR REPLACE INTO leads (
        id, name, email, phone, company, website, project_type, services_required,
        budget_range, timeline, message, status, score, quality, ai_summary,
        ai_pain_points, ai_recommended_service, ai_pricing_inr, ai_pricing_usd,
        ai_closure_prob, ai_outreach_draft, assigned_to_user_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      lead.id, lead.name, lead.email, lead.phone, lead.company, lead.website, lead.project_type, lead.services_required,
      lead.budget_range, lead.timeline, lead.message, lead.status, lead.score, lead.quality, lead.ai_summary,
      lead.ai_pain_points, lead.ai_recommended_service, lead.ai_pricing_inr, lead.ai_pricing_usd,
      lead.ai_closure_prob, lead.ai_outreach_draft, lead.assigned_to_user_id
    );

    // Initial activity
    db.prepare(`
      INSERT INTO lead_activity (id, lead_id, user_id, action, details)
      VALUES (?, ?, ?, ?, ?)
    `).run(`act_${lead.id}_01`, lead.id, 'usr_admin_01', 'QUALIFIED', `AI Qualified lead with score ${lead.score}/100 (${lead.quality})`);
  }

  // 8. Page Content CMS Key-Values
  const pageContent = [
    {
      key: 'home_hero',
      section: 'homepage',
      value: JSON.stringify({
        badge: 'WORKVORTEX / DIGITAL STUDIO',
        headline_line1: 'Engineered for',
        headline_accent: 'Digital Distinction.',
        subtext: 'We architect high-performance digital products, web applications, SaaS dashboards, and modern interfaces engineered with React 19, Next.js, and TypeScript.',
        primary_cta_text: 'Start a Project',
        primary_cta_link: '/contact',
        secondary_cta_text: 'Explore Work',
        secondary_cta_link: '/work',
        availability_status: 'Available for 2026 Collaborations'
      })
    },
    {
      key: 'home_stats',
      section: 'homepage',
      value: JSON.stringify([
        { label: 'Average Lighthouse Score', value: '98/100' },
        { label: 'Core Web Vitals LCP', value: '< 0.8s' },
        { label: 'Codebase Type Safety', value: '100% TS' },
        { label: 'Client Delivery Satisfaction', value: '100%' }
      ])
    },
    {
      key: 'studio_contact_info',
      section: 'global',
      value: JSON.stringify({
        email: 'workvortex01@gmail.com',
        phone: '+91 98765 43210',
        location: 'Global Digital Studio',
        working_hours: 'Monday – Saturday: 09:00 – 19:00 IST',
        response_time: 'Within 24 Hours'
      })
    },
    {
      key: 'social_links',
      section: 'global',
      value: JSON.stringify({
        github: 'https://github.com/workvortex',
        twitter: 'https://x.com/workvortex',
        linkedin: 'https://linkedin.com/company/workvortex',
        dribbble: 'https://dribbble.com/workvortex'
      })
    }
  ];

  for (const c of pageContent) {
    db.prepare('INSERT OR REPLACE INTO page_content (key, section, value) VALUES (?, ?, ?)').run(c.key, c.section, c.value);
  }

  // 9. Initial SEO Metadata
  const seoItems = [
    {
      route_path: '/',
      title: 'WORKVORTEX — Digital Products, UI/UX & Web Engineering Studio',
      description: 'WORKVORTEX crafts high-performance digital products, SaaS dashboards, and modern interfaces engineered with React, Next.js, and TypeScript.',
      keywords: 'digital agency, web engineering, UI/UX design, React 19, Next.js, SaaS development, TypeScript',
      canonical_url: 'https://workvortex.studio/',
      og_title: 'WORKVORTEX — Digital Products & Web Engineering Studio',
      og_description: 'Build. Automate. Scale. High-performance digital products engineered for modern businesses.',
      og_image: '/assets/workvortex-logo.png'
    },
    {
      route_path: '/work',
      title: 'Selected Work & Case Studies — WORKVORTEX',
      description: 'Explore our portfolio of high-performance web applications, luxury e-commerce, and enterprise SaaS platforms.',
      keywords: 'portfolio, case studies, web development, SaaS, e-commerce',
      canonical_url: 'https://workvortex.studio/work',
      og_title: 'Selected Work & Case Studies — WORKVORTEX',
      og_description: 'Explore our portfolio of high-performance digital products.',
      og_image: '/assets/projects/velora.jpg'
    },
    {
      route_path: '/services',
      title: 'Services & Capabilities — WORKVORTEX',
      description: 'Custom website development, UI/UX design systems, SaaS engineering, and AI automation solutions.',
      keywords: 'web services, SaaS engineering, UI design, automation, AI solutions',
      canonical_url: 'https://workvortex.studio/services',
      og_title: 'Engineering & Design Services — WORKVORTEX',
      og_description: 'Custom website development, UI/UX design systems, and AI solutions.',
      og_image: '/assets/workvortex-logo.png'
    },
    {
      route_path: '/contact',
      title: 'Start a Project — WORKVORTEX Digital Studio',
      description: 'Request a project proposal or get an instant AI-powered scope estimate from WORKVORTEX.',
      keywords: 'hire web developer, contact design studio, project inquiry, estimate',
      canonical_url: 'https://workvortex.studio/contact',
      og_title: 'Start a Project — WORKVORTEX',
      og_description: 'Connect with our engineering team for your next digital product.',
      og_image: '/assets/workvortex-logo.png'
    }
  ];

  for (const s of seoItems) {
    db.prepare(`
      INSERT OR REPLACE INTO seo_metadata (
        route_path, title, description, keywords, canonical_url, og_title, og_description, og_image
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(s.route_path, s.title, s.description, s.keywords, s.canonical_url, s.og_title, s.og_description, s.og_image);
  }

  // 10. Initial Settings
  const settings = [
    { key: 'studio_name', value: 'WORKVORTEX', description: 'Official studio brand name', is_secret: 0 },
    { key: 'studio_email', value: 'workvortex01@gmail.com', description: 'Primary business email address', is_secret: 0 },
    { key: 'studio_tagline', value: 'Build. Automate. Scale.', description: 'Studio brand slogan', is_secret: 0 },
    { key: 'openai_api_key', value: '', description: 'OpenAI API key for server-side lead qualification', is_secret: 1 },
    { key: 'enable_ai_lead_qualification', value: 'true', description: 'Enable automatic AI lead scoring on inquiry', is_secret: 0 },
    { key: 'notify_email_on_new_lead', value: 'true', description: 'Notify team via email when new inquiry is submitted', is_secret: 0 }
  ];

  for (const set of settings) {
    db.prepare('INSERT OR REPLACE INTO settings (key, value, description, is_secret) VALUES (?, ?, ?, ?)').run(
      set.key, set.value, set.description, set.is_secret
    );
  }

  // 11. Initial Audit Log
  db.prepare(`
    INSERT INTO audit_logs (id, user_id, user_name, action, resource, resource_id, details)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run('log_init_01', 'usr_admin_01', 'System Seeder', 'SYSTEM_INITIALIZE', 'DATABASE', 'vortex.sqlite', 'Initial studio dataset seeded with administrative roles, projects, services, and content.');

  console.log('[WORKVORTEX DB] Seeding completed successfully.');
  } catch (err) {
    console.warn('[WORKVORTEX DB] Seeding notice (non-fatal):', err);
  }
}

// Auto-run if executed directly
seedDatabase();
