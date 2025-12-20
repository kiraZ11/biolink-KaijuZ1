'use client';

import { Profile } from '@/types/database';
import { getThemeClasses } from '@/lib/theme';
import WaveSeparator from './WaveSeparator';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ProfileHeaderProps {
    profile: Profile;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
    const themeClasses = getThemeClasses(profile.theme_color);
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const yText = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const yAvatar = useTransform(scrollYProgress, [0, 1], [0, 50]);
    const yBg = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <div ref={ref} className={`relative ${themeClasses.header} p-8 pb-32 text-center transition-all duration-500 overflow-hidden`}>

            {/* Decorative Circles with Parallax */}
            <motion.div style={{ y: yBg }} className="absolute top-[-50%] left-[-20%] w-60 h-60 bg-white/10 rounded-full blur-3xl animated-float" />
            <motion.div style={{ y: yBg }} className="absolute bottom-[-20%] right-[-10%] w-40 h-40 bg-black/5 rounded-full blur-2xl animated-float delay-1000" />

            <motion.div
                style={{ y: yAvatar, opacity }}
                className="relative z-10 flex flex-col items-center"
            >
                {/* Avatar with Ring */}
                <div className={`
           w-28 h-28 rounded-full p-1 bg-white/20 backdrop-blur-sm shadow-xl 
           ring-4 ${themeClasses.ring} ring-offset-4 ring-offset-transparent
           mb-4 overflow-hidden transform transition-transform hover:scale-105 duration-300
        `}>
                    <div className="w-full h-full bg-gray-100 rounded-full overflow-hidden relative">
                        {profile.avatar_url ? (
                            <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            <div className={`w-full h-full flex items-center justify-center text-4xl font-bold text-white ${themeClasses.button}`}>
                                {profile.full_name?.charAt(0) || '?'}
                            </div>
                        )}
                    </div>
                </div>

                <motion.div style={{ y: yText }}>
                    <h1 className="text-white text-3xl font-bold tracking-tight drop-shadow-sm">{profile.full_name}</h1>
                    <p className="text-white/95 text-sm mt-2 font-medium bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md inline-block">
                        {profile.bio}
                    </p>
                </motion.div>
            </motion.div>

            <WaveSeparator />
        </div>
    );
}
