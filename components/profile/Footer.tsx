import { Profile } from '@/types/database';
import { getThemeClasses } from '@/lib/theme';

interface FooterProps {
    profile: Profile;
}

export default function Footer({ profile }: FooterProps) {
    const themeClasses = getThemeClasses(profile.theme_color);

    return (
        <div className="bg-transparent px-6 pb-4 pt-4 text-center rounded-b-[2.5rem]">
            <a
                href="https://github.com/username/biolink-affiliate"
                target="_blank"
                className="inline-flex items-center gap-2 text-xs font-semibold transition-colors px-4 py-2 rounded-full border hover:shadow-sm"
                style={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--card-border)',
                    color: 'var(--card-foreground)'
                }}
            >
                <span>⚡</span> Powered by <span className={`bg-clip-text text-transparent ${themeClasses.button}`}>BioCatalog</span>
            </a>
        </div>
    );
}
