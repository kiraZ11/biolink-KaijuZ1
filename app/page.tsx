import { supabase } from '@/lib/supabase';
import { unstable_cache } from 'next/cache';
import { Profile, Link, ThemeColor, ButtonStyle } from '@/types/database';
import { generateThemeStyles } from '@/lib/themeGenerator';
import ClientPage from '@/components/ClientPage';

// Cache Database Queries (1 Hour Cache to save Supabase Quota)
const getProfile = unstable_cache(
  async (): Promise<Profile | null> => {
    const { data } = await supabase.from('profile').select('*').single();
    return data;
  },
  ['profile-data-v2'], // Cache busting
  { revalidate: 1, tags: ['profile'] }
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
  ['links-data-v2'], // Cache busting
  { revalidate: 1, tags: ['links'] }
);

export const revalidate = 1; // Page level revalidation backup

// Generate Dynamic Metadata
export async function generateMetadata() {
  const profile = await getProfile();

  const title = profile?.full_name
    ? `${profile.full_name} | Bio Link`
    : 'Bio Link Pro';

  const description = profile?.bio || 'Check out my links!';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      images: profile?.avatar_url ? [profile.avatar_url] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: profile?.avatar_url ? [profile.avatar_url] : [],
    }
  };
}

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

  // Generate Dynamic CSS based on Profile
  const themeStyles = generateThemeStyles(profile);

  return (
    <ClientPage
      profile={profile}
      links={linksData}
      themeStyles={themeStyles}
    />
  );
}