import { Application } from "@/lib/types";
import { createColumnHelper } from "@tanstack/react-table";

const applicationsHelper = createColumnHelper<Application>();

export const applicationsColumns = [
    applicationsHelper.accessor("company", { header: "Company & role"}),
    applicationsHelper.accessor("employmentType", { header: "Emplyment Type"}),
    applicationsHelper.accessor("foundOn", { header: "Found On"}),
    applicationsHelper.accessor("applied", { header: "Date Applied"}),
    applicationsHelper.accessor("lastUpdate", { header: "Last Update"}),
    applicationsHelper.accessor("pay", { header: "Pay"}),
    applicationsHelper.accessor("status", { header: "Status"}),
]