"use client"

import { useState } from "react";
import { order } from "./components/scoreLogic";

export default function CVCheckerPage() {
    const [jd, setJd] = useState("");
    return (
        <div className="flex flex-col w-full h-full font-jakarta py-10 px-5 md:px-15 gap-10 bg-background text-on-background">
            <textarea
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              placeholder="Job description..."
              className="border-0 rounded-xl p-2 outline-none text-on-background font-bold placeholder:text-on-surface-variant/30 placeholder:font-semibold resize-none w-full h-full bg-surface-container-highest"
            />
            <button
                onClick={() => setJd(order(jd))}
                className="bg-surface-container py-3 rounded-lg hover:bg-surface-container-highest transition-colors">
                Clean
            </button>
        </div>
    )
}