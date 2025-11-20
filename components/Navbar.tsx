
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { CONTENT } from '../constants/content';

export const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="text-xl font-display font-bold tracking-tighter hover:opacity-70 transition-opacity text-zinc-900 dark:text-white">
          {CONTENT.HERO.NAME || "NARENDRA"}
        </Link>

        <div className="flex items-center gap-6 md:gap-8">
          <div className="flex gap-6 md:gap-8">
            {CONTENT.NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium tracking-wide transition-all duration-300 relative group ${
                  location.pathname === item.path ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-2 left-0 h-[1px] bg-zinc-900 dark:bg-white transition-all duration-300 ${
                  location.pathname === item.path ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-50'
                }`} />
              </Link>
            ))}
          </div>
          <div className="pl-6 border-l border-zinc-200 dark:border-zinc-800">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};
