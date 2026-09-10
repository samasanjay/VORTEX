import React, { useState } from 'react';
import { PROJECTS } from './data/projects';
import type { Project } from './types/project';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedWork } from './components/FeaturedWork';
import { ProjectGrid } from './components/ProjectGrid';
import { DigitalLab } from './components/DigitalLab';
import { DeviceShowcase } from './components/DeviceShowcase';
import { UIArchive } from './components/UIArchive';
import { DesignSystem } from './components/DesignSystem';
import { TechStack } from './components/TechStack';
import { Experiments } from './components/Experiments';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { CaseStudyModal } from './components/CaseStudyModal';

export const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleOpenProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  const scrollToWork = () => {
    const el = document.getElementById('work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToLab = () => {
    const el = document.getElementById('lab');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white relative">
      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Navigation Header */}
      <Navbar onOpenExplore={scrollToWork} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Cinematic Hero with 3D Centerpiece */}
        <Hero
          onExploreWork={scrollToWork}
          onViewExperiments={scrollToLab}
        />

        {/* 2. Featured Projects Showcase (Velora, Taskflow, Finmate) */}
        <FeaturedWork
          projects={PROJECTS}
          onSelectProject={handleOpenProject}
        />

        {/* 3. Selected Work Directory & Interactive Filtering */}
        <ProjectGrid
          projects={PROJECTS}
          onSelectProject={handleOpenProject}
        />

        {/* 4. Digital Lab: Interactive 3D WebGL Experiments */}
        <DigitalLab />

        {/* 5. Designed For Every Screen: 3D Phone Perspective Showroom */}
        <DeviceShowcase />

        {/* 6. Interface Archive: Granular UI Studies & Micro-interactions */}
        <UIArchive />

        {/* 7. Design Language: Interactive Tokens, Typography, and Components */}
        <DesignSystem />

        {/* 8. Modern Technology Stack Foundations */}
        <TechStack />

        {/* 9. Creative Laboratory Experiments */}
        <Experiments
          projects={PROJECTS}
          onSelectProject={handleOpenProject}
        />

        {/* 10. Minimal Honest About & Studio Philosophy */}
        <AboutSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Full Awwwards-style Case Study & Interactive Screen Modal */}
      <CaseStudyModal
        project={selectedProject}
        onClose={handleCloseProject}
        onSelectAnotherProject={handleOpenProject}
        allProjects={PROJECTS}
      />
    </div>
  );
};

export default App;
