import { Status } from "@/lib/types"

interface StatusLabelProps {
    status: Status
}

export default function StatusLabel({ status }: StatusLabelProps) {
    if (status === Status.Apply || status === Status.PreRegister) {
        return (
        <div className="px-3 py-1 rounded-full bg-surface-container text-on-surface font-bold tracking-tight inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-on-surface" />
            {status === "Apply" ? "Applied" : status}
        </div>)
    }

    if (status === Status.Rejected) {
        return (
        <div className="px-3 py-1 rounded-full bg-error text-on-error font-bold tracking-tight inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-on-error" />
            {status}
        </div>)
    }

    if (status === Status.Assessment) {
        return (
        <div className="px-3 py-1 rounded-full bg-tertiary-container text-on-tertiary-container font-bold tracking-tight inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container" />
            {status}
        </div>)
    }

    if (status === Status.Interview) {
        return (
        <div className="px-3 py-1 rounded-full bg-yellow-200 text-yellow-700 font-bold tracking-tight inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-700" />
            {status}
        </div>)
    }

    return (
        <div className="px-3 py-1 rounded-full bg-secondary-container text-secondary font-bold tracking-tight inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            {status}
        </div>
    )
}