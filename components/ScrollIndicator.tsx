import React, { useEffect, useState } from 'react';

const SECTIONS = [
    { id: 'hero', label: 'Intro' },
    { id: 'values', label: 'Philosophy' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Selected Works' },
    { id: 'cta', label: 'Connect' }
];

export const ScrollIndicator: React.FC = () => {
    const [activeSection, setActiveSection] = useState('hero');

    useEffect(() => {
        const handleScroll = () => {
            let currentSection = 'hero';
            // Find the section that is most visible
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
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Trigger once on mount
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
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
                    {/* Label (Hidden by default, slides in on hover) */}
                    <span
                        className={`text-xs font-mono uppercase tracking-widest transition-all duration-300 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0
              ${activeSection === section.id
                                ? 'text-zinc-900 dark:text-white'
                                : 'text-zinc-400 dark:text-zinc-500'}`
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
