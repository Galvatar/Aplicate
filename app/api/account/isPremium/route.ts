import { createSupabaseServer } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createSupabaseServer()

  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data: sub, error: dbError } = await supabase
    .from('Subscriptions') 
    .select('status, ends_at')
    .eq('user_id', user.id)
    .single()

  if (dbError || !sub) {
    return NextResponse.json({ error: 'No active subscription found' }, { status: 403 })
  }

  const isValidStatus = sub.status === 'active' || sub.status === 'trialing';
  const isNotExpired = sub.ends_at === null || new Date(sub.ends_at).getTime() > Date.now();

  if (isValidStatus && isNotExpired) {
    return NextResponse.json({ premium: true, message: 'Access granted' }, { status: 200 })
  } else {
    return NextResponse.json({ premium: false, error: 'Subscription inactive or expired' }, { status: 403 })
  }
}