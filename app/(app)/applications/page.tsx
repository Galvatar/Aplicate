"use client";

import Dropdown from "@/components/ui/dropdown";
import { useApplications } from "@/hooks/use-applications";
import { timeAgo } from "@/lib/timeAgo";
import { Application, Status } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Table from "./components/table";

export default function Statistics() {
  const [search, setSearch] = useState("");
  const [applications, setApplications] = useState([] as Application[]);
  const [showRejected, setShowRejected] = useState(false);
  
  const { getApplications, loading } = useApplications();

  var activeApplications = applications
      .filter((app) => app.status !== Status.Rejected);

  if (showRejected) {
    activeApplications = applications;
  }
  
  const searchedApplications = activeApplications
    .filter((app) => {
      if (search === "") return true;

      const searchLower = search.toLowerCase().trim();
      const companyMatch = app.company?.toLowerCase().includes(searchLower);
      const titleMatch = app.title?.toLowerCase().includes(searchLower);

      return companyMatch || titleMatch;
    });

  useEffect(() => {
    if (loading) return
    getApplications().then(setApplications)
  }, [loading])

  return (
    <div className="flex flex-col w-full h-full font-jakarta py-20 px-15 gap-4 bg-background text-on-background">
      {/** Title */}
      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-on-surface tracking-tight mb-2">
            Application Journey
          </h1>
          <h2 className="text-on-surface-variant max-w-2xl">
            Track your proffesional progress with focus and clarity. All your
            opportunities, managed in one serene workspace.
          </h2>
        </div>
        <div className="flex items-center gap-2 bg-surface-container px-4 py-2 rounded-lg border border-outline-variant/20">
          <h1 className="text-secondary font-bold">
            {activeApplications.length}
          </h1>
          <h2 className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest">
            Active
          </h2>
        </div>
      </div>
      {/** Search bar */}
      <div className="relative w-full mt-5">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="currentColor"
        >
          <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search applications, roles, or companies..."
          className="w-full bg-surface-container text-on-surface outline-none border-none rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary/30 transition-all placeholder:opacity-50"
        />
      </div>
      {/** Show rejected */}
      <div className="flex w-full items-center gap-3">
          <input
            id="terms-checkbox"
            type="checkbox"
            checked={showRejected}
            onChange={(e) => setShowRejected(e.target.checked)}
            className="w-5 h-5 rounded cursor-pointer appearance-none accent-primary border border-outline-variant checked:bg-secondary-fixed-dim transition-colors"
          />
          <label
            htmlFor="terms-checkbox"
            className="text-sm text-on-surface-variant cursor-pointer"
          >
            Show Rejected applications
          </label>
        </div>
      {/** Applications */}
      <div className="mt-5 rounded-3xl border border-outline-variant/10 overflow-y-hidden overflow-x-scroll">
        <Table applications={searchedApplications} />
      </div>
    </div>
  );
}
