'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProfileHeader from '@/components/profile/ProfileHeader';
import LinksSection from '@/components/profile/LinksSection';
import BentoLayout from '@/components/layouts/BentoLayout';
import MinimalLayout from '@/components/layouts/MinimalLayout';
import SwordSlashEntrance from '@/components/entrances/SwordSlashEntrance';
import VoidEntrance from '@/components/entrances/VoidEntrance';
import Footer from '@/components/profile/Footer';
import { Profile, Link } from '@/types/database';

interface ClientPageProps {
    profile: Profile;
    links: Link[] | null;
    themeStyles: React.CSSProperties;
}

export default function ClientPage({ profile, links, themeStyles }: ClientPageProps) {
    // State for controlling main content entrance animation
    const [contentVisible, setContentVisible] = useState(false);

    // If there is NO entrance effect, show content immediately.
    // If there IS an effect, wait for it to trigger.
    const hasEntrance = profile.design_config?.entrance_effect && profile.design_config.entrance_effect !== 'none';

    // Initialize content visibility
    useEffect(() => {
        if (!hasEntrance) {
            setContentVisible(true);
        }
    }, [hasEntrance]);

    const handleExplosion = () => {
        setContentVisible(true);
    };

    // Animation Variants
    const getAnimation = () => {
        if (!hasEntrance) return {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { duration: 0.5 }
        };

        const effect = profile.design_config?.entrance_effect;

        if (effect === 'void') {
            return {
                initial: {
                    opacity: 0,
                    scale: 2,  // Hard Zoom
                    filter: "blur(10px)"
                },
                animate: {
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)"
                },
                transition: {
                    duration: 1.5,
                    ease: [0.16, 1, 0.3, 1] // Exposure easing
                }
            };
        }

        // Default / Sword Slash
        return {
            initial: { opacity: 0, scale: 1.1, filter: "blur(10px)" },
            animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
            transition: { duration: 0.8, ease: "easeOut" }
        };
    };

    const anim = getAnimation();

    return (
        <main
            className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 mesh-bg text-slate-800"
            style={themeStyles}
        >

            {/* Container (Solid Body with Dynamic Color) */}
            <div
                className="w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/10 relative z-10 transition-all duration-500 hover:shadow-white/20"
                style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)' }}
            >

                {/* Cinematic Entrance Layer */}
                {profile.design_config?.entrance_effect === 'sword_slash' && (
                    <SwordSlashEntrance />
                )}
                {profile.design_config?.entrance_effect === 'void' && (
                    <VoidEntrance onExplosion={handleExplosion} />
                )}

                {/* Content Wrapper with "Creation" Animation */}
                <motion.div
                    initial={anim.initial}
                    animate={contentVisible ? anim.animate : anim.initial}
                    transition={anim.transition}
                >
                    <ProfileHeader profile={profile} />

                    {/* Dynamic Layout Engine */}
                    {(() => {
                        switch (profile.design_config?.layout) {
                            case 'bento':
                                return <BentoLayout links={links} profile={profile} />;
                            case 'minimal':
                                return <MinimalLayout links={links} profile={profile} />;
                            default:
                                return <LinksSection links={links} profile={profile} />;
                        }
                    })()}

                    <Footer profile={profile} />
                </motion.div>

            </div>
        </main>
    );
}
