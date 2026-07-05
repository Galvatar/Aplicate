"use client";

import { signIn, signInWithGoogle } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from 'next/image';
import lightLogo from '@/public/lightLogo.png';
import darkLogo from '@/public/darkLogo.png';
import googleIcon from '@/public/Google.png';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [disableGoogle, setDisableGoogle] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (email !== "" && password !== "") {
      setDisableSubmit(false);
    }
  }, [email, password]);

  async function handleSubmit() {
    setError("");
    setDisableSubmit(true);
    setDisableGoogle(true);
    const error = await signIn(email, password);
    if (error !== "") {
      setError(error);
    } else {
      router.push("/home");
    }
    setDisableSubmit(false);
    setDisableGoogle(false);
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
      <h2 className="text-on-surface text-3xl font-bold text-center">
        Welcome back
      </h2>
      <h2 className="text-on-surface-variant text-sm font-medium text-center max-w-xs">
        Enter your details to access your workspace.
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
          {/** Password */}
          <div className="space-y-2">
            <label className="flex items-center text-on-surface-variant font-semibold justify-between">
              Password
              <button 
                onClick={(e) => {
                  e.preventDefault()
                  router.push('/forgot')
                }}
                className="text-sm text-primary hover:underline font-bold transition-all">
                Forgot Password?
              </button>
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
                <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm296.5-143.5Q560-327 560-360t-23.5-56.5Q513-440 480-440t-56.5 23.5Q400-393 400-360t23.5 56.5Q447-280 480-280t56.5-23.5ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
              </svg>
              {visible ? (
                <svg
                  onClick={() => {
                    setVisible(false);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant/50"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="currentColor"
                >
                  <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
                </svg>
              ) : (
                <svg
                  onClick={() => {
                    setVisible(true);
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant/50"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="currentColor"
                >
                  <path d="M607.5-372.5Q660-425 660-500t-52.5-127.5Q555-680 480-680t-127.5 52.5Q300-575 300-500t52.5 127.5Q405-320 480-320t127.5-52.5Zm-204-51Q372-455 372-500t31.5-76.5Q435-608 480-608t76.5 31.5Q588-545 588-500t-31.5 76.5Q525-392 480-392t-76.5-31.5ZM214-281.5Q94-363 40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200q-146 0-266-81.5ZM480-500Zm207.5 160.5Q782-399 832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280q113 0 207.5-59.5Z" />
                </svg>
              )}
              <input
                type={!visible ? "password" : "text"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="•••••••"
                className="w-full input-field outline-none rounded-lg py-3 pl-10 pr-4 placeholder-on-surface-variant/40 bg-surface-container-highest border-transparent text-on-surface"
              />
            </div>
          </div>
          <button
            disabled={disableSubmit}
            className="flex w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary-container rounded-lg py-3 px-4 justify-center items-center gap-2 font-semibold bg-primary-container hover:bg-primary text-on-primary-container transition-colors"
            type="submit"
          >
            <h1>Log in</h1>
          </button>
          {error !== "" && (
            <h4 className="bg-red-300 text-sm font-semibold border border-red-500 text-red-700 rounded-lg p-3">
              {error}
            </h4>
          )}
        </form>
        <div className="flex w-full mt-5 gap-5 items-center">
          <div className="h-fit w-full p-px bg-on-surface/20" />
          <h2 className="text-xs font-semibold text-on-surface/80">OR</h2>
          <div className="h-fit w-full p-px bg-on-surface/20" />
        </div>
        <button
          disabled={disableGoogle}
          onClick={() => {
            setError("");
            setDisableSubmit(true);
            setDisableGoogle(true);
            signInWithGoogle();
            setDisableSubmit(false);
            setDisableGoogle(false);
          }}
          className="w-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent text-lg rounded-lg py-3 px-4 border border-outline-variant/50 flex justify-center items-center gap-2 mt-5 hover:bg-surface-container-lowest transition-colors duration-300"
        >
          <Image src={googleIcon} alt="Google logo" className="w-5 h-5" priority />
          Sign in with Google
        </button>
        <button
          onClick={() => {
            router.push("/home");
          }}
          className="w-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent text-lg rounded-lg py-3 px-4 border border-outline-variant/50 flex justify-center items-center gap-2 mt-5 hover:bg-surface-container-lowest transition-colors duration-300"
        >
          Continue as Guest
        </button>
        <div className="flex gap-2 w-full items-center justify-center mt-5">
          <h2>Don't have an account?</h2>
          <button
            onClick={() => router.push("/signup")}
            className="text-primary hover:underline font-bold transition-all"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
