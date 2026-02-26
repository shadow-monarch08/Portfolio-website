import React, { useEffect, useState, useRef } from 'react';

const SECTIONS = [
    { id: 'hero', label: 'Intro' },
    { id: 'values', label: 'Philosophy' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Selected Works' },
    { id: 'cta', label: 'Connect' }
];

export const ScrollIndicator: React.FC = () => {
    const [activeSection, setActiveSection] = useState('hero');
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        // Find all section elements
        const elements = SECTIONS.map(section => document.getElementById(section.id)).filter(Boolean) as HTMLElement[];

        // Configure intersection observer to trigger when a section takes up a significant portion of the screen
        const options = {
            root: null,
            rootMargin: '-20% 0px -40% 0px', // Adjusted to trigger earlier when scrolling down
            threshold: 0,
        };

        const callback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        observer.current = new IntersectionObserver(callback, options);

        elements.forEach(element => {
            if (observer.current) observer.current.observe(element);
        });

        // Fallback or initial state check (if loaded mid-page)
        const handleInitialScroll = () => {
            let currentSection = 'hero';
            for (const section of SECTIONS) {
                const element = document.getElementById(section.id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // If the element's top is above the middle of the viewport
                    if (rect.top <= window.innerHeight / 2) {
                        currentSection = section.id;
                    }
                }
            }
            setActiveSection(currentSection);
            window.removeEventListener('scroll', handleInitialScroll);
        }

        window.addEventListener('scroll', handleInitialScroll, { passive: true });
        handleInitialScroll();

        return () => {
            window.removeEventListener('scroll', handleInitialScroll);
            if (observer.current) observer.current.disconnect();
        };
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            // Lenis handles this natively but we can just use native scrollIntoView and Lenis intercepts it
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-6 items-end">
            {SECTIONS.map((section) => (
                <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="group flex items-center gap-4 py-2"
                    aria-label={`Scroll to ${section.label}`}
                >
                    {/* Label (Slides in on hover OR when active) */}
                    <span
                        className={`text-xs font-mono uppercase tracking-widest transition-all duration-300 
              ${activeSection === section.id
                                ? 'opacity-100 translate-x-0 text-zinc-900 dark:text-white font-bold'
                                : 'opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 text-zinc-400 dark:text-zinc-500'}`
                        }
                    >
                        {section.label}
                    </span>

                    {/* Indicator Dot/Line */}
                    <div
                        className={`w-[2px] rounded-full transition-all duration-500 ease-out
              ${activeSection === section.id
                                ? 'h-12 bg-zinc-900 dark:bg-white'
                                : 'h-4 bg-zinc-300 dark:bg-zinc-800'}`
                        }
                    />
                </button>
            ))}
        </div>
    );
};
