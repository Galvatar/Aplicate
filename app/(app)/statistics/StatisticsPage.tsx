"use client";

import { useEffect, useState } from "react";
import StatCard from "./components/statCard";
import ApplicationFlow from "./components/sankeyDiagram";
import Dropdown from "@/components/ui/dropdown";
import { Application, Status } from "@/lib/types";
import { useApplications } from "@/hooks/use-applications";
import PieChart, { PieSlice } from "./components/pieChart";

type RangeMode = "current" | "previous";

function getRangeMonths(selected: string) {
  switch (selected) {
    case "Last 30 Days":
      return 1;
    case "Last 90 Days":
      return 3;
    case "Last Year":
      return 12;
    case "All Time":
    default:
      return null;
  }
}

function filterApplicationsBySelectedPeriod(
  applications: Application[],
  selected: string,
  mode: RangeMode,
) {
  const months = getRangeMonths(selected);
  if (months === null) return mode === "current" ? applications : [];

  const now = new Date();
  const start = new Date(now);
  const end = new Date(now);

  if (mode === "current") {
    start.setMonth(start.getMonth() - months);
  } else {
    start.setMonth(start.getMonth() - months * 2);
    end.setMonth(end.getMonth() - months);
  }

  return applications.filter((application) => {
    const appliedAt = new Date(application.applied);
    return appliedAt >= start && appliedAt < end;
  });
}

export default function Statistics() {
  const [selected, setSelected] = useState("Last 90 Days");
  const [applications, setApplications] = useState([] as Application[]);
  const [slices2, setSlices2] = useState([] as PieSlice[]);
  const options = ["Last 30 Days", "Last 90 Days", "Last Year", "All Time"];
  const { getApplications, loading } = useApplications();
  const ghostedDate = new Date();
  ghostedDate.setMonth(ghostedDate.getMonth() - 1);
  const currentApplications = filterApplicationsBySelectedPeriod(
    applications,
    selected,
    "current",
  );
  const previousApplications = filterApplicationsBySelectedPeriod(
    applications,
    selected,
    "previous",
  );
  const currentInterviewRate = currentApplications.filter((a) =>
    a.journey.includes(Status.Interview),
  );
  const previousInterviewRate = previousApplications.filter((a) =>
    a.journey.includes(Status.Interview),
  );
  const currentOffers = currentApplications.filter(
    (a) => a.status === Status.Offer,
  );
  const previousOffers = previousApplications.filter(
    (a) => a.status === Status.Offer,
  );
  const ghosted = currentApplications.filter((a) => {
    return new Date(a.lastUpdate) < ghostedDate; 
  }).filter((a) => a.status != Status.Rejected);

  const slices: PieSlice[] = [
    { name: "test", percentage: 30},
    { name: "test2", percentage: 15},
  ]


  function getRate(partial: number, total: number) {
    if (total === 0) return 0;
    return Math.round((partial / total) * 100);
  }

  function findPercentage(currentValue: number, previousValue: number) {
    if (previousValue === 0) return currentValue === 0 ? 0 : 100;
    return Math.round((currentValue / previousValue - 1) * 100);
  }

  useEffect(() => {
    if (loading) return;
    getApplications().then(setApplications);
    SetupSlices()
  }, [loading]);

  useEffect(() => {
    SetupSlices()
  }, [applications]);

  function SetupSlices() {
    const frequencies = new Map<string, number>();
    var total = 0
    applications.forEach(app => {
        const word = app.foundOn?.toLowerCase().trim();
        if (word) {
          const currentCount = frequencies.get(word) || 0
          frequencies.set(word,currentCount + 1)
          total++
        }
    });
    const finalised = Array.from(frequencies.entries())
      .map(([word, count]) => ({ name: word, percentage: (count/total)*100 }));
    setSlices2(finalised)
  }

  return (
    <div className="flex flex-col w-full h-full font-jakarta py-20 px-15 gap-4 bg-background text-on-background">
      {/** Title */}
      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-on-surface tracking-tight mb-2">
            Journey Analytics
          </h1>
          <h2 className="text-on-surface-variant max-w-2xl">
            Visualize your pipeline velocity and conversation rates across all
            active applications.
          </h2>
        </div>
        <div className="relative">
          <Dropdown
            options={options}
            selected={selected}
            onSelect={setSelected}
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
        </div>
      </div>
      {/** Analytics */}
      <div className="flex gap-5 mt-5">
        <StatCard
          title="Total Applied"
          icon={
            <div className="text-primary-container bg-primary-container/10 p-2 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
              </svg>
            </div>
          }
          stat={`${currentApplications.length}`}
          change={findPercentage(
            currentApplications.length,
            previousApplications.length,
          )}
          showChange={true}
        />
        <StatCard
          title="Interview Rate"
          icon={
            <div className="text-secondary bg-secondary/10 p-2 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="M880-80 720-240H320q-33 0-56.5-23.5T240-320v-40h440q33 0 56.5-23.5T760-440v-280h40q33 0 56.5 23.5T880-640v560ZM160-473l47-47h393v-280H160v327ZM80-280v-520q0-33 23.5-56.5T160-880h440q33 0 56.5 23.5T680-800v280q0 33-23.5 56.5T600-440H240L80-280Zm80-240v-280 280Z" />
              </svg>
            </div>
          }
          stat={`${getRate(currentInterviewRate.length, currentApplications.length)}%`}
          change={findPercentage(
            getRate(currentInterviewRate.length, currentApplications.length),
            getRate(previousInterviewRate.length, previousApplications.length),
          )}
          showChange={true}
        />
        <StatCard
          title="Ghosted"
          icon={
            <div className="text-primary bg-primary/10 p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M800-240v-560H274l-80-80h606q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240Zm20 212L606-240H240L80-80v-688l-52-52 56-56L876-84l-56 56ZM344-504Zm170-56ZM160-688v448l80-80h288L160-688Z"/>
              </svg>
            </div>
          }
          stat={`${ghosted.length}`}
          change={0}
          showChange={false}
        />
      </div>

      {/** Sankey Diagram */}
      <ApplicationFlow applications={currentApplications} />

      <PieChart slices={slices2} />
    </div>
  );
}
