import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PROJECTS } from '../data/projects';
import {
  ArrowDown,
  ArrowUpRight,
  Layers,
  Cpu,
  Compass,
  CheckCircle2,
  Sparkles,
  Smartphone
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const featured = PROJECTS.filter((p) => ['velora', 'taskflow', 'finmate'].includes(p.id));
  const recentWork = PROJECTS.slice(0, 6);

  const devices = [
    {
      id: 'fittrack',
      name: 'FITTRACK MOBILE',
      category: 'Native iOS & Android',
      description: 'Concentric biometric telemetry rings and sleep stage tracking running at 120 FPS.',
      image: '/assets/projects/fittrack.jpg',
      badge: 'SAMPLE PROJECT',
      stats: '120 FPS Physics / Reanimated 3',
      slug: 'fittrack',
    },
    {
      id: 'velora',
      name: 'VELORA LUXURY MOBILE',
      category: 'Responsive E-Commerce',
      description: 'Fluid editorial capsule browsing and frictionless slide-up bag drawer.',
      image: '/assets/projects/velora.jpg',
      badge: 'SAMPLE PROJECT',
      stats: '0.8s LCP / Next.js Edge',
      slug: 'velora',
    },
    {
      id: 'taskflow',
      name: 'TASKFLOW POCKET HUD',
      category: 'Agile Companion',
      description: 'Instant sprint triage, real-time comment mentions, and biometric unlock.',
      image: '/assets/projects/taskflow.jpg',
      badge: 'SAMPLE PROJECT',
      stats: 'Optimistic State Sync',
      slug: 'taskflow',
    },
  ];

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <section className="relative pt-32 sm:pt-40 pb-20 md:pb-28 overflow-hidden bg-radial-gradient border-b border-slate-200/80">
        <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
        
        <div className="container-vortex relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Editorial Headline */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-mono tracking-wider text-slate-700 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <span className="font-bold text-blue-600">WORKVORTEX</span>
                <span className="text-slate-300">/</span>
                <span className="font-medium text-slate-600">DIGITAL STUDIO</span>
              </div>

              <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] tracking-tight leading-[1.05] text-slate-900">
                DIGITAL<br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  EXPERIENCES
                </span><br />
                BUILT DIFFERENT.
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl font-body leading-relaxed">
                A curated collection of modern interfaces, digital products, software platforms, and mobile applications designed and engineered by <strong className="text-slate-900 font-semibold">WORKVORTEX</strong>.
              </p>

              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  to="/work"
                  className="btn-primary py-3 px-6 text-sm font-medium flex items-center gap-2 shadow-sm"
                >
                  <span>Explore The Work</span>
                  <ArrowDown className="w-4 h-4" />
                </Link>

                <Link
                  to="/ui-archive"
                  className="btn-secondary py-3 px-6 text-sm font-medium flex items-center gap-2"
                >
                  <span>UI Archive</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>

              <div className="pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2.5 text-xs text-slate-600">
                  <Layers className="w-4 h-4 text-blue-600 shrink-0" />
                  <span className="font-medium">UI/UX & Product Design</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-600">
                  <Cpu className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span className="font-medium">Modern Web & Mobile</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-600 col-span-2 sm:col-span-1">
                  <Compass className="w-4 h-4 text-sky-600 shrink-0" />
                  <span className="font-medium">Design Systems & Specs</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Mockup */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="w-full relative space-y-4">
                <div
                  onClick={() => navigate('/work/velora')}
                  className="relative rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                >
                  <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 font-medium">
                      workvortex.studio/velora
                    </div>
                    <span className="badge-sample text-[10px] py-0.5 px-2">
                      SAMPLE
                    </span>
                  </div>

                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src="/assets/projects/velora.jpg"
                      alt="Velora E-commerce preview"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <h4 className="font-display font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                        VELORA LUXURY E-COMMERCE
                      </h4>
                      <span className="text-xs text-slate-500">Next.js • TypeScript • Tailwind CSS</span>
                    </div>
                    <span className="text-xs font-semibold text-blue-600 flex items-center gap-1">
                      Case Study →
                    </span>
                  </div>
                </div>

                <div
                  onClick={() => navigate('/work/taskflow')}
                  className="hidden sm:flex items-center gap-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-lg absolute -bottom-6 -left-6 z-20 max-w-xs cursor-pointer hover:border-blue-300 transition-all"
                >
                  <img
                    src="/assets/projects/taskflow.jpg"
                    alt="Taskflow preview"
                    className="w-12 h-12 rounded-lg object-cover border border-slate-100"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">TASKFLOW PLATFORM</div>
                    <div className="text-[11px] text-slate-500">Agile sprint kanban cockpit →</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Featured Projects Spotlight */}
      <section className="py-24 bg-white border-b border-slate-200">
        <div className="container-vortex">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-slate-200">
            <div>
              <div className="text-xs font-mono text-blue-600 tracking-widest uppercase mb-2 flex items-center gap-2 font-semibold">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                CURATED SELECTION
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-slate-900">
                FEATURED DIGITAL WORK
              </h2>
            </div>
            <Link
              to="/work"
              className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-4 md:mt-0"
            >
              <span>View All Projects</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-16">
            {featured.map((project, index) => {
              const isReversed = index % 2 !== 0;

              return (
                <div
                  key={project.id}
                  className="group relative rounded-3xl border border-slate-200 bg-[#F8FAFC] overflow-hidden hover:border-blue-300 transition-all duration-500 shadow-md hover:shadow-xl"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                    
                    <div className={`lg:col-span-5 p-8 sm:p-12 space-y-6 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-4xl sm:text-5xl text-slate-300 group-hover:text-blue-500/40 transition-colors">
                          {project.featuredNumber}
                        </span>
                        <span className="badge-sample">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                          {project.type}
                        </span>
                      </div>

                      <div>
                        <div className="text-xs font-mono tracking-wider text-blue-600 uppercase font-bold mb-1">
                          {project.category}
                        </div>
                        <h3 className="font-display font-bold text-2xl sm:text-4xl text-slate-900 tracking-tight group-hover:text-blue-700 transition-colors">
                          {project.name}
                        </h3>
                      </div>

                      <p className="text-slate-600 font-body text-sm sm:text-base leading-relaxed">
                        {project.description}
                      </p>

                      <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 font-body leading-relaxed shadow-sm">
                        <strong className="text-slate-900 block font-mono text-[11px] uppercase tracking-wider mb-1">
                          Design & Tech Highlight
                        </strong>
                        {project.highlightSummary}
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="badge-tech font-mono text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="pt-2">
                        <Link
                          to={`/work/${project.slug}`}
                          className="btn-primary py-2.5 px-5 font-mono text-xs tracking-wider flex items-center gap-2 group/btn"
                        >
                          <span>VIEW CASE STUDY</span>
                          <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>

                    <div className={`lg:col-span-7 p-4 sm:p-6 lg:p-8 ${isReversed ? 'lg:order-1' : 'lg:order-2'}`}>
                      <Link
                        to={`/work/${project.slug}`}
                        className="block relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-md hover:border-blue-400 transition-all duration-300 group/img"
                      >
                        <div className="px-4 py-2.5 bg-slate-100/90 border-b border-slate-200 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                          </div>
                          <div className="text-[11px] font-mono text-slate-500 font-medium">
                            workvortex.studio/{project.slug}
                          </div>
                          <span className="text-[10px] font-mono text-blue-700 font-bold">
                            2026 RELEASE
                          </span>
                        </div>

                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                          <img
                            src={project.featuredImage}
                            alt={project.name}
                            loading="lazy"
                            className="w-full h-full object-cover object-top group-hover/img:scale-[1.03] transition-transform duration-700"
                          />
                        </div>
                      </Link>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Portfolio Directory Grid Teaser */}
      <section className="py-24 bg-[#F8FAFC] border-b border-slate-200">
        <div className="container-vortex">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-700 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>EXPLORE DIRECTORY</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight">
              RECENT DIGITAL WORK
            </h2>
            <p className="text-slate-600 font-body text-base sm:text-lg">
              Explore our diverse projects across web platforms, mobile apps, SaaS dashboards, and digital platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {recentWork.map((project) => (
              <div
                key={project.id}
                className="group glass-card flex flex-col justify-between hover:border-blue-300 transition-all duration-300"
              >
                <div>
                  <Link
                    to={`/work/${project.slug}`}
                    className="block relative aspect-[16/10] overflow-hidden bg-slate-100 border-b border-slate-200"
                  >
                    <img
                      src={project.featuredImage}
                      alt={project.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="badge-sample text-[10px]">
                        {project.type}
                      </span>
                    </div>
                  </Link>

                  <div className="p-6 space-y-3">
                    <span className="text-[11px] font-mono font-bold tracking-wider text-blue-600 uppercase block">
                      {project.category}
                    </span>
                    <Link
                      to={`/work/${project.slug}`}
                      className="font-display font-bold text-xl text-slate-900 hover:text-blue-600 transition-colors block"
                    >
                      {project.name}
                    </Link>
                    <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500">{project.year} Release</span>
                  <Link
                    to={`/work/${project.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-blue-600 hover:text-blue-800"
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/work" className="btn-secondary py-3 px-8 text-sm font-semibold">
              View All Projects in Directory →
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Designed for Every Screen */}
      <section className="py-24 bg-white border-b border-slate-200">
        <div className="container-vortex">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-700 font-semibold">
              <Smartphone className="w-3.5 h-3.5" />
              <span>RESPONSIVE ARCHITECTURE</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight">
              DESIGNED FOR EVERY SCREEN
            </h2>
            <p className="text-slate-600 font-body text-base sm:text-lg">
              Every digital interface adapts smoothly across ultra-wide monitors, laptops, tablets, and native mobile screens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {devices.map((dev) => (
              <div
                key={dev.id}
                onClick={() => navigate(`/work/${dev.slug}`)}
                className="group rounded-3xl bg-[#F8FAFC] border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <div className="relative rounded-[2.5rem] bg-slate-950 border-4 border-slate-800 p-2 shadow-xl overflow-hidden mb-6 aspect-[9/16]">
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-3.5 bg-slate-900 rounded-full z-20 flex items-center justify-between px-2.5 border border-slate-800">
                    <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                    <span className="w-1 h-1 rounded-full bg-cyan-400"></span>
                  </div>
                  <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-slate-950">
                    <img
                      src={dev.image}
                      alt={dev.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-blue-600 uppercase font-bold">
                      {dev.category}
                    </span>
                    <span className="badge-sample text-[10px]">{dev.badge}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                    {dev.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{dev.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Studio CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-center">
        <div className="container-vortex max-w-3xl space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-200 font-semibold block">
            WORKVORTEX STUDIO
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-white">
            Have a project in mind? Let’s build something exceptional.
          </h2>
          <p className="text-blue-100 text-base sm:text-lg leading-relaxed">
            We partner with innovative teams to design and engineer world-class digital products, web platforms, and user interfaces.
          </p>
          <div className="pt-4">
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full bg-white text-blue-600 font-bold text-sm shadow-xl hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
            >
              <span>Start a Project Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
