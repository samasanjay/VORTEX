import type { Project, UIArchiveItem, TechItem } from '../types/project';

export const PROJECTS: Project[] = [
  {
    id: 'velora',
    slug: 'velora',
    name: 'VELORA',
    category: 'E-COMMERCE EXPERIENCE',
    filterTags: ['ALL', 'WEBSITES', 'SAAS'],
    description: 'A premium fashion e-commerce concept focused on visual storytelling, product discovery and seamless shopping.',
    type: 'SAMPLE PROJECT',
    year: '2026',
    status: 'PROTOTYPE COMPLETED',
    featuredNumber: '01',
    highlightSummary: 'Haute couture editorial aesthetics with high-performance instant cart interactions, dynamic lookbooks, and fluid micro-transitions.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    featuredImage: '/assets/projects/velora.jpg',
    overview: 'VELORA is an exploration into luxury fashion digital commerce, balancing high-impact editorial typography with frictionless transactional UX. Built to simulate high-end brand houses that prioritize curation and atmospheric aesthetic presence over clutter.',
    idea: 'Modern luxury retail demands an interface that recedes into the background, allowing garment textures, silhouettes, and artistic art direction to command attention while maintaining single-click cart interactions.',
    designDirection: 'Monochrome high-contrast typography, generous architectural negative space, warm off-black tone accents (#111111, #FAFAFA, #C2A374), and deliberate editorial grids.',
    userExperience: 'Predictive product search, drawer-based instant bag preview without full page reroutes, responsive filter drawers, and synchronized lookbook hot-spots.',
    interfaceNotes: 'Dual-column editorial product displays, synchronized desktop and mobile product carousel, sticky action bars, and subtle scale-up image micro-interactions.',
    responsiveDesign: 'Adaptive fluid layouts designed down to 360px mobile viewports with bottom-sheet checkout actions and native gesture support.',
    techArchitecture: 'Server-rendered Next.js App Router for instant initial load times, edge cached product catalog, PostgreSQL with Prisma ORM data modeling, and typed Zustand client state.',
    keyFeatures: [
      'Editorial lookbook with interactive garment hotspots',
      'Instant slide-over cart drawer with real-time currency conversion',
      'Dynamic size recommendation & fabric composition breakdown',
      'Frictionless multi-step checkout preview with guest tokenization',
      'Synchronized desktop multi-angle gallery and mobile swipe stack'
    ],
    finalExperience: 'A digital shopping journey that feels like thumbing through a physical luxury magazine while possessing the speed and responsiveness of a modern cloud application.',
    colorPalette: [
      { hex: '#0D0E11', name: 'Obsidian Black' },
      { hex: '#F7F6F2', name: 'Linen White' },
      { hex: '#C29B63', name: 'Brushed Brass' },
      { hex: '#71717A', name: 'Editorial Slate' }
    ],
    typography: [
      { role: 'Headline', family: 'Syne / Editorial Display', weight: '700' },
      { role: 'Body & Meta', family: 'Plus Jakarta Sans', weight: '400 / 500' },
      { role: 'Product SKU', family: 'JetBrains Mono', weight: '400' }
    ],
    screens: [
      {
        id: 'velora-home',
        title: 'Editorial Catalog & Bag Drawer',
        category: 'Desktop Viewport',
        description: 'Main landing lookbook featuring AW24 capsule collection and instant slide-in bag summary.',
        image: '/assets/projects/velora.jpg',
        metrics: [
          { label: 'Page Speed Index', value: '0.8s' },
          { label: 'Cumulative Layout Shift', value: '0.00' }
        ],
        highlights: ['Slide-out cart drawer', 'Fluid collection grid', 'Luxury typography']
      }
    ]
  },
  {
    id: 'taskflow',
    slug: 'taskflow',
    name: 'TASKFLOW',
    category: 'PROJECT MANAGEMENT PLATFORM',
    filterTags: ['ALL', 'WEB APPS', 'SAAS', 'DASHBOARDS'],
    description: 'A modern productivity and project management interface designed for teams managing complex workflows.',
    type: 'SAMPLE PROJECT',
    year: '2026',
    status: 'DESIGN SYSTEM FINAL',
    featuredNumber: '02',
    highlightSummary: 'High-density dark workspace featuring interactive Kanban boards, sprint Gantt timelines, team velocity telemetry, and keyboard shortcuts.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
    featuredImage: '/assets/projects/taskflow.jpg',
    overview: 'TASKFLOW delivers an agile workflow cockpit designed for technical teams. Eliminating bloated nested menus in favor of a unified single-canvas project workspace with realtime optimistic state updates.',
    idea: 'Engineers and product designers waste cognitive energy switching contexts. TASKFLOW unites task status, sprint timelines, and velocity metrics on a single dark-mode HUD with zero lag.',
    designDirection: 'Deep navy-slate backgrounds (#0A0F1D, #131B2E), neon electric blue highlights (#38BDF8), violet progress markers (#818CF8), and crisp 1px borders.',
    userExperience: 'Drag-and-drop Kanban columns with magnetic snap guides, keyboard navigation (Cmd+K command launcher, J/K task stepping), and collapsible sprint timelines.',
    interfaceNotes: 'Status pill badges, multi-user avatar stacks with presence indicators, interactive SVG donut charts, and contextual inspector sidebar panels.',
    responsiveDesign: 'Adaptive density controls allowing widescreen multi-column sprint views or focused single-column triage on laptop and tablet screens.',
    techArchitecture: 'Next.js server actions, WebSockets for live cursor presence, optimistic mutation rollbacks, PostgreSQL relation schema, and Tailwind CSS utility tokens.',
    keyFeatures: [
      'Multi-sprint Kanban board with inline task editing',
      'Interactive Gantt timeline with dependency linking',
      'Velocity and completion burndown telemetry charts',
      'Command palette (Cmd+K) with instantaneous fuzzy search',
      'Granular permission assignment and team workload distribution'
    ],
    finalExperience: 'A lightning-fast, visually calm workspace where engineering sprints and design handoffs flow without friction or visual noise.',
    colorPalette: [
      { hex: '#0B0F19', name: 'Deep Slate' },
      { hex: '#1E293B', name: 'Card Surface' },
      { hex: '#38BDF8', name: 'Electric Sky' },
      { hex: '#818CF8', name: 'Indigo Pulse' }
    ],
    typography: [
      { role: 'Section Titles', family: 'Syne Display', weight: '600' },
      { role: 'UI Elements', family: 'Plus Jakarta Sans', weight: '500' },
      { role: 'Code & Sprints', family: 'JetBrains Mono', weight: '500' }
    ],
    screens: [
      {
        id: 'taskflow-board',
        title: 'Unified Sprint Workspace & Telemetry',
        category: 'Web App Cockpit',
        description: 'Multi-lane Kanban board paired with sprint dependency Gantt timelines and velocity statistics.',
        image: '/assets/projects/taskflow.jpg',
        metrics: [
          { label: 'Interaction Latency', value: '< 16ms' },
          { label: 'State Sync', value: 'Optimistic' }
        ],
        highlights: ['Gantt sprint timeline', 'Kanban swimlanes', 'Team velocity HUD']
      }
    ]
  },
  {
    id: 'finmate',
    slug: 'finmate',
    name: 'FINMATE',
    category: 'FINANCE DASHBOARD',
    filterTags: ['ALL', 'WEB APPS', 'DASHBOARDS', 'SAAS'],
    description: 'A clean financial management interface with analytics, transaction tracking and reporting.',
    type: 'SAMPLE PROJECT',
    year: '2026',
    status: 'PROTOTYPE COMPLETED',
    featuredNumber: '03',
    highlightSummary: 'High-precision multi-currency balance cockpit, interactive cashflow telemetry, asset allocation visualizer, and live transaction ledger.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL'],
    featuredImage: '/assets/projects/finmate.jpg',
    overview: 'FINMATE brings institutional-grade financial clarity to personal wealth and enterprise cashflow management. It translates complex ledger numbers into clean visual charts and immediate liquidity insights.',
    idea: 'Financial data is frequently presented as overwhelming tables. FINMATE uses visual hierarchy, smooth spline curves, and categorical color mapping to make balance positions obvious at a single glance.',
    designDirection: 'Dark obsidian glass theme (#0E131F, #182032), emerald green positive trends (#10B981), warm amber warnings, and electric blue cashflow bars.',
    userExperience: 'Interactive timeline scrubbing across 1M, 6M, 1Y revenue curves, real-time transaction category filtering, and instant exportable ledger reports.',
    interfaceNotes: 'Multi-currency card modules (USD, EUR, GBP), SVG spline revenue curve, segmented donut asset allocation chart, and categorized debit/credit rows.',
    responsiveDesign: 'Reflowing financial cards that transition into swipeable balance carousels on mobile while preserving numerical readability.',
    techArchitecture: 'Next.js App Router, Decimal.js high-precision currency computation, PostgreSQL ledger storage with append-only transaction logs.',
    keyFeatures: [
      'Multi-currency balance aggregation and real-time FX rate sync',
      'Cashflow analytics with monthly inflow vs outflow telemetry',
      'Asset allocation distribution donut chart with category drill-down',
      'Transaction ledger with instant vendor categorization and receipts',
      'Encrypted reporting pipeline with scheduled PDF export'
    ],
    finalExperience: 'An executive financial portal that makes fiscal tracking feel intuitive, authoritative, and visually refined.',
    colorPalette: [
      { hex: '#0A0E17', name: 'Dark Void' },
      { hex: '#161F30', name: 'Surface Container' },
      { hex: '#10B981', name: 'Emerald Inflow' },
      { hex: '#3B82F6', name: 'Sapphire Accent' }
    ],
    typography: [
      { role: 'Financial Figures', family: 'JetBrains Mono', weight: '700' },
      { role: 'Headlines', family: 'Syne', weight: '600' },
      { role: 'Labels & Tables', family: 'Plus Jakarta Sans', weight: '400 / 600' }
    ],
    screens: [
      {
        id: 'finmate-dash',
        title: 'Executive Financial Cockpit',
        category: 'Dashboard Interface',
        description: 'Aggregated liquidity accounts, monthly revenue trend line, cashflow bar analytics, and recent transactions.',
        image: '/assets/projects/finmate.jpg',
        metrics: [
          { label: 'Calculation Accuracy', value: '100%' },
          { label: 'Render Frame Rate', value: '60 FPS' }
        ],
        highlights: ['Spline revenue curve', 'Asset allocation donut', 'Multi-currency tiles']
      }
    ]
  },
  {
    id: 'homora',
    slug: 'homora',
    name: 'HOMORA',
    category: 'REAL ESTATE PLATFORM',
    filterTags: ['ALL', 'WEBSITES', 'WEB APPS'],
    description: 'A modern property discovery platform with search, filters, property details and inquiry workflows.',
    type: 'SAMPLE PROJECT',
    year: '2026',
    status: 'DESIGN SYSTEM FINAL',
    highlightSummary: 'Architectural property discovery featuring dark cartographic map visualization, price range sliders, and luxury villa showcases.',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL'],
    featuredImage: '/assets/projects/homora.jpg',
    overview: 'HOMORA is an architectural real estate platform built for premium coastal and alpine properties. It combines immersive cartographic exploration with high-fidelity architectural specifications.',
    idea: 'Standard real estate sites suffer from intrusive ads and low-res thumbnails. HOMORA elevates property discovery to an architectural showcase with dark cartography and full-bleed photography.',
    designDirection: 'Warm gold accents (#D4AF37), deep charcoal surfaces (#121214), dark Mapbox custom styling, and clean sans typography.',
    userExperience: 'Synchronized map pan and list hover states, interactive price and bedroom filter sliders, and quick architectural spec sheets.',
    interfaceNotes: 'Custom glowing map pins with property valuations, floating property summary cards, and multi-photo architectural galleries.',
    responsiveDesign: 'Mobile bottom sheet drawer that expands from mini summary card to full scrollable property dossier on touch devices.',
    techArchitecture: 'Next.js App Router, Mapbox GL integration with custom vector tiles, PostgreSQL PostGIS spatial queries, and TypeScript strict models.',
    keyFeatures: [
      'Interactive dark-mode cartographic map with clustered price pins',
      'Dynamic spatial search with radius and polygon bounding filters',
      'Architectural property dossiers with floor plans and solar orientation',
      'Direct agent consultation inquiry workflow with calendar slotting',
      'Saved portfolio collections with real-time price change tracking'
    ],
    finalExperience: 'A real estate browsing experience that mirrors the exclusivity and quiet elegance of world-class architectural residences.',
    colorPalette: [
      { hex: '#111215', name: 'Charcoal Dark' },
      { hex: '#222328', name: 'Card Dark' },
      { hex: '#E5C07B', name: 'Warm Gold' },
      { hex: '#9CA3AF', name: 'Muted Silver' }
    ],
    typography: [
      { role: 'Brand Title', family: 'Syne', weight: '700' },
      { role: 'Property Specs', family: 'JetBrains Mono', weight: '500' },
      { role: 'Descriptions', family: 'Plus Jakarta Sans', weight: '400' }
    ],
    screens: [
      {
        id: 'homora-map',
        title: 'Coastal Map & Property Dossier',
        category: 'Spatial Real Estate UI',
        description: 'Dark-styled Mapbox coastline showing prime villa pins alongside luxury property previews.',
        image: '/assets/projects/homora.jpg',
        metrics: [
          { label: 'Spatial Query Latency', value: '45ms' },
          { label: 'Map Tile FPS', value: '60 FPS' }
        ],
        highlights: ['Dark vector map styling', 'Price pin overlays', 'Architectural card deck']
      }
    ]
  },
  {
    id: 'fittrack',
    slug: 'fittrack',
    name: 'FITTRACK',
    category: 'MOBILE APP',
    filterTags: ['ALL', 'MOBILE APPS'],
    description: 'A modern fitness tracking mobile experience focused on progress, activity and personal goals.',
    type: 'SAMPLE PROJECT',
    year: '2026',
    status: 'PROTOTYPE COMPLETED',
    highlightSummary: 'Vibrant biometric telemetry mobile app featuring neon activity rings, workout progression curves, heart rate zones, and sleep stage analysis.',
    technologies: ['React Native', 'TypeScript', 'Firebase'],
    featuredImage: '/assets/projects/fittrack.jpg',
    overview: 'FITTRACK is a native mobile health ecosystem created to turn raw biometric data from wearables into actionable daily training insights and recovery scores.',
    idea: 'Health metrics can feel dry and clinical. FITTRACK uses vibrant concentric activity rings and intuitive sleep stage visualizers to motivate continuous personal athletic improvement.',
    designDirection: 'OLED pure black canvas (#000000), neon cyan steps (#06B6D4), magenta workout energy (#EC4899), and lime green consistency metrics (#10B981).',
    userExperience: 'Haptic feedback on goal completions, fluid gesture swiping between Activity, Workout, Heart Rate, and Sleep screens, and single-tap workout logging.',
    interfaceNotes: 'Concentric SVG activity rings with glow shaders, spline heart rate telemetry, segmented sleep stage bar charts, and calendar streak heatmaps.',
    responsiveDesign: 'Engineered strictly for iOS and Android native viewports, supporting Dynamic Island status indicators and dark/light system adaptation.',
    techArchitecture: 'React Native with TypeScript, Reanimated 3 for 60fps micro-animations, Firebase Firestore offline-first data sync, and HealthKit SDK bridge.',
    keyFeatures: [
      'Concentric daily activity rings (Steps, Active Minutes, Calories)',
      'HIIT workout progression curve with muscle group breakdown',
      '24-hour resting and peak heart rate zone telemetry',
      'Sleep stage breakdown (Deep, Light, REM, Awake) with score index',
      'Weekly streak consistency calendar with habit reminders'
    ],
    finalExperience: 'A joyful, high-energy mobile application that turns daily physical discipline into an engaging visual journey.',
    colorPalette: [
      { hex: '#000000', name: 'OLED Pure Black' },
      { hex: '#06B6D4', name: 'Neon Cyan' },
      { hex: '#EC4899', name: 'Magenta Pulse' },
      { hex: '#10B981', name: 'Recovery Emerald' }
    ],
    typography: [
      { role: 'Biometric Numbers', family: 'JetBrains Mono', weight: '700' },
      { role: 'Headlines', family: 'Syne', weight: '700' },
      { role: 'Subtitles & Metrics', family: 'Plus Jakarta Sans', weight: '500' }
    ],
    screens: [
      {
        id: 'fittrack-screens',
        title: 'Complete Mobile Health Suite',
        category: 'Native Mobile App',
        description: 'Four synchronized smartphone screens showing Activity Dashboard, Workout Progression, Heart Rate, and Sleep Stages.',
        image: '/assets/projects/fittrack.jpg',
        metrics: [
          { label: 'Animation Frame Rate', value: '120 FPS' },
          { label: 'Offline Sync', value: 'Instant' }
        ],
        highlights: ['Concentric activity rings', 'Sleep stage chart', 'Heart rate telemetry']
      }
    ]
  },
  {
    id: 'spicehub',
    slug: 'spicehub',
    name: 'SPICEHUB',
    category: 'RESTAURANT EXPERIENCE',
    filterTags: ['ALL', 'WEBSITES'],
    description: 'A visually rich restaurant website concept with menu discovery, reservations and immersive food presentation.',
    type: 'SAMPLE PROJECT',
    year: '2026',
    status: 'PROTOTYPE COMPLETED',
    highlightSummary: 'Gastronomic tasting journey website with Michelin-level culinary imagery, interactive tasting course selector, and slide-in table reservation booking.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    featuredImage: '/assets/projects/spicehub.jpg',
    overview: 'SPICEHUB explores the digital presence of modern fine dining. It crafts an evocative sensory atmosphere online that precedes and complements the physical restaurant experience.',
    idea: 'A dining website should evoke the atmosphere and flavor philosophy of the restaurant before the guest ever walks through the door.',
    designDirection: 'Smoky charcoal backdrop (#101216), warm saffron and gold accents (#E5A93C), dark food photography, and timeless editorial serif titles.',
    userExperience: 'Interactive 7-course tasting menu explorer with wine pairing notes, and a persistent drawer for instant date/time table reservations.',
    interfaceNotes: 'Numbered tasting course breakdown, gold badge pricing accents, seamless date/guest picker widget, and venue story sections.',
    responsiveDesign: 'Compact mobile menu viewer with bottom drawer reservation triggers and quick call/location tap actions.',
    techArchitecture: 'Next.js App Router, optimized progressive image loading with blur placeholders, Tailwind CSS styling system, and serverless reservation email dispatch.',
    keyFeatures: [
      'Interactive 7-course tasting menu with ingredients & wine pairings',
      'Persistent table reservation drawer with date, time, and guest selectors',
      'Artisan culinary story and chef philosophy immersive section',
      'Dietary requirements and allergy filtering matrix',
      'Location map, valet instructions, and private dining inquiry module'
    ],
    finalExperience: 'An online presentation as crafted, nuanced, and memorable as a Michelin-starred dining course.',
    colorPalette: [
      { hex: '#0E1015', name: 'Smoked Charcoal' },
      { hex: '#1C2028', name: 'Card Dark' },
      { hex: '#E5A93C', name: 'Saffron Gold' },
      { hex: '#E2E8F0', name: 'Warm Parchment' }
    ],
    typography: [
      { role: 'Editorial Headline', family: 'Syne / Serif Style', weight: '700' },
      { role: 'Course Details', family: 'Plus Jakarta Sans', weight: '400 / 600' },
      { role: 'Dates & Times', family: 'JetBrains Mono', weight: '500' }
    ],
    screens: [
      {
        id: 'spicehub-menu',
        title: 'Tasting Journey & Table Booking Drawer',
        category: 'Culinary Web Interface',
        description: 'Tasting menu featuring Wagyu beef and artisanal courses alongside open table reservation drawer.',
        image: '/assets/projects/spicehub.jpg',
        metrics: [
          { label: 'Visual Engagement', value: 'High' },
          { label: 'Booking Friction', value: 'Minimal' }
        ],
        highlights: ['Tasting course listing', 'Reservation drawer', 'Gourmet plating showcase']
      }
    ]
  },
  {
    id: 'neuroflow',
    slug: 'neuroflow',
    name: 'NEUROFLOW AI',
    category: 'AI WORKFLOW CANVAS',
    filterTags: ['ALL', 'WEB APPS', 'SAAS', 'EXPERIMENTS'],
    description: 'A futuristic node-based machine learning pipeline and hyperparameter tuning canvas interface.',
    type: 'EXPERIMENTAL CONCEPT',
    year: '2026',
    status: 'ACTIVE LAB EXPERIMENT',
    highlightSummary: 'Node-based AI model architecture canvas with real-time latency telemetry, bezier wire routing, and hyperparameter parameter inspection.',
    technologies: ['Next.js', 'TypeScript', 'Three.js', 'REST APIs'],
    featuredImage: '/assets/projects/neuroflow.jpg',
    overview: 'NEUROFLOW is an experimental research interface visualizing how ML practitioners configure, train, and deploy transformer pipelines in an infinite canvas workspace.',
    idea: 'Replacing monolithic YAML configuration files with an interactive visual DAG (Directed Acyclic Graph) that displays node-level latency and training loss in real time.',
    designDirection: 'Cosmic deep space navy (#090D1A), glowing cyan connection lines (#38BDF8), parameter inspection windows, and technical data readouts.',
    userExperience: 'Infinite canvas pan/zoom, magnetic snap ports, interactive hyperparameter sliders (Learning rate, Batch size, Epochs), and live telemetry curves.',
    interfaceNotes: 'Node cards (Data Ingestion, Tokenization, Transformer Block, Loss), floating latency graph window, and live model accuracy metric cards.',
    responsiveDesign: 'Multi-touch gesture zoom and miniature viewport minimap for fluid tablet inspection.',
    techArchitecture: 'Canvas WebGL rendering engine for 1000+ node graphs with 60 FPS viewport transforms and Web Worker compute dispatch.',
    keyFeatures: [
      'Interactive node graph with bezier curved connection lines',
      'Real-time inference latency and throughput telemetry monitor',
      'Floating hyperparameter inspection and live optimizer configuration',
      'Model performance telemetry card (Accuracy 94.7%, F1 Score 0.912)',
      'Sub-graph grouping and exportable deployment configurations'
    ],
    finalExperience: 'A forward-looking AI workbench exploring how complex machine learning topologies can be designed with spatial fluidity.',
    colorPalette: [
      { hex: '#070B14', name: 'Deep Space' },
      { hex: '#111A2E', name: 'Node Container' },
      { hex: '#38BDF8', name: 'Neural Cyan' },
      { hex: '#6366F1', name: 'Optimizer Indigo' }
    ],
    typography: [
      { role: 'Technical Figures', family: 'JetBrains Mono', weight: '600' },
      { role: 'Headers', family: 'Syne', weight: '600' },
      { role: 'Node Labels', family: 'Plus Jakarta Sans', weight: '500' }
    ],
    screens: [
      {
        id: 'neuroflow-canvas',
        title: 'Neural Node Pipeline & Parameter Inspector',
        category: 'AI Spatial UI',
        description: 'Active ML pipeline DAG showing transformer blocks, optimizer settings, and real-time inference latency graph.',
        image: '/assets/projects/neuroflow.jpg',
        metrics: [
          { label: 'Graph Render Speed', value: '60 FPS' },
          { label: 'Active Pipeline Nodes', value: '14' }
        ],
        highlights: ['Node-based DAG', 'Latency telemetry graph', 'Parameter inspect window']
      }
    ]
  },
  {
    id: 'aether-spatial',
    slug: 'aether-spatial',
    name: 'AETHER SPATIAL',
    category: 'SPATIAL COMPUTING',
    filterTags: ['ALL', '3D', 'EXPERIMENTS'],
    description: 'A 3D spatial computing interface exploring volumetric windows, gesture controls, and depth-based window layering.',
    type: 'EXPERIMENTAL CONCEPT',
    year: '2026',
    status: 'ACTIVE LAB EXPERIMENT',
    highlightSummary: 'Translucent glass spatial HUD exploring pinch, swipe, and volumetric audio manipulation in a 3D computing environment.',
    technologies: ['Three.js', 'React Three Fiber', 'TypeScript', 'WebXR'],
    featuredImage: '/assets/projects/spatial.jpg',
    overview: 'AETHER SPATIAL is a laboratory exploration into the next paradigm of human-computer interaction: operating within spatial depth rather than flat 2D screens.',
    idea: 'Investigating how multi-window workflows, audio spectrum visualizers, and team communication panels feel when arranged around the user with spatial acoustic cues.',
    designDirection: 'Translucent frosted glass panels with cyan edge refraction (#06B6D4), ambient occlusion, and holographic depth planes.',
    userExperience: 'Hand tracking gesture indicators (Pinch to inspect, Swipe to reorder, Drag to reposition), curved panoramic center display, and floating widgets.',
    interfaceNotes: 'Volumetric media player, 3D model asset browser, live battery/network telemetry badges, and team chat bubble stream.',
    responsiveDesign: 'Adaptive field-of-view scaling across VR/AR headsets, desktop WebGL simulation, and touch-enabled mobile perspective mode.',
    techArchitecture: 'Three.js WebGL shaders with custom frosted glass blur passes, spatial audio web API integration, and 90Hz headset frame pacing.',
    keyFeatures: [
      'Curved panoramic spatial main interface with glass refraction',
      'Volumetric audio visualizer with 3D waveform displacement',
      'Gesture interaction telemetry (Pinch, Swipe, Volumetric Drag)',
      'Floating team communication window and system telemetry HUD',
      'Depth-sorted z-layer window management with physics momentum'
    ],
    finalExperience: 'A breathtaking glimpse into spatial computing interfaces where digital windows exist as tangible holographic glass in physical space.',
    colorPalette: [
      { hex: '#050D15', name: 'Spatial Abyss' },
      { hex: '#0B2538', name: 'Glass Refraction' },
      { hex: '#06B6D4', name: 'Holo Cyan' },
      { hex: '#E0F2FE', name: 'Luminescent Ice' }
    ],
    typography: [
      { role: 'Interface Title', family: 'Syne', weight: '700' },
      { role: 'Spatial Readouts', family: 'JetBrains Mono', weight: '600' },
      { role: 'Labels', family: 'Plus Jakarta Sans', weight: '400' }
    ],
    screens: [
      {
        id: 'aether-spatial-hud',
        title: 'Volumetric Glass Window Topology',
        category: 'Spatial UI Laboratory',
        description: 'Multi-layer floating glass panels with media visualizer, 3D project explorer, and gesture controls.',
        image: '/assets/projects/spatial.jpg',
        metrics: [
          { label: 'Spatial Frame Rate', value: '90 FPS' },
          { label: 'Glass Pass Shaders', value: '4 Passes' }
        ],
        highlights: ['Translucent glass refraction', 'Volumetric audio player', 'Gesture controls']
      }
    ]
  },
  {
    id: 'quantum-lab',
    slug: 'quantum-lab',
    name: 'QUANTUM TELEMETRY',
    category: '3D DIGITAL EXPERIENCE',
    filterTags: ['ALL', 'DASHBOARDS', '3D', 'EXPERIMENTS'],
    description: 'A high-frequency quantum computing telemetry dashboard and qubit entanglement matrix visualizer.',
    type: 'EXPERIMENTAL CONCEPT',
    year: '2026',
    status: 'ACTIVE LAB EXPERIMENT',
    highlightSummary: 'Complex 1,024 qubit entanglement heat matrix, cryogenic thermal maps, and resonance spectral frequency curves.',
    technologies: ['Next.js', 'TypeScript', 'Three.js', 'PostgreSQL'],
    featuredImage: '/assets/projects/quantum.jpg',
    overview: 'QUANTUM TELEMETRY is an experimental cockpit designed to monitor superconducting quantum processors operating at millikelvin temperatures.',
    idea: 'Translating subatomic qubit coherence times, error decay rates, and resonator frequency peaks into an intelligible, high-density scientific cockpit.',
    designDirection: 'Dark midnight backdrop (#060814), neon magenta and cyan entanglement heatmaps, and precise 1px scientific gridlines.',
    userExperience: 'Interactive frequency curve scrubbing, qubit matrix cell hover inspectors, and live cryogenic thermal telemetry updates.',
    interfaceNotes: '1024-Qubit status badge (98% active), Error rate counter (0.0051), Coherence time ticker (74.3 ms), and interactive spectral peak fit visualizer.',
    responsiveDesign: 'Multi-resolution canvas scaling ensuring matrix clarity across ultra-wide monitors down to tablet diagnostic views.',
    techArchitecture: 'WebGL shader-accelerated matrix rendering, streaming WebSocket telemetry simulation, and high-precision frequency spline generators.',
    keyFeatures: [
      'Complex 16x16 qubit entanglement probability heat matrix',
      'Superconducting quantum chip thermal temperature map (32mK)',
      'Resonator frequency spectral curves with dynamic peak annotations',
      'Exponential error decay rate telemetry curve with timestamp logging',
      'Active qubit state summary cards with coherence time stability monitors'
    ],
    finalExperience: 'A scientific instrument interface fusing futuristic cyberpunk aesthetic elegance with exact technical fidelity.',
    colorPalette: [
      { hex: '#050711', name: 'Quantum Void' },
      { hex: '#111827', name: 'Thermal Base' },
      { hex: '#EC4899', name: 'Resonance Pink' },
      { hex: '#06B6D4', name: 'Cryo Cyan' }
    ],
    typography: [
      { role: 'Scientific Values', family: 'JetBrains Mono', weight: '700' },
      { role: 'Section Titles', family: 'Syne', weight: '600' },
      { role: 'Labels', family: 'Plus Jakarta Sans', weight: '400' }
    ],
    screens: [
      {
        id: 'quantum-matrix',
        title: 'Qubit Entanglement & Spectral Telemetry',
        category: 'Scientific Cockpit',
        description: 'Active 1024-qubit status overview, entanglement matrix, thermal gradient map, and frequency resonance curves.',
        image: '/assets/projects/quantum.jpg',
        metrics: [
          { label: 'Active Qubits', value: '1,024' },
          { label: 'Operating Temp', value: '31.8 mK' }
        ],
        highlights: ['Entanglement matrix', 'Frequency spectral curves', 'Cryo thermal map']
      }
    ]
  }
];

export const UI_ARCHIVE_ITEMS: UIArchiveItem[] = [
  {
    id: 'ui-1',
    title: 'Biometric Passkey Authentication',
    category: 'Security & Auth',
    badge: 'SAMPLE UI',
    description: 'Frictionless passwordless authentication modal featuring FaceID/TouchID prompt and hardware key authorization fallback.',
    tags: ['WebAuthn', 'Passkeys', 'Security', 'Modal'],
    image: '/assets/projects/taskflow.jpg',
    accentColor: '#38BDF8'
  },
  {
    id: 'ui-2',
    title: 'Adaptive Command Palette (Cmd+K)',
    category: 'Navigation System',
    badge: 'SAMPLE UI',
    description: 'Instant fuzzy-search workflow launcher with keyboard shortcut badges, recent action memory, and inline preview cards.',
    tags: ['Command Bar', 'Keyboard UX', 'Fuzzy Search'],
    image: '/assets/projects/neuroflow.jpg',
    accentColor: '#818CF8'
  },
  {
    id: 'ui-3',
    title: 'Multi-Currency Liquidity Card Stack',
    category: 'Fintech Interface',
    badge: 'SAMPLE UI',
    description: 'Interactive debit and treasury cards with live balance toggle, masked account numbers, and quick currency swap trigger.',
    tags: ['Fintech', 'Card Stack', 'Micro-interactions'],
    image: '/assets/projects/finmate.jpg',
    accentColor: '#10B981'
  },
  {
    id: 'ui-4',
    title: 'Volumetric Audio Visualizer Widget',
    category: 'Spatial & Audio',
    badge: 'MICRO STUDY',
    description: 'Translucent 3D frequency waveform with gesture scrubbing, spatial acoustic panning, and ambient track metadata.',
    tags: ['WebAudio', 'Spatial UI', 'Volumetric'],
    image: '/assets/projects/spatial.jpg',
    accentColor: '#06B6D4'
  },
  {
    id: 'ui-5',
    title: 'Gourmet Tasting Course Inspector',
    category: 'Culinary & Hospitality',
    badge: 'SAMPLE UI',
    description: 'Interactive course selector showing sommelier wine pairings, micro-brew reductions, and allergen tolerance filter.',
    tags: ['Editorial UI', 'Gastronomy', 'Booking Drawer'],
    image: '/assets/projects/spicehub.jpg',
    accentColor: '#E5A93C'
  },
  {
    id: 'ui-6',
    title: 'Sleep Stage Chronobiology Matrix',
    category: 'Biometric Telemetry',
    badge: 'SAMPLE UI',
    description: 'Circadian sleep cycle breakdown graphing Deep, REM, and Light sleep stages against resting heart rate variability.',
    tags: ['HealthKit', 'Mobile UI', 'Data Visualization'],
    image: '/assets/projects/fittrack.jpg',
    accentColor: '#EC4899'
  },
  {
    id: 'ui-7',
    title: 'Architectural Filter & Map Sync Deck',
    category: 'Real Estate UX',
    badge: 'SAMPLE UI',
    description: 'Floating price-per-square-foot slider and bedroom selector linked in real-time to dark cartographic map pins.',
    tags: ['Mapbox GL', 'Spatial Filters', 'Luxury Real Estate'],
    image: '/assets/projects/homora.jpg',
    accentColor: '#D4AF37'
  },
  {
    id: 'ui-8',
    title: 'Machine Learning Loss & Latency HUD',
    category: 'Developer Tools',
    badge: 'MICRO STUDY',
    description: 'Live GPU compute telemetry window tracking batch throughput, gradient norm stability, and tokenization latency.',
    tags: ['MLOps', 'Telemetry', 'Canvas HUD'],
    image: '/assets/projects/quantum.jpg',
    accentColor: '#A855F7'
  }
];

export const TECH_STACK: TechItem[] = [
  {
    name: 'Next.js',
    category: 'Frontend',
    description: 'Full-stack React framework with App Router, server components, edge rendering, and optimized asset pipelines.',
    iconName: 'Globe',
    featuredIn: ['VELORA', 'TASKFLOW', 'FINMATE', 'HOMORA', 'SPICEHUB']
  },
  {
    name: 'React 19',
    category: 'Frontend',
    description: 'Modern component architecture with concurrent rendering, custom hooks, and reactive client state.',
    iconName: 'Code',
    featuredIn: ['All Projects']
  },
  {
    name: 'TypeScript',
    category: 'Frontend',
    description: 'End-to-end type safety, robust domain modeling, compile-time contract enforcement, and strict DX.',
    iconName: 'ShieldCheck',
    featuredIn: ['All Projects']
  },
  {
    name: 'Three.js & WebGL',
    category: '3D & Motion',
    description: 'High-performance GPU shader rendering, 3D geometric meshes, particle simulations, and camera controllers.',
    iconName: 'Box',
    featuredIn: ['DIGITAL LAB', 'AETHER SPATIAL', 'QUANTUM TELEMETRY']
  },
  {
    name: 'Tailwind CSS',
    category: 'Frontend',
    description: 'Atomic design tokens, fine-grained responsive utilities, dark mode support, and micro-interaction styling.',
    iconName: 'Palette',
    featuredIn: ['VELORA', 'TASKFLOW', 'SPICEHUB']
  },
  {
    name: 'React Native',
    category: 'Frontend',
    description: 'Cross-platform mobile applications with 120 FPS native gesture physics, HealthKit bridges, and offline sync.',
    iconName: 'Smartphone',
    featuredIn: ['FITTRACK']
  },
  {
    name: 'PostgreSQL & Prisma',
    category: 'Backend & DB',
    description: 'Relational data modeling, PostGIS spatial queries, ACID transactional integrity, and type-safe query generation.',
    iconName: 'Database',
    featuredIn: ['VELORA', 'TASKFLOW', 'FINMATE', 'HOMORA']
  },
  {
    name: 'Node.js',
    category: 'Backend & DB',
    description: 'Event-driven server runtime for API routing, streaming WebSockets, and background worker queues.',
    iconName: 'Server',
    featuredIn: ['TASKFLOW', 'FINMATE', 'HOMORA']
  },
  {
    name: 'REST & WebSockets',
    category: 'Architecture',
    description: 'Standardized HTTP endpoints, real-time live presence synchronization, and low-latency bidirectional telemetry.',
    iconName: 'Radio',
    featuredIn: ['TASKFLOW', 'NEUROFLOW', 'QUANTUM TELEMETRY']
  },
  {
    name: 'Git & CI/CD',
    category: 'Architecture',
    description: 'Version control workflows, automated linting, type validation, and preview deployment pipelines.',
    iconName: 'GitBranch',
    featuredIn: ['All Projects']
  }
];
