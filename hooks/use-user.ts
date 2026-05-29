'use client'

import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase/client'

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return { user }
}

export const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

export const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
}

export const signUp = async (email: string, password: string, confirmation: string) => {
    if (password !== confirmation) throw new Error('Passwords do not match')
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
}