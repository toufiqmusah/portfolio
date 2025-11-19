
import React from 'react';
import { Project } from '../types';
import { Carousel } from './Carousel';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="w-full mb-32 last:mb-0">
      {/* Grid Layout for Info + Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Left Column: Project Metadata (Sticky) */}
        <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit">
            <div className="border-t-4 border-white pt-6">
                <div className="flex items-baseline justify-between mb-4">
                    <span className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-none text-white">
                        {project.title}
                    </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8 font-mono text-sm border-b-2 border-white pb-8">
                    <div>
                        <p className="text-gray-500 uppercase text-[10px] mb-1">Year</p>
                        <p className="font-bold text-white">{project.year}</p>
                    </div>
                    <div>
                        <p className="text-gray-500 uppercase text-[10px] mb-1">Role</p>
                        <p className="font-bold text-white">{project.role}</p>
                    </div>
                </div>

                <p className="text-base md:text-lg leading-relaxed font-medium text-gray-300">
                    {project.description}
                </p>
            </div>
        </div>

        {/* Right Column: Visuals (Carousel) */}
        <div className="lg:col-span-8">
            <Carousel images={project.images} />
        </div>

      </div>
    </div>
  );
};
