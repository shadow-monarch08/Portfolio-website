
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '../components/Button';
import { RevealOnScroll } from '../components/RevealOnScroll';
import { CONTENT } from '../constants/content';

export const Home: React.FC = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-6 pt-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto w-full z-10">
          <p className="text-zinc-500 text-sm tracking-[0.2em] mb-8 animate-fade-in">{CONTENT.HERO.PRE_TITLE}</p>
          <h1 className="text-6xl md:text-9xl font-display font-medium tracking-tight leading-[0.9] text-zinc-900 dark:text-white mb-12 animate-fade-in-up">
            {CONTENT.HERO.TITLE_PREFIX} <br />
            <span className="text-zinc-400 dark:text-zinc-500">{CONTENT.HERO.TITLE_SUFFIX}</span>
          </h1>
          
          <div className="max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 font-light leading-relaxed mb-12">
              {CONTENT.HERO.DESCRIPTION}
            </p>
            <div className="flex flex-wrap gap-6">
              <Link to="/projects">
                <Button variant="primary">{CONTENT.HERO.CTA_PRIMARY}</Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline">{CONTENT.HERO.CTA_SECONDARY}</Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Abstract Background Element */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[40vw] h-[40vw] bg-zinc-200 dark:bg-zinc-900 rounded-full blur-[120px] opacity-20 pointer-events-none transition-colors duration-500" />
        
        <div className="absolute bottom-12 left-6 md:left-1/2 md:-translate-x-1/2 animate-pulse-slow text-zinc-400 dark:text-zinc-600">
          <ChevronDown size={24} />
        </div>
      </section>

      {/* Value Statement */}
      <section className="py-32 border-t border-zinc-200 dark:border-zinc-900 bg-zinc-100/50 dark:bg-zinc-950/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12">
          <RevealOnScroll className="md:col-span-4">
             <h2 className="text-sm text-zinc-500 uppercase tracking-widest mb-4">{CONTENT.PHILOSOPHY.TITLE}</h2>
          </RevealOnScroll>
          <RevealOnScroll className="md:col-span-8" delay={200}>
            <p className="text-3xl md:text-5xl font-display text-zinc-800 dark:text-zinc-200 leading-tight">
              {CONTENT.PHILOSOPHY.TEXT}
            </p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-32 border-t border-zinc-200 dark:border-zinc-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
           <RevealOnScroll>
             <h2 className="text-sm text-zinc-500 uppercase tracking-widest mb-16">Technical Matrix</h2>
           </RevealOnScroll>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
             {CONTENT.SKILLS.map((group, index) => (
               <RevealOnScroll key={group.category} delay={index * 100} className="group">
                 <h3 className="text-xl text-zinc-900 dark:text-white font-medium mb-8 border-l-2 border-zinc-300 dark:border-zinc-800 pl-4 group-hover:border-zinc-900 dark:group-hover:border-white transition-colors duration-500">
                   {group.category}
                 </h3>
                 <ul className="space-y-4">
                   {group.items.map((skill) => (
                     <li key={skill} className="text-zinc-600 dark:text-zinc-400 text-lg font-light hover:text-zinc-900 dark:hover:text-white transition-colors cursor-default">
                       {skill}
                     </li>
                   ))}
                 </ul>
               </RevealOnScroll>
             ))}
           </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-32 border-t border-zinc-200 dark:border-zinc-900 bg-zinc-100/50 dark:bg-zinc-950/30 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <RevealOnScroll>
            <div className="flex justify-between items-end mb-20">
              <h2 className="text-sm text-zinc-500 uppercase tracking-widest">Selected Works</h2>
              <Link to="/projects" className="hidden md:flex items-center gap-2 text-zinc-900 dark:text-white text-sm hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors">
                Full Index <ArrowRight size={16} />
              </Link>
            </div>
          </RevealOnScroll>

          <div className="space-y-32">
            {CONTENT.PROJECTS.map((project, index) => (
              <RevealOnScroll key={project.id}>
                <div className={`flex flex-col md:flex-row gap-12 items-center group ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="w-full md:w-3/5 overflow-hidden shadow-2xl shadow-zinc-200/50 dark:shadow-none">
                    <img 
                      src={project.homeImage || project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-[400px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out transform group-hover:scale-105"
                    />
                  </div>
                  <div className="w-full md:w-2/5">
                    <span className="text-xs text-blue-500 font-mono mb-4 block">0{index + 1} // {project.category}</span>
                    <h3 className="text-4xl md:text-5xl font-display text-zinc-900 dark:text-white mb-6">{project.title}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 font-light leading-relaxed mb-8">
                      Award-winning innovation. Leveraging advanced stack capabilities to deliver seamless user experiences.
                    </p>
                    <Link to="/projects" className="text-zinc-900 dark:text-white border-b border-zinc-300 dark:border-zinc-700 pb-1 hover:border-zinc-900 dark:hover:border-white transition-all">
                      Explore Case Study
                    </Link>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 border-t border-zinc-200 dark:border-zinc-900 flex flex-col items-center justify-center text-center px-6 transition-colors duration-300">
        <RevealOnScroll>
          <h2 className="text-5xl md:text-8xl font-display text-zinc-900 dark:text-white mb-12 tracking-tight">
            Let's Collaborate.
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={200}>
          <Link to="/contact">
            <Button variant="primary" className="px-12 py-5 text-lg">
              {CONTENT.HERO.CTA_SECONDARY}
            </Button>
          </Link>
        </RevealOnScroll>
      </section>
    </div>
  );
};
