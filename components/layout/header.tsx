import { useUser } from "@/hooks/use-user";
import { usePathname, useRouter } from "next/navigation"

export default function Header() {
    const router = useRouter();
    const pathname = usePathname();
    const { user } = useUser();

    return (
        <div className="flex fixed w-full bg-background top-0 z-10 py-4 px-20 h-full max-h-20 border-b border-b-surface-container-high justify-between">
            <span
            onClick={() => router.push("/")}
            className="flex gap-2 items-center cursor-pointer"
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
            <div className="flex gap-15 tracking-tight text-lg font-medium items-center">
                <button
                    onClick={() => router.push('/')}
                    className={`h-fit ${pathname === "/" ? "font-extrabold text-primary border-b-3 border-primary" : "hover:text-on-surface-variant"} transition-colors`}
                >
                    Features
                </button>
                <button
                    onClick={() => router.push('/pricing')}
                    className={`h-fit ${pathname === "/pricing" ? "font-extrabold text-primary border-b-3 border-primary" : "hover:text-on-surface-variant"} transition-colors`}
                >
                    Pricing
                </button>
                <button
                    onClick={() => router.push('/about')}
                    className={`h-fit ${pathname === "/about" ? "font-extrabold text-primary border-b-3 border-primary" : "hover:text-on-surface-variant"} transition-colors`}
                >
                    About
                </button>
            </div>
            {user ?
            <div className="flex gap-5 font-semibold items-center">
                <button
                    onClick={() => router.push("/home")}
                    className="px-8 rounded-full h-full bg-primary hover:bg-primary-container text-on-primary transition-colors shadow-lg shadow-primary/30"
                >
                    Go To Dashboard
                </button>
            </div>
            :
            <div className="flex gap-5 font-semibold items-center">
                <button
                    onClick={() => router.push("/login")}
                    className="hover:text-on-surface-variant transition-colors"
                >
                    Log In
                </button>
                <button
                    onClick={() => router.push("/signup")}
                    className="px-8 rounded-full h-full bg-primary hover:bg-primary-container text-on-primary transition-colors shadow-lg shadow-primary/30"
                >
                    Start Tracking (Free)
                </button>
            </div>}
        </div>
    )
}