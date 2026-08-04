"use client"

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { useState } from "react";

export default function RefundsPage() {
    const [section, setSection] = useState("data");

    return (
        <div className="flex flex-col w-full h-full font-jakarta bg-background text-on-background overflow-x-hidden">
            {/** Body */}
            <div className="flex flex-col relative items-center my-30 px-20 gap-5">
                <span className="h-30 fixed z-100 left-0 bottom-0 w-full bg-linear-to-t from-[#09090b] via-transparent to-transparent pointer-events-none" />
                <h1 className="font-extrabold text-primary text-3xl">
                    Refund Policy
                </h1>
                <h2 className="text-center max-w-1/2">
                    At Aplicate we want you to love our product so our refund policy makes it easy for you to try it out without commitment.
                </h2>
                <div className="flex gap-5 items-start w-full">
                    <div className="flex flex-col p-5 bg-surface-container border border-surface-container-high rounded-lg gap-2">
                        <h2 className="uppercase font-semibold text-xs text-on-surface/50">
                            On this page
                        </h2>
                        <h2 
                            onClick={() => {
                                document.getElementById("philosophy")?.scrollIntoView({
                                    behavior: "smooth"
                                });
                                setSection("philosophy");
                            }}
                            className={`font-semibold cursor-pointer transition-colors duration-300 ${section === "philosophy" ? 'text-primary' : 'hover:text-on-surface/50'}`}>
                            1. Our Core Philosophy
                        </h2>
                        <h2 
                            onClick={() => {
                                document.getElementById("eligibility")?.scrollIntoView({
                                    behavior: "smooth"
                                });
                                setSection("eligibility");
                            }}
                            className={`font-semibold cursor-pointer transition-colors duration-300 ${section === "eligibility" ? 'text-primary' : 'hover:text-on-surface/50'}`}>
                            2. Eligibility Breakdown
                        </h2>
                        <h2 
                            onClick={() => {
                                document.getElementById("access")?.scrollIntoView({
                                    behavior: "smooth"
                                });
                                setSection("access");
                            }}
                            className={`font-semibold cursor-pointer transition-colors duration-300 ${section === "access" ? 'text-primary' : 'hover:text-on-surface/50'}`}>
                            3. Immediate Revocation of Access
                        </h2>
                        <h2 
                            onClick={() => {
                                document.getElementById("abuse")?.scrollIntoView({
                                    behavior: "smooth"
                                });
                                setSection("abuse");
                            }}
                            className={`font-semibold cursor-pointer transition-colors duration-300 ${section === "abuse" ? 'text-primary' : 'hover:text-on-surface/50'}`}>
                            4. Fair use & Abuse Prevention
                        </h2>
                        <h2 
                            onClick={() => {
                                document.getElementById("request")?.scrollIntoView({
                                    behavior: "smooth"
                                });
                                setSection("request");
                            }}
                            className={`font-semibold cursor-pointer transition-colors duration-300 ${section === "request" ? 'text-primary' : 'hover:text-on-surface/50'}`}>
                            5. How to Request a Refund
                        </h2>
                        <h2 
                            onClick={() => {
                                document.getElementById("time")?.scrollIntoView({
                                    behavior: "smooth"
                                });
                                setSection("time");
                            }}
                            className={`font-semibold cursor-pointer transition-colors duration-300 ${section === "time" ? 'text-primary' : 'hover:text-on-surface/50'}`}>
                            6. Processing Time
                        </h2>
                    </div>
                    <div className="flex w-full h-fit flex-col p-5 bg-surface-container border border-surface-container-high rounded-lg gap-3">
                        <h2 id="philosophy" className="font-bold text-2xl">
                            1. Our Core Philosophy
                        </h2>
                        <p>
                            We want you to love our product. If you are unhappy with your purchase for any reason within your first <b>14 days</b> of signing up, just drop us a line. We will happily issue a full refund, no questions asked, subject to our fair use guidelines below.
                        </p>
                        <h2 id="eligibility" className="font-bold text-2xl mt-3">
                            2. Eligibility Breakdown
                        </h2>
                        <p>
                            To keep things fair for both our users and our development team, we use the following guidelines to process refund requests:
                        </p>
                        <table className="w-full rounded-xl overflow-hidden">
                            <thead>
                                <tr className="bg-surface-container-highest">
                                    <td className="text-center py-3">
                                        Scenario
                                    </td>
                                    <td className="text-center">
                                        Refundable?
                                    </td>
                                    <td className="text-center">
                                        Notes
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-surface-container-lowest/40 border-t border-surface-container-highest">
                                    <td className="text-center py-3 border-r border-surface-container-highest p-2">
                                        Monthly Subscription
                                    </td>
                                    <td className="text-center p-2">
                                        Yes
                                    </td>
                                    <td className="text-center border-l border-surface-container-highest p-2">
                                        100% money-back guarantee for first-time purchases within 14 days.
                                    </td>
                                </tr>
                                <tr className="bg-surface-container-lowest/40 border-t border-surface-container-highest">
                                    <td className="text-center py-3 border-r border-surface-container-highest p-2">
                                        6-Month One-Time Access
                                    </td>
                                    <td className="text-center p-2">
                                        Yes
                                    </td>
                                    <td className="text-center border-l border-surface-container-highest p-2">
                                        100% money-back guarantee if requested within 14 days of your first purchase. Because it doesn't auto-renew, no future charges will ever occur.
                                    </td>
                                </tr>
                                <tr className="bg-surface-container-lowest/40 border-t border-surface-container-highest">
                                    <td className="text-center py-3 border-r border-surface-container-highest p-2">
                                        Accidental Monthly Renewal
                                    </td>
                                    <td className="text-center p-2">
                                        Case-by-Case
                                    </td>
                                    <td className="text-center border-l border-surface-container-highest p-2">
                                        If you forgot to cancel the $24 monthly plan and get rebilled, contact us within 7 days. We generally refund it if there was zero account activity during that new billing cycle.
                                    </td>
                                </tr>
                                <tr className="bg-surface-container-lowest/40 border-t border-surface-container-highest">
                                    <td className="text-center py-3 border-r border-surface-container-highest p-2">
                                        Service Downtime
                                    </td>
                                    <td className="text-center p-2">
                                        Compensation
                                    </td>
                                    <td className="text-center border-l border-surface-container-highest p-2">
                                        If a major system outage on our end prevents you from using the app for an extended period, we will, at our sole discretion, either issue a refund or extend your subscription for a time equivalent to how long the application was unusable.
                                    </td>
                                </tr>
                                <tr className="bg-surface-container-lowest/40 border-t border-surface-container-highest">
                                    <td className="text-center py-3 border-r border-surface-container-highest p-2">
                                        Account Abuse
                                    </td>
                                    <td className="text-center p-2">
                                        No
                                    </td>
                                    <td className="text-center border-l border-surface-container-highest p-2">
                                        If your account is banned or flagged for violating our Terms of Service (e.g., scraping, spamming), no refund will be issued.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <h2 id="access" className="font-bold text-2xl mt-3">
                            3. Immediate Revocation of Access
                        </h2>
                        <p>
                            <b>Important:</b> Processing a refund will immediately terminate your active subscription, access tokens, and account privileges. You will lose access to all premium features and data on the spot. We do not offer prorated usage after a refund has been issued.
                        </p>
                        <h2 id="abuse" className="font-bold text-2xl mt-3">
                            4. Fair use & Abuse Prevention
                        </h2>
                        <p>
                            To prevent abuse of our 14-day money-back guarantee (such as using our service as a temporary free trial), refunds are subject to a data and resource consumption limit.<br /><br />

                            We reserve the right to deny a refund request if, within the 14-day window, your account exceeds reasonable fair-use thresholds (such as excessive API utilization, bulk data extraction, or heavy server operations). Refund requests will be evaluated at <b>our sole discretion</b> to ensure the guarantee is being used in good faith.
                        </p>
                        <h2 id="request" className="font-bold text-2xl mt-3">
                            5. How to Request a Refund
                        </h2>
                        <p>
                            To initiate a refund, please email us at <b>aplicate.jobs@gmail.com</b> from the email address associated with your account. Please include your Paddle Order ID (found on your email receipt) so we can locate your transaction instantly.
                        </p>
                        <h2 id="time" className="font-bold text-2xl mt-3">
                            6. Processing Time
                        </h2>
                        <p>
                            Once approved, refunds are processed immediately through our payment provider (Paddle). It typically takes <b>5 to 10 business days</b> for the funds to reappear on your original payment method (bank account or credit card statement).
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}