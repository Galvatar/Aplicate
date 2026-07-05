"use client";

import { signIn, signInWithGoogle } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from 'next/image';
import lightLogo from '@/public/lightLogo.png';
import darkLogo from '@/public/darkLogo.png';
import googleIcon from '@/public/Google.png';
import { useApplications } from "@/hooks/use-applications";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [error, setError] = useState("");
  const { supabase } = useApplications();
  const [success, setSuccess] = useState(false);

  async function handleSubmit() {
    setDisableSubmit(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/api/account/reset`,
    })

    if (error) setError(`Error: ${error.message}`);
    setDisableSubmit(false);
    setSuccess(true);
  }

  if (success) {
    return (
      <div className="flex flex-col font-jakarta w-full h-full items-center justify-center mb-10 space-y-4">
        <div
          onClick={() => router.push("/")}
          className="w-20 h-20 flex items-center justify-center"
        >
          <Image
            src={lightLogo}
            className="aspect-square h-full block dark:hidden"
            alt="Aplicate Logo"
            priority
          />
          <Image
            src={darkLogo}
            className="aspect-square h-full hidden dark:block"
            alt="Aplicate Logo"
            priority
          />
        </div>
        <h1 className="text-on-surface text-3xl font-bold text-center">
          Reset Password
        </h1>
        <h2 className="text-on-surface-variant text-sm font-medium text-center max-w-xs">
          Enter your email to get a reset link.
        </h2>
        <div className="glass-panel w-full max-w-md rounded-xl p-8 md:p-10 shadow-xl relative overflow-hidden bg-surface-container-low border-outline-variant/30">
          <h2 className="font-bold text-2xl">
            Link Sent!
          </h2>
          <p className="my-3">
            If we found an account matching this email, we sent a link in order to reset the associated account's password. If you dont see it check your spam inbox.
          </p>
          <div className="flex w-full mt-5 gap-5 items-center">
            <div className="h-fit w-full p-px bg-on-surface/20" />
          </div>
          <button
            onClick={() => {
              router.push("/login");
            }}
            className="w-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent rounded-lg p-2 flex justify-center items-center gap-2 mt-5 hover:text-primary hover:gap-4 transition-all duration-300"
          >
            <svg className="rotate-180" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/>
            </svg>
            Back to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col font-jakarta w-full h-full items-center justify-center mb-10 space-y-4">
      <div
        onClick={() => router.push("/")}
        className="w-20 h-20 flex items-center justify-center"
      >
        <Image
          src={lightLogo}
          className="aspect-square h-full block dark:hidden"
          alt="Aplicate Logo"
          priority
        />
        <Image
          src={darkLogo}
          className="aspect-square h-full hidden dark:block"
          alt="Aplicate Logo"
          priority
        />
      </div>
      <h1 className="text-on-surface text-3xl font-bold text-center">
        Reset Password
      </h1>
      <h2 className="text-on-surface-variant text-sm font-medium text-center max-w-xs">
        Enter your email to get a reset link.
      </h2>
      <div className="glass-panel w-full max-w-md rounded-xl p-8 md:p-10 shadow-xl relative overflow-hidden bg-surface-container-low border-outline-variant/30">
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-6 relative z-10"
        >
          {/** Email */}
          <div className="space-y-2">
            <label className="block text-on-surface-variant font-semibold">
              Email
            </label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant/50"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
              </svg>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
                className="w-full input-field outline-none rounded-lg py-3 pl-10 pr-4 placeholder-on-surface-variant/40 bg-surface-container-highest border-transparent text-on-surface"
              />
            </div>
          </div>
          <button
            disabled={disableSubmit}
            className="flex w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary-container rounded-lg py-3 px-4 justify-center items-center gap-2 font-semibold bg-primary-container hover:bg-primary text-on-primary-container transition-colors"
            type="submit"
          >
            Send Reset Link
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/>
            </svg>
          </button>
          {error !== "" && (
            <h4 className="bg-red-300 text-sm font-semibold border border-red-500 text-red-700 rounded-lg p-3">
              {error}
            </h4>
          )}
        </form>
        <div className="flex w-full mt-5 gap-5 items-center">
          <div className="h-fit w-full p-px bg-on-surface/20" />
        </div>
        <button
          onClick={() => {
            router.push("/login");
          }}
          className="w-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent rounded-lg p-2 flex justify-center items-center gap-2 mt-5 hover:text-primary hover:gap-4 transition-all duration-300"
        >
          <svg className="rotate-180" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/>
          </svg>
          Back to Login
        </button>
      </div>
    </div>
  );
}
