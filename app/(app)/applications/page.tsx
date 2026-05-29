"use client";

import Dropdown from "@/components/ui/dropdown";
import { timeAgo } from "@/lib/timeAgo";
import { useState } from "react";

export default function Statistics() {
  const [search, setSearch] = useState("");
  const [activeCount, setActiveCount] = useState(24);

  const [statusFilter, setStatusFilter] = useState("All");
  const [dateAppliedFilter, setDateAppliedFilter] = useState("All Time");
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState("All");
  const [lastUpdateFilter, setLastUpdateFilter] = useState("All Time");

  const statusOptions = ["All", "Applied", "Screening", "Interview", "Offer", "Rejected"];
  const dateAppliedOptions = ["All Time", "Last 7 Days", "Last 30 Days", "Last 90 Days", "Last Year"];
  const employmentTypeOptions = ["All", "Full-time", "Part-time", "Contract", "Temporary", "Internship"];
  const lastUpdateOptions = ["All Time", "Last 7 Days", "Last 30 Days", "Last 90 Days", "Last Year"];

  const initialApplications = [
    {
      id: "1",
      title: "Senior Frontend Engineer",
      company: "Acme Corp",
      role: "Frontend",
      foundOn: "LinkedIn",
      status: "Applied",
      location: "San Francisco, CA",
      applied: new Date("2024-05-15"),
      lastUpdate: new Date("2024-05-20"),
      journey: "Applied",
      notes: "Great company, modern tech stack",
      pay: 150000,
    },
    {
      id: "2",
      title: "Full Stack Developer",
      company: "TechStart Inc",
      role: "Full Stack",
      foundOn: "Indeed",
      status: "Screening",
      location: "Remote",
      applied: new Date("2024-05-10"),
      lastUpdate: new Date("2024-05-22"),
      journey: "Applied,Screening",
      notes: "Remote position, flexible hours",
      pay: 130000,
    },
    {
      id: "3",
      title: "Product Engineer",
      company: "Innovation Labs",
      role: "Backend",
      foundOn: "Company Website",
      status: "Interview",
      location: "New York, NY",
      applied: new Date("2024-05-01"),
      lastUpdate: new Date("2024-05-23"),
      journey: "Applied,Screening,Interview",
      notes: "Second round interview scheduled",
      pay: 140000,
    },
    {
      id: "4",
      title: "React Developer",
      company: "WebFlow Studios",
      role: "Frontend",
      foundOn: "LinkedIn",
      status: "Rejected",
      location: "Los Angeles, CA",
      applied: new Date("2024-04-28"),
      lastUpdate: new Date("2024-05-18"),
      journey: "Applied,Rejected",
      notes: "Not selected, lack of experience",
      pay: 120000,
    },
    {
      id: "5",
      title: "Software Architect",
      company: "Enterprise Solutions",
      role: "Full Stack",
      foundOn: "Recruiter",
      status: "Offer",
      location: "Boston, MA",
      applied: new Date("2024-04-20"),
      lastUpdate: new Date("2024-05-24"),
      journey: "Applied,Screening,Interview,Offer",
      notes: "Offer accepted! Start date June 1st",
      pay: 160000,
    },
    {
      id: "6",
      title: "DevOps Engineer",
      company: "CloudTech Systems",
      role: "DevOps",
      foundOn: "Indeed",
      status: "Applied",
      location: "Remote",
      applied: new Date("2024-05-22"),
      lastUpdate: new Date("2024-05-22"),
      journey: "Applied",
      notes: "Applied yesterday",
      pay: 135000,
    },
  ];

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
            Track your proffesional progress with focus and clarity. All your opportunities, managed in one serene workspace.
          </h2>
        </div>
        <div className="flex items-center gap-2 bg-surface-container px-4 py-2 rounded-lg border border-outline-variant/20">
          <h1 className="text-secondary font-bold">
            {activeCount}
          </h1>
          <h2 className="text-on-surface-variant text-xs font-semibold uppercase tracking-widest">
            Active
          </h2>
        </div>
      </div>
      {/** Search bar */}
      <div className="relative w-full mt-5">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
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
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z"/>
            </svg>
          }
        />
        <Dropdown 
          options={dateAppliedOptions}
          selected={dateAppliedFilter}
          onSelect={setDateAppliedFilter}
          label="Date Applied"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/>
            </svg>
          }
        />
        <Dropdown 
          options={lastUpdateOptions}
          selected={lastUpdateFilter}
          onSelect={setLastUpdateFilter}
          label="Last Update"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/>
            </svg>
          }
        />
        <Dropdown 
          options={employmentTypeOptions}
          selected={employmentTypeFilter}
          onSelect={setEmploymentTypeFilter}
          label="Employment Type"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm0-80h640v-440H160v440Zm240-520h160v-80H400v80ZM160-200v-440 440Z"/>
            </svg>
          }
        />
        <h2 className="col-span-1 lg:col-span-2 xl:col-span-3 2xl:col-span-4 text-center text-on-surface-variant text-sm font-semibold">
          Showing 12 of 48 applications
        </h2>
      </div>
      {/** Applications */}
      <div className="glass-card rounded-3xl">
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
              <th className="py-5 px-8 text-right"/>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/50">
            {initialApplications.map((application, idx) => (
              <tr key={idx} className="hover:bg-surface-container/30 transition-colors group">
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
                  {months[application.applied.getMonth()]} {application.applied.getDate()}, {application.applied.getFullYear()}
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
                <td className="py-6 px-8 text-right">
                  <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
