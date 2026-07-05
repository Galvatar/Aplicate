"use client"

import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { useState } from "react";

export default function PrivacyPolicyPage() {
    const [section, setSection] = useState("data");

    return (
        <div className="flex flex-col w-full h-full font-jakarta bg-background text-on-background overflow-x-hidden">
            <Header />

            {/** Body */}
            <div className="flex flex-col relative items-center my-30 px-20 gap-5">
                <h1 className="text-primary font-extrabold text-3xl">
                    Privacy Policy
                </h1>
                <h2 className="text-center max-w-1/2">
                    At Aplicate, your trust is our most important asset. We believe that your job search data is yours alone. This Privacy Policy explains how we handle your information and how we protect your privacy while providing you with our automated job tracking services.
                </h2>
                <h3 className="text-sm font-semibold text-on-surface/50 mb-10">
                    Last Updated: June 19, 2026
                </h3>
                <div className="flex gap-5 items-start w-full">
                    <div className="flex flex-col p-5 bg-surface-container border border-surface-container-high rounded-lg gap-2">
                        <h2 className="uppercase font-semibold text-xs text-on-surface/50">
                            On this page
                        </h2>
                        <h2 
                            onClick={() => {
                                document.getElementById("data")?.scrollIntoView({
                                    behavior: "smooth"
                                });
                                setSection("data");
                            }}
                            className={`font-semibold cursor-pointer transition-colors duration-300 ${section === "data" ? 'text-primary' : 'hover:text-on-surface/50'}`}>
                            1. Information We Collect
                        </h2>
                        <h2 
                            onClick={() => {
                                document.getElementById("usage")?.scrollIntoView({
                                    behavior: "smooth"
                                });
                                setSection("usage");
                            }}
                            className={`font-semibold cursor-pointer transition-colors duration-300 ${section === "usage" ? 'text-primary' : 'hover:text-on-surface/50'}`}>
                            2. How We Use Your Data
                        </h2>
                        <h2 
                            onClick={() => {
                                document.getElementById("sharing")?.scrollIntoView({
                                    behavior: "smooth"
                                });
                                setSection("sharing");
                            }}
                            className={`font-semibold cursor-pointer transition-colors duration-300 ${section === "sharing" ? 'text-primary' : 'hover:text-on-surface/50'}`}>
                            3. Data Sharing and Third Parties
                        </h2>
                        <h2 
                            onClick={() => {
                                document.getElementById("google")?.scrollIntoView({
                                    behavior: "smooth"
                                });
                                setSection("google");
                            }}
                            className={`font-semibold cursor-pointer transition-colors duration-300 ${section === "google" ? 'text-primary' : 'hover:text-on-surface/50'}`}>
                            4. Google API Services User Data Policy
                        </h2>
                        <h2 
                            onClick={() => {
                                document.getElementById("chrome")?.scrollIntoView({
                                    behavior: "smooth"
                                });
                                setSection("chrome");
                            }}
                            className={`font-semibold cursor-pointer transition-colors duration-300 ${section === "chrome" ? 'text-primary' : 'hover:text-on-surface/50'}`}>
                            5. Chrome Web Store User Data Policy
                        </h2>
                        <h2 
                            onClick={() => {
                                document.getElementById("deletion")?.scrollIntoView({
                                    behavior: "smooth"
                                });
                                setSection("deletion");
                            }}
                            className={`font-semibold cursor-pointer transition-colors duration-300 ${section === "deletion" ? 'text-primary' : 'hover:text-on-surface/50'}`}>
                            6. Your Rights and Data Deletion
                        </h2>
                        <h2 
                            onClick={() => {
                                document.getElementById("changes")?.scrollIntoView({
                                    behavior: "smooth"
                                });
                                setSection("changes");
                            }}
                            className={`font-semibold cursor-pointer transition-colors duration-300 ${section === "changes" ? 'text-primary' : 'hover:text-on-surface/50'}`}>
                            7. Changes to this Policy
                        </h2>
                        <h2 
                            onClick={() => {
                                document.getElementById("contact")?.scrollIntoView({
                                    behavior: "smooth"
                                });
                                setSection("contact");
                            }}
                            className={`font-semibold cursor-pointer transition-colors duration-300 ${section === "contact" ? 'text-primary' : 'hover:text-on-surface/50'}`}>
                            8. Contact Us
                        </h2>
                    </div>
                    <div className="flex w-full h-fit flex-col p-5 bg-surface-container border border-surface-container-high rounded-lg gap-3">
                        <h2 id="data" className="font-bold text-2xl">
                            1. Information We Collect
                        </h2>
                        <ul 
                            className="flex flex-col list-disc gap-2 px-5">
                            <li>
                                <b>User-Provided Information:</b> When you use Aplicate, you manually input information related to your job applications, such as company names, application statuses, and notes.
                            </li>
                            <li>
                                <b>Email Content:</b> To provide our "Automated Tracking" feature, we access your email data via the Google Gmail API. We specifically access the sender, subject line, and email body.
                            </li>
                            <li>
                                <b>Account Information:</b> We collect the minimal information necessary for authentication (typically your name and email address provided via Google OAuth or submitted on the sign up page).
                            </li>
                            <li>
                                <b>Website Content (Chrome Extension):</b> When you use the Aplicate browser extension, we read and extract text data directly from the specific job listing webpages you visit (such as Seek, Trade Me, and Glassdoor). This includes information like job titles, company names, locations, and salary data. The extension only reads data on supported job boards and does not track or record your general web browsing history.
                            </li>
                        </ul>
                        <h2 id="usage" className="font-bold text-2xl mt-3">
                            2. How We Use Your Data
                        </h2>
                        <ul 
                            className="flex flex-col list-disc gap-2 px-5">
                            <li>
                                <b>In-Memory Processing:</b> When you enable automatic tracking, the sender, subject, and body of your emails are sent to our private AI classifier (hosted on Hugging Face).
                            </li>
                            <li>
                                <b>Classification:</b> This data is processed in-memory solely to determine the status of your application. This data is not stored, saved, or logged. Once the classification is complete, the data is immediately discarded.
                            </li>
                            <li>
                                <b>No Model Training:</b> Your data is never used to train, improve, or update our AI models. Our models are static and do not "learn" from your personal information.
                            </li>
                            <li>
                                <b>Service Improvements:</b> We use your manually entered application data only to provide the tracking, organizational, and analytical features of the Aplicate dashboard.
                            </li>
                            <li>
                               <b>Extension Data Syncing:</b> The job details extracted by the browser extension are temporarily held in your browser's local storage before being securely synced to your personal Aplicate database (hosted on Supabase). We use this data solely to populate your personal job tracking dashboard.
                            </li>
                        </ul>
                        <h2 id="sharing" className="font-bold text-2xl mt-3">
                            3. Data Sharing and Third Parties
                        </h2>
                        <ul 
                            className="flex flex-col list-disc gap-2 px-5">
                            <li>
                                <b>No Data Sharing:</b> We do not sell, rent, or trade your personal information to third parties.
                            </li>
                            <li>
                                <b>Infrastructure Providers:</b> We use industry-standard infrastructure to power Aplicate. Your data is stored in your personal database hosted on Supabase and processed by our secure code hosted on Hugging Face. These providers are strictly used for hosting and processing and do not have rights to use your data for their own purposes.
                            </li>
                            <li>
                                <b>Compliance with Laws:</b> We may disclose your information if required by law, regulation, or to protect the safety of our users.
                            </li>
                        </ul>
                        <h2 id="google" className="font-bold text-2xl mt-3">
                            4. Google API Services User Data Policy
                        </h2>
                        <p>
                            Aplicate's use and transfer to any other app of information received from Google APIs will adhere to the {" "}
                            <span
                                onClick={() => window.open("https://developers.google.com/terms/api-services-user-data-policy", "_blank")}
                                className="underline text-blue-500 cursor-pointer"
                            >
                                Google API Services User Data Policy
                            </span>
                            , including the Limited Use requirements:
                        </p>
                        <ul 
                            className="flex flex-col list-disc gap-2 px-5">
                            <li>
                                <b>Limited Use:</b> We only use the data access granted (via Gmail API) to perform the automated classification of your application status.
                            </li>
                            <li>
                                <b>No Human Access:</b> We do not allow any humans to read your emails. All classification is performed by automated, secure, ephemeral code.
                            </li>
                            <li>
                                <b>No Advertising:</b> We do not use your email data for advertising, marketing, or any purpose other than providing our core job tracking service.
                            </li>
                        </ul>
                        <h2 id="chrome" className="font-bold text-2xl mt-3">
                            5. Chrome Web Store User Data Policy
                        </h2>
                        <p>
                            The Aplicate Chrome extension's use and transfer of information adheres to the Chrome Web Store User Data Policy, including the Limited Use requirements. We only request the minimum browser permissions necessary to extract job data on supported sites. We do not use your extracted website data for personalized advertising, nor do we sell it to third-party data brokers.
                        </p>
                        <h2 id="deletion" className="font-bold text-2xl mt-3">
                            6. Your Rights and Data Deletion
                        </h2>
                        <ul 
                            className="flex flex-col list-disc gap-2 px-5">
                            <li>
                                <b>Data Control:</b> You have full control over your data.
                            </li>
                            <li>
                                <b>Deletion:</b> We provide a "Delete Account" button within your account settings. Clicking this will permanently and immediately erase all your application data and account information from our databases.
                            </li>
                            <li>
                                <b>Revoking Access:</b> You can revoke Aplicate's access to your Google account at any time via your{" "}
                                <span
                                    onClick={() => window.open("https://myaccount.google.com/connections?filters=3,4&hl=en-GB", "_blank")}
                                    className="underline text-blue-500 cursor-pointer"
                                >
                                    Google Account Permissions settings.
                                </span>
                            </li>
                        </ul>
                        <h2 id="changes" className="font-bold text-2xl mt-3">
                            7. Changes to this Policy
                        </h2>
                        <p>
                            We may update this Privacy Policy from time to time to reflect changes in our service. We will notify you of any significant changes by updating the "Last Updated" date at the top of this page.
                        </p>
                        <h2 id="contact" className="font-bold text-2xl mt-3">
                            8. Contact Us
                        </h2>
                        <p>
                            If you have any questions or concerns about this policy or your data, please contact us at:
                        </p>
                        <ul className="flex flex-col px-3">
                            <li className="font-semibold">
                                Aplicate
                            </li>
                            <li>
                                <b>Email:</b> aplicate.jobs@gmail.com
                            </li>
                            <li>
                                <b>Jurisdiction:</b> New Zealand
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}