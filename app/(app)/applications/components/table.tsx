"use client"

import KebabMenu from "@/components/ui/kebabMenu";
import Rating from "@/components/ui/rating";
import StatusLabel from "@/components/ui/statusLabel";
import { timeAgo } from "@/lib/timeAgo";
import { Application } from "@/lib/types"
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface TableProps {
    applications: Application[]
}

export default function Table({ applications }: TableProps) {
    const [sortAscending, setSortAscending] = useState(true);
    const [sortColumn, setSortColumn] = useState("apply");
    const sortedApplications = useMemo(() => {
        return [...applications].sort((a, b) => {
            switch (sortColumn) {
                case "apply":
                    if (sortAscending) {
                        return new Date(a.applied).getTime() - new Date(b.applied).getTime()
                    } else {
                        return new Date(b.applied).getTime() - new Date(a.applied).getTime()
                    }
                case "update":
                    if (sortAscending) {
                        return new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime()
                    } else {
                        return new Date(a.lastUpdate).getTime() - new Date(b.lastUpdate).getTime()
                    }
                case "status":
                    if (sortAscending) {
                        return a.status.localeCompare(b.status);
                    } else {
                        return b.status.localeCompare(a.status);
                    }
                case "rating":
                    if (sortAscending) {
                        return a.rating - b.rating;
                    } else {
                        return b.rating - a.rating;
                    }

                default:
                    return 0;
            }
        });
    }, [applications, sortColumn, sortAscending]);
    const router = useRouter();
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

    const handleSort = (columnName: string) => {
        if (sortColumn === columnName) {
            setSortAscending(prev => !prev);
        } else {
            setSortColumn(columnName);
            setSortAscending(true); 
        }
    };

    return (
        <table className="w-full h-fit text-left border-collapse">
            <thead>
                <tr className="bg-surface-container-high/50">
                    <th 
                        className="py-5 px-8 text-on-surface-variant uppercase tracking-widest text-sm">
                        Company & role
                    </th>
                    <th 
                        onClick={() => {
                            handleSort("apply")
                        }}
                        className="py-5 px-8 text-on-surface-variant uppercase tracking-widest text-sm">
                        <span className="flex items-center">
                            Date Applied
                            <svg 
                                className={`${sortColumn === "apply" ? 'opacity-100' : 'opacity-0'} ${sortAscending ? 'rotate-0' : 'rotate-180'}`}
                                xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
                            </svg>
                        </span>
                    </th>
                    <th 
                        onClick={() => {
                            handleSort("update")
                        }}
                        className="py-5 px-8 text-on-surface-variant uppercase tracking-widest text-sm">
                        <span className="flex items-center">
                            Last Update
                            <svg 
                                className={`${sortColumn === "update" ? 'opacity-100' : 'opacity-0'} ${sortAscending ? 'rotate-0' : 'rotate-180'}`}
                                xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
                            </svg>
                        </span>
                    </th>
                    <th 
                        onClick={() => {
                            handleSort("status")
                        }}
                        className="py-5 px-8 text-on-surface-variant uppercase tracking-widest text-sm">
                        <span className="flex items-center">
                            Status
                            <svg 
                                className={`${sortColumn === "status" ? 'opacity-100' : 'opacity-0'} ${sortAscending ? 'rotate-0' : 'rotate-180'}`}
                                xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
                            </svg>
                        </span>
                    </th>
                    <th 
                        onClick={() => {
                            handleSort("rating")
                        }}
                        className="py-5 px-8 text-on-surface-variant uppercase tracking-widest text-sm">
                        <span className="flex items-center">
                            Rating
                            <svg 
                                className={`${sortColumn === "rating" ? 'opacity-100' : 'opacity-0'} ${!sortAscending ? 'rotate-0' : 'rotate-180'}`}
                                xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
                            </svg>
                        </span>
                    </th>
                    <th className="py-5 px-8 text-on-surface-variant uppercase tracking-widest text-sm" />
                </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/50">
            {sortedApplications.map((application) => (
                <tr
                onClick={() => router.replace(`/job/${application.id!}`)}
                key={application.id}
                className="hover:bg-surface-container/30 transition-colors group"
                >
                    <td className="py-6 px-8">
                        <div className="flex items-center gap-4">
                        <div className="min-w-12 h-12 rounded-xl bg-on-tertiary flex items-center justify-center text-primary font-bold text-lg">
                            {application.company.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                            <h4 className="font-bold text-on-surface group-hover:text-primary transition-colors">
                            {application.company}
                            </h4>
                            <h5 className="text-on-surface-variant/80 text-sm font-semibold">
                            {application.title}
                            </h5>
                        </div>
                        </div>
                    </td>
                    <td className="p-6 text-on-surface-variant">
                        {months[new Date(application.applied).getMonth()]}{" "}
                        {new Date(application.applied).getDate()},{" "}
                        {new Date(application.applied).getFullYear()}
                    </td>
                    <td className="p-6 text-on-surface-variant">
                        {timeAgo(application.lastUpdate)}
                    </td>
                    <td className="p-6">
                        <StatusLabel status={application.status} />
                    </td>
                    <td className="p-6">
                        <div className="max-w-50">
                            <Rating editable={false} rating={application.rating} />
                        </div>
                    </td>
                    <td 
                        onClick={(e) => e.stopPropagation()}
                        className="p-6">
                        <KebabMenu application={application} />
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}