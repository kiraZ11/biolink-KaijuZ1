'use client';

import { Link, Profile } from '@/types/database';
import LinkCard from './LinkCard';
import ShareButton from '@/components/ShareButton';
import { motion, Variants } from 'framer-motion';

interface LinksSectionProps {
    links: Link[] | null;
    profile: Profile;
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3,
        },
    },
};

export default function LinksSection({ links, profile }: LinksSectionProps) {
    return (
        <motion.div
            className="bg-white px-6 pb-8 pt-0 space-y-5 min-h-[300px] relative z-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >

            {links?.map((link) => (
                <LinkCard key={link.id} link={link} profile={profile} />
            ))}

            {(!links || links.length === 0) && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    className="text-center py-10"
                >
                    <p className="text-gray-500 text-sm">Belum ada link yang ditambahkan.</p>
                </motion.div>
            )}

            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                }}
                className="pb-4"
            >
                <ShareButton username={profile.username} />
            </motion.div>
        </motion.div>
    );
}
