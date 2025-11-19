import React from 'react';
import { PROJECTS } from './constants';
import { ProjectCard } from './components/ProjectCard';
import { Hero } from './components/Hero';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black overflow-x-hidden">
      
      {/* Container */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 pb-32">
        
        {/* Header / Hero */}
        <Hero name="Toufiq Musah" />

        {/* Main Content - Project List */}
        <main>
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </main>

        {/* Footer Area */}
        <footer className="mt-40 border-t-8 border-white pt-12 pb-24">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
                <div className="font-black text-4xl md:text-6xl uppercase leading-none mb-8 md:mb-0 tracking-tighter">
                    Let's<br/>Build<br/>Future
                </div>
                <div className="font-mono text-right text-gray-400 text-sm">
                    <p>toufiqmusah32@gmail.com</p>
                    <p>+233 26 613 4416</p>
                    <a href="https://toufiqmusah.github.io" className="hover:text-white underline decoration-1 underline-offset-4">toufiqmusah.github.io</a>
                    <p className="mt-4 text-xs opacity-50">© {new Date().getFullYear()} Toufiq Musah.</p>
                </div>
            </div>
        </footer>

      </div>
    </div>
  );
};

export default App;