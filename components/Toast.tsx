import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
    isVisible: boolean;
    message: string;
    onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ isVisible, message, onClose }) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: 50, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 50, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="fixed bottom-10 right-10 z-[100] flex items-center justify-end pointer-events-none"
                >
                    <div className="toast-container pointer-events-auto shadow-2xl dark:shadow-zinc-900/50">
                        <div className="toast-inner bg-white dark:bg-zinc-950 px-6 py-3 rounded-full flex items-center gap-3">
                            <CheckCircle2 className="text-zinc-900 dark:text-white" size={20} />
                            <span className="text-zinc-800 dark:text-zinc-200 text-sm font-medium tracking-wide">
                                {message}
                            </span>
                            <button
                                onClick={onClose}
                                className="ml-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-white transition-colors focus:outline-none"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
