"use client";

import { useEffect, useState } from "react";
import ListCard from "./components/listCard";
import { Application, Status } from "@/lib/types";
import { useApplications } from "@/hooks/use-applications";

export default function Board() {
  const { getApplications, updateApplication, loading } = useApplications();
  const [initialApplications, setInitialApplications] = useState([] as Application[]);

  const [lists, setLists] = useState<Record<string, Application[]>>({});

  useEffect(() => {
    const dict: Record<string, Application[]> = {};
    
    Object.keys(Status).forEach((key) => {
      dict[key] = [];
    });

    if (Array.isArray(initialApplications)) {
      initialApplications.forEach((app) => {
        if (dict[app.status]) {
          dict[app.status].push(app);
        } else {
          console.warn(`Application ${app.id} has an invalid or unmapped status: "${app.status}"`);
        }
      });
    }

    setLists(dict);
  }, [initialApplications]);

  useEffect(() => {
    if (loading) return
    getApplications().then(setInitialApplications)
  }, [loading])

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
    const application = sourceList.find((app) => app.id === applicationId);

    if (!application) return;
    updateStatus(application, targetListKey)

    setLists((prev) => ({
      ...prev,
      [sourceListKey]: prev[sourceListKey as keyof typeof prev].filter(
        (app) => app.id !== applicationId,
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
    <div className="flex flex-col w-full h-full font-jakarta py-20 px-15 gap-4 bg-background text-on-background">
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
          <button className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-lg border border-outline-variant/20 text-on-surface-variant font-bold text-sm hover:bg-surface-container transition-colors duration-300">
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
          </button>
        </div>
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
