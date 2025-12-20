'use client';

import { Link, Profile } from '@/types/database';
import { motion } from 'framer-motion';

interface LayoutProps {
    links: Link[] | null;
    profile: Profile;
}

export default function MinimalLayout({ links, profile }: LayoutProps) {
    if (!links) return null;

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariant = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="w-full max-w-md mx-auto px-8 py-8 flex flex-col gap-6"
        >
            {links.map((link) => (
                <motion.a
                    key={link.id}
                    variants={itemVariant}
                    href={`/api/click?url=${encodeURIComponent(link.url)}&id=${link.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between border-b border-gray-200 pb-2 hover:border-black transition-colors"
                >
                    <span className="text-lg font-medium text-gray-800 group-hover:text-black">
                        {link.label}
                    </span>
                    <span className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0">
                        →
                    </span>
                </motion.a>
            ))}
        </motion.div>
    );
}
