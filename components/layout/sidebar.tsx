"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useModal } from "../ui/modal";
import NewApplication from "./components/applicationModal";
import { signOut } from "@/lib/auth";
import { useUser } from "@/hooks/use-user";
import { useSidebar } from "@/hooks/use-sidebar";
import { useSettings } from "@/hooks/use-settings";
import { Settings } from "@/lib/types";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [guestMode, setGuestMode] = useState(true);
  const modal = useModal();
  const { user } = useUser();
  const { isOpen, setIsOpen } = useSidebar();
  const { getSettings } = useSettings();

  useEffect(() => {
    const settings = getSettings();
    if (settings == null) {
        // first time user
        const newSettings: Settings = {
            active_columns: ["company"]
        }
        localStorage.setItem("settings", JSON.stringify(newSettings));
    }
  }, [])

  useEffect(() => {
    if (user != null) {
      setGuestMode(false);
    } else {
      setGuestMode(true);
    }
  }, [user]);

  if (
    pathname === "/signup" ||
    pathname === "/login" ||
    pathname.includes("/api") ||
    pathname === "/"
  )
    return <></>;

  return (
    <div
      className={`fixed md:relative inset-y-0 
            left-0 z-50 flex flex-col font-jakarta h-screen 
            w-full md:max-w-75 bg-surface-container-low 
            justify-between transition-transform duration-300 ${
              isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            }`}
    >
      {/** Top half */}
      <div className="flex flex-col w-full px-5 py-8 gap-12">
        {/** Title */}
        <div
          onClick={() => router.push("/")}
          className="hidden md:flex gap-3 items-center cursor-pointer"
        >
          <div className="h-15">
            <img
              src={"/lightLogo.png"}
              className="aspect-square h-full block dark:hidden"
              alt="Aplicate Logo"
            />
            <img
              src={"/darkLogo.png"}
              className="aspect-square h-full hidden dark:block"
              alt="Aplicate Logo"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="font-extrabold text-2xl text-primary">Aplicate</h1>
            <h2>Your Career Companion</h2>
          </div>
          {guestMode && (
            <h1 className="bg-surface-variant text-xs text-on-surface-variant uppercase tracking-wider px-2 py-0.5 rounded-full font-bold">
              Guest
            </h1>
          )}
        </div>
        <div className="flex md:hidden gap-3 items-center justify-between">
          <h1 className="font-extrabold text-2xl text-primary">Aplicate</h1>
          <button
            onClick={() => setIsOpen(false)}
            className="text-on-primary p-1 rounded-full hover:bg-surface-container-highest transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
          </button>
        </div>
        {/** New Application */}
        <button
          onClick={async () => {
            modal.show(<NewApplication />);
          }}
          className="flex items-center justify-center py-3 px-3 font-semibold rounded-lg bg-primary text-on-primary hover:bg-primary/70 transition-colors duration-200 gap-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
          </svg>
          New Application
        </button>
        {/** Content links */}
        <div className="flex flex-col gap-3">
          {/** Home */}
          <div
            onClick={() => router.push("/home")}
            className={`flex cursor-pointer rounded-lg py-4 
                        ${
                          pathname !== "/home"
                            ? "hover:bg-surface-container-lowest font-semibold text-on-surface-variant"
                            : "text-primary font-bold bg-surface-container-high border-r-4 border-primary"
                        }
                        gap-3 px-5 transition-all`}
          >
            {pathname === "/home" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
              </svg>
            )}
            <h1>Home</h1>
          </div>
          {/** Board */}
          <div
            onClick={() => router.push("/board")}
            className={`flex cursor-pointer rounded-lg py-4 
                        ${
                          pathname !== "/board"
                            ? "hover:bg-surface-container-lowest font-semibold text-on-surface-variant"
                            : "text-primary font-bold bg-surface-container-high border-r-4 border-primary"
                        }
                        gap-3 px-5 transition-all`}
          >
            {pathname === "/board" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="M120-840h320v320H120v-320Zm400 0h320v320H520v-320ZM120-440h320v320H120v-320Zm520 0h80v120h120v80H720v120h-80v-120H520v-80h120v-120Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="M120-840h320v320H120v-320Zm80 80v160-160Zm320-80h320v320H520v-320Zm80 80v160-160ZM120-440h320v320H120v-320Zm80 80v160-160Zm440-80h80v120h120v80H720v120h-80v-120H520v-80h120v-120Zm-40-320v160h160v-160H600Zm-400 0v160h160v-160H200Zm0 400v160h160v-160H200Z" />
              </svg>
            )}
            <h1>My Board</h1>
          </div>
          {/** Applications */}
          <div
            onClick={() => router.push("/applications")}
            className={`flex cursor-pointer rounded-lg py-4 
                        ${
                          pathname !== "/applications"
                            ? "hover:bg-surface-container-lowest font-semibold text-on-surface-variant"
                            : "text-primary font-bold bg-surface-container-high border-r-4 border-primary"
                        }
                        gap-3 px-5 transition-all`}
          >
            {pathname === "/applications" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="m600-120-240-84-186 72q-20 8-37-4.5T120-170v-560q0-13 7.5-23t20.5-15l212-72 240 84 186-72q20-8 37 4.5t17 33.5v560q0 13-7.5 23T812-192l-212 72Zm-40-98v-468l-160-56v468l160 56Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="m600-120-240-84-186 72q-20 8-37-4.5T120-170v-560q0-13 7.5-23t20.5-15l212-72 240 84 186-72q20-8 37 4.5t17 33.5v560q0 13-7.5 23T812-192l-212 72Zm-40-98v-468l-160-56v468l160 56Zm80 0 120-40v-474l-120 46v468Zm-440-10 120-46v-468l-120 40v474Zm440-458v468-468Zm-320-56v468-468Z" />
              </svg>
            )}
            <h1>Applications</h1>
          </div>
          {/** Statistics */}
          <div
            onClick={() => router.push("/statistics")}
            className={`flex cursor-pointer rounded-lg py-4 
                        ${
                          pathname !== "/statistics"
                            ? "hover:bg-surface-container-lowest font-semibold text-on-surface-variant"
                            : "text-primary font-bold bg-surface-container-high border-r-4 border-primary"
                        }
                        gap-3 px-5 transition-all`}
          >
            {pathname === "/statistics" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="M160-160v-320h160v320H160Zm240 0v-640h160v640H400Zm240 0v-440h160v440H640Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="M160-160v-320h160v320H160Zm240 0v-640h160v640H400Zm240 0v-440h160v440H640Z" />
              </svg>
            )}
            <h1>Statistics</h1>
          </div>
        </div>
      </div>
      {/** Footer */}
      <div className="flex-col w-full py-5 px-5 border-t border-surface-container-highest gap-3">
        <div
          onClick={() => router.push("/settings")}
          className="flex cursor-pointer items-center font-semibold rounded-lg gap-3 py-3 px-5 hover:bg-surface-container-high transition-colors"
        >
          <div className="w-7 h-7 items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
            </svg>
          </div>
          <h1>Settings</h1>
        </div>
        {guestMode ? (
          <div
            onClick={() => router.push("/signup")}
            className="flex cursor-pointer font-semibold rounded-lg gap-3 py-3 px-5 hover:bg-surface-container-high transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="M160-160v-80h109q-51-44-80-106t-29-134q0-112 68-197.5T400-790v84q-70 25-115 86.5T240-480q0 54 21.5 99.5T320-302v-98h80v240H160Zm440 0q-50 0-85-35t-35-85q0-48 33-82.5t81-36.5q17-36 50.5-58.5T720-480q53 0 91.5 34.5T858-360q42 0 72 29t30 70q0 42-29 71.5T860-160H600Zm116-360q-7-41-27-76t-49-62v98h-80v-240h240v80H691q43 38 70.5 89T797-520h-81ZM600-240h260q8 0 14-6t6-14q0-8-6-14t-14-6h-70v-50q0-29-20.5-49.5T720-400q-29 0-49.5 20.5T650-330v10h-50q-17 0-28.5 11.5T560-280q0 17 11.5 28.5T600-240Zm120-80Z" />
            </svg>
            <h1>Sign up to sync</h1>
          </div>
        ) : (
          <div
            onClick={async () => {
              await signOut();
              router.push("/home");
            }}
            className="flex cursor-pointer font-semibold rounded-lg gap-3 py-3 px-5 hover:bg-surface-container-high transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
            </svg>
            <h1>Log Out</h1>
          </div>
        )}
      </div>
    </div>
  );
}
