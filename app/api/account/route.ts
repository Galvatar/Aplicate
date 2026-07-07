import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr"; 
import { cookies } from "next/headers";

export async function DELETE() {
  try {
    const cookieStore = await cookies();

    const supabaseServer = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              );
            } catch {
              // Ignore cookie setting errors during deletion
            }
          },
        },
      }
    );

    const { data: { session }, error: sessionError } = await supabaseServer.auth.getSession();

    if (sessionError || !session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in again." },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // 1. Get the user's active subscription ID
    const { data: sub } = await supabaseAdmin
        .from('Subscriptions')
        .select('subscription_id, customer_id')
        .eq('user_id', userId)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

    if (sub?.subscription_id && sub?.customer_id) {
        // 2. Call the Paddle API to cancel the subscription
        // NOTE: Remember to change 'sandbox-api.paddle.com' to 'api.paddle.com' in production
        const response = await fetch(`https://api.paddle.com/subscriptions/${sub.subscription_id}/cancel`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.PADDLE_API_KEY}`
            },
            // Force immediate cancellation since their entire account is being deleted
            body: JSON.stringify({ effective_from: 'immediately' })
        });

        if (!response.ok) {
            console.error("Failed to cancel Paddle subscription:", await response.text());
            throw new Error("Failed to cancel billing");
        }
    }

    // 3. Delete the user from Supabase Auth
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (deleteError) {
      console.error("Supabase Admin delete error:", deleteError);
      return NextResponse.json(
        { error: "Failed to delete user authentication record." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Account successfully deleted." },
      { status: 200 }
    );

  } catch (error) {
    console.error("Account deletion handler failed:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}