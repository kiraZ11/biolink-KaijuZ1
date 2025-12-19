import { supabase } from '@/lib/supabase';

// Ini fitur Next.js baru: "Server Component" bisa langsung async!
// Gak perlu useEffect, gak perlu useState. Keren kan?
export default async function Home() {

  // 1. Ambil data Profile (limit 1 aja karena single user)
  const { data: profile } = await supabase
    .from('profile')
    .select('*')
    .single();

  // 2. Ambil data Links (diurutkan berdasarkan sort_order)
  const { data: links } = await supabase
    .from('links')
    .select('*')
    .order('sort_order', { ascending: true });

  // Kalau data profile belum ada (misal table kosong), kasih fallback biar gak error
  const user = profile || {
    full_name: 'Belum Setup',
    bio: 'Isi data di Supabase dulu ya!',
    theme_color: 'gray'
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">

      {/* Container Utama */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">

        {/* Header Profile Dinamis */}
        <div className={`bg-${user.theme_color}-600 p-8 text-center`}>
          <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto border-4 border-white mb-4 overflow-hidden">
            {/* Kalau ada avatar_url tampilkan, kalau gak ada kotak abu-abu */}
            {user.avatar_url ? (
              <img src={user.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
            ) : null}
          </div>
          <h1 className="text-white text-2xl font-bold">{user.full_name}</h1>
          <p className="text-white/80 text-sm">{user.bio}</p>
        </div>

        {/* List Links Dinamis */}
        <div className="p-6 space-y-4">

          {links?.map((link) => (
            <a
              key={link.id}
              href={`/api/click?url=${encodeURIComponent(link.url)}&id=${link.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <div className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95">
                {/* Nanti disini kita tambah icon/gambar di Phase 3 */}
                <span>🔗</span>
                {link.label}
              </div>
            </a>
          ))}

          {/* Kalau belum ada link sama sekali */}
          {(!links || links.length === 0) && (
            <p className="text-center text-gray-400 italic">Belum ada link yang ditambahkan.</p>
          )}

        </div>

        {/* Footer */}
        <div className="p-6 text-center text-xs text-gray-400">
          Powered by BioCatalog
        </div>

      </div>
    </main>
  );
}