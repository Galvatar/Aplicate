"use client";

import { useState } from "react";
import ListCard from "./components/listCard";
import { Application } from "@/lib/types";

export default function Board() {
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

  const [lists, setLists] = useState({
    "Pre-Register": initialApplications,
    Applied: [],
    Screening: [],
    Interview: [],
    Offer: [],
    Rejected: [],
  });

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
