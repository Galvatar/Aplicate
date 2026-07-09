"use client";

import { useModal } from "@/components/ui/modal";
import { useUser } from "@/hooks/use-user";
import { supabase } from "@/lib/supabase/client";
import { Application, GmailToken, Status } from "@/lib/types";
import { User } from "@supabase/auth-js";
import { use, useEffect, useState } from "react";
import ToggleButton from "./components/toggle";
import DeleteApplications from "@/components/layout/components/deleteApplications";
import DeleteUser from "@/components/layout/components/deleteUser";
import UploadSection from "./components/uploadSection";
import { useRouter } from "next/navigation";
import LemonButton from "@/components/ui/paddleButton";
import Image from "next/image";
import { signOut } from "@/lib/auth";
import { capitalize } from "@/lib/capitalize";
import DownloadButton from "./components/downloadButton";

export default function SettingsPage() {
  const [userProfile, setUserProfile] = useState<User | null>();
  const [fullName, setFullName] = useState("");
  const [gmailToken, setGmailToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [proUser, setProUser] = useState(false);
  const modal = useModal();
  const router = useRouter();
  const { user, subscription, isProUser } = useUser();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    const handleOAuthMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      if (event.data?.type === "GMAIL_CONNECTED") {
        fetchInitialData();
        setLoading(false);
      }
    };

    window.addEventListener("message", handleOAuthMessage);
    return () => window.removeEventListener("message", handleOAuthMessage);
  }, []);

  useEffect(() => {
    setProUser(isProUser());
  }, [subscription]);

  useEffect(() => {
    if (user != null) {
      setUserProfile(user);
      var fullName = user.user_metadata.full_name ?? "";
      if (fullName == "") {
        const firstName = user.user_metadata.first_name ?? "";
        const lastName = user.user_metadata.last_name ?? "";
        fullName = firstName + " " + lastName;
      }
      setFullName(fullName);
      fetchInitialData();
    } else {
      setUserProfile(null);
    }
  }, [user]);

  function parseCSVLine(text: string): string[] {
    const result: string[] = [];
    let currentStr = "";
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
      const char = text[i];

      if (inQuotes) {
        if (char === '"') {
          // Check for escaped quotes (e.g. "")
          if (i + 1 < text.length && text[i + 1] === '"') {
            currentStr += '"';
            i++; // skip the next quote
          } else {
            inQuotes = false;
          }
        } else {
          currentStr += char;
        }
      } else {
        if (char === '"') {
          inQuotes = true;
        } else if (char === ",") {
          result.push(currentStr.trim());
          currentStr = "";
        } else {
          currentStr += char;
        }
      }
    }
    result.push(currentStr.trim());
    return result;
  }

  const handleConnect = async () => {
    const res = await fetch("/api/account/isPremium");
    if (res.status != 200) return;
    const client_id = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
    const params = new URLSearchParams({
      client_id: client_id,
      redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/gmail/callback`,
      response_type: "code",
      scope: "https://www.googleapis.com/auth/gmail.readonly",
      access_type: "offline",
      prompt: "consent",
    });
    const url = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;

    const width = 500;
    const height = 650;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    window.open(
      url,
      "GoogleGmailAuth",
      `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`,
    );
  };

  const handleDisconnect = async (currentUserId: string) => {
    try {
      const response = await fetch("/api/gmail/disconnect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: currentUserId }),
      });

      const data = await response.json();
    } catch (error) {
      console.error("Failed to disconnect:", error);
    }
  };

  async function handleChange(a: boolean) {
    setLoading(true);
    if (a) {
      await handleConnect();
    } else {
      await handleDisconnect(userProfile!.id);
      setGmailToken(null);
      setLoading(false);
    }
  }

  async function fetchInitialData() {
    try {
      const { data, error } = await supabase
        .from("GmailTokens")
        .select("id")
        .maybeSingle();
      if (error) throw error;
      const token = data as GmailToken;
      setGmailToken(token.id);
    } catch (e) {
      setGmailToken(null);
    }
  }

  function formatDate(date: string): string {
    const expire = new Date(date);
    return `${expire.getDay()} ${months[expire.getMonth()]}, ${expire.getFullYear()}`
  }

  return (
    <div className="flex flex-col w-full h-full font-jakarta py-10 md:py-20 px-5 md:px-15 gap-4 bg-background text-on-background">
      <span className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-on-surface tracking-tight">
          Settings
        </h1>
        {userProfile ? (
          <button
            onClick={async () => {
              await signOut();
              router.push("/home");
            }}
            className="flex md:hidden font-semibold bg-primary-container text-on-primary-container px-4 py-1.5 rounded-lg shadow-md shadow-primary-container/50"
          >
            Sign out
          </button>
        ) : (
          <button
            onClick={() => {
              router.push("/login");
            }}
            className="flex md:hidden font-semibold bg-primary-container text-on-primary-container px-4 py-1.5 rounded-lg shadow-md shadow-primary-container/50"
          >
            Sign in
          </button>
        )}
      </span>
      <div className="flex flex-col mt-5 md:ml-5 gap-5">
        {/** Profile */}
        <div className="flex gap-3">
          <div className="hidden md:flex gap-3">
            {userProfile?.user_metadata.picture != undefined ? (
              <Image
                className="w-15 md:w-30 h-15 md:h-30 rounded-2xl"
                src={userProfile.user_metadata.picture}
                alt="User profile picture"
              />
            ) : (
              <div className="flex w-15 h-15 md:w-30 md:h-30 items-center justify-center bg-surface-container-high rounded-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="72px"
                  viewBox="0 -960 960 960"
                  width="72px"
                  fill="currentColor"
                >
                  <path d="M367-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q560-607 560-640t-23.5-56.5Q513-720 480-720t-56.5 23.5Q400-673 400-640t23.5 56.5Q447-560 480-560t56.5-23.5ZM480-640Zm0 400Z" />
                </svg>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-3 md:flex-row w-full justify-between md:items-center">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-bold text-on-surface tracking-tight">
                {userProfile ? capitalize(fullName) : "Guest"}
                </h2>
                <h2 className="text-on-surface-variant font-bold tracking-tight break-all">
                {userProfile?.user_metadata.email}
                </h2>
                {/** Premium tag */}
                {subscription?.subscription_id === "owner" ? (
                <span className="flex w-fit gap-2 rounded-full bg-yellow-200 text-yellow-700 px-3 py-2 font-semibold">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="currentColor"
                    >
                    <path d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm34-102 102-44 104 44 56-96 110-26-10-112 74-84-74-86 10-112-110-24-58-96-102 44-104-44-56 96-110 24 10 112-74 86 74 84-10 114 110 24 58 96Zm102-318Zm-42 142 226-226-56-58-170 170-86-84-56 56 142 142Z" />
                    </svg>
                    Owner
                </span>
                ) : (
                proUser && (
                    <span className="flex w-fit gap-2 rounded-full bg-secondary-container/50 px-3 py-2 text-secondary font-semibold">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="currentColor"
                    >
                        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                    </svg>
                    Pro User
                    </span>
                )
                )}
            </div>
            <div className="flex flex-col h-fit w-full max-w-55 items-center">
                {proUser && subscription?.renews_at ?
                    <div className="flex flex-col gap-3">
                        <LemonButton yearly={false} manage={true} />
                        <h2 className="flex gap-1">
                            <b>Renews:</b>
                            {formatDate(subscription?.renews_at)}
                        </h2>
                    </div>
                    :
                proUser && subscription?.ends_at ?
                    <div className="flex flex-col gap-3">
                        <LemonButton yearly={false} manage={true} />
                        <h2 className="flex gap-1">
                            <b>Ends on:</b>
                            {formatDate(subscription?.ends_at)}
                        </h2>
                    </div>
                    :
                ''
                }
            </div>
          </div>
        </div>

        {/** Integrations */}
        <div className="hidden md:flex relative flex-col gap-3">
          {!proUser && (
            <div className="flex flex-col absolute w-full h-full z-10 bg-surface-container/80 rounded-xl items-center justify-center text-on-surface gap-3">
              <div className="flex items-center gap-3 text-2xl font-bold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="36px"
                  viewBox="0 -960 960 960"
                  width="36px"
                  fill="currentColor"
                >
                  <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm296.5-143.5Q560-327 560-360t-23.5-56.5Q513-440 480-440t-56.5 23.5Q400-393 400-360t23.5 56.5Q447-280 480-280t56.5-23.5ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
                </svg>
                Unlock with Aplicate Pro
              </div>
              <button
                onClick={() => router.push("/pricing")}
                className="flex gap-2 items-center font-semibold text-lg text-on-primary-container bg-primary-container py-1 px-3 rounded-lg hover:bg-primary hover:text-on-primary transition-colors"
              >
                View prices
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="currentColor"
                >
                  <path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z" />
                </svg>
              </button>
            </div>
          )}
          <div className="flex items-center justify-between mt-5">
            <h2 className="flex items-center gap-3 ml-5 font-bold text-3xl text-on-surface tracking-tight">
              <svg
                className="text-primary"
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
                fill="currentColor"
              >
                <path d="M155-75q-35-35-35-85t35-85q35-35 85-35 14 0 26 3t23 8l57-71q-28-31-39-70t-5-78l-81-27q-17 25-43 40t-58 15q-50 0-85-35T0-580q0-50 35-85t85-35q50 0 85 35t35 85v8l81 28q20-36 53.5-61t75.5-32v-87q-39-11-64.5-42.5T360-840q0-50 35-85t85-35q50 0 85 35t35 85q0 42-26 73.5T510-724v87q42 7 75.5 32t53.5 61l81-28v-8q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-32 0-58.5-15T739-515l-81 27q6 39-5 77.5T614-340l57 70q11-5 23-7.5t26-2.5q50 0 85 35t35 85q0 50-35 85t-85 35q-50 0-85-35t-35-85q0-20 6.5-38.5T624-232l-57-71q-41 23-87.5 23T392-303l-56 71q11 15 17.5 33.5T360-160q0 50-35 85t-85 35q-50 0-85-35Zm-35-465q17 0 28.5-11.5T160-580q0-17-11.5-28.5T120-620q-17 0-28.5 11.5T80-580q0 17 11.5 28.5T120-540Zm148.5 408.5Q280-143 280-160t-11.5-28.5Q257-200 240-200t-28.5 11.5Q200-177 200-160t11.5 28.5Q223-120 240-120t28.5-11.5Zm240-680Q520-823 520-840t-11.5-28.5Q497-880 480-880t-28.5 11.5Q440-857 440-840t11.5 28.5Q463-800 480-800t28.5-11.5ZM480-360q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm268.5 228.5Q760-143 760-160t-11.5-28.5Q737-200 720-200t-28.5 11.5Q680-177 680-160t11.5 28.5Q703-120 720-120t28.5-11.5Zm120-420Q880-563 880-580t-11.5-28.5Q857-620 840-620t-28.5 11.5Q800-597 800-580t11.5 28.5Q823-540 840-540t28.5-11.5ZM480-840ZM120-580Zm360 120Zm360-120ZM240-160Zm480 0Z" />
              </svg>
              Integrations
            </h2>
          </div>
          <div className="flex p-5 bg-surface-container rounded-xl border border-surface-container-highest justify-between">
            <div className="flex gap-3">
              <div className="flex h-fit items-center justify-center p-1 bg-primary-container/50 text-primary rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="36px"
                  viewBox="0 -960 960 960"
                  width="36px"
                  fill="currentColor"
                >
                  <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
                </svg>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="font-bold text-xl">Gmail Integration</h2>
                <p className="font-semibold">
                  Connect your Gmail to automatically sync and organize job
                  application confirmation emails directly into your board.
                </p>
                <p className="text-xs">
                  IMPORTANT: Aplicate is currently being verified, as such you will need to
                  bypass the warning that Google hasn't verified the app by clicking on
                  advanced and then go to Aplicate (unsafe). We apologise for the inconvenience.
                </p>
              </div>
            </div>
            <div className="flex h-full items-center justify-center">
              <ToggleButton
                disabled={loading}
                status={gmailToken != null}
                onChange={(a) => handleChange(a)}
              />
            </div>
          </div>
        </div>

        {/** Import data */}
        <UploadSection userId={user?.id ?? ""} />

        {/** Data and privacy */}
        <div className="flex flex-col gap-3">
          <h2 className="flex items-center gap-3 mt-5 ml-5 font-bold text-3xl text-on-surface tracking-tight py-5 border-t border-surface-container-high">
            <svg
              className="text-error"
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="currentColor"
            >
              <path d="M508.5-331.5Q520-343 520-360t-11.5-28.5Q497-400 480-400t-28.5 11.5Q440-377 440-360t11.5 28.5Q463-320 480-320t28.5-11.5ZM440-480h80v-200h-80v200Zm40 400q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z" />
            </svg>
            Data & Privacy
          </h2>
          <DownloadButton />
          <div className="flex flex-col border border-error/50 bg-surface-container p-7 rounded-xl">
            <h2 className="font-bold text-lg">Danger Zone</h2>
            <p className="font-medium">
              These actions are permanent and cannot be undone. Please be
              certain before proceeding.
            </p>
            <div className="flex flex-col md:flex-row pt-5 gap-5">
              <div className="flex flex-col border border-surface-container-highest p-3 rounded-xl items-start gap-3">
                <h2 className="font-semibold text-lg">Reset My Data</h2>
                <p>
                  Wipe all application history and analytics but keep your
                  account active.
                </p>
                <button
                  onClick={() => modal.show(<DeleteApplications />)}
                  className="border border-error/50 text-error hover:bg-error/10 hover:scale-105 font-bold text-sm p-2 rounded-lg transition-all"
                >
                  Delete Data
                </button>
              </div>
              {userProfile && (
                <div className="flex flex-col border border-error/30 bg-error-container/20 p-3 rounded-xl items-start gap-3">
                  <h2 className="font-semibold text-lg">Delete Account</h2>
                  <p>
                    Delete your account completely along with all your
                    applications and integrations
                  </p>
                  <button
                    onClick={() => modal.show(<DeleteUser />)}
                    className="text-error-container bg-error hover:bg-error/90 hover:scale-105 font-bold text-sm p-2 rounded-lg transition-all"
                  >
                    Delete Account
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
