import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { CONTENT } from '../constants/content';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isOpen ? 'bg-white dark:bg-zinc-950/95 backdrop-blur-xl' : 'glass-nav'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative z-50">
        <Link
          to="/"
          className="text-xl font-display font-bold tracking-tighter hover:opacity-70 transition-opacity text-zinc-900 dark:text-white"
          onClick={() => setIsOpen(false)}
        >
          {CONTENT.HERO.NAME || "NARENDRA"}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 md:gap-8">
          <div className="flex gap-6 md:gap-8">
            {CONTENT.NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium tracking-wide transition-all duration-300 relative group ${location.pathname === item.path ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300'
                  }`}
              >
                {item.label}
                <span className={`absolute -bottom-2 left-0 h-[1px] bg-zinc-900 dark:bg-white transition-all duration-300 ${location.pathname === item.path ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-50'
                  }`} />
              </Link>
            ))}
          </div>
          <div className="pl-6 border-l border-zinc-200 dark:border-zinc-800">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Header Elements */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <button
            className="text-zinc-900 dark:text-white focus:outline-none p-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <motion.div
              initial={false}
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-20 left-0 right-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl flex flex-col overflow-hidden md:hidden"
          >
            <div className="flex flex-col items-center gap-8 pt-12 pb-20 overflow-y-auto w-full h-full">
              {CONTENT.NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.1, duration: 0.3 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-3xl font-display tracking-tight transition-all duration-300 ${location.pathname === item.path
                        ? 'text-zinc-900 dark:text-white font-medium'
                        : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                      }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
