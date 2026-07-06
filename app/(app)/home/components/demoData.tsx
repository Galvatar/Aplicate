import { Application, Status } from "@/lib/types";

const daysAgo = (days: number) => new Date(Date.now() - days * 24 * 60 * 60 * 1000);
const daysFromNow = (days: number) => new Date(Date.now() + days * 24 * 60 * 60 * 1000);

export const demoApplications: Application[] = [
  {
    id: "demo_1",
    userId: "demo",
    title: "Senior Frontend Engineer",
    company: "Vercel", // Tech Industry
    employmentType: "Full-time",
    foundOn: "LinkedIn",
    status: Status.Interview,
    location: "Remote (US)",
    applied: daysAgo(14),
    lastUpdate: daysAgo(2),
    journey: "Apply,Assessment,Interview",
    notes: "They asked a lot about Next.js App Router caching. Next round is system design.",
    pay: "$160k - $190k",
    minPay: 160000,
    maxPay: 190000,
    currency: "USD",
    rating: 5,
    followUpDate: daysFromNow(2),
    autoUpdated: true
  },
  {
    id: "demo_2",
    userId: "demo",
    title: "Investment Banking Analyst",
    company: "Goldman Sachs", // Finance Industry
    employmentType: "Full-time",
    foundOn: "Company Site",
    status: Status.Rejected,
    location: "New York, NY",
    applied: daysAgo(30),
    lastUpdate: daysAgo(5),
    followUpDate: daysAgo(5),
    journey: "Apply,Assessment,Interview,Rejected",
    jobDescription: "Analyze market trends and prepare financial models for corporate clients.",
    url: "https://goldmansachs.com/careers",
    rating: 4,
    autoUpdated: false
  },
  {
    id: "demo_3",
    userId: "demo",
    title: "Clinical Research Coordinator",
    company: "Pfizer", // Healthcare/Pharma Industry
    employmentType: "Full-time",
    foundOn: "Indeed",
    status: Status.Apply,
    location: "Boston, MA",
    applied: daysAgo(1),
    lastUpdate: daysAgo(1),
    journey: "Apply",
    notes: "Need to tailor my resume to highlight clinical trials experience before submitting.",
    mainContact: "Dr. Alan Grant",
    rating: 3,
    closingDate: daysFromNow(5),
    autoUpdated: false
  },
  {
    id: "demo_4",
    userId: "demo",
    title: "Operations Manager",
    company: "Delta Air Lines", // Aviation/Transportation Industry
    status: Status.Assessment,
    location: "Atlanta, GA",
    applied: daysAgo(7),
    lastUpdate: daysAgo(1),
    journey: "Apply,Assessment",
    notes: "Aviation regulations assessment. Complete within 72 hours.",
    url: "https://delta.com/careers",
    minPay: 95000,
    maxPay: 120000,
    currency: "USD",
    rating: 4,
    followUpDate: daysFromNow(1),
    autoUpdated: true
  },
  {
    id: "demo_5",
    userId: "demo",
    title: "Supply Chain Logistics Specialist",
    company: "Nike",
    employmentType: "Full-time",
    status: Status.Offer,
    location: "Beaverton, OR",
    applied: daysAgo(45),
    lastUpdate: daysAgo(0),
    journey: "Apply,Assessment,Interview,Offer",
    pay: "$85,000 + Benefits",
    minPay: 85000,
    currency: "USD",
    rating: 5,
    autoUpdated: true
  },
  {
    id: "demo_6",
    userId: "demo",
    title: "Sustainable Energy Engineer",
    company: "NextEra Energy", // Energy/Utilities Industry
    employmentType: "Full-time",
    foundOn: "Referral",
    status: Status.PreRegister,
    location: "Austin, TX",
    applied: new Date(), 
    lastUpdate: new Date(),
    journey: "PreRegister",
    notes: "Met the project lead at an eco-tech summit. Looking for openings next month.",
    mainContact: "Elena Rostova",
    rating: 4,
    autoUpdated: false
  }
];