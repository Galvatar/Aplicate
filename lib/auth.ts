import { supabase } from "./supabase/client"

export const signIn = async (
    email: string,
    password: string
) => {
    const { error } = await supabase.auth.signInWithPassword({
        email, password
    })
    if (error) throw error;
}

export const signUp = async (
    fullName: string,
    email: string,
    password: string,
    passwordValidation: string
) => {
    if (password !== passwordValidation) throw new Error("Password does not match");
    const nameParts = fullName.split(" ");
    const { error } = await supabase.auth.signUp({
        email, 
        password,
        options: { data: {
            firstName: nameParts[0],
            lastName: nameParts[1]
        }}
    })
    if (error) throw error;
}

export const signInWithGoogle = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/home`
    }
  })
  if (error) throw error
}