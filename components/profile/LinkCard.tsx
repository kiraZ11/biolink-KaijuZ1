import { Link, Profile } from '@/types/database';
import { getThemeClasses, getButtonStyle } from '@/lib/theme';

interface LinkCardProps {
    link: Link;
    profile: Profile;
}

export default function LinkCard({ link, profile }: LinkCardProps) {
    const themeClasses = getThemeClasses(profile.theme_color);
    const buttonStyleClass = getButtonStyle(profile.button_style);

    return (
        <a
            href={`/api/click?url=${encodeURIComponent(link.url)}&id=${link.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full group"
        >
            <div className={`
        relative w-full py-4 px-6 flex items-center gap-4 font-semibold transition-all duration-300 transform hover:-translate-y-1
        ${buttonStyleClass}
        
        ${link.is_highlighted
                    ? `${themeClasses.button} text-white shadow-xl shadow-${profile.theme_color}-500/30 border border-white/20 hover:shadow-2xl hover:shadow-${profile.theme_color}-500/40`
                    : 'bg-white border border-gray-100 text-gray-700 hover:border-gray-300 hover:shadow-lg hover:bg-gray-50'
                }
      `}>

                {/* Icon Container */}
                <span className={`
          flex items-center justify-center w-10 h-10 rounded-full text-lg shadow-sm
          ${link.is_highlighted
                        ? 'bg-white/20 text-white backdrop-blur-md'
                        : `bg-gray-100 ${themeClasses.text}`
                    }
        `}>
                    {link.is_highlighted ? '🔥' : '🔗'}
                </span>

                <span className="flex-1 text-center pr-10">{link.label}</span>

                {/* Hot Badge */}
                {link.is_highlighted && (
                    <span className="absolute -top-3 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg border-2 border-white animate-bounce">
                        HOT
                    </span>
                )}

                {/* Shine Effect for Highlighted */}
                {link.is_highlighted && (
                    <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                        <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-[shine_3s_infinite]"></div>
                    </div>
                )}
            </div>
        </a>
    );
}
