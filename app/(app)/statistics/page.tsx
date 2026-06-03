"use client";

import { useEffect, useState } from "react";
import StatCard from "./components/statCard";
import ApplicationFlow from "./components/sankeyDiagram";
import Dropdown from "@/components/ui/dropdown";
import { Application, Status } from "@/lib/types";
import { useApplications } from "@/hooks/use-applications";

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
  const [selected, setSelected] = useState("Last 30 Days");
  const [applications, setApplications] = useState([] as Application[]);
  const options = ["Last 30 Days", "Last 90 Days", "Last Year", "All Time"];
  const { getApplications, loading } = useApplications();
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
  }, [loading]);

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
        />
        <StatCard
          title="Active Offers"
          icon={
            <div className="text-primary bg-primary/10 p-2 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="m387-412 35-114-92-74h114l36-112 36 112h114l-93 74 35 114-92-71-93 71ZM240-40v-309q-38-42-59-96t-21-115q0-134 93-227t227-93q134 0 227 93t93 227q0 61-21 115t-59 96v309l-240-80-240 80Zm410-350q70-70 70-170t-70-170q-70-70-170-70t-170 70q-70 70-70 170t70 170q70 70 170 70t170-70ZM320-159l160-41 160 41v-124q-35 20-75.5 31.5T480-240q-44 0-84.5-11.5T320-283v124Zm160-62Z" />
              </svg>
            </div>
          }
          stat={`${currentOffers.length}`}
          change={findPercentage(currentOffers.length, previousOffers.length)}
        />
      </div>

      {/** Sankey Diagram */}
      <ApplicationFlow applications={currentApplications} />
    </div>
  );
}
