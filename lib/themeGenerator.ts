import { Profile } from '@/types/database';
import React from 'react';

export interface ThemeConfig {
    primary: string;
    background: string;
    cardBg: string;
    radiusButton: string;
    radiusCard: string;
}

// Preset Themes that map nicely to our new CSS Variables
export const THEME_PRESETS: Record<string, ThemeConfig> = {
    blue: {
        primary: '#2563eb', // blue-600
        background: '#0f172a', // slate-900
        cardBg: '#ffffff',
        radiusButton: '1rem',
        radiusCard: '1.5rem',
    },
    red: {
        primary: '#e11d48', // rose-600
        background: '#450a0a', // red-950
        cardBg: '#fff1f2',
        radiusButton: '0.5rem',
        radiusCard: '1rem',
    },
    green: {
        primary: '#059669', // emerald-600
        background: '#022c22', // emerald-950
        cardBg: '#ecfdf5',
        radiusButton: '9999px',
        radiusCard: '2rem',
    },
    purple: {
        primary: '#7c3aed', // violet-600
        background: '#2e1065', // violet-950
        cardBg: '#f5f3ff',
        radiusButton: '1rem',
        radiusCard: '1.5rem',
    },
    pink: {
        primary: '#db2777', // pink-600
        background: '#500724', // pink-950
        cardBg: '#fdf2f8',
        radiusButton: '1.5rem',
        radiusCard: '2rem',
    },
    gray: {
        primary: '#334155', // slate-700
        background: '#020617', // slate-950
        cardBg: '#f8fafc',
        radiusButton: '0.5rem',
        radiusCard: '0.5rem',
    },
    minimal: {
        primary: '#18181b', // zinc-900
        background: '#fafafa', // zinc-50
        cardBg: '#ffffff',
        radiusButton: '0px',
        radiusCard: '0px',
    },
};

export function generateThemeStyles(profile: Profile): React.CSSProperties {
    // 1. Get Base Preset (Fallback)
    const presetKey = profile.theme_color || 'blue';
    const presetFn = THEME_PRESETS[presetKey] || THEME_PRESETS.blue;

    // 2. Override with specific Button Style preference (Legacy Support)
    let radiusButton = presetFn.radiusButton;
    if (profile.button_style === 'rounded-full') radiusButton = '9999px';
    if (profile.button_style === 'rounded-none') radiusButton = '0px';
    if (profile.button_style === 'rounded-2xl') radiusButton = '1rem';

    // 3. Dynamic Design Engine (Priority Override)
    // If design_config exists, it overwrites everything else.
    const config = {
        primary: profile.design_config?.colors?.primary || presetFn.primary,
        background: profile.design_config?.colors?.background || presetFn.background,
        cardBg: profile.design_config?.colors?.cardBg || presetFn.cardBg,
        // Default border is light gray if not specified
        cardBorder: profile.design_config?.colors?.cardBorder || '#f1f5f9',
        radiusButton: profile.design_config?.shapes?.button || radiusButton,
        radiusCard: profile.design_config?.shapes?.card || presetFn.radiusCard,
    };

    // 4. Generate CSS Variables Object
    return {
        '--primary': config.primary,
        '--primary-rgb': hexToRgb(config.primary),
        '--background-page': config.background,
        '--card-bg': config.cardBg,
        '--card-border': config.cardBorder,
        '--card-foreground': getContrastYIQ(config.cardBg), // Auto-contrast text
        '--radius-button': config.radiusButton,
        '--radius-card': config.radiusCard,
        // Add other variables here as needed
    } as React.CSSProperties; // Casting to satisfy TypeScript
}

// Helper: Convert Hex to RGB for opacity usage in gradients
function hexToRgb(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '37, 99, 235';
}

// Helper: Determine explicit text color (black/white) based on background brightness
function getContrastYIQ(hexcolor: string) {
    hexcolor = hexcolor.replace("#", "");
    var r = parseInt(hexcolor.substr(0, 2), 16);
    var g = parseInt(hexcolor.substr(2, 2), 16);
    var b = parseInt(hexcolor.substr(4, 2), 16);
    var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? '#1f2937' : '#ffffff'; // Gray-800 vs White
}
