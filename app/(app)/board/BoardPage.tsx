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
  
  // Track the application object globally during a drag session
  const [draggedApplication, setDraggedApplication] = useState<Application | null>(null);

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
    if (loading) return;
    getApplications().then(setInitialApplications);
  }, [loading]);

  const handleDragStart = (
    e: React.DragEvent,
    listKey: string,
    application: Application,
  ) => {
    console.log("🚀 Drag starting for ID:", application.id, "from list:", listKey);
    
    if (!application.id) {
      console.error("❌ Cannot start drag: applicationId is undefined or null!");
      return;
    }

    // Store the application reference for live ghost previews
    setDraggedApplication(application);

    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("source-list-key", listKey);
    e.dataTransfer.setData("application-id", String(application.id));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  // Clear global tracking states if a card is dropped out of bounds
  const handleDragEnd = () => {
    setDraggedApplication(null);
  };

  // Updated to accept the dynamic insertion index from ListCard
  const handleDrop = (e: React.DragEvent, targetListKey: string, targetIndex: number) => {
    e.preventDefault();
    setDraggedApplication(null); // Clean up layout tracking
    
    const sourceListKey = e.dataTransfer.getData("source-list-key");
    const applicationId = e.dataTransfer.getData("application-id");
    
    console.log(`📥 Dropped onto: ${targetListKey} at index: ${targetIndex} | ID: ${applicationId}`);

    if (!applicationId || !sourceListKey) {
      console.error("❌ Drop failed: Lost track of dataTransfer variables during transport.");
      return;
    }

    const sourceList = lists[sourceListKey];
    if (!sourceList) return;

    const application = sourceList.find((app) => String(app.id) === applicationId);
    if (!application) return;
    
    // Only update backend status schema if it actually changed columns
    if (sourceListKey !== targetListKey) {
      updateStatus(application, targetListKey);
    }

    setLists((prev) => {
      const updatedLists = { ...prev };

      // 1. Cleanly pull the target element out of its origin array position
      const filteredSource = updatedLists[sourceListKey].filter(
        (app) => String(app.id) !== applicationId
      );

      if (sourceListKey === targetListKey) {
        // Intra-list sorting: Splicing into the modified same column
        filteredSource.splice(targetIndex, 0, application);
        updatedLists[sourceListKey] = filteredSource;
      } else {
        // Inter-list sorting: Update source column, slice into target column position
        updatedLists[sourceListKey] = filteredSource;
        
        const targetList = [...(updatedLists[targetListKey] || [])];
        targetList.splice(targetIndex, 0, application);
        updatedLists[targetListKey] = targetList;
      }

      return updatedLists;
    });
  };

  async function updateStatus(application: Application, status: string) {
    const stat = Status[status as keyof typeof Status];
    application.status = stat;
    const index = application.journey.indexOf(status);
    if (index != -1) {
      application.journey = application.journey.slice(0, index+status.length);
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
            A space to organise your career journey. Focus on the next step.
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

      {/** Board Grid */}
      <div 
        className="flex-1 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start content-start"
        onDragEnd={handleDragEnd}
      >
        {Object.entries(lists).map(([listKey, applications]) => (
          <ListCard
            key={listKey}
            title={listKey}
            applications={applications}
            draggedApplication={draggedApplication} // Sends active tracker object downstream
            onDragOver={handleDragOver}
            onDrop={(e, index) => handleDrop(e, listKey, index)} // Captures the exact destination split
            onCardDragStart={(appId) => (e: React.DragEvent) => {
              const targetApp = applications.find((a) => a.id === appId);
              if (targetApp) handleDragStart(e, listKey, targetApp);
            }}
          />
        ))}
      </div>
    </div>
  );
}