'use client'

import KebabMenu from "@/components/ui/kebabMenu";
import StatusLabel from "@/components/ui/statusLabel";
import { useApplications } from "@/hooks/use-applications";
import { Application } from "@/lib/types";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react";

export default function JobPage() {
    const [application, setApplication] = useState<Application>();
    const [notes, setNotes] = useState("");
    const [thisJourney, setThisJourney] = useState<string[]>([]);
    const params = useParams();
    const id = params.id as string;
    const router = useRouter();
    const { getApplication, updateApplication, loading } = useApplications();
    const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleChange = (value: string) => {
        setNotes(value);

        if (saveTimer.current) clearTimeout(saveTimer.current);
        saveTimer.current = setTimeout(() => {
            saveNotes(value);
        }, 2000);
    };

    useEffect(() => {
        if (loading) return
        getApplication(id).then(setApplication)
    }, [loading, id])

    useEffect(() => {
        var journey = application?.journey.split(",") ?? [];
        journey.reverse()
        setThisJourney(journey)
        setNotes(application?.notes ?? "");
    }, [application])

    async function saveNotes(newNotes: string) {
        var updatedApp = application;
        updatedApp!.notes = newNotes;
        updateApplication(updatedApp!);
    }

    if (!application) {
        return (
            <div>
                Loading...
            </div>
        )
    }
    
    return (
        <div className="flex w-full h-full font-jakarta py-5 px-15 gap-4 bg-background text-on-background">
            {/** Left side */}
            <div className="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-8 md:py-12 flex flex-col w-full min-h-full">
                <button 
                    onClick={() => router.replace('/applications')}
                    className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-md mb-8 w-fit group">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
                    </svg>
                    Back to Applications
                </button>
                {/** Title */}
                <div className="flex mb-8 items-center gap-3">
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
                                {application.location || application.location !== "" ? application.location : 'Unknown'}
                            </span>
                        </h3>
                    </div>
                </div>

                {/** Notes */}
                <div className="lg:col-span-8 flex flex-col h-fit bg-surface-container-lowest rounded-3xl border border-outline-variant/5 relative group transition-all duration-500 hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
                    <div className="p-8 md:p-12 flex-1 flex flex-col">
                        <div className="flex justify-between items-center mb-8 border-b border-outline-variant/10 pb-4">
                            <h3 className="w-full text-on-surface-variant tracking-widest uppercase flex items-center justify-between gap-2 font-semibold">
                                <div className="flex gap-2">
                                    <svg className="material-symbols-outlined text-body-md"
                                        xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M560-80v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T903-300L683-80H560Zm300-263-37-37 37 37ZM620-140h38l121-122-18-19-19-18-122 121v38ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v120h-80v-80H520v-200H240v640h240v80H240Zm280-400Zm241 199-19-18 37 37-18-19Z"/>
                                    </svg>
                                    Notes
                                </div>
                            </h3>
                        </div>
                        <textarea 
                            value={notes}
                            onChange={(e) => handleChange(e.target.value)}
                            className="flex border border-surface-bright rounded-lg outline-none p-1 h-20"
                            placeholder="My notes..."
                        />
                    </div>
                </div>

                {/** Job description */}
                <div className="mt-5 lg:col-span-8 flex flex-col h-full bg-surface-container-lowest rounded-3xl border border-outline-variant/5 relative overflow-hidden group transition-all duration-500 hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-primary/10 via-tertiary/10 to-transparent"></div>
                    <div className="p-8 md:p-12 flex-1 flex flex-col h-full">
                        <div className="flex justify-between items-center mb-8 border-b border-outline-variant/10 pb-4">
                            <h3 className="w-full text-on-surface-variant tracking-widest uppercase flex items-center justify-between gap-2 font-semibold">
                                <div className="flex gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/>
                                    </svg>
                                    Job Decscription
                                </div>
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
            {/** Right side */}
            <div className="flex flex-col w-full max-w-1/4 items-end gap-5">
                <div className="flex gap-3 my-15">
                    <StatusLabel status={application.status} />
                    <div className="flex aspect-square rounded-full bg-surface-container-high items-center justify-center border border-surface-container-highest">
                        <KebabMenu application={application} />
                    </div>
                </div>
                {/** Key details */}
                <div className="flex flex-col gap-5 w-full bg-surface-container-high rounded-3xl p-6 border border-outline-variant/10">
                    <h3 className="font-semibold text-on-surface-variant tracking-widest uppercase mb-6 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M440-280h80v-240h-80v240Zm68.5-331.5Q520-623 520-640t-11.5-28.5Q497-680 480-680t-28.5 11.5Q440-657 440-640t11.5 28.5Q463-600 480-600t28.5-11.5ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                        </svg>
                        Key Details
                    </h3>
                    {application.pay && 
                    <span className="flex gap-3 -mt-5">
                        <div className="flex h-fit items-center justify-center text-tertiary bg-tertiary-container/30 rounded-full p-1.5">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z"/>
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <h4 className="text-on-surface font-semibold">
                                Compensation
                            </h4>
                            <h5>
                                {application.pay}
                            </h5>
                        </div>
                    </span>}
                    {application.mainContact && application.mainContact !== "" && 
                    <span className="flex gap-3">
                        <div className="flex h-fit items-center justify-center text-tertiary bg-tertiary-container/30 rounded-full p-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M367-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q560-607 560-640t-23.5-56.5Q513-720 480-720t-56.5 23.5Q400-673 400-640t23.5 56.5Q447-560 480-560t56.5-23.5ZM480-640Zm0 400Z"/>
                            </svg>
                        </div>
                        <div className="flex flex-col">
                            <h4 className="text-on-surface font-semibold">
                                Primary Contact
                            </h4>
                            <h5 className="break-all">
                                {application.mainContact}
                            </h5>
                        </div>
                    </span>}
                </div>
                {/** Journey */}
                <div className="flex flex-col w-full bg-surface-container-high rounded-3xl p-6 border border-outline-variant/10">
                    <h3 className="font-semibold text-on-surface-variant tracking-widest uppercase mb-6 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M120-240q-33 0-56.5-23.5T40-320q0-33 23.5-56.5T120-400h10.5q4.5 0 9.5 2l182-182q-2-5-2-9.5V-600q0-33 23.5-56.5T400-680q33 0 56.5 23.5T480-600q0 2-2 20l102 102q5-2 9.5-2h21q4.5 0 9.5 2l142-142q-2-5-2-9.5V-640q0-33 23.5-56.5T840-720q33 0 56.5 23.5T920-640q0 33-23.5 56.5T840-560h-10.5q-4.5 0-9.5-2L678-420q2 5 2 9.5v10.5q0 33-23.5 56.5T600-320q-33 0-56.5-23.5T520-400v-10.5q0-4.5 2-9.5L420-522q-5 2-9.5 2H400q-2 0-20-2L198-340q2 5 2 9.5v10.5q0 33-23.5 56.5T120-240Z"/>
                        </svg>
                        Journey
                    </h3>
                    {thisJourney.map((step, idx) => (
                        <div key={idx} className="flex mb-2 gap-2">
                            <div className="flex flex-col items-center gap-1">
                                <span className="h-3 aspect-square rounded-full border border-tertiary" />
                                <span className="w-px h-full bg-tertiary" />
                            </div>
                            <div className="flex flex-col items-center gap-1 font-semibold">
                                {step}
                            </div>
                        </div>
                    ))
                    }
                </div>
                {/** Original application */}
                {application.url && 
                    <button 
                        onClick={() => window.open(application.url, "_blank")}
                        className="flex w-full items-center justify-center py-3 px-3 font-semibold rounded-xl bg-primary text-on-primary hover:bg-primary/70 transition-colors duration-200 gap-1">
                        Application Page
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="m256-240-56-56 384-384H240v-80h480v480h-80v-344L256-240Z"/>
                        </svg>
                    </button>}
            </div>
        </div>
    )
}