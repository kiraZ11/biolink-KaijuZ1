import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

// Kita bikin client supabase manual disini karena ini berjalan di sisi Server (API)
// Bukan di browser user, jadi aman pake Service Role kalau nanti butuh akses admin
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(request: NextRequest) {
    // Ambil parameter URL, misal: /api/click?url=shopee.co.id&id=5
    const searchParams = request.nextUrl.searchParams
    const url = searchParams.get('url')
    const id = searchParams.get('id')

    // Kalau data gak lengkap, balikin error
    if (!url || !id) {
        return NextResponse.json({ error: 'Missing data' }, { status: 400 })
    }

    // 1. Catat ke Supabase (Fire and Forget)
    // Kita gak pake 'await' biar user gak nunggu lama. Biarin dia lari di background.
    const userAgent = request.headers.get('user-agent') || 'unknown'

    await supabase.from('events').insert({
        link_id: id,
        user_agent: userAgent
    })

    // 2. Lempar user ke tujuan asli
    return NextResponse.redirect(url)
}