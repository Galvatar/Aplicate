"use client";

import { useEffect, useState } from "react";
import ListCard from "./components/listCard";
import { Application, Status } from "@/lib/types";
import { useApplications } from "@/hooks/use-applications";

export default function Board() {
  const { getApplications, updateApplication, loading } = useApplications();
  const [initialApplications, setInitialApplications] = useState([] as Application[]);

  const [lists, setLists] = useState<Record<string, Application[]>>({});
  const [search, setSearch] = useState("");
  const searchedApplications = initialApplications
    .filter((app) => {
      if (search === "") return true;

      const searchLower = search.toLowerCase().trim();
      const companyMatch = app.company?.toLowerCase().includes(searchLower);
      const titleMatch = app.title?.toLowerCase().includes(searchLower);
      const locationMatch = app.location?.toLowerCase().includes(searchLower);

      return companyMatch || titleMatch || locationMatch;
    });

  useEffect(() => {
    const dict: Record<string, Application[]> = {};
    
    Object.keys(Status).forEach((key) => {
      dict[key] = [];
    });

    if (Array.isArray(searchedApplications)) {
      searchedApplications.forEach((app) => {
        if (dict[app.status]) {
          dict[app.status].push(app);
        } else {
          console.warn(`Application ${app.id} has an invalid or unmapped status: "${app.status}"`);
        }
      });
    }

    setLists(dict);
  }, [initialApplications, search]);

  useEffect(() => {
    if (loading) return
    getApplications().then(setInitialApplications)
  }, [loading])

  const handleDragStart = (
    e: React.DragEvent,
    listKey: string,
    applicationId: string,
  ) => {
    // 1. Check if the ID is already missing before the drag even begins!
    console.log("🚀 Drag starting for ID:", applicationId, "from list:", listKey);
    
    if (!applicationId) {
      console.error("❌ Cannot start drag: applicationId is undefined or null! Check your database object properties.");
      return;
    }

    e.dataTransfer.effectAllowed = "move";
    
    // 2. CRUCIAL: Use kebab-case (lowercase with hyphens) to prevent browser normalization bugs
    e.dataTransfer.setData("source-list-key", listKey);
    e.dataTransfer.setData("application-id", String(applicationId)); // Explicitly coerce to string
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetListKey: string) => {
    e.preventDefault();
    
    // 3. Read using the corrected lowercase hyphenated keys
    const sourceListKey = e.dataTransfer.getData("source-list-key");
    const applicationId = e.dataTransfer.getData("application-id");
    
    console.log("📥 Dropped onto:", targetListKey, "| Extracted ID:", applicationId, "| From:", sourceListKey);

    if (!applicationId || !sourceListKey) {
      console.error("❌ Drop failed: Lost track of dataTransfer variables during transport.");
      return;
    }

    if (sourceListKey === targetListKey) return;

    const sourceList = lists[sourceListKey as keyof typeof lists];
    if (!sourceList) {
      console.error(`❌ Source list "${sourceListKey}" not found in state.`);
      return;
    }

    const application = sourceList.find((app) => String(app.id) === applicationId);

    if (!application) {
      console.error(`❌ Application with ID "${applicationId}" not found in source list.`);
      return;
    }
    
    updateStatus(application, targetListKey);

    setLists((prev) => ({
      ...prev,
      [sourceListKey]: prev[sourceListKey as keyof typeof prev].filter(
        (app) => String(app.id) !== applicationId,
      ),
      [targetListKey]: [
        ...prev[targetListKey as keyof typeof prev],
        application,
      ],
    }));
  };

  async function updateStatus(application: Application, status: string) {
    const stat = Status[status as keyof typeof Status];
    application.status = stat;
    const index = application.journey.indexOf(status);
    if (index != -1) {
      application.journey = application.journey.slice(0, index+status.length)
    } else {
      application.journey = application.journey.concat(`,${status}`);
    }
    await updateApplication(application);
  }

  return (
    <div className="flex flex-col w-full h-full font-jakarta py-10 md:py-20 px-5 md:px-15 gap-4 bg-background text-on-background">
      {/** Title */}
      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-on-surface tracking-tight mb-2">
            My Board
          </h1>
          <h2 className="text-on-surface-variant max-w-2xl">
            A calm space to organise your career journey. Focus on the next
            step.
          </h2>
        </div>
        <div className="flex gap-3">
          {/* <button className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-lg border border-outline-variant/20 text-on-surface-variant font-bold text-sm hover:bg-surface-container transition-colors duration-300">
            <svg
              className="text-outline"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z" />
            </svg>
            Filter
          </button>
          <button className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-lg border border-outline-variant/20 text-on-surface-variant font-bold text-sm hover:bg-surface-container transition-colors duration-300">
            <svg
              className="text-outline"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="M120-240v-80h240v80H120Zm0-200v-80h480v80H120Zm0-200v-80h720v80H120Z" />
            </svg>
            Sort
          </button> */}
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
      <div className="flex-1 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start content-start">
        {Object.entries(lists).map(([listKey, applications]) => (
          <ListCard
            key={listKey}
            title={listKey}
            applications={applications}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, listKey)}
            onCardDragStart={(appId) => (e: React.DragEvent) =>
              handleDragStart(e, listKey, appId)
            }
          />
        ))}
      </div>
    </div>
  );
}
