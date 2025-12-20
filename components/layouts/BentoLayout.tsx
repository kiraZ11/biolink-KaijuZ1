'use client';

import { Link, Profile } from '@/types/database';
import LinkCard from '@/components/profile/LinkCard';
import { motion } from 'framer-motion';

interface LayoutProps {
    links: Link[] | null;
    profile: Profile;
}

export default function BentoLayout({ links, profile }: LayoutProps) {
    if (!links) return null;

    // Animation Variants
    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="w-full max-w-md mx-auto px-6 py-6 pb-24 grid grid-cols-2 gap-3"
        >
            {links.map((link) => (
                <div
                    key={link.id}
                    className={link.is_highlighted ? 'col-span-2' : 'col-span-1'}
                >
                    <LinkCard link={link} profile={profile} />
                </div>
            ))}
        </motion.div>
    );
}
