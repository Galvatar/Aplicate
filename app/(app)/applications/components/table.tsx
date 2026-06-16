"use client";

import { useApplications } from "@/hooks/use-applications";
import { Application, Settings } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TableDropdown from "./tableDropdown";
import { columns } from "./columns";
import { useSettings } from "@/hooks/use-settings";

interface TableProps {
  applications: Application[];
}

export default function Table({ applications }: TableProps) {
  const { getSettings, updateSettings } = useSettings();
  const router = useRouter();
  const [sortAscending, setSortAscending] = useState(true);
  const [sortColumn, setSortColumn] = useState("apply");
  const [activeCols, setActiveCols] = useState<string[]>(["company"]);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(5);
  
  var sortedApplications = applications;

  useEffect(() => {
    const settings = getSettings();
    if (settings) {
        setActiveCols(settings.active_columns);
    }
  }, [])

  const paginated = sortedApplications.slice(page, page + perPage);

  const handleSort = (sortStrategy?: (a: any, b:any) => number) => {
    setSortAscending((prev) => !prev);
    if (!sortStrategy) return;
    if (sortAscending) {
        sortedApplications = applications.sort((a,b) => sortStrategy(a,b));
    } else {
        sortedApplications = applications.sort((a,b) => sortStrategy(b,a));
    }
  };

  function handleActiveCols(newCol: string) {
    if (activeCols.includes(newCol)) {
        const newSettings: Settings = {
            active_columns: activeCols.filter(cols => cols !== newCol)
        }
        updateSettings(newSettings);
        setActiveCols(activeCols.filter(cols => cols !== newCol));
    } else {
        const newSettings: Settings = {
            active_columns: [...activeCols, newCol]
        }
        updateSettings(newSettings);
        setActiveCols(activeCols => [...activeCols, newCol]);
    }
  }

  return (
    <div className="flex flex-col items-start gap-3">
        <TableDropdown active={activeCols} onChange={(e) => handleActiveCols(e)} />
        <div className="rounded-3xl border border-outline-variant/10 overflow-y-hidden overflow-x-scroll">
            <table className="w-full h-fit text-left border-collapse">
            <thead>
                <tr className="bg-surface-container-high/50">
                    {columns.map((col) => {
                        if (!activeCols.includes(col.key)) return;
                        return (
                        <th
                            key={col.key}
                            onClick={() => {
                                if (col.sortStrategy) {
                                    setSortColumn(col.key);
                                    handleSort(col.sortStrategy);
                                }
                            }}
                            className={`py-5 px-8 text-on-surface-variant uppercase tracking-widest text-sm ${col.sortStrategy ? 'cursor-pointer' : ''}`}
                        >
                            <span className="flex items-center">
                            {col.label}
                                <svg
                                    className={`${sortColumn === col.key ? "opacity-100" : "opacity-0"} ${sortAscending ? "rotate-0" : "rotate-180"}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24px"
                                    viewBox="0 -960 960 960"
                                    width="24px"
                                    fill="currentColor"
                                >
                                    <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                                </svg>
                            </span>
                        </th>)})}
                </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/50">
                {paginated.map((application) => (
                <tr
                    onClick={() => router.push(`/job/${application.id!}`)}
                    key={application.id}
                    className="cursor-pointer hover:bg-surface-container-high transition-colors group"
                >
                    {columns.map((column) => {
                        if (!activeCols.includes(column.key)) return;
                        return (
                            <td key={column.key} className="py-6 px-8">
                                {column.format(application)}
                            </td>
                        )})}
                </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                <td
                    colSpan={20}
                    className="bg-surface-container-high/50 p-5 items-center justify-center"
                >
                    <div className="flex items-center justify-between gap-3 font-semibold">
                    <select
                        className="rounded-lg bg-surface-container-highest px-3 py-2 outline-none"
                        value={perPage}
                        onChange={(e) => {
                        setPage(0);
                        setPerPage(Number(e.target.value));
                        }}
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
                        className="p-1 hover:bg-surface-bright rounded-full transition-colors"
                        >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="currentColor"
                        >
                            <path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z" />
                        </svg>
                        </button>
                        <button
                        onClick={() => {
                            if (page == 0) return;
                            setPage(page - perPage);
                        }}
                        className="p-1 hover:bg-surface-bright rounded-full transition-colors"
                        >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="currentColor"
                        >
                            <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
                        </svg>
                        </button>
                        Page {page / perPage + 1} of{" "}
                        {Math.ceil(sortedApplications.length / perPage)}
                        <button
                        onClick={() => {
                            if (page + perPage >= sortedApplications.length) return;
                            setPage(page + perPage);
                        }}
                        className="p-1 hover:bg-surface-bright rounded-full transition-colors"
                        >
                        <svg
                            className="rotate-180"
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="currentColor"
                        >
                            <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
                        </svg>
                        </button>
                        <button
                        onClick={() => {
                            if (page + perPage >= sortedApplications.length) return;
                            setPage(
                            (Math.ceil(sortedApplications.length / perPage) - 1) *
                                perPage,
                            );
                        }}
                        className="p-1 hover:bg-surface-bright rounded-full transition-colors"
                        >
                        <svg
                            className="rotate-180"
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="currentColor"
                        >
                            <path d="M440-240 200-480l240-240 56 56-183 184 183 184-56 56Zm264 0L464-480l240-240 56 56-183 184 183 184-56 56Z" />
                        </svg>
                        </button>
                    </div>
                    <h4>Page Count {paginated.length}</h4>
                    </div>
                </td>
                </tr>
            </tfoot>
            </table>
        </div>
    </div>
  );
}
