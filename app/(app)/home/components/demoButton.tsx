import { useApplications } from "@/hooks/use-applications"
import { demoApplications } from "./demoData";
import { useEffect, useState } from "react";
import { Application } from "@/lib/types";

interface DemoButtonProps {
    setApplications(apps: Application[]): void
}
export default function DemoButton({ setApplications }: DemoButtonProps) {
    const { getApplications, createApplications, deleteApplication } = useApplications();
    const [hasDemo, setHasDemo] = useState(false);

    async function handleData(add: boolean) {
        if (add) {
            await createApplications(demoApplications);
            setHasDemo(true);
            setApplications(await getApplications());
        } else {
            for (let i = 1; i <= demoApplications.length; i++) {
                await deleteApplication(`demo_${i}`);
            }
            setHasDemo(false);
            setApplications(await getApplications());
        }
    }

    useEffect(() => {
      setInitial();
    }, [])
    

    async function setInitial() {
        const apps = await getApplications();
        const hasDemoUser = apps.some(app => app.userId === "demo")
        setHasDemo(hasDemoUser)
    }

    return (
        <button
            onClick={() => handleData(!hasDemo)}
            className="flex h-fit items-center justify-center py-3 px-3 font-semibold rounded-lg bg-primary text-on-primary hover:bg-primary/70 transition-colors duration-200 gap-3"
        >
            {!hasDemo ? 
                <>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="currentColor"
                    >
                        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                    </svg>
                    Add Demo Data
                </>
                :
                <>
                    <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    height="24px" 
                    viewBox="0 -960 960 960" 
                    width="24px" 
                    fill="currentColor">
                        <path d="M200-440v-80h560v80H200Z"/>
                    </svg>
                    Remove Demo Data
                </>
            }
        </button>
    )
}