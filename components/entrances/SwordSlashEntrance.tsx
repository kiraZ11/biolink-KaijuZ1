'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SwordSlashEntrance() {
    const [isVisible, setIsVisible] = useState(true);
    const [isSlashing, setIsSlashing] = useState(false);

    const handleStart = () => {
        setIsSlashing(true);
        setTimeout(() => {
            setIsVisible(false);
        }, 800); // Wait for animation to finish before unmounting
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[100] cursor-pointer" onClick={handleStart}>
            <AnimatePresence>
                {!isSlashing && (
                    <motion.div
                        className="absolute inset-0 bg-black flex flex-col items-center justify-center text-white z-20"
                        exit={{ opacity: 0 }}
                    >
                        <motion.h1
                            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-xl font-bold tracking-[0.5em] uppercase hover:text-red-500 transition-colors"
                        >
                            Click to Start
                        </motion.h1>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* The Slashing Panels */}
            {isSlashing && (
                <>
                    {/* Top Left Panel - Slides Up/Left */}
                    <motion.div
                        initial={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 0)' }}
                        animate={{ x: '-100%', y: '-100%' }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 bg-black z-10"
                        style={{ clipPath: 'polygon(0 0, 150% 0, 0 100%)' }} // Custom diagonal cut
                    />

                    {/* Bottom Right Panel - Slides Down/Right */}
                    <motion.div
                        initial={{ clipPath: 'polygon(100% 100%, 0 100%, 0 0, 100% 100%)' }}
                        animate={{ x: '100%', y: '100%' }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 bg-black z-10"
                        style={{ clipPath: 'polygon(100% 100%, -50% 100%, 100% 0)' }} // Custom diagonal cut
                    />

                    {/* The Slash Line Flash */}
                    <motion.div
                        initial={{ pathLength: 0, opacity: 1 }}
                        animate={{ pathLength: 1, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute inset-0 z-30 pointer-events-none"
                    >
                        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <motion.line
                                x1="0" y1="100" // Bottom Left
                                x2="100" y2="0" // Top Right
                                stroke="white"
                                strokeWidth="0.5"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                            />
                        </svg>
                    </motion.div>

                    {/* Flash Effect */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-white z-40 pointer-events-none mix-blend-overlay"
                    />
                </>
            )}
        </div>
    );
}
