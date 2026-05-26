"use client";

import { useModal } from "@/components/ui/modal";
import { useState } from "react";

export default function NewApplication() {
  const modal = useModal();
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [source, setSource] = useState("");
  const [employmentType, setEmploymentType] = useState("full-time");

  return (
    <div className="font-jakarta flex flex-col w-full max-w-160 rounded-xl border border-outline-variant/10 bg-surface-container text-on-background">
      <div className="flex justify-between items-center p-8 border-b border-outline-variant/10">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">New Application</h1>
          <h2>Capture the details of your next opportunity.</h2>
        </div>
        <div
          onClick={() => modal.hide()}
          className="p-1.5 rounded-full hover:bg-surface-bright transition-colors duration-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </div>
      </div>
      <form className="flex flex-col p-8 gap-8">
        {/** First line */}
        <div className="flex gap-5">
          {/** Company */}
          <div className="flex w-full flex-col gap-3">
            <h1 className="font-bold text-sm">Company</h1>
            <div className="flex bg-surface-container-highest px-5 py-3 rounded-lg gap-2">
              <svg
                className="text-on-surface-variant/50"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="M120-120v-560h160v-160h400v320h160v400H520v-160h-80v160H120Zm80-80h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 320h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 480h80v-80h-80v80Zm0-160h80v-80h-80v80Z" />
              </svg>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Acme Corp"
                className="border-0 outline-none text-on-background font-body-md placeholder:text-on-surface-variant/30 placeholder:font-semibold"
              />
            </div>
          </div>
          {/** Role */}
          <div className="flex w-full flex-col gap-3">
            <h1 className="font-bold text-sm">Role / Title</h1>
            <div className="flex bg-surface-container-highest px-5 py-3 rounded-lg gap-2">
              <svg
                className="text-on-surface-variant/50"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm0-80h640v-440H160v440Zm240-520h160v-80H400v80ZM160-200v-440 440Z" />
              </svg>
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Product Designer"
                className="border-0 outline-none text-on-background font-body-md placeholder:text-on-surface-variant/30 placeholder:font-semibold"
              />
            </div>
          </div>
        </div>
        {/** Second line */}
        <div className="flex gap-5">
          {/** Location */}
          <div className="flex w-full flex-col gap-3">
            <h1 className="font-bold text-sm">Location</h1>
            <div className="flex bg-surface-container-highest px-5 py-3 rounded-lg gap-2">
              <svg
                className="text-on-surface-variant/50"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="M536.5-503.5Q560-527 560-560t-23.5-56.5Q513-640 480-640t-56.5 23.5Q400-593 400-560t23.5 56.5Q447-480 480-480t56.5-23.5ZM480-186q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
              </svg>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Remote, Sydney"
                className="border-0 outline-none text-on-background font-body-md placeholder:text-on-surface-variant/30 placeholder:font-semibold"
              />
            </div>
          </div>
          {/** Found via */}
          <div className="flex w-full flex-col gap-3">
            <h1 className="font-bold text-sm">Found via</h1>
            <div className="flex bg-surface-container-highest px-5 py-3 rounded-lg gap-2">
              <svg
                className="text-on-surface-variant/50"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
              >
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
              </svg>
              <input
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="e.g. LinkedIn, Referral"
                className="border-0 outline-none text-on-background font-body-md placeholder:text-on-surface-variant/30 placeholder:font-semibold"
              />
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-3">
          <h1 className="font-bold text-sm">Employment Type</h1>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setEmploymentType("full-time")}
              className={`w-fit py-2 px-4 rounded-full ${employmentType === "full-time" ? "bg-secondary-container/80 text-on-secondary-container" : "bg-surface-container-highest text-on-background"} text-sm font-semibold transition-colors duration-500`}
            >
              Full-time
            </button>
            <button
              type="button"
              onClick={() => setEmploymentType("contract")}
              className={`w-fit py-2 px-4 rounded-full ${employmentType === "contract" ? "bg-secondary-container/80 text-on-secondary-container" : "bg-surface-container-highest text-on-background"} text-sm font-semibold transition-colors duration-500`}
            >
              Contract
            </button>
            <button
              type="button"
              onClick={() => setEmploymentType("freelance")}
              className={`w-fit py-2 px-4 rounded-full ${employmentType === "freelance" ? "bg-secondary-container/80 text-on-secondary-container" : "bg-surface-container-highest text-on-background"} text-sm font-semibold transition-colors duration-500`}
            >
              Freelance
            </button>
            <button
              type="button"
              onClick={() => setEmploymentType("part-time")}
              className={`w-fit py-2 px-4 rounded-full ${employmentType === "part-time" ? "bg-secondary-container/80 text-on-secondary-container" : "bg-surface-container-highest text-on-background"} text-sm font-semibold transition-colors duration-500`}
            >
              Part-time
            </button>
            <button
              type="button"
              onClick={() => setEmploymentType("graduate")}
              className={`w-fit py-2 px-4 rounded-full ${employmentType === "graduate" ? "bg-secondary-container/80 text-on-secondary-container" : "bg-surface-container-highest text-on-background"} text-sm font-semibold transition-colors duration-500`}
            >
              Graduate
            </button>
            <button
              type="button"
              onClick={() => setEmploymentType("internship")}
              className={`w-fit py-2 px-4 rounded-full ${employmentType === "internship" ? "bg-secondary-container/80 text-on-secondary-container" : "bg-surface-container-highest text-on-background"} text-sm font-semibold transition-colors duration-500`}
            >
              Internship
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
