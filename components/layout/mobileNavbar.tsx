"use client"

import { usePathname, useRouter } from "next/navigation"
import { useModal } from "../ui/modal";
import ApplicationModal from "./components/applicationModal";

export default function MobileNavbar() {
    const pathname = usePathname();
    const router = useRouter();
    const modal = useModal();
    
    if (pathname != "/board" && 
        pathname != "/home" && 
        pathname != "/settings" && 
        pathname != "/statistics" && 
        pathname != "/create"
    ) {
        return (<></>)
    }

    return (
        <div className="font-jakarta z-100 gap-3 justify-between items-center fixed grid grid-cols-3 md:hidden bottom-0 w-full bg-surface-container px-3 py-2 rounded-t-xl">
          {/** Home */}
          <div
            onClick={() => router.push("/home")}
            className={`flex h-fit flex-col items-center cursor-pointer rounded-full py-1 
                        ${
                          pathname !== "/home"
                            ? "font-semibold text-on-surface-variant"
                            : "text-primary font-bold bg-primary-container/30"
                        }
                        px-4 transition-all`}
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
          <button
            onClick={() => router.push('/create')}
            className="flex bg-primary-container text-on-primary-container px-2 py-1 items-center justify-center font-semibold rounded-xl shadow-md shadow-primary-container/50">
            <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="currentColor"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
            </svg>
          </button>
          {/** Board */}
          <div
            onClick={() => router.push("/board")}
            className={`flex h-fit flex-col items-center cursor-pointer rounded-full py-1 
                        ${
                          pathname !== "/board"
                            ? "font-semibold text-on-surface-variant"
                            : "text-primary font-bold bg-primary-container/30"
                        }
                        px-4 transition-all`}
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
            <h1>Apps</h1>
          </div>
        </div>
    )
}