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

    const { data: sub } = await supabaseAdmin
        .from('Subscriptions')
        .select('subscription_id')
        .eq('user_id', userId)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

    if (sub?.subscription_id) {
        const response = await fetch(`https://api.lemonsqueezy.com/v1/subscriptions/${sub.subscription_id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                'Authorization': `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`
            }
        });

        if (!response.ok) {
            console.error("Failed to cancel subscription:", await response.text());
            throw new Error("Failed to cancel billing");
        }
    }

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