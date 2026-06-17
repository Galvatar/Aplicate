import { useRouter } from "next/navigation"

export default function Footer() {
    const router = useRouter();

    return (
        <div className="flex items-center bg-surface-container-lowest justify-between px-20 py-10">
            <div className="flex flex-col gap-3">
            <span
                onClick={() => router.push("/")}
                className="flex w-fit h-10 gap-2 items-center cursor-pointer"
            >
                <div className="w-full h-full">
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
                <h1 className="text-primary font-extrabold text-3xl tracking-tight">
                Aplicate
                </h1>
            </span>
            <h2 className="text-on-surface/80 font-bold text-xs">
                © 2026 Aplicate. Your career companion.
            </h2>
            </div>
            <div className="flex gap-10 font-semibold">
            <button
                onClick={() => router.push("/privacy")}
                className="hover:text-on-surface-variant"
            >
                Privacy Policy
            </button>
            <button
                onClick={() => router.push("/terms")}
                className="hover:text-on-surface-variant"
            >
                Terms of Service
            </button>
            </div>
        </div>
    )
}