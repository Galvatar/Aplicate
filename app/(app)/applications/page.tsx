"use client";

import Dropdown from "@/components/ui/dropdown";
import { useApplications } from "@/hooks/use-applications";
import { timeAgo } from "@/lib/timeAgo";
import { Application, Status } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Statistics() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateAppliedFilter, setDateAppliedFilter] = useState("All Time");
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState("All");
  const [lastUpdateFilter, setLastUpdateFilter] = useState("All Time");
  const [applications, setApplications] = useState([] as Application[]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  
  const { getApplications, loading } = useApplications();

  const statusOptions = [
    "All",
    "Applied",
    "Screening",
    "Interview",
    "Offer",
    "Rejected",
  ];
  const dateAppliedOptions = [
    "All Time",
    "Last 7 Days",
    "Last 30 Days",
    "Last 90 Days",
    "Last Year",
  ];
  const employmentTypeOptions = [
    "All",
    "Full-time",
    "Part-time",
    "Contract",
    "Temporary",
    "Internship",
  ];
  const lastUpdateOptions = [
    "All Time",
    "Last 7 Days",
    "Last 30 Days",
    "Last 90 Days",
    "Last Year",
  ];

  const storage = useApplications();
  const activeApplications = applications.filter(
    (app) => app.status !== Status.Rejected,
  );
  const filteredApplications = applications.filter((app) => {
    // Search filter
    const searchLower = search.toLowerCase();
    const matchesSearch =
      !search ||
      app.company.toLowerCase().includes(searchLower) ||
      app.title.toLowerCase().includes(searchLower);

    // Status filter
    const matchesStatus =
      statusFilter === "All" ||
      app.status.toLowerCase() === statusFilter.toLowerCase();

    // Date Applied filter
    let matchesDateApplied = true;
    if (dateAppliedFilter !== "All Time") {
      const appDate = new Date(app.applied);
      const now = new Date();
      const daysDiff =
        (now.getTime() - appDate.getTime()) / (1000 * 60 * 60 * 24);

      switch (dateAppliedFilter) {
        case "Last 7 Days":
          matchesDateApplied = daysDiff <= 7;
          break;
        case "Last 30 Days":
          matchesDateApplied = daysDiff <= 30;
          break;
        case "Last 90 Days":
          matchesDateApplied = daysDiff <= 90;
          break;
        case "Last Year":
          matchesDateApplied = daysDiff <= 365;
          break;
      }
    }

    const matchesEmploymentType =
      employmentTypeFilter === "All" ||
      app.employmentType?.toLowerCase() === employmentTypeFilter.toLowerCase();

    // Last Update filter
    let matchesLastUpdate = true;
    if (lastUpdateFilter !== "All Time") {
      const lastUpdateDate = new Date(app.lastUpdate);
      const now = new Date();
      const daysDiff =
        (now.getTime() - lastUpdateDate.getTime()) / (1000 * 60 * 60 * 24);

      switch (lastUpdateFilter) {
        case "Last 7 Days":
          matchesLastUpdate = daysDiff <= 7;
          break;
        case "Last 30 Days":
          matchesLastUpdate = daysDiff <= 30;
          break;
        case "Last 90 Days":
          matchesLastUpdate = daysDiff <= 90;
          break;
        case "Last Year":
          matchesLastUpdate = daysDiff <= 365;
          break;
      }
    }

    return (
      matchesSearch &&
      matchesStatus &&
      matchesDateApplied &&
      matchesLastUpdate &&
      matchesEmploymentType
    );
  });

  useEffect(() => {
    if (loading) return
    getApplications().then(setApplications)
  }, [loading])

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
          className="w-full bg-surface-container text-on-surface border-none rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary/30 transition-all placeholder:opacity-50"
        />
      </div>
      {/** Filters */}
      <div className="glass-card rounded-2xl p-4 mb-8 items-center gap-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <Dropdown
          options={statusOptions}
          selected={statusFilter}
          onSelect={setStatusFilter}
          label="Status"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z" />
            </svg>
          }
        />
        <Dropdown
          options={dateAppliedOptions}
          selected={dateAppliedFilter}
          onSelect={setDateAppliedFilter}
          label="Date Applied"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
            </svg>
          }
        />
        <Dropdown
          options={lastUpdateOptions}
          selected={lastUpdateFilter}
          onSelect={setLastUpdateFilter}
          label="Last Update"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
            </svg>
          }
        />
        <Dropdown
          options={employmentTypeOptions}
          selected={employmentTypeFilter}
          onSelect={setEmploymentTypeFilter}
          label="Employment Type"
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm0-80h640v-440H160v440Zm240-520h160v-80H400v80ZM160-200v-440 440Z" />
            </svg>
          }
        />
        <h2 className="col-span-1 lg:col-span-2 xl:col-span-3 2xl:col-span-4 text-center text-on-surface-variant text-sm font-semibold">
          Showing {filteredApplications.length} of {applications.length}{" "}
          applications
        </h2>
      </div>
      {/** Applications */}
      <div className="rounded-3xl border border-outline-variant/10 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-high/50">
              <th className="py-5 px-8 text-on-surface-variant uppercase tracking-widest text-sm">
                Company & role
              </th>
              <th className="py-5 px-8 text-on-surface-variant uppercase tracking-widest text-sm">
                Date Applied
              </th>
              <th className="py-5 px-8 text-on-surface-variant uppercase tracking-widest text-sm">
                Last Update
              </th>
              <th className="py-5 px-8 text-on-surface-variant uppercase tracking-widest text-sm">
                Status
              </th>
              <th className="py-5 px-8 text-right" />
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/50">
            {filteredApplications.map((application, idx) => (
              <tr
                key={idx}
                className="hover:bg-surface-container/30 transition-colors group"
              >
                <td className="py-6 px-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-on-tertiary flex items-center justify-center text-primary-fixed-dim font-bold text-lg">
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
                  <div className="px-3 py-1 rounded-full bg-secondary-container text-secondary font-bold tracking-tight inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    {application.status}
                  </div>
                </td>
                <td className="py-6 px-8 text-right relative">
                  <button
                    onClick={() =>
                      setOpenMenuId(
                        openMenuId === application.id ? null : application.id,
                      )
                    }
                    className="p-2 text-on-surface-variant hover:text-primary transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="currentColor"
                    >
                      <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
                    </svg>
                  </button>
                  {openMenuId === application.id && (
                    <div className="absolute right-0 top-full mt-1 bg-surface-container-high rounded-lg shadow-lg border border-outline-variant/20 z-50 min-w-max">
                      <button
                        onClick={() => {
                          // TODO: Implement edit
                          setOpenMenuId(null);
                        }}
                        className="block w-full text-left px-4 py-2 text-on-surface hover:bg-surface-container-highest transition-colors text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={async () => {
                          await storage.deleteApplication(application.id);
                          setOpenMenuId(null);
                          getApplications();
                        }}
                        className="block w-full text-left px-4 py-2 text-error hover:bg-surface-container-highest transition-colors text-sm border-t border-outline-variant/20"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
