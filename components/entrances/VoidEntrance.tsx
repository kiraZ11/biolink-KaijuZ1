'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VoidEntrance({ onExplosion }: { onExplosion?: () => void }) {
    const [isVisible, setIsVisible] = useState(true);
    const [isImploding, setIsImploding] = useState(false);

    const handleStart = () => {
        setIsImploding(true);
        // Sequence: 
        // 0s: Start Implosion
        // 1.5s: Singularity Peak
        // 1.6s: BIG BANG (Trigger Content Reveal)
        setTimeout(() => {
            if (onExplosion) onExplosion();
        }, 1600);

        // 2.5s: Cleanup
        setTimeout(() => setIsVisible(false), 2500);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[100] cursor-pointer bg-black overflow-hidden flex items-center justify-center" onClick={handleStart}>

            {/* 1. Space Distortion Grid (The Gravity Well) */}
            <motion.div
                className="absolute inset-[-50%] w-[200%] h-[200%] opacity-20"
                style={{
                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
                animate={isImploding ?
                    { scale: [1, 0], rotate: 180, opacity: [0.2, 0.5, 0] } : // Sucked in
                    { rotate: 10, scale: 1.1 }
                }
                transition={isImploding ?
                    { duration: 1.5, ease: "easeIn" } :
                    { duration: 20, repeat: Infinity, repeatType: "mirror" }
                }
            />

            {/* 2. Suction Particles (Streaks) */}
            {isImploding && (
                <div className="absolute inset-0 flex items-center justify-center">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-40 bg-white/50 blur-sm"
                            style={{ rotate: i * 18, transformOrigin: 'top' }}
                            initial={{ scaleY: 0, y: 300, opacity: 0 }}
                            animate={{ scaleY: [0, 2, 0], y: 0, opacity: [0, 1, 0] }}
                            transition={{ duration: 1.2, delay: Math.random() * 0.3, ease: "circIn" }}
                        />
                    ))}
                </div>
            )}

            {/* 3. The Singularity (Black Hole Core) */}
            <motion.div
                className="relative z-20 flex items-center justify-center"
                animate={isImploding ?
                    {
                        x: [0, 5, -5, 5, -5, 0, 0], // Shake
                        scale: [1, 1.2, 0.05, 100], // Expand -> Shrink -> EXPLODE
                    } :
                    { scale: [1, 1.05, 1] }
                }
                transition={isImploding ?
                    {
                        duration: 2,
                        times: [0, 0.5, 0.8, 1], // Shake, Shrink(0.8), Explode(1)
                        ease: "anticipate"
                    } :
                    { duration: 4, repeat: Infinity }
                }
            >
                {/* Core Darkness */}
                <div className="w-48 h-48 bg-black rounded-full shadow-[0_0_100px_rgba(255,255,255,0.1)] border border-white/10 z-20" />

                {/* Event Horizon Ring (Glowing) */}
                <motion.div
                    className="absolute inset-[-20px] rounded-full border-4 border-white/50 blur-md opacity-50"
                    animate={isImploding ? { scale: [1, 0], opacity: 1 } : { scale: [1, 1.1, 1], opacity: 0.5 }}
                />
            </motion.div>

            {/* 4. Text Label */}
            <AnimatePresence>
                {!isImploding && (
                    <motion.h1
                        exit={{ opacity: 0, scale: 0, rotate: 180 }}
                        className="text-white text-xl font-bold tracking-[1em] uppercase z-30 absolute mix-blend-difference"
                    >
                        Enter Void
                    </motion.h1>
                )}
            </AnimatePresence>

            {/* 5. The BIG BANG Flash */}
            {isImploding && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ delay: 1.6, duration: 1, ease: "circOut" }}
                    className="absolute inset-0 bg-white z-[60] pointer-events-none"
                />
            )}
        </div>
    );
}
