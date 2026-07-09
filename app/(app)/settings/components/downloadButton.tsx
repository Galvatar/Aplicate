import { useApplications } from "@/hooks/use-applications"
import { Application } from "@/lib/types";
import { useState } from "react";

export default function DownloadButton() {
    const { getApplications } = useApplications();
    const [loading, setLoading] = useState(false);

    async function handleDownload() {
        setLoading(true);
        try {
            const applications: Application[] = await getApplications();
            const headers: (keyof Application)[] = [
                "id", "userId", "title", "company", "employmentType", "foundOn", 
                "status", "location", "applied", "lastUpdate", "journey", "notes", 
                "jobDescription", "pay", "url", "mainContact", "minPay", "maxPay", 
                "currency", "rating", "closingDate", "followUpDate", "autoUpdated"
            ];

            const csvRows = applications.map(app => {
                return headers.map(header => {
                    let rawValue = app[header];

                    if (rawValue instanceof Date) {
                    rawValue = rawValue.toISOString().split('T')[0];
                    }

                    let value = rawValue === null || rawValue === undefined ? "" : String(rawValue);
                    
                    if (value.includes(",") || value.includes("\n") || value.includes("\"")) {
                    value = `"${value.replace(/"/g, '""')}"`;
                    }
                    
                    return value;
                }).join(",");
            });

            const csvString = [headers.join(","), ...csvRows].join("\n");

            const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "aplicate-data.csv";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <button 
            onClick={handleDownload}
            disabled={loading}
            className="flex items-center justify-center py-3 px-3 font-semibold rounded-lg bg-primary text-on-primary hover:bg-primary/70 transition-colors duration-200 gap-3"
        >
            Download My Data (CSV)
        </button>
    )
}