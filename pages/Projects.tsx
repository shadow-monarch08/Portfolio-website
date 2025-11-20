
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { RevealOnScroll } from '../components/RevealOnScroll';
import { CONTENT } from '../constants/content';

export const Projects: React.FC = () => {
  return (
    <div className="min-h-screen w-full pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <div className="mb-20 border-b border-zinc-200 dark:border-zinc-800 pb-10 transition-colors duration-300">
            <h1 className="text-5xl md:text-7xl font-display text-zinc-900 dark:text-white mb-6">Index.</h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg font-light max-w-xl">
              A curated archive of technical projects and AI implementations.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {CONTENT.PROJECTS.map((project, index) => (
            <RevealOnScroll key={project.id} delay={index * 100} className="h-full">
              <article className="group cursor-pointer h-full">
                <div className="relative overflow-hidden aspect-[4/3] mb-8 bg-zinc-100 dark:bg-zinc-900 shadow-lg dark:shadow-none">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover opacity-90 dark:opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-white/10 dark:bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                
                <div className="flex justify-between items-start border-t border-zinc-200 dark:border-zinc-800 pt-6 group-hover:border-zinc-900 dark:group-hover:border-white transition-colors duration-500">
                  <div>
                    <h3 className="text-2xl md:text-3xl text-zinc-900 dark:text-white font-display mb-2 group-hover:translate-x-2 transition-transform duration-300">
                      {project.title}
                    </h3>
                    <p className="text-sm text-zinc-500 font-mono mb-4">{project.category} — {project.year}</p>
                    <p className="text-zinc-600 dark:text-zinc-400 font-light text-sm leading-relaxed max-w-md mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map(t => (
                        <span key={t} className="text-[10px] uppercase tracking-wider border border-zinc-300 dark:border-zinc-800 text-zinc-600 dark:text-zinc-500 px-2 py-1 rounded-full">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowUpRight className="text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
};
