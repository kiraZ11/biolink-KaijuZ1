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
            className="bg-transparent px-6 pb-8 pt-0 space-y-5 min-h-[300px] relative z-20"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >

            {/* Nebula Clouds (Background Layer for Void Theme) */}
            {profile.design_config?.entrance_effect === 'void' && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-[10%] left-[-20%] w-[80%] h-64 bg-purple-900/20 blur-[80px] rounded-full animate-[float_15s_ease-in-out_infinite]" />
                    <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-64 bg-indigo-900/20 blur-[90px] rounded-full animate-[float_18s_ease-in-out_infinite_5s]" />
                    <div className="absolute top-[40%] left-[30%] w-[40%] h-40 bg-pink-900/10 blur-[100px] rounded-full animate-[pulse_8s_ease-in-out_infinite]" />
                </div>
            )}

            {/* Content Container */}
            <div className="relative z-10 space-y-5">
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
            </div>
        </motion.div>
    );
}
