"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from 'next/image';
import lightLogo from '@/public/lightLogo.png';
import darkLogo from '@/public/darkLogo.png';
import { useApplications } from "@/hooks/use-applications";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [visible, setVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [error, setError] = useState("");
  const { supabase } = useApplications();
  const [success, setSuccess] = useState(false);

  async function handleSubmit() {
    setDisableSubmit(true);
    if (confirmPassword !== password) {
      setError("Error: Passwords do not match");
      setDisableSubmit(false);
      return;
    }
    const { error } = await supabase.auth.updateUser({ password });

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
          Enter your new password and confirm it.
        </h2>
        <div className="glass-panel w-full max-w-md rounded-xl p-8 md:p-10 shadow-xl relative overflow-hidden bg-surface-container-low border-outline-variant/30">
          <h2 className="font-bold text-2xl">
            Password Changed!
          </h2>
          <p className="my-3">
            Go back to the login page to login with your new password.
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
        Enter your new password and confirm it.
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
          <div className="space-y-2">
            <label className="flex items-center text-on-surface-variant font-semibold justify-between">
              New Password
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
          <div className="space-y-2">
            <label className="flex items-center text-on-surface-variant font-semibold justify-between">
              Confirm Password
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
              {confirmVisible ? (
                <svg
                  onClick={() => {
                    setConfirmVisible(false);
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
                    setConfirmVisible(true);
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
                type={!confirmVisible ? "password" : "text"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            Reset Password
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/>
            </svg>
          </button>
          {error !== "" && (
            <h4 className="bg-red-300 text-sm font-semibold border border-red-500 text-red-700 rounded-lg p-3">
              {error}
            </h4>
          )}
        </form>
      </div>
    </div>
  );
}
