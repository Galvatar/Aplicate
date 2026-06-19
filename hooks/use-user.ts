'use client'

import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase/client'
import { Subscription } from '@/lib/types'

export const useUser = () => {
  const [user, setUser] = useState<User | null>()
  const [loading, setLoading] = useState(true)
  const [subscription, setSubscription] = useState<Subscription | null>();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (user == null || user == undefined) return;
    getSubscription();
  }, [user])

  async function getSubscription() {
    const { data, error } = await supabase
      .from("Subscriptions")
      .select('*')
      .eq("user_id", user!.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;

    const sub = data ? data as Subscription : data;
    setSubscription(sub);
  }

  function isProUser(): boolean {
    if (subscription == null) return false;
    const today = new Date();
    if (['expired', 'unpaid'].includes(subscription.status)) return false;
    if (subscription.ends_at && new Date(subscription.ends_at) < today) return false;
    return true;
  }

  return { user, loading, subscription, isProUser }
}