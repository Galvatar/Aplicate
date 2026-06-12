"use client"

import { useApplications } from "@/hooks/use-applications";
import { Application, Status } from "@/lib/types";
import { useRef, useState } from "react";

export default function UploadSection({ userId }: { userId: string }) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [copyText, setCopyText] = useState("Copy AI Prompt");
    const [isDragging, setIsDragging] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    
    const csvPrompt = `
    Transform the following into a CSV such that it has the following columns:
    title, company, employmentType, foundOn, status, location, applied, lastUpdate, journey, notes, pay, url, mainContact, rating 
    journey is a comma separated list of status' the application has gone through if available. 
    Url is the job posting url. Contact is the main way of contacting the primary contact related to this application. 
    Status is one of the following: PreRegister, Apply, Assessment, Interview, Offer, Rejected.
    Applied is the date when the job was applied to.
    Rating is a number from 0-5 representing how much the user likes the job/company/pay.
    The two primary columns that cannot be empty are title and company all else is optional and can be left empty if not found.
    The date should be an iso 8601 string if it contains any.
    `;
    
    const { createApplications } = useApplications();

    // 2. Extracted the core logic so both drop and click can use it
    const processFile = async (file: File) => {
        try {
            console.log("📂 File selected:", file.name);
            const parsedApps = await parseApplicationsCSV(file, userId);
            console.log("✅ Parsed applications cleanly:", parsedApps);
            await createApplications(parsedApps);
            setUploaded(true);
        } catch (err) {
            console.error("❌ Failed to parse uploaded CSV:", err);
            alert("Failed to parse the CSV file.");
        } finally {
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) await processFile(file);
    };

    // 3. --- ADDED DRAG AND DROP HANDLERS ---
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); // Prevents the browser from opening the file in a new tab!
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); // Prevents the browser default behavior
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (!file) return;

        // Basic check to ensure it's a CSV
        if (file.type === "text/csv" || file.name.endsWith(".csv")) {
            await processFile(file);
        } else {
            alert("Please upload a valid .csv file.");
        }
    };

    function parseCSVLine(text: string): string[] {
        const result: string[] = [];
        let currentStr = '';
        let inQuotes = false;
        
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (inQuotes) {
                if (char === '"') {
                    if (i + 1 < text.length && text[i + 1] === '"') {
                        currentStr += '"';
                        i++; 
                    } else {
                        inQuotes = false;
                    }
                } else {
                    currentStr += char;
                }
            } else {
                if (char === '"') {
                    inQuotes = true;
                } else if (char === ',') {
                    result.push(currentStr.trim());
                    currentStr = '';
                } else {
                    currentStr += char;
                }
            }
        }
        result.push(currentStr.trim());
        return result;
    }

    const parseApplicationsCSV = async (csvInput: string | File, currentUserId: string): Promise<Application[]> => {
        const csvText = typeof csvInput === "string" ? csvInput : await csvInput.text();
        const lines = csvText.split(/\r?\n/).filter(line => line.trim() !== "");
        if (lines.length < 2) return [];

        const headers = parseCSVLine(lines[0]);
        const applications: Application[] = [];

        for (let i = 1; i < lines.length; i++) {
            const rowValues = parseCSVLine(lines[i]);
            const row: Record<string, string> = {};
            
            headers.forEach((header, index) => {
                row[header] = rowValues[index] || "";
            });

            applications.push({
                userId: currentUserId,
                title: row.title || "Unknown Title",
                company: row.company || "Unknown Company",
                employmentType: row.employmentType || undefined,
                foundOn: row.foundOn || undefined,
                status: Object.values(Status).includes(row.status as Status) ? (row.status as Status) : Status.Apply,
                location: row.location || undefined,
                applied: row.applied ? new Date(row.applied) : new Date(),
                lastUpdate: row.lastUpdate ? new Date(row.lastUpdate) : new Date(),
                journey: row.journey || row.status || "Apply",
                notes: row.notes || undefined,
                jobDescription: row.jobDescription || undefined,
                pay: row.pay || undefined,
                url: row.url || undefined,
                mainContact: row.mainContact || "",
                minPay: row.minPay ? Number(row.minPay) : undefined,
                maxPay: row.maxPay ? Number(row.maxPay) : undefined,
                currency: row.currency || undefined,
                rating: row.rating ? parseInt(row.rating, 10) : 0,
            });
        }
        return applications;
    };

    if (uploaded) {
        return (
            <div className="flex flex-col gap-3">
                <h1 className="flex items-center gap-3 mt-5 ml-5 font-bold text-3xl text-on-surface tracking-tight">
                    <svg className="text-primary" xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="currentColor">
                        <path d="M440-200h80v-167l64 64 56-57-160-160-160 160 57 56 63-63v167ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
                    </svg>
                    Import Data
                </h1>
                <div 
                    className={`group flex flex-col items-center p-5 bg-surface-container rounded-xl border-2 border-dashed border-primary justify-between transition-colors`}
                >
                    <h1 className="font-bold py-5 text-2xl text-on-surface pointer-events-none">
                        Parsed Successfully!
                    </h1>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-3">
            <h1 className="flex items-center gap-3 mt-5 ml-5 font-bold text-3xl text-on-surface tracking-tight">
                <svg className="text-primary" xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="currentColor">
                    <path d="M440-200h80v-167l64 64 56-57-160-160-160 160 57 56 63-63v167ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
                </svg>
                Import Data
            </h1>
            
            {/* 4. ATTACHED THE HANDLERS TO THE CONTAINER AND UPDATED STYLES FOR DRAG STATE */}
            <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`group flex flex-col items-center p-5 bg-surface-container rounded-xl border-2 border-dashed justify-between transition-colors ${
                    isDragging 
                    ? 'border-primary bg-primary/10' 
                    : 'border-surface-container-highest hover:border-primary/50'
                }`}
            >
                <div className="p-3 aspect-square rounded-full text-primary bg-primary/20 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="currentColor">
                        <path d="M230-360h120v-60H250v-120h100v-60H230q-17 0-28.5 11.5T190-560v160q0 17 11.5 28.5T230-360Zm156 0h120q17 0 28.5-11.5T546-400v-60q0-17-11.5-31.5T506-506h-60v-34h100v-60H426q-17 0-28.5 11.5T386-560v60q0 17 11.5 30.5T426-456h60v36H386v60Zm264 0h60l70-240h-60l-40 138-40-138h-60l70 240ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-480H160v480Zm0 0v-480 480Z" />
                    </svg>
                </div>
                
                <h1 className="font-bold mt-5 text-xl text-on-surface pointer-events-none">
                    CSV Auto-Parse
                </h1>
                
                <p className="max-w-150 text-center font-semibold text-sm mt-3 text-on-surface/80 pointer-events-none">
                    Drag and drop your job applications CSV file here. The csv file <b>must</b> have the following columns:
                    title, company, employmentType, foundOn, status, location, applied, lastUpdate, journey, notes, pay, url, mainContact, rating
                </p>
                
                <button
                    onClick={async () => {
                        await navigator.clipboard.writeText(csvPrompt);
                        setCopyText("Copied!")
                        setTimeout(() => setCopyText("Copy AI Prompt"), 2000);
                    }}
                    className="flex gap-2 px-5 py-3 mt-5 bg-primary hover:bg-primary-container text-on-primary font-bold rounded-xl transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h167q11-35 43-57.5t70-22.5q40 0 71.5 22.5T594-840h166q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560h-80v120H280v-120h-80v560Zm308.5-571.5Q520-783 520-800t-11.5-28.5Q497-840 480-840t-28.5 11.5Q440-817 440-800t11.5 28.5Q463-760 480-760t28.5-11.5Z" />
                    </svg>
                    {copyText}
                </button>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".csv"
                    className="hidden" 
                />

                <button 
                    onClick={handleButtonClick}
                    className="flex gap-2 px-5 py-3 mt-5 bg-primary hover:bg-primary-container text-on-primary font-bold rounded-xl transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
                        <path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H520q-33 0-56.5-23.5T440-240v-206l-64 62-56-56 160-160 160 160-56 56-64-62v206h220q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41h100v80H260Zm220-280Z" />
                    </svg>
                    Upload CSV
                </button>
            </div>
        </div>
    );
}