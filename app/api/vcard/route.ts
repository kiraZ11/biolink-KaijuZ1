import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import VCard from 'vcard-creator';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const username = searchParams.get('username');

    if (!username) {
        return NextResponse.json({ error: 'Username required' }, { status: 400 });
    }

    const { data: profile } = await supabase
        .from('profile')
        .select('*')
        .eq('username', username)
        .single();

    if (!profile) {
        return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    // Create vCard
    const myVCard = new VCard();
    const nameParts = (profile.full_name || 'User').split(' ');
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
    const firstName = nameParts[0];

    myVCard
        .addName(lastName, firstName)
        .addNote(profile.bio || 'Bio Link Profile')
        .addURL(request.nextUrl.origin)
        .addSocial(request.nextUrl.origin, 'Bio Link');

    // Photo embedding omitted for performance and type safety

    // Return generated vCard
    return new NextResponse(myVCard.toString(), {
        status: 200,
        headers: {
            'Content-Type': 'text/vcard; charset=utf-8',
            'Content-Disposition': `attachment; filename="${username}.vcf"`,
        },
    });
}
