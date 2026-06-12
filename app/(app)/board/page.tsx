"use client";

import { useEffect, useState } from "react";
import ListCard from "./components/listCard";
import { Application, Status } from "@/lib/types";
import { useApplications } from "@/hooks/use-applications";

export default function Board() {
  const { getApplications, updateApplication, loading } = useApplications();
  const [initialApplications, setInitialApplications] = useState<Application[]>([]);
  const [lists, setLists] = useState<Record<string, Application[]>>({});

  useEffect(() => {
    // 1. DEFENSIVE GUARD: If Status is undefined due to a production circular dependency, catch it
    if (!Status) {
      console.error("Status object/enum is undefined. Check for circular imports in @/lib/types.");
      return;
    }

    const dict: Record<string, Application[]> = {};
    
    Object.keys(Status).forEach((key) => {
      dict[key] = [];
    });

    if (Array.isArray(initialApplications)) {
      initialApplications.forEach((app) => {
        if (app && app.status && dict[app.status]) {
          dict[app.status].push(app);
        } else if (app) {
          console.warn(`Application ${app.id} has an invalid or unmapped status: "${app.status}"`);
        }
      });
    }

    setLists(dict);
  }, [initialApplications]);

  useEffect(() => {
    if (loading) return;
    
    // 2. DEFENSIVE GUARD: Ensure getApplications is an executable function before calling it
    if (typeof getApplications !== "function") {
      console.error("getApplications is not a function. Check your useApplications hook logic.");
      return;
    }

    // 3. promise catch block: Safely intercept guest auth rejections
    getApplications()
      .then((data) => {
        // Fallback to empty array if response resolves to null/undefined
        setInitialApplications(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Production Guest Fetch Blocked (Expected behavior for guests):", err);
        // Force an empty array to stop the loading loop and render an empty board
        setInitialApplications([]); 
      });
  }, [loading, getApplications]);

  const handleDragStart = (
    e: React.DragEvent,
    listKey: string,
    applicationId: string,
  ) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("listKey", listKey);
    e.dataTransfer.setData("applicationId", applicationId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetListKey: string) => {
    e.preventDefault();
    const sourceListKey = e.dataTransfer.getData("listKey");
    const applicationId = e.dataTransfer.getData("applicationId");

    if (sourceListKey === targetListKey) return;

    const sourceList = lists[sourceListKey as keyof typeof lists];
    if (!sourceList) return;
    
    const application = sourceList.find((app) => app.id === applicationId);

    if (!application) return;
    updateStatus(application, targetListKey);

    setLists((prev) => ({
      ...prev,
      [sourceListKey]: (prev[sourceListKey] || []).filter((app) => app.id !== applicationId),
      [targetListKey]: [...(prev[targetListKey] || []), application],
    }));
  };

  async function updateStatus(application: Application, status: string) {
    const stat = Status[status as keyof typeof Status];
    if (!stat) return;
    
    application.status = stat;
    const index = application.journey.indexOf(status);
    if (index != -1) {
      application.journey = application.journey.slice(0, index + status.length);
    } else {
      application.journey = application.journey.concat(`,${status}`);
    }
    await updateApplication(application);
  }

  return (
    <div className="flex flex-col w-full h-full font-jakarta py-20 px-15 gap-4 bg-background text-on-background">
      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-on-surface tracking-tight mb-2">
            My Board
          </h1>
          <h2 className="text-on-surface-variant max-w-2xl">
            A calm space to organise your career journey. Focus on the next step.
          </h2>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-lg border border-outline-variant/20 text-on-surface-variant font-bold text-sm hover:bg-surface-container transition-colors duration-300">
            Filter
          </button>
          <button className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-lg border border-outline-variant/20 text-on-surface-variant font-bold text-sm hover:bg-surface-container transition-colors duration-300">
            Sort
          </button>
        </div>
      </div>
      <div className="flex-1 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-start content-start">
        {Object.entries(lists).map(([listKey, applications]) => (
          <ListCard
            key={listKey}
            title={listKey}
            applications={applications || []}
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