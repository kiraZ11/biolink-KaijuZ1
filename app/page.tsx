import { supabase } from '@/lib/supabase';

// Helper function buat dapetin class tombol berdasarkan setting database
const getButtonStyle = (style: string) => {
  switch (style) {
    case 'rounded-full': return 'rounded-full'; // Bulat lonjong
    case 'rounded-none': return 'rounded-none'; // Kotak tajam
    default: return 'rounded-2xl'; // Default agak bulat (Updated for modern look)
  }
};

// Premium Gradient Colors
const COLOR_VARIANTS: Record<string, { header: string; button: string; ring: string; text: string }> = {
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

export default async function Home() {

  const { data: profile } = await supabase.from('profile').select('*').single();

  const { data: links } = await supabase
    .from('links')
    .select('*')
    .order('is_highlighted', { ascending: false })
    .order('sort_order', { ascending: true });

  const user = profile || {
    full_name: 'Belum Setup',
    bio: 'Isi data di Supabase dulu ya!',
    theme_color: 'blue',
    button_style: 'rounded-2xl',
    avatar_url: null
  };

  const themeClasses = COLOR_VARIANTS[user.theme_color] || COLOR_VARIANTS.blue;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 mesh-bg text-slate-800">

      {/* Container (Solid White Body for cleanliness) */}
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-white/50 relative z-10 transition-all duration-500 hover:shadow-white/20">

        {/* 1. Header Section (Gradient) */}
        <div className={`relative ${themeClasses.header} p-8 pb-32 text-center transition-all duration-500`}>

          {/* Decorative Circles */}
          <div className="absolute top-[-50%] left-[-20%] w-60 h-60 bg-white/10 rounded-full blur-3xl animated-float"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-40 h-40 bg-black/5 rounded-full blur-2xl animated-float delay-1000"></div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Avatar with Ring */}
            <div className={`
               w-28 h-28 rounded-full p-1 bg-white/20 backdrop-blur-sm shadow-xl 
               ring-4 ${themeClasses.ring} ring-offset-4 ring-offset-transparent
               mb-4 overflow-hidden transform transition-transform hover:scale-105 duration-300
            `}>
              <div className="w-full h-full bg-gray-100 rounded-full overflow-hidden relative">
                {user.avatar_url ? (
                  <img src={user.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className={`w-full h-full flex items-center justify-center text-4xl font-bold text-white ${themeClasses.button}`}>
                    {user.full_name?.charAt(0) || '?'}
                  </div>
                )}
              </div>
            </div>

            <h1 className="text-white text-3xl font-bold tracking-tight drop-shadow-sm">{user.full_name}</h1>
            <p className="text-white/95 text-sm mt-2 font-medium bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md inline-block">
              {user.bio}
            </p>
          </div>

          {/* 2. Wave Separator (Absolute Bottom Overlay) */}
          <div className="absolute bottom-0 left-0 right-0 z-20 w-full leading-[0]">
            <svg className="w-full h-12 sm:h-24 fill-white drop-shadow-[0_-5px_15px_rgba(0,0,0,0.1)]" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
              <defs>
                <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
              </defs>
              <g className="parallax">
                <use xlinkHref="#gentle-wave" x="48" y="0" className="opacity-70 animate-[wave_25s_cubic-bezier(0.55,0.5,0.45,0.5)_infinite]" />
                <use xlinkHref="#gentle-wave" x="48" y="3" className="opacity-50 animate-[wave_20s_cubic-bezier(0.55,0.5,0.45,0.5)_infinite]" />
                <use xlinkHref="#gentle-wave" x="48" y="5" className="opacity-30 animate-[wave_15s_cubic-bezier(0.55,0.5,0.45,0.5)_infinite]" />
                <use xlinkHref="#gentle-wave" x="48" y="7" className="animate-[wave_10s_cubic-bezier(0.55,0.5,0.45,0.5)_infinite]" />
              </g>
            </svg>
          </div>
        </div>


        {/* 3. Links Section (Solid White matching Wave) */}
        <div className="bg-white px-6 pb-8 pt-0 space-y-5 min-h-[300px] relative z-20">

          {links?.map((link, index) => (
            <a
              key={link.id}
              href={`/api/click?url=${encodeURIComponent(link.url)}&id=${link.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full group"
            >
              <div className={`
                relative w-full py-4 px-6 flex items-center gap-4 font-semibold transition-all duration-300 transform hover:-translate-y-1
                ${getButtonStyle(user.button_style || 'rounded-2xl')}
                
                ${link.is_highlighted
                  ? `${themeClasses.button} text-white shadow-xl shadow-${user.theme_color}-500/30 border border-white/20 hover:shadow-2xl hover:shadow-${user.theme_color}-500/40`
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
          ))}

          {(!links || links.length === 0) && (
            <div className="text-center py-10 opacity-60">
              <p className="text-gray-500 text-sm">Belum ada link yang ditambahkan.</p>
            </div>
          )}

          {/* Footer */}
          <div className="pb-4 pt-10 text-center">
            <a
              href="https://github.com/username/biolink-affiliate"
              target="_blank"
              className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors bg-gray-50 px-4 py-2 rounded-full border border-gray-100 hover:bg-white hover:shadow-sm"
            >
              <span>⚡</span> Powered by <span className={`bg-clip-text text-transparent ${themeClasses.button}`}>BioCatalog</span>
            </a>
          </div>

        </div>

      </div>
    </main >
  );
}