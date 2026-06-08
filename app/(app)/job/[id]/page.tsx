'use client'

import { useApplications } from "@/hooks/use-applications";
import { Application } from "@/lib/types";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";

export default function JobPage() {
    const [application, setApplication] = useState<Application>();
    const params = useParams();
    const id = params.id as string;
    const router = useRouter();
    const { getApplication, loading } = useApplications();

    useEffect(() => {
        if (loading) return
        getApplication(id).then(setApplication)
    }, [loading, id])

    useEffect(() => {
        console.log(application)
    }, [application])

    if (!application) {
        return (
            <div>
                Loading...
            </div>
        )
    }
    
    return (
        <div className="flex w-full h-full font-jakarta py-20 px-15 gap-4 bg-background text-on-background">
            <div className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12 flex flex-col min-h-full">
                <button 
                    onClick={() => router.replace('/applications')}
                    className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-md mb-8 w-fit group">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
                    </svg>
                    Back to Applications
                </button>
                <div className="flex mb-8 items-center">
                    <div className="w-fit min-w-12 h-12 rounded-xl bg-on-tertiary flex items-center justify-center text-primary-fixed-dim font-bold text-lg">
                        {application.company.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-on-surface mb-2">
                            {application.title}
                        </h2>
                        <h3 className="flex text-on-surface-variant items-center gap-2">
                            {application.company}
                            <span className="w-1 h-1 rounded-full bg-outline-variant" />
                            <span className="flex items-center gap-1">
                                <svg className="material-symbols-outlined text-body-lg" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M324-111.5Q251-143 197-197t-85.5-127Q80-397 80-480t31.5-156Q143-709 197-763t127-85.5Q397-880 480-880t156 31.5Q709-817 763-763t85.5 127Q880-563 880-480t-31.5 156Q817-251 763-197t-127 85.5Q563-80 480-80t-156-31.5ZM440-162v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm276-102q41-45 62.5-100.5T800-480q0-98-54.5-179T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h240q17 0 28.5 11.5T600-440v120h40q26 0 47 15.5t29 40.5Z"/>
                                </svg>
                                Remote
                            </span>
                        </h3>
                    </div>
                </div>
                <div className="lg:col-span-8 flex flex-col h-full min-h-150 bg-surface-container-lowest rounded-3xl border border-outline-variant/5 relative overflow-hidden group transition-all duration-500 hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary/10 via-tertiary/10 to-transparent"></div>
                    <div className="p-8 md:p-12 flex-1 flex flex-col h-full">
                        <div className="flex justify-between items-center mb-8 border-b border-outline-variant/10 pb-4">
                            <h3 className="w-full text-on-surface-variant tracking-widest uppercase flex items-center justify-between gap-2 font-semibold">
                                <div className="flex gap-2">
                                    <svg className="material-symbols-outlined text-body-md"
                                        xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M560-80v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T903-300L683-80H560Zm300-263-37-37 37 37ZM620-140h38l121-122-18-19-19-18-122 121v38ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v120h-80v-80H520v-200H240v640h240v80H240Zm280-400Zm241 199-19-18 37 37-18-19Z"/>
                                    </svg>
                                    Research &amp; Notes
                                </div>
                                <span className="normal-case text-outline">Saved locally for guest users</span>
                            </h3>
                        </div>
                        <div
                            className="pl-6 space-y-2 mb-6 text-on-surface-variant outline-none font-body-lg leading-[1.8]"
                            dangerouslySetInnerHTML={{
                                __html: application?.jobDescription || "No job description for this application.",
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col">

            </div>
        </div>
    )
}