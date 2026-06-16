"use client";

import { useEffect, useState } from "react";
import MomentumCard from "./components/momentumCard";
import SignalCard from "./components/signalCard";
import { useUser } from "@/hooks/use-user";
import { Application, Status } from "@/lib/types";
import { useApplications } from "@/hooks/use-applications";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/hooks/use-sidebar";

export default function Home() {
  const today = new Date();
  const [username, setUsername] = useState("Guest");
  const [applications, setApplications] = useState([] as Application[]);
  const weekApplications = applications.filter((app) => {
    const appDate = new Date(app.applied);
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 7);
    return appDate >= weekAgo && appDate <= today;
  });
  const interviewApplications = applications.filter(
    (app) => app.status === Status.Interview,
  );
  const offerApplication = applications.filter(
    (app) => app.status === Status.Offer,
  );
  const followUpApplications = applications.filter(
    (app) => app.followUpDate ? new Date(app.followUpDate) < new Date() : 0
  ).sort((a,b) => (a.followUpDate ? (new Date(a.followUpDate).getTime()) : 0) - (b.followUpDate ? (new Date(b.followUpDate).getTime()) : 0))
  .slice(0,3);
  const orderedApplications = applications
    .sort((a,b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime()).slice(0,3);

  const router = useRouter();
  const { isOpen, setIsOpen } = useSidebar();

  const { user } = useUser();
  const { syncGuestApplications, getApplications, loading } = useApplications();

  const daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    if (user == null) {
      setUsername("Guest");
    } else {
      const fullName = (user.user_metadata?.full_name as string) || "";
      const firstName = (user.user_metadata?.first_name as string) || "";
      if (fullName == "") {
        if (firstName == "") {
          setUsername("User");
        }
        setUsername(capitalize(firstName));
      } else {
        const names = fullName.split(" ");
        setUsername(capitalize(names[0]));
      }
      updateApplications();
    }
  }, [user]);

  async function updateApplications() {
    await syncGuestApplications();
    getApplications().then(setApplications);
  }

  useEffect(() => {
    if (loading) return;
    getApplications().then(setApplications);
  }, [loading]);

  function capitalize(word: string): string {
    const firstLetter = word.substring(0, 1).toUpperCase();
    const lastLetters = word.substring(1, word.length);
    return firstLetter.concat(lastLetters);
  }

  function GetGreeting(hour: number): string {
    if (hour < 12) {
      return "morning";
    } else if (hour < 17) {
      return "afternoon";
    } else {
      return "evening";
    }
  }

  return (
    <div className="flex flex-col w-full h-full font-jakarta py-20 px-15 gap-4 bg-background text-on-background">
      <h3 className="text-outline text-sm">
        {daysOfTheWeek[today.getDay()]}, {months[today.getMonth()]}{" "}
        {today.getDate()}
      </h3>
      <h1
        onClick={() => setIsOpen(!isOpen)}
        className="text-4xl font-bold text-primary tracking-tight"
      >
        Good {GetGreeting(today.getHours())}, {username}.
      </h1>
      <h2 className="text-on-surface-variant max-w-xl">
        Keep working at it. You have{" "}
        <span className="text-secondary">
          {weekApplications.length} interviews
        </span>{" "}
        scheduled for next week. Take a moment to breathe before reviewing your
        board.
      </h2>
      {user == null && (
        <h3 className="flex -mt-1 font-bold text-outline text-xs items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="12px"
            viewBox="0 -960 960 960"
            width="12px"
            fill="currentColor"
          >
            <path d="M792-56 686-160H260q-92 0-156-64T40-380q0-77 47.5-137T210-594q3-8 6-15.5t6-16.5L56-792l56-56 736 736-56 56ZM260-240h346L284-562q-2 11-3 21t-1 21h-20q-58 0-99 41t-41 99q0 58 41 99t99 41Zm185-161Zm419 191-58-56q17-14 25.5-32.5T840-340q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-27 0-52 6.5T380-693l-58-58q35-24 74.5-36.5T480-800q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 39-15 72.5T864-210ZM593-479Z" />
          </svg>
          Progress saved to this browser.
        </h3>
      )}
      {/** Cards */}
      <div className="grid grid-cols-2 gap-8 mt-10">
        {/** Active pipeline */}
        <div className="flex w-full relative flex-col gap-3 hover:bg-surface-container-low bg-surface-container-low/50 backdrop-blur-xl transition-colors duration-500 rounded-2xl p-8 border border-outline-variant/5">
          <div className="flex w-full justify-between items-start">
            <h1 className="font-label-md text-xs font-semibold text-outline tracking-wider uppercase">
              Active Pipeline
            </h1>
            <div className="flex text-primary w-10 h-10 rounded-full bg-surface-container items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm0-80h640v-440H160v440Zm240-520h160v-80H400v80ZM160-200v-440 440Z" />
              </svg>
            </div>
          </div>
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700" />
          <div className="flex gap-3 items-end">
            <h1 className="font-headline-xl font-bold text-headline-xl text-on-surface text-5xl">
              {applications.length}
            </h1>
            {weekApplications.length > 0 && (
              <h2 className="flex gap-1 text-sm text-secondary-fixed-dim items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="currentColor"
                >
                  <path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z" />
                </svg>
                +{weekApplications.length} this week
              </h2>
            )}
          </div>
        </div>
        {/** Next steps */}
        <div className="flex w-full relative flex-col gap-3 hover:bg-surface-container-low bg-surface-container-low/50 backdrop-blur-xl transition-colors duration-500 rounded-2xl p-8 border border-outline-variant/5">
          <div className="flex w-full justify-between items-start">
            <h1 className="font-label-md text-xs font-semibold text-outline tracking-wider uppercase">
              Next Steps
            </h1>
            <div className="flex text-secondary-fixed w-10 h-10 rounded-full bg-surface-container items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
              </svg>
            </div>
          </div>
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all duration-700" />
          <div className="flex gap-3 items-end">
            <h1 className="font-headline-xl font-bold text-headline-xl text-on-surface text-5xl">
              {interviewApplications.length}
            </h1>
            <h2 className="flex gap-1 text-sm text-outline items-center">
              Interviews pending
            </h2>
          </div>
        </div>
        {/** Follow ups */}
        <div className="flex w-full relative flex-col gap-3 hover:bg-surface-container-low bg-surface-container-low/50 backdrop-blur-xl transition-colors duration-500 rounded-2xl p-8 border border-outline-variant/5">
          <div className="flex w-full justify-between items-start">
            <h1 className="font-label-md text-xs font-semibold text-outline tracking-wider uppercase">
              Follow ups
            </h1>
            <div className="flex text-secondary-fixed w-10 h-10 rounded-full bg-surface-container items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z" />
              </svg>
            </div>
          </div>
          <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-secondary/10 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all duration-700" />
          <div className="flex gap-3 items-end">
            <h1 className="font-headline-xl font-bold text-headline-xl text-on-surface text-5xl">
              {followUpApplications.length}
            </h1>
            <h2 className="flex gap-1 text-sm text-outline items-center">
              To follow up
            </h2>
          </div>
        </div>
        {/** Active pipeline */}
        <div className="flex w-full relative flex-col hover:bg-surface-container-low bg-surface-container-low/50 backdrop-blur-xl transition-colors duration-500 rounded-2xl p-8 border border-outline-variant/5">
          <div className="flex w-full justify-between items-start">
            <h1 className="font-label-md text-xs font-semibold text-outline tracking-wider uppercase">
              Applications to follow up
            </h1>
            <div className="flex text-primary w-10 h-10 rounded-full bg-surface-container items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm0-80h640v-440H160v440Zm240-520h160v-80H400v80ZM160-200v-440 440Z" />
              </svg>
            </div>
          </div>
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700" />
          <div className="flex flex-col">
            {followUpApplications.map((application, idx) => (
              <div
                onClick={() => router.push(`/job/${application.id}?origin=home`)}
                key={application.id} className={`flex px-2 cursor-pointer transition-colors gap-1 hover:bg-surface-container-lowest rounded-lg ${idx > 0 ? 'border-t border-t-surface-container-highest mt-1 pt-1' : ''}`}>
                <h1 className="font-bold">
                  {application.company}
                </h1>
                <h2>
                  - {application.title}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/** Momentum */}
      <div className="flex flex-col mt-10 gap-3">
        {/** Title */}
        <div className="flex justify-between items-center">
          <h1 className="font-headline-lg-mobile font-semibold text-headline-lg-mobile text-on-surface">
            Momentum
          </h1>
          <button
            onClick={() => router.push("/board")}
            className="rounded-full px-2 py-1 text-primary hover:text-primary/50 text-sm font-semibold transition-colors duration-500"
          >
            View Details
          </button>
        </div>
        <MomentumCard
          applications={applications.length}
          interviews={interviewApplications.length}
          offers={offerApplication.length}
        />
      </div>
      {/** Recent signals */}
      <div className="flex flex-col mt-10 gap-3">
        {/** Title */}
        <div className="flex justify-between items-center">
          <h1 className="font-headline-lg-mobile font-semibold text-headline-lg-mobile text-on-surface">
            Recent Signals
          </h1>
        </div>
        <div className="flex flex-col">
          {orderedApplications.map((app) => { 
            var title = "";
            switch (app.status) {
              case Status.Apply:
                title = `Applied for ${app.title}, at`
                break;
              case Status.Interview:
                title = `Technical interview for ${app.title}, scheduled with`
                break;
              case Status.Assessment:
                title = `Assessment received for ${app.title}, at`
                break;
              case Status.PreRegister:
                title = `Pre-Registered for ${app.title}, at`
                break;
              case Status.Offer:
                title = `Offer received as ${app.title}, for`
                break;
              case Status.Rejected:
                title = `Rejected for ${app.title}, at`
                break;
              default:
                title = "Application updated"
                break;
            }
            return (
              <SignalCard
                title={title}
                company={app.company}
                timestamp={new Date(app.lastUpdate)}
              />
          )})}
        </div>
      </div>
    </div>
  );
}
