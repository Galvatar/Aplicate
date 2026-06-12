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
    const [page, setPage] = useState(0);
    const [perPage, setPerPage] = useState(5);
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
    const paginated = sortedApplications.slice(page, (page + perPage))
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
            {paginated.map((application) => (
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
            <tfoot>
                <tr>
                    <td colSpan={20} className="bg-surface-container-high/50 p-5 items-center justify-center">
                        <div className="flex items-center justify-between gap-3 font-semibold">
                            <select
                                className="rounded-lg bg-surface-container-highest px-3 py-2 outline-none"
                                value={perPage}
                                onChange={(e) => setPerPage(Number(e.target.value))}
                            >
                                <option value={3}>3</option>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => {
                                        if (page == 0) return;
                                        setPage(0);
                                    }}
                                    className="p-1 hover:bg-surface-bright rounded-full transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z"/>
                                    </svg>
                                </button>
                                <button 
                                    onClick={() => {
                                        if (page == 0) return;
                                        setPage(page - perPage)
                                    }}
                                    className="p-1 hover:bg-surface-bright rounded-full transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
                                    </svg>
                                </button>
                                Page {(page/perPage)+1} of {Math.ceil(sortedApplications.length/perPage)}
                                <button 
                                    onClick={() => {
                                        if ((page + perPage) >= sortedApplications.length) return;
                                        setPage(page + perPage)
                                    }}
                                    className="p-1 hover:bg-surface-bright rounded-full transition-colors">
                                    <svg className="rotate-180" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
                                    </svg>
                                </button>
                                <button
                                    onClick={() => {
                                        if ((page + perPage) >= sortedApplications.length) return;
                                        setPage((Math.ceil(sortedApplications.length/perPage)-1)*perPage);
                                    }}
                                    className="p-1 hover:bg-surface-bright rounded-full transition-colors">
                                    <svg className="rotate-180" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z"/>
                                    </svg>
                                </button>
                            </div>
                            <h4>
                                Page Count {paginated.length}
                            </h4>
                        </div>
                    </td>
                </tr>
            </tfoot>
        </table>
    )
}