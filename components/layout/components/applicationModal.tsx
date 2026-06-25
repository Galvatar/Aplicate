"use client";

import { useModal } from "@/components/ui/modal";
import Rating from "@/components/ui/rating";
import { useApplications } from "@/hooks/use-applications";
import { useUser } from "@/hooks/use-user";
import { Application, Status } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import DeleteApplication from "./deleteApplication";

interface ApplicationProps {
  app?: Application,
}

export default function ApplicationModal({ app }: ApplicationProps) {
  const today = new Date();
  const future = new Date(today);
  future.setDate(today.getDate() + 10);
  const defaultApplication: Application = {
    userId: '',
    title: '',
    company: '',
    status: Status.Apply,
    employmentType: "full-time",
    applied: new Date(),
    lastUpdate: new Date(),
    journey: '',
    rating: 0,
    followUpDate: future
  };
  const modal = useModal();
  const storage = useApplications();
  const [application, setApplication] = useState<Application>(app ?? defaultApplication);
  const [loading, setLoading] = useState(false);
  const isSubmitting = useRef<boolean>(false);

  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setApplication(prev => prev ? { ...prev, userId: user.id } : prev);
    }
  }, [user])

  async function handleSubmit() {
    if (isSubmitting.current) return;
    
    isSubmitting.current = true;
    setLoading(true);

    try {
      if (app) {
        await storage.updateApplication(application)
      } else {
        await storage.createApplication(application);
      }
      modal.hideWithRefresh();
    } catch (error) {
      isSubmitting.current = false;
      setLoading(false);
    }
  }

  return (
    <div className="font-jakarta flex flex-col relative h-full w-full md:max-w-160 md:rounded-xl border border-outline-variant/10 bg-surface-container text-on-background">
      {/** Title */}
      <div className="fixed gap-2 md:relative z-5 bg-surface-container -mt-1 md:mt-0 flex justify-between items-center px-4 pt-6 py-4 md:p-8 border-b border-outline-variant/10">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">{app ? 'Update' : 'New'} Application</h1>
          <h2>
            {app ? 
              'Make changes to your existing application.'
              :
              'Capture the details of your next opportunity.'
            }
          </h2>
        </div>
        <div className="md:hidden flex flex-col items-start gap-3">
          {app && <button
            type="button"
            onClick={() => modal.hide()}
            className="flex px-6 py-2.5 rounded-lg text-sm font-bold text-on-surface-variant hover:text-on-background bg-surface-container-high transition-all"
          >
            Cancel
          </button>}
          <button
            type="button"
            disabled={loading}
            onClick={handleSubmit}
            className="flex w-full justify-center text-nowrap md:hidden px-4 py-2.5 disabled:opacity-50 rounded-lg text-sm font-bold bg-primary text-on-primary hover:bg-primary/50 hover:shadow-[0_0_20px_rgba(191,194,255,0.15)] transition-all"
          >
            {app ?
              <h1>
                {loading ? "Saving..." : "Save"}
              </h1>
              :
              <h1>
                {loading ? "Adding..." : "+ Add"}
              </h1>
            }
          </button>
        </div>
        <div
          onClick={() => modal.hide()}
          className="hidden md:flex p-1.5 rounded-full hover:bg-surface-bright transition-colors duration-500"
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
      {/** Form data */}
      <form
        className="flex py-20 md:py-5 mt-30 md:mt-0 flex-col overflow-scroll items-center p-8 gap-5 md:gap-8"
      >
        <h1 className="font-bold text-xs w-full text-left text-on-surface/50">
          Fields marked with <span className="text-red-500">*</span> are mandatory, all else are optional.
        </h1>
        {/** First line */}
        <div className="flex flex-col md:flex-row w-full gap-5">
          {/** Company */}
          <div className="flex w-full flex-col gap-3">
            <h1 className="flex font-bold text-sm">
              Company
              <p className="text-red-500">*</p>
            </h1>
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
                value={application.company}
                onChange={(e) => setApplication(prev => prev ? { ...prev, company: e.target.value } : prev)}
                placeholder="e.g. Acme Corp"
                className="border-0 outline-none text-on-background font-bold placeholder:text-on-surface-variant/30 placeholder:font-semibold"
              />
            </div>
          </div>
          {/** Role */}
          <div className="flex w-full flex-col gap-3">
            <h1 className="flex font-bold text-sm">
              Role / Title
              <p className="text-red-500">*</p>
            </h1>
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
                value={application.title}
                onChange={(e) => setApplication(prev => prev ? { ...prev, title: e.target.value } : prev)}
                placeholder="e.g. Product Designer"
                className="border-0 outline-none text-on-background font-bold placeholder:text-on-surface-variant/30 placeholder:font-semibold"
              />
            </div>
          </div>
        </div>
        {/** Second line */}
        <div className="flex flex-col md:flex-row w-full gap-5">
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
                value={application.location}
                onChange={(e) => setApplication(prev => prev ? { ...prev, location: e.target.value } : prev)}
                placeholder="e.g. Remote, Sydney"
                className="border-0 outline-none text-on-background font-bold placeholder:text-on-surface-variant/30 placeholder:font-semibold"
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
                value={application.foundOn}
                onChange={(e) => setApplication(prev => prev ? { ...prev, foundOn: e.target.value } : prev)}
                placeholder="e.g. LinkedIn, Referral"
                className="border-0 outline-none text-on-background font-bold placeholder:text-on-surface-variant/30 placeholder:font-semibold"
              />
            </div>
          </div>
        </div>
        {/** Third line */}
        <div className="flex flex-col md:flex-row w-full gap-5">
          {/** Main Contact */}
          <div className="flex w-full flex-col gap-3">
            <h1 className="font-bold text-sm">Main Contact Details</h1>
            <div className="flex bg-surface-container-highest px-5 py-3 rounded-lg gap-2">
              <svg className="text-on-surface-variant/50" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-400q33 0 56.5-23.5T560-480q0-33-23.5-56.5T480-560q-33 0-56.5 23.5T400-480q0 33 23.5 56.5T480-400ZM320-240h320v-23q0-24-13-44t-36-30q-26-11-53.5-17t-57.5-6q-30 0-57.5 6T369-337q-23 10-36 30t-13 44v23ZM720-80H240q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80Zm0-80v-446L526-800H240v640h480Zm-480 0v-640 640Z"/>
              </svg>
              <input
                value={application.mainContact}
                onChange={(e) => setApplication(prev => prev ? { ...prev, mainContact: e.target.value } : prev)}
                placeholder="e.g. admin@spotify.com"
                className="border-0 outline-none text-on-background font-bold placeholder:text-on-surface-variant/30 placeholder:font-semibold"
              />
            </div>
          </div>
          {/** Pay */}
          <div className="flex w-full flex-col gap-3">
            <h1 className="font-bold text-sm">Pay</h1>
            <div className="flex bg-surface-container-highest px-5 py-3 rounded-lg gap-2">
              <svg className="text-on-surface-variant/50" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-400q33 0 56.5-23.5T560-480q0-33-23.5-56.5T480-560q-33 0-56.5 23.5T400-480q0 33 23.5 56.5T480-400ZM320-240h320v-23q0-24-13-44t-36-30q-26-11-53.5-17t-57.5-6q-30 0-57.5 6T369-337q-23 10-36 30t-13 44v23ZM720-80H240q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80Zm0-80v-446L526-800H240v640h480Zm-480 0v-640 640Z"/>
              </svg>
              <input
                value={application.pay}
                onChange={(e) => setApplication(prev => prev ? { ...prev, pay: e.target.value } : prev)}
                placeholder="e.g. $90k - $95k"
                className="border-0 outline-none text-on-background font-bold placeholder:text-on-surface-variant/30 placeholder:font-semibold"
              />
            </div>
          </div>
        </div>
        {/** Fourth line */}
        <div className="flex flex-col md:flex-row w-full gap-5">
          {/** Closing date */}
          <div className="flex w-full flex-col gap-3">
            <h1 className="font-bold text-sm">Closing Date</h1>
            <div className="flex bg-surface-container-highest px-3 py-3 rounded-lg gap-2">
              <input
                type="date"
                value={application.closingDate ? new Date(application.closingDate).toISOString().split('T')[0] : ''}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  setApplication(prev => prev ? { 
                    ...prev, 
                    closingDate: inputValue ? new Date(inputValue) : undefined 
                  } : prev);
                }}
                placeholder="e.g. admin@spotify.com"
                className="time-input border-0 outline-none text-on-background font-bold placeholder:text-on-surface-variant/30 placeholder:font-semibold"
              />
            </div>
          </div>
          {/** Follow up date */}
          <div className="flex w-full flex-col gap-3">
            <h1 className="font-bold text-sm">Follow Up Date</h1>
            <div className="flex bg-surface-container-highest px-3 py-3 rounded-lg gap-2">
              <input
                type="date"
                value={application.followUpDate ? new Date(application.followUpDate).toISOString().split('T')[0] : ''}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  setApplication(prev => prev ? { 
                    ...prev, 
                    followUpDate: inputValue ? new Date(inputValue) : undefined 
                  } : prev);
                }}
                placeholder="e.g. $90k - $95k"
                className="time-input border-0 outline-none text-on-background font-bold placeholder:text-on-surface-variant/30 placeholder:font-semibold"
              />
            </div>
          </div>
        </div>
        {/** Ratings */}
        <div className="flex w-full flex-col gap-3">
          <h1 className="font-bold text-sm">Rating</h1>
          <div className="flex w-full items-center justify-center">
            <div className="max-w-70">
              <Rating editable={true} app={application} />
            </div>
          </div>
        </div>
        {/** Pre-register */}
        <div className="flex w-full items-center gap-3">
          <input
            id="terms-checkbox"
            type="checkbox"
            checked={application.status === Status.PreRegister}
            onChange={(e) => setApplication(prev => prev ? { ...prev, status: Status.PreRegister } : prev)}
            className="w-5 h-5 rounded cursor-pointer appearance-none accent-primary border border-outline-variant checked:bg-secondary-fixed-dim transition-colors"
          />
          <label
            htmlFor="terms-checkbox"
            className="text-sm text-on-surface-variant cursor-pointer"
          >
            This is a pre-registration
          </label>
        </div>
        {/** Employment type */}
        <div className="flex w-full flex-col gap-3">
          <h1 className="font-bold text-sm">Employment Type</h1>
          <div className="flex flex-wrap gap-3">
            {["full-time", "contract", "freelance", "part-time", "casual", "graduate", "internship"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setApplication(prev => prev ? { ...prev, employmentType: type } : prev)}
                className={`w-fit py-2 px-4 rounded-full ${application.employmentType === type ? "bg-secondary-container/80 text-on-secondary-container" : "bg-surface-container-highest text-on-background"} text-sm font-semibold transition-colors duration-500 capitalize`}
              >
                {type.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>
        {/** Posting URL */}
        <div className="flex w-full flex-col gap-3">
          <h1 className="font-bold text-sm">
            Posting URL
          </h1>
          <div className="flex w-full bg-surface-container-highest px-5 py-3 rounded-lg gap-2">
            <svg
              className="text-on-surface-variant/50"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z" />
            </svg>
            <input
              value={application.url}
              onChange={(e) => setApplication(prev => prev ? { ...prev, url: e.target.value } : prev)}
              placeholder="https://"
              className="flex-1 min-w-0 border-0 outline-none text-on-background font-bold placeholder:text-on-surface-variant/30 placeholder:font-semibold"
            />
          </div>
        </div>
        {/** Notes */}
        <div className="flex w-full flex-col gap-3">
          <h1 className="font-bold text-sm">Notes</h1>
          <div className="flex gap-2 bg-surface-container-highest px-5 py-3 rounded-lg">
            <svg
              className="text-on-surface-variant/50"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
            </svg>
            <textarea
              value={application.notes}
              onChange={(e) => setApplication(prev => prev ? { ...prev, notes: e.target.value } : prev)}
              placeholder="Add any additional notes..."
              rows={4}
              className="border-0 outline-none text-on-background font-bold placeholder:text-on-surface-variant/30 placeholder:font-semibold resize-none w-full bg-surface-container-highest"
            />
          </div>
        </div>
        {/** Job Description */}
        <div className="flex w-full flex-col gap-3">
          <h1 className="font-bold text-sm">Job Description</h1>
          <div className="flex gap-2 bg-surface-container-highest px-5 py-3 rounded-lg">
            <svg
              className="text-on-surface-variant/50"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" />
            </svg>
            <textarea
              value={application.jobDescription}
              onChange={(e) => setApplication(prev => prev ? { ...prev, jobDescription: e.target.value } : prev)}
              placeholder="The successful candidate in this role will have..."
              rows={4}
              className="border-0 outline-none text-on-background font-bold placeholder:text-on-surface-variant/30 placeholder:font-semibold resize-none w-full bg-surface-container-highest"
            />
          </div>
        </div>
        {/** Email sync */}
        <div className="flex group gap-4 bg-surface-container-lowest/50 rounded-lg p-5 border border-outline-variant/5 hover:bg-surface-container-lowest transition-colors cursor-pointer">
          <div className="h-fit p-2 bg-surface-container-high rounded-full text-secondary-fixed-dim">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
            </svg>
          </div>
          <div className="flex flex-col gap-0">
            <h1 className="text-on-background text-sm font-bold">
              Automate tracking
            </h1>
            <h2 className="text-on-surface-variant mt-1 text-xs font-semibold">
              Connect your inbox to automatically sync status updates and
              interview invites for this application.
            </h2>
          </div>
          <svg
            className="text-on-surface-variant/30 group-hover:text-primary transition-colors"
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
          </svg>
        </div>
        <h4 className="flex text-on-surface-variant gap-2 text-xs items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="12px"
            viewBox="0 -960 960 960"
            width="12px"
            fill="currentColor"
          >
            <path d="M440-280h80v-240h-80v240Zm68.5-331.5Q520-623 520-640t-11.5-28.5Q497-680 480-680t-28.5 11.5Q440-657 440-640t11.5 28.5Q463-600 480-600t28.5-11.5ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
          </svg>
          Applications added in guest mode are stored locally in your browser.
        </h4>
      </form>
      {/** Buttons */}
      <div className="hidden md:flex justify-between items-center p-8 border-t border-outline-variant/10 gap-4">
        {!app ?
        <div></div>
        :
        <button
          onClick={() => {
            modal.show(<DeleteApplication app={app} />)
          }}
          className="flex px-8 py-2.5 font-bold gap-2 bg-error hover:bg-error-container text-on-error hover:text-on-error-container rounded-lg transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
          </svg>
          Delete
        </button>}
        <div className="flex gap-4 items-center">
          <button
            type="button"
            onClick={() => modal.hide()}
            className="flex px-6 py-2.5 rounded-lg text-sm font-bold text-on-surface-variant hover:text-on-background hover:bg-surface-container-high transition-all"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={handleSubmit}
            className="px-8 py-2.5 disabled:opacity-50 rounded-lg text-sm font-bold bg-primary text-on-primary hover:bg-primary/50 hover:shadow-[0_0_20px_rgba(191,194,255,0.15)] transition-all"
          >
            {app ?
              <h1>
                {loading ? "Saving..." : "Save Application"}
              </h1>
              :
              <h1>
                {loading ? "Creating..." : "Create Application"}
              </h1>
            }
          </button>
        </div>
      </div>
    </div>
  );
}