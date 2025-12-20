'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SwordSlashEntrance() {
    const [isVisible, setIsVisible] = useState(true);
    const [stage, setStage] = useState<'idle' | 'slashing' | 'collapsing'>('idle');
    const [slashLines, setSlashLines] = useState<{ x1: string, y1: string, x2: string, y2: string, delay: number }[]>([]);
    const [shards, setShards] = useState<{ clip: string, x: number, y: number, r: number, delay: number, left: string, top: string }[]>([]);

    useEffect(() => {
        // 1. Generate 13 Dramatic Cross-Cuts (Mobile Safe)
        const lines = Array.from({ length: 13 }).map((_, i) => {
            // Pick a start side: 0=Top, 1=Right, 2=Bottom, 3=Left
            const startSide = Math.floor(Math.random() * 4);
            let endSide = (startSide + 2) % 4; // Default to opposite side

            // 30% chance to cut to adjacent side (Diagonal corner cut), 70% opposite
            if (Math.random() > 0.7) {
                endSide = (startSide + 1) % 4;
            }

            const getCoord = (side: number) => {
                const offset = Math.random() * 100;
                switch (side) {
                    case 0: return { x: `${offset}%`, y: '-10%' }; // Top
                    case 1: return { x: '110%', y: `${offset}%` }; // Right
                    case 2: return { x: `${offset}%`, y: '110%' }; // Bottom
                    case 3: return { x: '-10%', y: `${offset}%` }; // Left
                    default: return { x: '0%', y: '0%' };
                }
            };

            const start = getCoord(startSide);
            const end = getCoord(endSide);

            return {
                x1: start.x, y1: start.y,
                x2: end.x, y2: end.y,
                delay: i * 0.12
            };
        });
        setSlashLines(lines);

        // 2. Generate Shards (Responsive Grid)
        // Adjust grid size to be smaller percentages to look good on both
        const tempShards = [];
        const rows = 4;
        const cols = 4;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                // Triangle 1
                tempShards.push({
                    clip: `polygon(0 0, 100% 0, 0 100%)`,
                    left: `${c * 25}%`, top: `${r * 25}%`,
                    x: (Math.random() - 0.5) * 300, // Bigger explosion X
                    y: Math.random() * 300 + 100,    // Longer fall
                    r: (Math.random() - 0.5) * 360,
                    delay: Math.random() * 0.2
                });
                // Triangle 2
                tempShards.push({
                    clip: `polygon(100% 0, 100% 100%, 0 100%)`,
                    left: `${c * 25}%`, top: `${r * 25}%`,
                    x: (Math.random() - 0.5) * 300,
                    y: Math.random() * 300 + 100,
                    r: (Math.random() - 0.5) * 360,
                    delay: Math.random() * 0.2
                });
            }
        }
        setShards(tempShards);

    }, []);

    const handleStart = () => {
        setStage('slashing');
        setTimeout(() => setStage('collapsing'), 1800);
        setTimeout(() => setIsVisible(false), 3500);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[100] cursor-pointer bg-transparent" onClick={stage === 'idle' ? handleStart : undefined}>

            {/* Start Screen Label */}
            <AnimatePresence>
                {stage === 'idle' && (
                    <motion.div
                        exit={{ opacity: 0, transition: { duration: 0.2 } }}
                        className="absolute inset-0 bg-black z-20 flex items-center justify-center p-4"
                    >
                        <motion.div
                            animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.02, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="border border-white/30 px-8 py-4 bg-black/50 backdrop-blur-sm"
                        >
                            <h1 className="text-white text-xl md:text-3xl font-bold tracking-[0.3em] uppercase text-center">
                                Initialize
                            </h1>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Shards */}
            {stage === 'collapsing' && (
                <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
                    {shards.map((shard, i) => (
                        <motion.div
                            key={i}
                            className="absolute bg-black w-[26%] h-[26%] border-[0.5px] border-white/20"
                            style={{ left: shard.left, top: shard.top, clipPath: shard.clip }}
                            initial={{ x: 0, y: 0, rotate: 0 }}
                            animate={{
                                x: shard.x, y: shard.y, rotate: shard.r,
                                opacity: 0, scale: 0.2
                            }}
                            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                        />
                    ))}
                </div>
            )}

            {/* BG */}
            {stage !== 'collapsing' && <div className="absolute inset-0 bg-black z-10 pointer-events-none" />}

            {/* Slash Lines (Persist into collapsing to prevent gap) */}
            {(stage === 'slashing' || stage === 'collapsing') && (
                <div className="absolute inset-0 z-30 pointer-events-none filter drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]">
                    <svg className="w-full h-full" style={{ overflow: 'visible' }}>
                        {slashLines.map((line, i) => (
                            <motion.line
                                key={i}
                                x1={line.x1} y1={line.y1}
                                x2={line.x2} y2={line.y2}
                                stroke="white" strokeWidth="1.5"
                                strokeLinecap="square"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={stage === 'collapsing'
                                    ? { opacity: 0 }
                                    : { pathLength: 1.2, opacity: 1 }
                                }
                                transition={stage === 'collapsing'
                                    ? { duration: 0.2 }
                                    : {
                                        delay: i * 0.08, // Compressed delay for faster sequence
                                        duration: 0.2,
                                        ease: "circOut"
                                    }
                                }
                            />
                        ))}
                    </svg>

                    {/* Screen Color Flash (Synced with slashes only) */}
                    {stage === 'slashing' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0.2, 0] }} // Subtle flash
                            transition={{ duration: 1.2, times: [0, 0.5, 1] }} // Ends before pause
                            className="absolute inset-0 z-40 bg-white mix-blend-overlay"
                        />
                    )}
                </div>
            )}
        </div>
    );
}
