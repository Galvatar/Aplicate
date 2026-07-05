"use client"

import { useApplications } from "@/hooks/use-applications"
import { Application } from "@/lib/types"
import { useState } from "react";

interface FollowUpProps {
    app: Application
}

export default function FollowUp({ app }: FollowUpProps) {
    const { updateApplication } = useApplications();
    const [date, setDate] = useState<Date | null>(app.followUpDate ? new Date(app.followUpDate) : null);
    const today = new Date();
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    if (!date) return (<></>)

    return (
        <div className={`flex flex-col ${today > date ? 'text-on-error bg-error font-semibold py-2 px-2 rounded-lg' : ''}`}>
            <h2>
                {months[date.getMonth()]}{" "}
                {date.getDate()},{" "}
                {date.getFullYear()}
            </h2>
            {today > date &&
                <button onClick={(e) => {
                    e.stopPropagation();
                    app.followUpDate = null;
                    updateApplication(app);
                    setDate(null)
                }}
                    className="flex w-full rounded-full bg-error-container/30 hover:bg-error-container hover:text-on-error-container items-center justify-center gap-1 transition-colors"
                >
                    Mark As Done
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                    </svg>
                </button>
            }
        </div>
    )
}