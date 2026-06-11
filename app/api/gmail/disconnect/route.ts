import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { userId } = await request.json() 

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { data: tokenRow, error: fetchError } = await supabase
      .from('GmailTokens')
      .select('refresh_token')
      .eq('user_id', userId)
      .single()

    if (fetchError || !tokenRow?.refresh_token) {
      return NextResponse.json({ error: 'No active connection found' }, { status: 404 })
    }

    const googleResponse = await fetch('https://oauth2.googleapis.com/revoke', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        token: tokenRow.refresh_token,
      }),
    })

    if (!googleResponse.ok) {
      console.warn('⚠️ Google token revocation failed or token was already expired.')
    }

    await supabase
      .from('GmailTokens')
      .delete()
      .eq('user_id', userId)

    return NextResponse.json({ success: true, message: 'Disconnected successfully' })

  } catch (error) {
    console.error('❌ Disconnect error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}