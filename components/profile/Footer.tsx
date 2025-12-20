import { Profile } from '@/types/database';
import { getThemeClasses } from '@/lib/theme';

interface FooterProps {
    profile: Profile;
}

export default function Footer({ profile }: FooterProps) {
    const themeClasses = getThemeClasses(profile.theme_color);

    return (
        <div className="bg-white px-6 pb-4 pt-4 text-center rounded-b-[2.5rem]">
            <a
                href="https://github.com/username/biolink-affiliate"
                target="_blank"
                className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors bg-gray-50 px-4 py-2 rounded-full border border-gray-100 hover:bg-white hover:shadow-sm"
            >
                <span>⚡</span> Powered by <span className={`bg-clip-text text-transparent ${themeClasses.button}`}>BioCatalog</span>
            </a>
        </div>
    );
}
