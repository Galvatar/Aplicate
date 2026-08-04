"use client"

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { useState } from "react";

export default function TermsAndConditionsPage() {
    const [section, setSection] = useState("data");

    return (
        <div className="flex flex-col w-full h-full font-jakarta bg-background text-on-background overflow-x-hidden">
            {/** Body */}
            <div className="flex flex-col relative items-center my-30 px-20 gap-5">
                <span className="h-30 fixed z-100 left-0 bottom-0 w-full bg-linear-to-t from-[#09090b] via-transparent to-transparent pointer-events-none" />
                <h1 className="font-extrabold text-primary text-3xl">
                    Terms and Conditions
                </h1>
                <h2 className="text-center max-w-1/2">
                    Welcome to Aplicate! By accessing or using our services, you agree to be bound by these Terms and Conditions. Please read them carefully.
                </h2>
                <h3 className="text-sm font-semibold text-on-surface/50 mb-10">
                    Last Updated: June 17, 2026
                </h3>
                <div className="flex gap-5 items-start w-full">
                    <div className="flex flex-col p-5 bg-surface-container border border-surface-container-high rounded-lg gap-2">
                        <h2 className="uppercase font-semibold text-xs text-on-surface/50">
                            On this page
                        </h2>
                        <h2 
                            onClick={() => {
                                document.getElementById("accept")?.scrollIntoView({
                                    behavior: "smooth"
                                });
                                setSection("accept");
                            }}
                            className={`font-semibold cursor-pointer transition-colors duration-300 ${section === "accept" ? 'text-primary' : 'hover:text-on-surface/50'}`}>
                            1. Acceptance of Terms
                        </h2>
                        <h2 
                            onClick={() => {
                                document.getElementById("description")?.scrollIntoView({
                                    behavior: "smooth"
                                });
                                setSection("description");
                            }}
                            className={`font-semibold cursor-pointer transition-colors duration-300 ${section === "description" ? 'text-primary' : 'hover:text-on-surface/50'}`}>
                            2. Description of Service
                        </h2>
                        <h2 
                            onClick={() => {
                                document.getElementById("responsibility")?.scrollIntoView({
                                    behavior: "smooth"
                                });
                                setSection("responsibility");
                            }}
                            className={`font-semibold cursor-pointer transition-colors duration-300 ${section === "responsibility" ? 'text-primary' : 'hover:text-on-surface/50'}`}>
                            3. User Responsibilities
                        </h2>
                        <h2 
                            onClick={() => {
                                document.getElementById("auto")?.scrollIntoView({
                                    behavior: "smooth"
                                });
                                setSection("auto");
                            }}
                            className={`font-semibold cursor-pointer transition-colors duration-300 ${section === "auto" ? 'text-primary' : 'hover:text-on-surface/50'}`}>
                            4. Automated Processing & AI Limitations
                        </h2>
                        <h2 
                            onClick={() => {
                                document.getElementById("subscription")?.scrollIntoView({
                                    behavior: "smooth"
                                });
                                setSection("subscription");
                            }}
                            className={`font-semibold cursor-pointer transition-colors duration-300 ${section === "subscription" ? 'text-primary' : 'hover:text-on-surface/50'}`}>
                            5. Subscription and Payments
                        </h2>
                        <h2 
                            onClick={() => {
                                document.getElementById("ip")?.scrollIntoView({
                                    behavior: "smooth"
                                });
                                setSection("ip");
                            }}
                            className={`font-semibold cursor-pointer transition-colors duration-300 ${section === "ip" ? 'text-primary' : 'hover:text-on-surface/50'}`}>
                            6. Intellectual Property
                        </h2>
                        <h2 
                            onClick={() => {
                                document.getElementById("liability")?.scrollIntoView({
                                    behavior: "smooth"
                                });
                                setSection("liability");
                            }}
                            className={`font-semibold cursor-pointer transition-colors duration-300 ${section === "liability" ? 'text-primary' : 'hover:text-on-surface/50'}`}>
                            7. Limitation of Liability
                        </h2>
                        <h2 
                            onClick={() => {
                                document.getElementById("termination")?.scrollIntoView({
                                    behavior: "smooth"
                                });
                                setSection("termination");
                            }}
                            className={`font-semibold cursor-pointer transition-colors duration-300 ${section === "termination" ? 'text-primary' : 'hover:text-on-surface/50'}`}>
                            8. Termination
                        </h2>
                        <h2 
                            onClick={() => {
                                document.getElementById("law")?.scrollIntoView({
                                    behavior: "smooth"
                                });
                                setSection("law");
                            }}
                            className={`font-semibold cursor-pointer transition-colors duration-300 ${section === "law" ? 'text-primary' : 'hover:text-on-surface/50'}`}>
                            9. Governing Law
                        </h2>
                        <h2 
                            onClick={() => {
                                document.getElementById("change")?.scrollIntoView({
                                    behavior: "smooth"
                                });
                                setSection("change");
                            }}
                            className={`font-semibold cursor-pointer transition-colors duration-300 ${section === "change" ? 'text-primary' : 'hover:text-on-surface/50'}`}>
                            10. Change to Terms
                        </h2>
                        <h2 
                            onClick={() => {
                                document.getElementById("contact")?.scrollIntoView({
                                    behavior: "smooth"
                                });
                                setSection("contact");
                            }}
                            className={`font-semibold cursor-pointer transition-colors duration-300 ${section === "contact" ? 'text-primary' : 'hover:text-on-surface/50'}`}>
                            11. Contact Information
                        </h2>
                    </div>
                    <div className="flex w-full h-fit flex-col p-5 bg-surface-container border border-surface-container-high rounded-lg gap-3">
                        <h2 id="accept" className="font-bold text-2xl">
                            1. Acceptance of Terms
                        </h2>
                        <p>
                            By creating an account or using Aplicate, you confirm that you are at least 18 years old and capable of entering into a legally binding agreement. If you do not agree to these terms, you may not use the service.
                        </p>
                        <h2 id="description" className="font-bold text-2xl mt-3">
                            2. Description of Service
                        </h2>
                        <p>
                            Aplicate provides a tool for tracking job applications. Our core features include:
                        </p>
                        <ul 
                            className="flex flex-col list-disc gap-2 px-5">
                            <li>
                                Manual entry and organization of job application data.
                            </li>
                            <li>
                                Automated status parsing of job-related emails using AI classification.
                            </li>
                            <li>
                                Automated application parsing of jobs from application websites via a browser extension.
                            </li>
                            <li>
                                Statistical insights and dashboard visualization.
                            </li>
                        </ul>
                        <p>
                            We reserve the right to modify, suspend, or discontinue any aspect of the service at any time without notice.
                        </p>
                        <h2 id="responsibility" className="font-bold text-2xl mt-3">
                            3. User Responsibilities
                        </h2>
                        <ul 
                            className="flex flex-col list-disc gap-2 px-5">
                            <li>
                                <b>Account Security:</b> You are responsible for maintaining the confidentiality of your account login information and for all activities that occur under your account.
                            </li>
                            <li>
                                <b>Accuracy:</b> You are responsible for the accuracy of the information you manually input into Aplicate.
                            </li>
                            <li>
                                <b>Permitted Use:</b> You agree not to use Aplicate for any unlawful purpose or to interfere with the operation of our systems (including the Hugging Face and Supabase infrastructure).
                            </li>
                        </ul>
                        <h2 id="auto" className="font-bold text-2xl mt-3">
                            4. Automated Processing & AI Limitations
                        </h2>
                        <ul 
                            className="flex flex-col list-disc gap-2 px-5">
                            <li>
                                <b>Nature of AI:</b> Aplicate uses an automated AI model (DeBERTa) to classify your email content. You acknowledge that AI classification is not 100% accurate and may occasionally misinterpret email statuses.
                            </li>
                            <li>
                                <b>Verification:</b> You agree that it is your responsibility to verify the accuracy of the status labels applied by our system before making career decisions. Aplicate is provided "as is," and we do not guarantee the perfection of automated results.
                            </li>
                        </ul>
                        <h2 id="subscription" className="font-bold text-2xl mt-3">
                            5. Subscription and Payments
                        </h2>
                        <ul 
                            className="flex flex-col gap-2 px-3">
                            <li>
                                <b>Subscription Tiers:</b> We offer both a free "Essential" tier and a paid "Pro" tier. Paid subscriptions are billed in advance on a monthly basis.
                            </li>
                            <li>
                                <b>Cancellations:</b> You may cancel your subscription at any time. Your access to "Pro" features will continue until the end of your current billing cycle.
                            </li>
                            <li>
                                <b>Refunds:</b> We generally do not offer refunds, but please contact us at aplicate.jobs@gmail.com if you believe an error has occurred.
                            </li>
                        </ul>
                        <h2 id="ip" className="font-bold text-2xl mt-3">
                            6. Intellectual Property
                        </h2>
                        <p>
                            All content, design, and software functionality provided by Aplicate are the exclusive property of Aplicate. You are granted a limited, non-exclusive license to use the service for your personal, non-commercial purposes.
                        </p>
                        <h2 id="liability" className="font-bold text-2xl mt-3">
                            7. Limitation of Liability
                        </h2>
                        <p>
                            To the maximum extent permitted by law, Aplicate shall not be liable for any indirect, incidental, or consequential damages arising out of your use of the service. This includes, but is not limited to, damages for loss of job opportunities, missed deadlines, or errors caused by the AI classification system. Our total liability to you for any claim shall not exceed the amount paid by you for the service in the previous month.
                        </p>
                        <h2 id="termination" className="font-bold text-2xl mt-3">
                            8. Termination
                        </h2>
                        <p>
                            You may delete your account at any time. We reserve the right to terminate or suspend your account if you violate these Terms or if we determine that your usage presents a risk to the security or integrity of our service.
                        </p>
                        <h2 id="law" className="font-bold text-2xl mt-3">
                            9. Governing Law
                        </h2>
                        <p>
                            These terms are governed by the laws of New Zealand. Any disputes arising from these terms shall be resolved in the courts of New Zealand.
                        </p>
                        <h2 id="law" className="font-bold text-2xl mt-3">
                            10. Change to Terms
                        </h2>
                        <p>
                            We may update these terms from time to time. If a revision is material, we will make reasonable efforts to provide notice via our website or email. By continuing to use the service after those revisions become effective, you agree to be bound by the revised terms.
                        </p>
                        <h2 id="contact" className="font-bold text-2xl mt-3">
                            11. Contact Information
                        </h2>
                        <p>
                            If you have any questions about these Terms and Conditions, please contact us at:
                        </p>
                        <ul className="flex flex-col px-3">
                            <li className="font-semibold">
                                Aplicate
                            </li>
                            <li>
                                <b>Email:</b> aplicate.jobs@gmail.com
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}