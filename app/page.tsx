"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Image from 'next/image';
import analyticsLight from '@/public/analytics-light.png';
import analyticsDark from '@/public/analytics.png';

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

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-full h-full font-jakarta bg-background text-on-background overflow-x-hidden">
      <Header />

      {/** Body */}
      <div className="flex relative flex-col px-3 items-center ">
        <span className="h-15 fixed z-100 left-0 bottom-0 w-full bg-linear-to-t from-[#09090b]/60 to-transparent pointer-events-none" />

        {/** Landing card (Hero Section) - ANIMATES ON INITIAL PAGE LOAD */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-col items-center pt-25 md:pt-30 pb-20 text-center relative max-w-5xl mx-auto px-4"
        >
          {/* Ambient background glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-62.5 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

          {/** Main Title Header */}
          <motion.h2
            variants={fadeInUp}
            className="mt-10 font-extrabold text-5xl md:text-6xl tracking-tight leading-[1.15] max-w-3xl text-on-background"
          >
            Track Your Job Search<br />
            On Autopilot
          </motion.h2>

          {/** Subtitle Description */}
          <motion.div
            variants={fadeInUp}
            className="mt-15 max-w-2xl text-lg md:text-xl text-on-surface-variant font-medium leading-relaxed"
          >
            <h1>The automated job tracker built for Australia & New Zealand.</h1>
            One click to capture job listings from major job boards like Linkedin, Seek and Trade Me,
            while an ephemeral AI syncs updates directly from your emails!
            Moving from a spreadsheet? Import your current data via CSV in seconds.
          </motion.div>

          {/** Core Call-To-Action (CTA) */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-center gap-3 mt-15 w-full"
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

        {/** Dashboard Preview Image - ANIMATES SMOOTHLY AS YOU SCROLL DOWN */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.10 }}
          variants={fadeInUp}
          className="p-5 mt-5 rounded-2xl border border-surface-container-highest max-w-5xl mx-auto px-4"
        >
          <Image
            src={analyticsLight}
            className="rounded-xl w-full block dark:hidden"
            alt="Aplicate statistics dashboard"
          />
          <Image
            src={analyticsDark}
            className="rounded-xl w-full hidden dark:block"
            alt="Aplicate statistics dashboard"
          />
        </motion.div>

        {/** Divider */}
        <div className="flex my-15 items-center gap-3">
          <span className="h-px w-10 bg-surface-container-high" />
          <p className="font-semibold text-sm text-on-surface/70">
            Join a community of job hunters taking control of their career
          </p>
          <span className="h-px w-10 bg-surface-container-high" />
        </div>

        {/** Feature cards - STAGGER ANIMATES INDIVIDUALLY ON SCROLL */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="flex md:max-w-4/5 flex-col gap-6"
        >
          {/** Row 1: Workspace & Migration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/** Clutter-free */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col justify-between bg-surface-container-low p-8 rounded-xl border border-surface-container-high"
            >
              <div className="flex flex-col gap-3">
                <div className="w-fit p-2 bg-primary-container/30 text-primary rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="currentColor"
                  >
                    <path d="M666-360q33 2 65.5-3.5T794-382q-21 131-121 216.5T440-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T80-440q0-133 85.5-233T382-794q-13 30-18.5 62.5T360-666q-72 25-116 87t-44 139q0 100 70 170t170 70q77 0 139-44t87-116Zm14-560q100 0 170 70t70 170q0 100-70 170t-170 70q-100 0-170-70t-70-170q0-100 70-170t170-70Zm0 360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0-120ZM433-433Z" />
                  </svg>
                </div>
                <h2 className="font-bold text-2xl">Clutter-Free Tracking</h2>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Say goodbye to messy spreadsheets. Experience a streamlined,
                  distraction-free Kanban workspace built to keep you focused on
                  what matters: getting that job offer.
                </p>
              </div>
              <div className="flex h-20 gap-3 items-end mt-8">
                <span className="w-full h-1/2 bg-surface-container-highest rounded-t-lg" />
                <span className="w-full h-full bg-primary-container rounded-t-lg" />
                <span className="w-full h-1/3 bg-surface-container-highest rounded-t-lg" />
              </div>
            </motion.div>

            {/** Spreadsheet Import Hook */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col justify-between bg-surface-container-low p-8 rounded-xl border border-surface-container-high"
            >
              <div className="flex flex-col gap-3">
                <div className="w-fit p-2 bg-tertiary-container/30 text-tertiary rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="currentColor"
                  >
                    <path d="M440-200h80v-167l64 64 56-57-160-160-160 160 56 57 64-64v167ZM240-80q-33 0-56.5-23.5T160-200v-560q0-33 23.5-56.5T240-840h320l240 240v400q0 33-23.5 56.5T720-80H240Zm280-520v-160H240v560h480v-400H520ZM240-760v160-160 560-560Z" />
                  </svg>
                </div>
                <h2 className="font-bold text-2xl">
                  1-Click Spreadsheet Import
                </h2>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Already tracking elsewhere? Don't start from scratch. Upload
                  your existing job search data via CSV file, and Aplicate will
                  instantly populate your board in seconds.
                </p>
              </div>
              <div className="flex items-center border border-dashed border-surface-container-highest p-4 bg-surface-container-lowest rounded-lg mt-8">
                <span className="text-xs font-mono text-on-surface-variant/60">
                  my_tracker.csv
                </span>
                <div className="flex-1 h-px bg-dashed bg-surface-container-highest mx-1 md:mx-2" />
                <span className="text-nowrap px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-bold">
                  Imported ✓
                </span>
              </div>
            </motion.div>
          </div>

          {/** Row 2: Analytics & Automation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/** Analytics */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col justify-between bg-surface-container-low p-8 rounded-xl border border-surface-container-high md:col-span-1"
            >
              <div className="flex flex-col gap-3">
                <div className="w-fit p-2 bg-secondary-container/70 text-on-secondary-container rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="currentColor"
                  >
                    <path d="M280-280h80v-200h-80v200Zm320 0h80v-400h-80v400Zm-160 0h80v-120h-80v120Zm0-200h80v-80h-80v80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
                  </svg>
                </div>
                <h2 className="font-bold text-2xl">Visual Progress</h2>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Turn your job hunt into a data pipeline. Track conversion
                  rates from applied to offered, and instantly see where your
                  pipeline is strongest.
                </p>
              </div>
              <div className="flex h-16 gap-1.5 items-end mt-8">
                <span className="w-full h-1/4 bg-secondary/20 rounded-full" />
                <span className="w-full h-1/2 bg-secondary/30 rounded-full" />
                <span className="w-full h-3/4 bg-secondary/50 rounded-full" />
                <span className="w-full h-full bg-secondary rounded-full" />
              </div>
            </motion.div>

            {/** Gmail integration */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col justify-between md:flex-row gap-6 items-center bg-surface-container-low p-8 rounded-xl border border-surface-container-high md:col-span-2"
            >
              <div className="flex flex-col w-full md:w-1/2 gap-3">
                <div className="w-fit p-2 bg-primary-container/30 text-primary rounded-lg">
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
                <h2 className="font-bold text-2xl">Automated Inbox Sync</h2>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Put your tracking on autopilot. Aplicate securely detects
                  application confirmation emails in your inbox and updates your
                  stages instantly.
                </p>
                <button
                  onClick={() => router.push("/home")}
                  className="flex group items-center gap-2 mt-2 text-primary text-sm rounded-full font-bold transition-all duration-500"
                >
                  Learn how it works
                  <svg
                    className="group-hover:translate-x-3 transition-transform duration-500"
                    xmlns="http://www.w3.org/2000/svg"
                    height="16px"
                    viewBox="0 -960 960 960"
                    width="16px"
                    fill="currentColor"
                  >
                    <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-1 w-full gap-3 flex-col h-fit relative bg-surface-container-high rounded-lg p-5">
                <div className="p-2 absolute z-5 -right-2 -top-2 bg-surface-container-lowest text-secondary rounded-lg border border-surface-container-highest">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="currentColor"
                  >
                    <path d="M638-80 468-250l56-56 114 114 226-226 56 56L638-80ZM480-520l320-200H160l320 200Zm0 80L160-640v400h206l80 80H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v174l-80 80v-174L480-440Zm0 0Zm0-80Zm0 80Z" />
                  </svg>
                </div>
                <span className="w-3/4 h-5 bg-surface-bright rounded-lg" />
                <span className="w-1/2 h-5 bg-surface-container-highest rounded-lg" />
                <div className="flex gap-2 border border-primary/50 p-3 bg-primary/20 rounded-lg">
                  <span className="rounded-full h-2 bg-primary w-2" />
                  <span className="rounded-full w-1/3 h-2 bg-primary-container" />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/** Join - BOTTOM CTA SECTION */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="flex flex-col items-center gap-3 relative overflow-hidden py-24"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full hero-gradient pointer-events-none" />
          <h2 className="font-bold text-2xl text-center">
            Ready to clear the job search chaos?
          </h2>
          <p className="text-center max-w-160 text-on-surface-variant">
            Ditch the tabs, the notes, and the chaotic bookmarks. Start tracking
            your next big move in seconds.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-3 mt-3">
            <button
              onClick={() => router.push("/home")}
              className="px-8 mt-3 py-3 font-semibold text-sm rounded-full h-full bg-primary hover:bg-primary-container text-on-primary transition-colors shadow-xl shadow-primary/30"
            >
              Launch Your Board (No Signup)
            </button>
            <span className="text-xs font-bold text-on-surface/40 mt-3">
              OR
            </span>
            <button
              onClick={() => router.push("/signup")}
              className="px-8 mt-3 py-3 font-semibold text-sm rounded-full h-full hover:bg-surface-container text-on-surface border border-surface-container-highest transition-colors"
            >
              Create Free Account
            </button>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
