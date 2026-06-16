import Rating from "@/components/ui/rating";
import StatusLabel from "@/components/ui/statusLabel";
import { useApplications } from "@/hooks/use-applications";
import { Application } from "@/lib/types";
import { ReactNode } from "react";
import DoneButton from "./followUp";
import FollowUp from "./followUp";

export interface ColumnConfig {
    key: keyof Application;
    label: string;
    active: boolean;
    sortStrategy?: (a: any, b: any) => number; 
    format: (a: any) => ReactNode;
}

const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

function capitalize(word: string): string {
    if (word == null) return "";
    const firstLetter = word.substring(0, 1).toUpperCase();
    const lastLetters = word.substring(1, word.length);
    return firstLetter.concat(lastLetters);
}

export var columns: ColumnConfig[] = [
    {
        key: "company",
        label: "Company & role",
        active: true,
        format: (a) => {
            return (
                <div className="flex items-center gap-4">
                    <div className="min-w-12 h-12 rounded-xl bg-on-tertiary flex items-center justify-center text-primary font-bold text-lg">
                        {a.company.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                        <h4 className="font-bold text-on-surface group-hover:text-primary transition-colors">
                            {a.company}
                        </h4>
                        <h5 className="text-on-surface-variant/80 text-sm font-semibold">
                            {a.title}
                        </h5>
                    </div>
                </div>
            )
        }
    },
    {
        key: "applied",
        label: "Date Applied",
        active: false,
        sortStrategy: (a, b) => new Date(b.applied).getTime() - new Date(a.applied).getTime(),
        format: (a) => {
            const date = new Date(a.applied);
            return (
                <div className="flex">
                    {months[date.getMonth()]}{" "}
                    {date.getDate()},{" "}
                    {date.getFullYear()}
                </div>
            )
        }
    },
    {
        key: "lastUpdate",
        label: "Last Update",
        active: false,
        sortStrategy: (a, b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime(),
        format: (a) => {
            const date = new Date(a.lastUpdate);
            return (
                <div className="flex">
                    {months[date.getMonth()]}{" "}
                    {date.getDate()},{" "}
                    {date.getFullYear()}
                </div>
            )
        }
    },
    {
        key: "status",
        label: "Status",
        active: false,
        sortStrategy: (a, b) => b.status.localeCompare(a.status),
        format: (a) => {
            return (
                <StatusLabel status={a.status} />
            )
        }
    },
    {
        key: "rating",
        label: "Rating",
        active: false,
        sortStrategy: (a, b) => b.rating - a.rating,
        format: (a) => {
            return (
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="h-10">
                    <Rating editable={true} app={a} />
                </div>
            )
        }
    },
    {
        key: "pay",
        label: "Pay",
        active: false,
        format: (a) => {
            return (
                <h1 className="font-semibold">
                    {a.pay}
                </h1>
            )
        }
    },
    {
        key: "foundOn",
        label: "Found On",
        active: false,
        sortStrategy: (a, b) => {
            if (a.foundOn == null || a.foundOn == undefined) a.foundOn = "";
            if (b.foundOn == null || b.foundOn == undefined) b.foundOn = "";
            return b.foundOn.localeCompare(a.foundOn)
        },
        format: (a) => {
            return (
                <h1 className="font-semibold">
                    {a.foundOn}
                </h1>
            )
        }
    },
    {
        key: "employmentType",
        label: "Employment Type",
        active: false,
        sortStrategy: (a, b) => {
            if (a.employmentType == null || a.employmentType == undefined) a.employmentType = "";
            if (b.employmentType == null || b.employmentType == undefined) b.employmentType = "";
            return b.employmentType.localeCompare(a.employmentType)
        },
        format: (a) => {
            return (
                <h1 className="font-semibold">
                    {capitalize(a.employmentType)}
                </h1>
            )
        }
    },
    {
        key: "url",
        label: "Url",
        active: false,
        format: (a) => {
            return (
                <h1 className="">
                    {a.url}
                </h1>
            )
        }
    },
    {
        key: "mainContact",
        label: "Main Contact",
        active: false,
        format: (a) => {
            return (
                <h1 className="">
                    {a.mainContact}
                </h1>
            )
        }
    },
    {
        key: "closingDate",
        label: "Closing Date",
        active: false,
        sortStrategy: (a, b) => new Date(b.closingDate).getTime() - new Date(a.closingDate).getTime(),
        format: (a) => {
            if (a.closingDate == null) return;
            const date = new Date(a.closingDate);
            return (
                <div className="flex">
                    {months[date.getMonth()]}{" "}
                    {date.getDate()},{" "}
                    {date.getFullYear()}
                </div>
            )
        }
    },
    {
        key: "followUpDate",
        label: "Follow Up Date",
        active: false,
        sortStrategy: (a, b) => new Date(b.followUpDate).getTime() - new Date(a.followUpDate).getTime(),
        format: (a) => {
            return (
                <FollowUp app={a} />
            )
        }
    },
  ]
