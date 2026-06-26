import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    // 1. AWAIT the cookies promise (The Next.js 15 fix!)
    const cookieStore = await cookies(); 
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value; 
          },
        },
      }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: subData } = await supabase
      .from('Subscriptions')
      .select('customer_id')
      .eq('user_id', user.id)
      .single();

    if (!subData?.customer_id) {
      return NextResponse.json({ error: 'No subscription found' }, { status: 404 });
    }

    const paddleResponse = await fetch(
      `https://sandbox-api.paddle.com/customers/${subData.customer_id}/portal-sessions`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.PADDLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}), 
      }
    );

    const portalData = await paddleResponse.json();

    return NextResponse.json({ url: portalData.data.urls.general.overview });

  } catch (error) {
    console.error('Portal generation error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}