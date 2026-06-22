"use client";

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { motion, Variants } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import Image from 'next/image';
import deskLight from '@/public/deskLight.png';
import deskDark from '@/public/deskDark.png';
import statsLight from '@/public/statsLight.png';
import statsDark from '@/public/statsDark.png';

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

export default function AboutPage() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-full h-full font-jakarta bg-background text-on-background overflow-x-hidden">
      <Header />

      {/** Body */}
      <div className="flex relative flex-col items-center mb-30 pt-30 px-20">
        {/** Story Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex items-center gap-10"
        >
          <div className="flex flex-col w-full gap-5">
            <h2 className="text-secondary uppercase tracking-widest font-semibold">
              The Aplicate Story
            </h2>
            <h1 className="font-bold text-4xl leading-tight">
              Reclaiming your{" "}
              <span className="bg-linear-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
                Digital Serenity
              </span>{" "}
              in your career journey.
            </h1>
            <p className="text-lg text-on-surface/80">
              Modern job hunting is fragmented, noisy, and draining. We built
              Aplicate to be the quiet, organized center of your professional
              life, giving you clarity when you need it most.
            </p>
          </div>
          <div className="w-120 p-8 bg-surface-container rounded-3xl border border-surface-container-highest">
            <Image
              src={deskLight}
              className="aspect-square object-cover block dark:hidden rounded-xl"
              alt="Desk setup"
            />
            <Image
              src={deskDark}
              className="aspect-square object-cover hidden dark:block rounded-xl"
              alt="Desk setup"
            />
          </div>
        </motion.div>

        {/** Mission Section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col w-full mt-20"
        >
          <motion.h1
            variants={fadeInUp}
            className="font-semibold text-2xl mb-4"
          >
            Our Mission
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="max-w-xl text-on-surface/80 mb-8"
          >
            We believe focus is the ultimate competitive advantage. Our platform
            is designed to eliminate the anxiety of the hunt and replace it with
            calm, structured progress.
          </motion.p>

          {/** Grid of Mission Points */}
          <div className="flex flex-col gap-5">
            <div className="flex gap-5">
              <motion.div
                variants={fadeInUp}
                className="flex w-full p-8 bg-surface-container border border-surface-container-highest rounded-2xl items-center justify-between"
              >
                <div className="flex flex-col gap-3">
                  <svg
                    className="text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    height="36px"
                    viewBox="0 -960 960 960"
                    width="36px"
                    fill="currentColor"
                  >
                    <path d="M240-80v-172q-57-52-88.5-121.5T120-520q0-150 105-255t255-105q125 0 221.5 73.5T827-615l52 205q5 19-7 34.5T840-360h-80v120q0 33-23.5 56.5T680-160h-80v80h-80v-160h160v-200h108l-38-155q-23-91-98-148t-172-57q-116 0-198 81t-82 197q0 60 24.5 114t69.5 96l26 24v208h-80Zm254-360Zm-54 80h80l6-50q8-3 14.5-7t11.5-9l46 20 40-68-40-30q2-8 2-16t-2-16l40-30-40-68-46 20q-5-5-11.5-9t-14.5-7l-6-50h-80l-6 50q-8 3-14.5 7t-11.5 9l-46-20-40 68 40 30q-2 8-2 16t2 16l-40 30 40 68 46-20q5 5 11.5 9t14.5 7l6 50Zm-2.5-117.5Q420-495 420-520t17.5-42.5Q455-580 480-580t42.5 17.5Q540-545 540-520t-17.5 42.5Q505-460 480-460t-42.5-17.5Z" />
                  </svg>
                  <h1 className="font-semibold text-xl">
                    Reducing Cognitive Load
                  </h1>
                  <p className="text-sm text-on-surface/80">
                    By centralizing every application, status, and follow-up, we
                    free your mind to focus on what matters: your craft.
                  </p>
                </div>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="flex w-fit p-8 bg-primary-container/10 border border-primary-container/50 rounded-2xl"
              >
                <div className="flex flex-col gap-3">
                  <svg
                    className="text-secondary"
                    xmlns="http://www.w3.org/2000/svg"
                    height="36px"
                    viewBox="0 -960 960 960"
                    width="36px"
                    fill="currentColor"
                  >
                    <path d="M395-395q-35-35-35-85t35-85q35-35 85-35t85 35q35 35 35 85t-35 85q-35 35-85 35t-85-35Zm113.5-56.5Q520-463 520-480t-11.5-28.5Q497-520 480-520t-28.5 11.5Q440-497 440-480t11.5 28.5Q463-440 480-440t28.5-11.5ZM200-120q-33 0-56.5-23.5T120-200v-160h80v160h160v80H200Zm400 0v-80h160v-160h80v160q0 33-23.5 56.5T760-120H600ZM120-600v-160q0-33 23.5-56.5T200-840h160v80H200v160h-80Zm640 0v-160H600v-80h160q33 0 56.5 23.5T840-760v160h-80Z" />
                  </svg>
                  <h1 className="font-semibold text-xl">Pure Focus</h1>
                  <p className="text-sm text-on-surface/80">
                    Zero ads. Zero social noise. Only you and your future.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="flex gap-5">
              <motion.div
                variants={fadeInUp}
                className="flex w-fit p-8 bg-surface-container border border-surface-container-highest rounded-2xl"
              >
                <div className="flex flex-col gap-3">
                  <svg
                    className="text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    height="36px"
                    viewBox="0 -960 960 960"
                    width="36px"
                    fill="currentColor"
                  >
                    <path d="M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z" />
                  </svg>
                  <h1 className="font-semibold text-xl">Data Privacy</h1>
                  <p className="text-sm text-on-surface/80">
                    Your career data is yours alone. We will never sell your
                    personal insights.
                  </p>
                </div>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="flex w-full p-8 bg-surface-container border border-surface-container-highest rounded-2xl items-center gap-6"
              >
                <div className="w-20">
                  <Image
                    src={statsLight}
                    className="aspect-square object-cover block dark:hidden rounded-xl"
                    alt="Stats graph"
                  />
                  <Image
                    src={statsDark}
                    className="aspect-square object-cover hidden dark:block rounded-xl"
                    alt="Stats graph"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h1 className="font-semibold text-xl">Statistical Growth</h1>
                  <p className="text-sm text-on-surface/80">
                    We believe in the power of data to illuminate your pipeline.
                    Our insights help you stay ahead of the curve.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/** Join Movement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center p-10 bg-surface-container mt-30 rounded-4xl text-center border border-surface-container-highest"
        >
          <h1 className="font-bold text-2xl mb-4">A Future of Growth</h1>
          <p className="max-w-xl mb-8 text-on-surface/80">
            Our vision extends beyond the job search. We are building the
            infrastructure for a lifetime of professional serenity, where your
            career moves with intention, not impulse.
          </p>
          <button
            onClick={() => router.push("/signup")}
            className="py-3 px-8 bg-on-surface text-surface-container-lowest font-semibold text-sm rounded-full hover:opacity-80 transition-opacity"
          >
            Join the Movement
          </button>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
