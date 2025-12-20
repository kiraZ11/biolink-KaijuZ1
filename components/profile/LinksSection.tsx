import { Link, Profile } from '@/types/database';
import LinkCard from './LinkCard';
import ShareButton from '@/components/ShareButton';

interface LinksSectionProps {
    links: Link[] | null;
    profile: Profile;
}

export default function LinksSection({ links, profile }: LinksSectionProps) {
    return (
        <div className="bg-white px-6 pb-8 pt-0 space-y-5 min-h-[300px] relative z-20">

            {links?.map((link) => (
                <LinkCard key={link.id} link={link} profile={profile} />
            ))}

            {(!links || links.length === 0) && (
                <div className="text-center py-10 opacity-60">
                    <p className="text-gray-500 text-sm">Belum ada link yang ditambahkan.</p>
                </div>
            )}

            <div className="pb-4">
                <ShareButton username={profile.username} />
            </div>
        </div>
    );
}
