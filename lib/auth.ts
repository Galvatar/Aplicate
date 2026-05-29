import { supabase } from "./supabase/client"

const getAuthErrorMessage = (error: string): string => {
  const errorMap: Record<string, string> = {
    'Invalid login credentials': 'Email or password is incorrect',
    'Email not confirmed': 'Please verify your email before signing in',
    'User already registered': 'This email is already registered',
    'Password should be at least 6 characters': 'Password must be at least 6 characters',
    'invalid_grant': 'Invalid email or password',
    'weak_password': 'Password is too weak. Use uppercase, lowercase, numbers, and symbols',
    'email_not_confirmed': 'Please check your email to verify your account',
  };

  for (const [key, message] of Object.entries(errorMap)) {
    if (error.toLowerCase().includes(key.toLowerCase())) {
      return message;
    }
  }

  return error || 'An authentication error occurred';
};

export const signIn = async (
    email: string,
    password: string
): Promise<string> => {
    const { error } = await supabase.auth.signInWithPassword({
        email, password
    })
    if (error) {
        return getAuthErrorMessage(error.message);
    }
    return "";
}

export const signUp = async (
    fullName: string,
    email: string,
    password: string,
    passwordValidation: string
): Promise<string> => {
    if (password !== passwordValidation) throw new Error("Password does not match");
    const nameParts = fullName.split(" ");
    const { error } = await supabase.auth.signUp({
        email, 
        password,
        options: { data: {
            first_name: nameParts[0],
            last_name: nameParts[1]
        }}
    })
     if (error) {
        return getAuthErrorMessage(error.message);
    }
    return "";
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

export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}