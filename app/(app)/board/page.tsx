"use client";

import { useEffect, useState } from "react";
import ListCard from "./components/listCard";
import { Application, Status } from "@/lib/types";
import { useApplications } from "@/hooks/use-applications";

export default function Board() {
  // 1. Add a dedicated error state to catch production gremlins
  const [renderError, setRenderError] = useState<string | null>(null);
  
  // Wrap your hook call in a try/catch just in case the hook initialization itself is crashing
  let hookData;
  try {
    hookData = useApplications();
  } catch (e: any) {
    return (
      <div className="p-10 bg-red-900 text-white font-mono m-4 rounded">
        <h1>🚨 Crash during useApplications() initialization!</h1>
        <pre className="mt-4 bg-black/30 p-4 rounded">{e?.message || String(e)}</pre>
      </div>
    );
  }

  const { getApplications, updateApplication, loading } = hookData;
  const [initialApplications, setInitialApplications] = useState<Application[]>([]);
  const [lists, setLists] = useState<Record<string, Application[]>>({});

  useEffect(() => {
    try {
      if (!Status) {
        throw new Error("The 'Status' object/enum is undefined. This usually means a circular dependency in your production bundle imports.");
      }

      const dict: Record<string, Application[]> = {};
      Object.keys(Status).forEach((key) => { dict[key] = []; });

      if (Array.isArray(initialApplications)) {
        initialApplications.forEach((app) => {
          if (app && app.status && dict[app.status]) {
            dict[app.status].push(app);
          }
        });
      }
      setLists(dict);
    } catch (err: any) {
      setRenderError(`Error in lists parser: ${err.message}`);
    }
  }, [initialApplications]);

  useEffect(() => {
    if (loading) return;
    
    if (typeof getApplications !== "function") {
      setRenderError("getApplications is not a function! The hook did not export it correctly in production.");
      return;
    }

    getApplications()
      .then((data) => {
        setInitialApplications(Array.isArray(data) ? data : []);
      })
      .catch((err: any) => {
        // If it fails because they are a guest, capture it visually
        setRenderError(`getApplications() rejected on production: ${err?.message || JSON.stringify(err)}`);
        setInitialApplications([]); 
      });
  }, [loading, getApplications]);

  // 2. VISUAL DEBUG TRIGGER: If an error is caught, render it immediately
  if (renderError) {
    return (
      <div className="p-10 bg-red-950 text-red-200 font-mono min-h-screen flex flex-col justify-center items-center">
        <div className="max-w-2xl bg-red-900/40 p-6 border border-red-500 rounded-xl shadow-xl">
          <h2 className="text-xl font-bold text-white mb-2">🕵️‍♂️ Production Bug Captured!</h2>
          <p className="text-sm text-red-300 mb-4">This error is causing your deployed app to freeze or break:</p>
          <pre className="bg-black/50 p-4 rounded text-xs overflow-x-auto text-red-400 font-bold whitespace-pre-wrap">
            {renderError}
          </pre>
          <button 
            onClick={() => setRenderError(null)} 
            className="mt-4 px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded text-xs font-bold transition-colors"
          >
            Dismiss & Try Loading Board Anyway
          </button>
        </div>
      </div>
    );
  }

  // 3. Keep a simple indicator if it's stuck loading forever
  if (loading && Object.keys(lists).length === 0) {
    return (
      <div className="flex h-screen w-full items-center justify-center font-mono text-sm text-on-surface-variant">
        ⏳ useApplications() hook is reporting loading = true...
      </div>
    );
  }

  // ... rest of your handleDrag/Drop functions and return statement stay exactly the same ...
  const handleDragStart = (e: React.DragEvent, listKey: string, applicationId: string) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("listKey", listKey);
    e.dataTransfer.setData("applicationId", applicationId);
  };
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; };
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
          <h1 className="text-4xl font-bold text-on-surface tracking-tight mb-2">My Board</h1>
          <h2 className="text-on-surface-variant max-w-2xl">A calm space to organise your career journey. Focus on the next step.</h2>
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
            onCardDragStart={(appId) => (e: React.DragEvent) => handleDragStart(e, listKey, appId)}
          />
        ))}
      </div>
    </div>
  );
}