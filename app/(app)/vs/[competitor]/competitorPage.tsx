"use client"

import NotFoundPage from "@/app/not-found";
import Header from "@/components/layout/header";
import { capitalize } from "@/lib/capitalize";
import { motion, Variants } from "framer-motion";
import { useParams, useRouter } from "next/navigation";

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

const VALID_COMPETITORS = ['teal', 'huntr', 'excel', 'notion'];

export default function CompetitorPage() {
    const params = useParams();
    const competitor = params.competitor as string;
    const router = useRouter();
    const comp = competitor.toLowerCase();

    if (!VALID_COMPETITORS.includes(comp)) {
        return <NotFoundPage />
    }

    return (
    <div className="flex flex-col w-full h-full font-jakarta bg-background text-on-background overflow-x-hidden">
      <Header />

      {/** Body */}
      <div className="flex relative flex-col px-3 items-center ">
        <span className="" />

        {/** Landing card (Hero Section) - ANIMATES ON INITIAL PAGE LOAD */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col items-center pt-25 md:pt-40 pb-20 text-center relative max-w-5xl mx-auto px-4"
        >
          {/* Ambient background glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-62.5 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

          {/** Feature Pill Badge */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high border border-surface-container-highest text-xs font-medium tracking-wide text-primary"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            100% Frictionless Tracking
          </motion.div>

          {/** Main Title Header */}
          <motion.div
            variants={fadeInUp}
            className="mt-6 font-extrabold text-5xl md:text-6xl tracking-tight leading-[1.15] max-w-3xl text-on-background"
          >
            Looking for a<br />
            <h1 className="bg-linear-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
              {" "}{capitalize(comp)} alternative{" "}
            </h1>
            built for AU/NZ?
          </motion.div>

          {/** Subtitle Description */}
          <motion.div
            variants={fadeInUp}
            className="mt-6 max-w-2xl text-lg md:text-xl text-on-surface-variant font-medium leading-relaxed"
          >
            Try Aplicate! The automated job tracker built for Australia & New Zealand.
            Optional power-tools let you clip listings and auto-sync Gmail when you're ready.
            Already applying? Parse your current data automatically in less than a minute.
          </motion.div>

          {/** Core Call-To-Action (CTA) */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center gap-3 mt-10 w-full"
          >
            <button
              onClick={() => router.push("/home")}
              className="flex group w-full justify-center items-center gap-5 bg-primary hover:bg-primary-container text-on-primary max-w-xs py-4 rounded-full font-bold text-base shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <h3 className="flex flex-col -gap-1">
                Open Dashboard <b /> (No Account Required)
              </h3>
              <svg
                className="group-hover:translate-x-1.5 transition-transform duration-300"
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="20px"
                fill="currentColor"
              >
                <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
              </svg>
            </button>
            <p className="text-xs font-semibold text-on-surface/50 tracking-wide flex items-center gap-2">
              See how it works instantly
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
    )
}