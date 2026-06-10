import { createSupabaseServer } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  if (!code) return NextResponse.redirect(`${baseUrl}/home`);

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: `${baseUrl}/api/gmail/callback`,
      grant_type: 'authorization_code',
    })
  })

  const tokens = await tokenRes.json()

  const supabase = await createSupabaseServer()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.redirect(`${baseUrl}/home`);

  await supabase.from('GmailTokens').upsert({
        user_id: user.id,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        expires_at: new Date(Date.now() + tokens.expires_in * 1000).toISOString(),
    })

    await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/watch`, {
        method: 'POST',
        headers: { 
            Authorization: `Bearer ${tokens.access_token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            topicName: 'projects/flowspace-497803/topics/gmail-notifications',
            labelIds: ['INBOX']
        })
    })


  return NextResponse.redirect(`${baseUrl}/home`);
}