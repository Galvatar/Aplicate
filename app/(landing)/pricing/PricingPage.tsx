"use client";

import ToggleButton from "@/app/(app)/settings/components/toggle";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import LemonButton from "@/components/ui/paddleButton";
import { motion, Variants } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export default function PricingPage() {
  const router = useRouter();
  const [annual, setAnnual] = useState(false);

  return (
    <div className="flex flex-col w-full h-full font-jakarta bg-background text-on-background overflow-x-hidden">
      {/** Body */}
      <div className="flex relative flex-col items-center mb-30">
        <span className="h-30 fixed z-100 left-0 bottom-0 w-full bg-linear-to-t from-[#09090b] via-transparent to-transparent pointer-events-none" />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex flex-col items-center pt-30 text-center relative max-w-5xl mx-auto px-4"
        >
          <h1 className="text-4xl font-bold text-primary">
            Stop spreadsheet stress. Start landing offers.
          </h1>
          <h2 className="mt-5">
            Track, automate, and analyze your job search. Focus on interviewing,
            not data entry.
          </h2>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex items-center mt-15 mb-5 gap-2 font-semibold"
        >
          <h2>Monthly</h2>
          <ToggleButton disabled={false} status={annual} onChange={setAnnual} />
          <h2>Bi-Yearly</h2>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex gap-5 items-center text-center relative max-w-8xl mx-auto px-4"
        >
          <motion.div
            variants={fadeInUp}
            className="flex flex-col h-full w-full justify-between items-start rounded-lg p-8 bg-surface-container"
          >
            <div className="flex flex-col items-start">
              <h2 className="font-semibold text-2xl">Essential</h2>
              <p className="text-sm mt-3 text-on-surface/50 text-left">
                Everything you need to stay organized.
              </p>
              <span className="flex items-end gap-1">
                <h2 className="text-3xl font-semibold mt-5 text-primary">
                  $0 AUD
                </h2>
                <h3 className="text-sm text-on-surface/50 font-semibold">
                  /forever
                </h3>
              </span>
              <span className="flex gap-2 items-center mt-8">
                <div className="w-4 h-4 flex items-center justify-center text-surface-container rounded-full p-0.5 bg-green-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16px"
                    viewBox="0 -960 960 960"
                    width="16px"
                    fill="currentColor"
                  >
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                  </svg>
                </div>
                <h2>Core tracking features</h2>
              </span>
              <span className="flex gap-2 items-center mt-4">
                <div className="w-4 h-4 flex items-center justify-center text-surface-container rounded-full p-0.5 bg-green-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16px"
                    viewBox="0 -960 960 960"
                    width="16px"
                    fill="currentColor"
                  >
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                  </svg>
                </div>
                <h2>Unlimited applications</h2>
              </span>
              <span className="flex gap-2 items-center mt-4">
                <div className="w-4 h-4 flex items-center justify-center text-surface-container rounded-full p-0.5 bg-green-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16px"
                    viewBox="0 -960 960 960"
                    width="16px"
                    fill="currentColor"
                  >
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                  </svg>
                </div>
                <h2>Full analytics dashboard</h2>
              </span>
              <span className="flex gap-2 items-center mt-4">
                <div className="w-4 h-4 flex items-center justify-center text-surface-container rounded-full p-0.5 border border-surface-container-highest">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16px"
                    viewBox="0 -960 960 960"
                    width="16px"
                    fill="currentColor"
                  >
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                  </svg>
                </div>
                <h2>Browser extension capture</h2>
              </span>
              <span className="flex gap-2 items-center mt-4">
                <div className="w-4 h-4 flex items-center justify-center text-surface-container rounded-full p-0.5 border border-surface-container-highest">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16px"
                    viewBox="0 -960 960 960"
                    width="16px"
                    fill="currentColor"
                  >
                    <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                  </svg>
                </div>
                <h2>Auto-updates from your inbox</h2>
              </span>
            </div>
            <button
              onClick={() => router.push("/home")}
              className="w-full mt-10 py-3 border-3 bg-surface-container-low hover:bg-surface-container-highest border-surface-container-highest rounded-lg text-sm font-medium transition-colors duration-300"
            >
              Get Started
            </button>
          </motion.div>
          {!annual ? (
            <motion.div
              variants={fadeInUp}
              className="flex relative h-full w-full justify-between flex-col items-start rounded-lg p-8 bg-surface-container"
            >
              <div className="flex absolute bg-primary text-sm font-semibold text-on-primary top-0 right-0 px-3 py-1 rounded-tr-lg rounded-bl-lg">
                Most Popular!
              </div>
              <div className="flex flex-col items-start mb-10">
                <h2 className="font-semibold text-2xl text-primary">Pro</h2>
                <p className="text-sm mt-3 text-on-surface/50 text-left">
                  Stop typing it in. Stop checking your inbox.
                </p>
                <span className="flex items-end gap-1">
                  <h2 className="text-3xl font-semibold mt-5 text-primary">
                    $10 AUD
                  </h2>
                  <h3 className="text-sm text-on-surface/50 font-semibold">
                    /mo, monthly
                  </h3>
                </span>
                <span className="flex gap-2 items-center mt-8">
                  <div className="w-4 h-4 flex items-center justify-center text-surface-container rounded-full p-0.5 bg-green-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16px"
                      viewBox="0 -960 960 960"
                      width="16px"
                      fill="currentColor"
                    >
                      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                    </svg>
                  </div>
                  <h2 className="font-semibold">All essential features</h2>
                </span>
                <span className="flex gap-2 items-center mt-4">
                  <div className="w-4 h-4 flex items-center justify-center text-surface-container rounded-full p-0.5 bg-green-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16px"
                      viewBox="0 -960 960 960"
                      width="16px"
                      fill="currentColor"
                    >
                      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                    </svg>
                  </div>
                  <h2 className="flex flex-col font-semibold text-left">
                    Automatic parsing browser extension
                    <p className="text-xs font-normal text-on-surface/80">
                      One-click capture from any job website, no typing
                      required.
                    </p>
                  </h2>
                </span>
                <span className="flex gap-2 items-center mt-4">
                  <div className="w-4 h-4 flex items-center justify-center text-surface-container rounded-full p-0.5 bg-green-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16px"
                      viewBox="0 -960 960 960"
                      width="16px"
                      fill="currentColor"
                    >
                      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                    </svg>
                  </div>
                  <h2 className="flex flex-col font-semibold text-left">
                    Email sync integration
                    <p className="text-xs font-normal text-on-surface/80">
                      Auto-updates your board the moment an employer replies
                    </p>
                  </h2>
                </span>
              </div>
              <LemonButton yearly={annual} manage={false} />
            </motion.div>
          ) : (
            <motion.div
              variants={fadeInUp}
              className="flex relative h-full w-full justify-between flex-col items-start rounded-lg p-8 bg-surface-container"
            >
              {/* <div className="flex absolute bg-primary text-sm font-semibold text-on-primary top-0 right-0 px-3 py-1 rounded-tr-lg rounded-bl-lg">
                Most Popular!
              </div> */}
              <div className="flex flex-col items-start mb-10">
                <h2 className="font-semibold text-2xl text-primary">Pro</h2>
                <p className="text-sm mt-3 text-on-surface/50 text-left">
                  Stop typing it in. Stop checking your inbox.
                </p>
                <span className="flex items-end gap-1">
                  <h2 className="text-3xl font-semibold mt-5 text-primary">
                    $36 AUD
                  </h2>
                  <h3 className="text-sm text-on-surface/50 font-semibold">
                    /for 6 months
                  </h3>
                </span>
                <span className="flex gap-2 items-center mt-8">
                  <div className="w-4 h-4 flex items-center justify-center text-surface-container rounded-full p-0.5 bg-green-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16px"
                      viewBox="0 -960 960 960"
                      width="16px"
                      fill="currentColor"
                    >
                      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                    </svg>
                  </div>
                  <h2 className="font-semibold">All essential features</h2>
                </span>
                <span className="flex gap-2 items-center mt-4">
                  <div className="w-4 h-4 flex items-center justify-center text-surface-container rounded-full p-0.5 bg-green-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16px"
                      viewBox="0 -960 960 960"
                      width="16px"
                      fill="currentColor"
                    >
                      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                    </svg>
                  </div>
                  <h2 className="flex flex-col font-semibold text-left">
                    Automatic parsing browser extension
                    <p className="text-xs font-normal text-on-surface/80">
                      One-click capture from any job website, no typing
                      required.
                    </p>
                  </h2>
                </span>
                <span className="flex gap-2 items-center mt-4">
                  <div className="w-4 h-4 flex items-center justify-center text-surface-container rounded-full p-0.5 bg-green-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16px"
                      viewBox="0 -960 960 960"
                      width="16px"
                      fill="currentColor"
                    >
                      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                    </svg>
                  </div>
                  <h2 className="flex flex-col font-semibold text-left">
                    Email sync integration
                    <p className="text-xs font-normal text-on-surface/80">
                      Auto-updates your board the moment an employer replies
                    </p>
                  </h2>
                </span>
              </div>
              <LemonButton yearly={annual} manage={false} />
            </motion.div>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
