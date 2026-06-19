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

  const expiresAtISO = new Date(Date.now() + tokens.expires_in * 1000).toISOString()

  const { error: dbError } = await supabase.rpc('save_gmail_tokens', {
    p_user_id: user.id,
    p_access_token: tokens.access_token,
    p_refresh_token: tokens.refresh_token,
    p_expires_at: expiresAtISO
  })

  if (dbError) {
    console.error("Failed to securely save tokens:", dbError.message)
    return NextResponse.redirect(`${baseUrl}/home?error=token_save_failed`);
  }

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

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>Authentication Successful</title>
    </head>
    <body>
      <p style="text-align: center; font-family: sans-serif; margin-top: 50px;">
        Authentication successful! Closing window...
      </p>
      
      <script>
        if (window.opener) {
          window.opener.postMessage({ type: 'GMAIL_CONNECTED' }, '*');
        }
        window.close();
      </script>
    </body>
    </html>
  `

  return new NextResponse(htmlContent, {
    headers: { 'Content-Type': 'text/html' },
  })
}