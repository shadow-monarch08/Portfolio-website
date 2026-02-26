import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText } from 'lucide-react';

interface ResumeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
    // Lock body scroll when modal is open
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

    return (
        <AnimatePresence>
            {isOpen && (
                <React.Fragment>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 md:p-12 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="w-full h-full max-w-5xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden pointer-events-auto"
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800">
                                <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-medium">
                                    <FileText size={20} />
                                    <span>Resume</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <a
                                        href="/My_resume.pdf"
                                        download="Narendra_Resume.pdf"
                                        className="flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
                                    >
                                        <Download size={16} />
                                        <span className="hidden sm:inline">Download</span>
                                    </a>
                                    <button
                                        onClick={onClose}
                                        className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none"
                                        aria-label="Close modal"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* PDF Viewer */}
                            <div className="flex-1 bg-zinc-100 dark:bg-zinc-950 w-full h-full relative overflow-hidden" data-lenis-prevent>
                                <iframe
                                    src="/My_resume.pdf#view=FitH"
                                    className="w-full h-full absolute inset-0 border-none"
                                    title="Resume PDF Viewer"
                                    style={{ pointerEvents: 'auto' }}
                                />
                            </div>
                        </motion.div>
                    </div>
                </React.Fragment>
            )}
        </AnimatePresence>
    );
};
