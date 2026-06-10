'use client'

import { signInWithGoogle, signUp } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignupPage() {
    const router = useRouter();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordValidation, setPasswordValidation] = useState("");
    const [error, setError] = useState("");
    const [disableSubmit, setDisableSubmit] = useState(true);
    const [disableGoogle, setDisableGoogle] = useState(false);

    useEffect(() => {
      if (fullName !== ""
        && email !== ""
        && password !== ""
        && passwordValidation !== ""
      ) {
        setDisableSubmit(false)
      }
    }, [fullName, email, password, passwordValidation])
    

    async function handleSubmit() {
        setError("");
        setDisableSubmit(true);
        setDisableGoogle(true);
        if (password !== passwordValidation) {
            setError("Passwords do not match.")
            return;
        }
        const error = await signUp(fullName, email, password, passwordValidation);
        if (error !== "") {
            setError(error);
        } else {
            router.replace('/home');
        }
        setDisableSubmit(false);
        setDisableGoogle(false);
    }

    return (
        <div className="flex flex-col font-jakarta w-full h-full items-center justify-center mb-10 space-y-4">
            <div className="w-20 h-20 rounded-xl overflow-hidden shadow-lg border border-outline-variant/30 flex items-center justify-center bg-surface-container">
                <img src={'/logo.png'} alt="FlowSpace logo" className="opacity-90" />
            </div>
            <h1 className="text-primary text-3xl font-bold text-center">
                Aplicate
            </h1>
            <h2 className="text-on-surface-variant text-sm font-medium text-center max-w-xs">
                Your journey to employment starts here.
            </h2>
            <div className="glass-panel w-full max-w-md rounded-xl p-8 md:p-10 shadow-xl relative overflow-hidden bg-surface-container-low border-outline-variant/30">
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
                <h2 className="text-on-surface text-3xl font-semibold mb-8 text-center relative z-10">
                    Create Account
                </h2>
                <form 
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSubmit()
                    }}
                    className="space-y-6 relative z-10">
                    {/** Full name */}
                    <div className="space-y-2">
                        <label className="block text-on-surface-variant font-semibold">
                            Full Name
                        </label>
                        <div className="relative">
                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant/50" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M367-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q560-607 560-640t-23.5-56.5Q513-720 480-720t-56.5 23.5Q400-673 400-640t23.5 56.5Q447-560 480-560t56.5-23.5ZM480-640Zm0 400Z"/>
                            </svg>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Jane Doe"
                                className="w-full outline-none input-field rounded-lg py-3 pl-10 pr-4 placeholder-on-surface-variant/40 bg-surface-container-highest border-transparent text-on-surface"
                            />
                        </div>
                    </div>
                    {/** Email */}
                    <div className="space-y-2">
                        <label className="block text-on-surface-variant font-semibold">
                            Email
                        </label>
                        <div className="relative">
                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant/50" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/>
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
                        <label className="block text-on-surface-variant font-semibold">
                            Password
                        </label>
                        <div className="relative">
                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant/50" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm296.5-143.5Q560-327 560-360t-23.5-56.5Q513-440 480-440t-56.5 23.5Q400-393 400-360t23.5 56.5Q447-280 480-280t56.5-23.5ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/>
                            </svg>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="•••••••"
                                className="w-full input-field outline-none rounded-lg py-3 pl-10 pr-4 placeholder-on-surface-variant/40 bg-surface-container-highest border-transparent text-on-surface"
                            />
                        </div>
                    </div>
                    {/** Password Confirmation*/}
                    <div className="space-y-2">
                        <label className="block text-on-surface-variant font-semibold">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant/50" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm296.5-143.5Q560-327 560-360t-23.5-56.5Q513-440 480-440t-56.5 23.5Q400-393 400-360t23.5 56.5Q447-280 480-280t56.5-23.5ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/>
                            </svg>
                            <input
                                type="password"
                                value={passwordValidation}
                                onChange={(e) => setPasswordValidation(e.target.value)}
                                placeholder="•••••••"
                                className="w-full input-field outline-none rounded-lg py-3 pl-10 pr-4 placeholder-on-surface-variant/40 bg-surface-container-highest border-transparent text-on-surface"
                            />
                        </div>
                    </div>
                    <button 
                        disabled={disableSubmit}
                        className="flex w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary-container rounded-lg py-3 px-4 justify-center items-center gap-2 font-semibold bg-primary-container hover:bg-primary text-on-primary-container transition-colors"
                        type="submit">
                        Create Account
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/>
                        </svg>
                    </button>
                    {error !== "" &&
                    <h4 className="bg-red-300 text-sm font-semibold border border-red-500 text-red-700 rounded-lg p-3">
                        {error}
                    </h4>}
                </form>
                <div className="flex w-full mt-5 gap-5 items-center">
                    <div className="h-fit w-full p-px bg-on-surface/20" />
                    <h1 className="text-xs font-semibold text-on-surface/80">
                        OR
                    </h1>
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
                    className="w-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent text-lg rounded-lg py-3 px-4 border border-outline-variant/50 flex justify-center items-center gap-2 mt-5 hover:bg-surface-container-lowest transition-colors duration-300">
                    <img src={'/google.png'} alt="Google log" className="w-5 h-5" />
                    Signup with Google
                </button>
                <button 
                    onClick={() => {
                        router.replace('/home')
                    }}
                    className="w-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent text-lg rounded-lg py-3 px-4 border border-outline-variant/50 flex justify-center items-center gap-2 mt-5 hover:bg-surface-container-lowest transition-colors duration-300">
                    Continue as Guest
                </button>
                <div className="flex gap-2 w-full items-center justify-center mt-5">
                    <h1>
                        Already have an account?
                    </h1>
                    <button 
                        onClick={() => router.replace('/login')}
                        className="text-primary hover:underline font-bold transition-all">
                        Log In
                    </button>
                </div>
            </div>
        </div>
    )
}