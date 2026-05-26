'use client'

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useModal } from "../ui/modal";
import NewApplication from "./components/newApplication";

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [guestMode, setGuestMode] = useState(false);
    const modal = useModal();

    return (
        <div className="flex fixed flex-col w-full font-jakarta h-screen max-w-85 bg-surface-container-low justify-between">
            {/** Top half */}
            <div className="flex flex-col w-full px-5 py-8 gap-12">
                {/** Title */}
                <div className="flex gap-3 items-center">
                    <img className="w-8 rounded-lg"
                        src="/logo.png" alt="logo" />
                    <div className="flex flex-col">
                        <h1 className="font-extrabold text-2xl text-primary">
                            FlowSpace
                        </h1>
                        <h2>
                            Your Career Companion
                        </h2>
                    </div>
                    {guestMode && 
                        <h1 className="bg-surface-variant text-xs text-on-surface-variant uppercase tracking-wider px-2 py-0.5 rounded-full font-bold">
                            Guest
                        </h1>
                    }
                </div>
                <button 
                    onClick={() => modal.show(<NewApplication />)}
                    className="py-3 px-3 text-sm font-semibold rounded-lg bg-primary text-on-primary hover:bg-primary/70 transition-colors duration-200">
                    + New Application
                </button>
                {/** Content links */}
                <div className="flex flex-col gap-3">
                    <div 
                        onClick={() => router.replace('/home')}
                        className={`flex rounded-lg py-4 
                        ${pathname !== "/home" ? 'hover:bg-surface-container-lowest font-semibold text-on-surface-variant' 
                        : 'text-primary font-bold bg-surface-container-high border-r-2 border-primary'}
                        gap-3 px-5 transition-all`}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/>
                        </svg>
                        <h1>
                            Home
                        </h1>
                    </div>
                    <div 
                        onClick={() => router.replace('/board')}
                        className={`flex rounded-lg py-4 
                        ${pathname !== "/board" ? 'hover:bg-surface-container-lowest font-semibold text-on-surface-variant' 
                        : 'text-primary font-bold bg-surface-container-high border-r-2 border-primary'}
                        gap-3 px-5 transition-all`}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M120-840h320v320H120v-320Zm400 0h320v320H520v-320ZM120-440h320v320H120v-320Zm520 0h80v120h120v80H720v120h-80v-120H520v-80h120v-120Z"/>
                        </svg>
                        <h1>
                            My Board
                        </h1>
                    </div>
                    <div 
                        onClick={() => router.replace('/statistics')}
                        className={`flex rounded-lg py-4 
                        ${pathname !== "/statistics" ? 'hover:bg-surface-container-lowest font-semibold text-on-surface-variant' 
                        : 'text-primary font-bold bg-surface-container-high border-r-2 border-primary'}
                        gap-3 px-5 transition-all`}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M160-160v-320h160v320H160Zm240 0v-640h160v640H400Zm240 0v-440h160v440H640Z"/>
                        </svg>
                        <h1>
                            Statistics
                        </h1>
                    </div>
                </div>
            </div>
            {/** Footer */}
            <div className="flex-col w-full py-5 px-5 border-t border-surface-container-highest gap-3">
                <div 
                    onClick={() => router.replace('/home')}
                    className="flex font-semibold rounded-lg gap-3 py-3 px-5 hover:bg-surface-container-high">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M513.5-254.5Q528-269 528-290t-14.5-35.5Q499-340 478-340t-35.5 14.5Q428-311 428-290t14.5 35.5Q457-240 478-240t35.5-14.5ZM442-394h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                    </svg>
                    <h1>
                        Help Center
                    </h1>
                </div>
                {guestMode ? 
                    <div 
                        onClick={() => router.replace('/home')}
                        className="flex font-semibold rounded-lg gap-3 py-3 px-5 hover:bg-surface-container-high">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M160-160v-80h109q-51-44-80-106t-29-134q0-112 68-197.5T400-790v84q-70 25-115 86.5T240-480q0 54 21.5 99.5T320-302v-98h80v240H160Zm440 0q-50 0-85-35t-35-85q0-48 33-82.5t81-36.5q17-36 50.5-58.5T720-480q53 0 91.5 34.5T858-360q42 0 72 29t30 70q0 42-29 71.5T860-160H600Zm116-360q-7-41-27-76t-49-62v98h-80v-240h240v80H691q43 38 70.5 89T797-520h-81ZM600-240h260q8 0 14-6t6-14q0-8-6-14t-14-6h-70v-50q0-29-20.5-49.5T720-400q-29 0-49.5 20.5T650-330v10h-50q-17 0-28.5 11.5T560-280q0 17 11.5 28.5T600-240Zm120-80Z"/>
                        </svg>
                        <h1>
                            Sign up to sync
                        </h1>
                    </div>
                :
                    <div 
                        onClick={() => router.replace('/home')}
                        className="flex font-semibold rounded-lg gap-3 py-3 px-5 hover:bg-surface-container-high">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/>
                        </svg>
                        <h1>
                            Log Out
                        </h1>
                    </div>
                }
            </div>
        </div>
    )
}