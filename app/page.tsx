import { supabase } from '@/lib/supabase';
import { unstable_cache } from 'next/cache';
import ProfileHeader from '@/components/profile/ProfileHeader';
import LinksSection from '@/components/profile/LinksSection';
import Footer from '@/components/profile/Footer';
import { Profile, Link, ThemeColor, ButtonStyle } from '@/types/database';

// Cache Database Queries (1 Hour Cache to save Supabase Quota)
const getProfile = unstable_cache(
  async (): Promise<Profile | null> => {
    const { data } = await supabase.from('profile').select('*').single();
    return data;
  },
  ['profile-data'],
  { revalidate: 3600, tags: ['profile'] }
);

const getLinks = unstable_cache(
  async (): Promise<Link[] | null> => {
    const { data } = await supabase
      .from('links')
      .select('*')
      .order('is_highlighted', { ascending: false })
      .order('sort_order', { ascending: true });
    return data;
  },
  ['links-data'],
  { revalidate: 3600, tags: ['links'] }
);

export const revalidate = 3600; // Page level revalidation backup

export default async function Home() {
  const [profileData, linksData] = await Promise.all([getProfile(), getLinks()]);

  // Fallback / Default Data
  const profile: Profile = profileData || {
    username: 'user',
    full_name: 'Belum Setup',
    bio: 'Isi data di Supabase dulu ya!',
    theme_color: 'blue' as ThemeColor,
    button_style: 'rounded-2xl' as ButtonStyle,
    avatar_url: null
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 mesh-bg text-slate-800">

      {/* Container (Solid White Body) */}
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/50 relative z-10 transition-all duration-500 hover:shadow-white/20">

        <ProfileHeader profile={profile} />

        <LinksSection links={linksData} profile={profile} />

        <Footer profile={profile} />

      </div>
    </main>
  );
}