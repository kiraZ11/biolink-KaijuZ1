'use client';

import { Profile } from '@/types/database';
import WaveSeparator from './WaveSeparator';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ProfileHeaderProps {
    profile: Profile;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    });

    const yText = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const yAvatar = useTransform(scrollYProgress, [0, 1], [0, 50]);
    const yBg = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const isVoid = profile.design_config?.entrance_effect === 'void';

    // Header changes appearance based on mode
    const headerStyle = isVoid ?
        { background: 'transparent' } :
        { backgroundColor: 'var(--primary)' };

    return (
        <div
            ref={ref}
            className={`relative p-8 pb-32 text-center transition-all duration-500 overflow-hidden ${isVoid ? 'text-white' : ''}`}
            style={headerStyle}
        >

            {/* Decorative Circles with Parallax */}
            <motion.div style={{ y: yBg }} className="absolute top-[-50%] left-[-20%] w-60 h-60 bg-white/10 rounded-full blur-3xl animated-float" />
            <motion.div style={{ y: yBg }} className="absolute bottom-[-20%] right-[-10%] w-40 h-40 bg-black/5 rounded-full blur-2xl animated-float delay-1000" />

            <motion.div
                style={{ y: yAvatar, opacity }}
                className="relative z-10 flex flex-col items-center"
            >
                {/* Avatar with Ring */}
                <div className={`
                    w-28 h-28 rounded-full p-1 backdrop-blur-sm shadow-xl 
                    mb-4 overflow-hidden transform transition-transform hover:scale-105 duration-300
                    ${isVoid ? 'bg-black/50 ring-2 ring-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.4)]' : 'bg-white/20 ring-4 ring-primary-foreground/30'}
                `}>
                    <div className="w-full h-full bg-gray-100 rounded-full overflow-hidden relative">
                        {profile.avatar_url ? (
                            <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-primary bg-primary-foreground">
                                {profile.full_name?.charAt(0) || '?'}
                            </div>
                        )}
                    </div>
                </div>

                <motion.div style={{ y: yText }} className="flex flex-col items-center">
                    <h1 className="text-white text-3xl font-bold tracking-tight drop-shadow-sm">{profile.full_name}</h1>
                    <p className="text-white/95 text-sm mt-2 font-medium bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md inline-block">
                        {profile.bio}
                    </p>

                    {/* vCard Button */}
                    <motion.a
                        href={`/api/vcard?username=${profile.username}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-4 flex items-center gap-2 px-4 py-2 bg-white/10 text-white text-xs font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-colors"
                    >
                        Save Contact
                    </motion.a>
                </motion.div>
            </motion.div>

            {/* Separator: Event Horizon for Void, Wave for Normal */}
            {isVoid ? (
                <div className="absolute bottom-[-1px] left-0 w-full flex items-center justify-center overflow-hidden h-40 pointer-events-none z-20">

                    {/* The Active Accretion Disk (Rotating Glow) - Smoother & Larger */}
                    <div className="absolute bottom-[-150px] w-[300%] h-[300%] bg-[radial-gradient(circle,_transparent_40%,_rgba(168,85,247,0.08)_50%,_transparent_70%)] animate-[accretion-spin_60s_linear_infinite]" />

                    {/* The Horizon Arc (Massive & Soft) */}
                    <div className="absolute bottom-[-80px] w-[250%] h-[160px] rounded-[50%] 
                        bg-black
                        shadow-[0_-8px_40px_rgba(168,85,247,0.6),_inset_0_20px_40px_rgba(0,0,0,1)]
                        border-t-[1px] border-purple-500/50
                        animate-[horizon-pulse_8s_ease-in-out_infinite] z-10"
                    />

                    {/* Floating Particles (Stardust) - RESTORED */}
                    <div className="absolute bottom-10 left-[20%] w-1 h-1 bg-purple-400 rounded-full animate-[float_4s_ease-in-out_infinite] z-20" />
                    <div className="absolute bottom-14 right-[30%] w-1.5 h-1.5 bg-white rounded-full animate-[float_7s_ease-in-out_infinite_1s] z-20" />
                    <div className="absolute bottom-8 left-[60%] w-1 h-1 bg-indigo-400 rounded-full animate-[float_5s_ease-in-out_infinite_0.5s] z-20" />
                    <div className="absolute bottom-12 right-[10%] w-1 h-1 bg-purple-300 rounded-full animate-[float_6s_ease-in-out_infinite_1.5s] z-20" />

                    {/* Atmospheric Haze overlay for blending (Single Layer, slightly reduced opacity) */}
                    <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-30" />

                </div>
            ) : (<WaveSeparator />
            )}
        </div>
    );
}
