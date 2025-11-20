
import React from 'react';
import { CONTENT } from '../constants/content';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-12 border-t border-zinc-200 dark:border-zinc-900 bg-zinc-100/50 dark:bg-black/50 mt-auto relative z-10 backdrop-blur-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500 dark:text-zinc-600 uppercase tracking-widest">
        <p>{CONTENT.CONTACT.COPYRIGHT}</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href={CONTENT.CONTACT.SOCIAL.GITHUB.url} target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">GitHub</a>
          <a href={CONTENT.CONTACT.SOCIAL.LINKEDIN.url} className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">LinkedIn</a>
          <a href={`mailto:${CONTENT.CONTACT.EMAIL}`} className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
};
