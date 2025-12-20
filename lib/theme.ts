import { ThemeColor } from '@/types/database';

export const getButtonStyle = (style: string) => {
    switch (style) {
        case 'rounded-full': return 'rounded-full'; // Bulat lonjong
        case 'rounded-none': return 'rounded-none'; // Kotak tajam
        default: return 'rounded-2xl'; // Default agak bulat
    }
};

export const COLOR_VARIANTS: Record<string, { header: string; button: string; ring: string; text: string }> = {
    blue: {
        header: 'bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500',
        button: 'bg-gradient-to-r from-blue-600 to-cyan-500',
        ring: 'ring-blue-300',
        text: 'text-blue-600'
    },
    red: {
        header: 'bg-gradient-to-br from-rose-600 via-red-500 to-orange-500',
        button: 'bg-gradient-to-r from-rose-600 to-red-500',
        ring: 'ring-rose-300',
        text: 'text-rose-600'
    },
    green: {
        header: 'bg-gradient-to-br from-emerald-600 via-green-500 to-teal-500',
        button: 'bg-gradient-to-r from-emerald-600 to-teal-500',
        ring: 'ring-emerald-300',
        text: 'text-emerald-600'
    },
    purple: {
        header: 'bg-gradient-to-br from-violet-600 via-purple-500 to-fuchsia-500',
        button: 'bg-gradient-to-r from-violet-600 to-fuchsia-500',
        ring: 'ring-violet-300',
        text: 'text-violet-600'
    },
    pink: {
        header: 'bg-gradient-to-br from-pink-600 via-pink-500 to-rose-400',
        button: 'bg-gradient-to-r from-pink-500 to-rose-400',
        ring: 'ring-pink-300',
        text: 'text-pink-600'
    },
    gray: {
        header: 'bg-gradient-to-br from-slate-700 via-gray-600 to-zinc-600',
        button: 'bg-gradient-to-r from-slate-700 to-gray-600',
        ring: 'ring-slate-300',
        text: 'text-slate-600'
    },
};

export const getThemeClasses = (color: ThemeColor | string) => {
    return COLOR_VARIANTS[color] || COLOR_VARIANTS.blue;
};
