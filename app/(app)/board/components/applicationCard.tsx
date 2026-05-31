import { Application } from "@/lib/types";

interface ApplicationCardProps {
  application: Application;
  onDragStart?: (e: React.DragEvent) => void;
}

export default function ApplicationCard({
  application,
  onDragStart,
}: ApplicationCardProps) {
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

  const applied = new Date(application.applied);
  const lastUpdate = new Date(application.lastUpdate);

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="bg-surface-container-low hover:bg-surface-container-highest transition-all duration-300 rounded-xl p-4 border border-outline-variant/10 flex flex-col gap-3 group cursor-move relative overflow-hidden hover:shadow-lg"
    >
      <div className="absolute inset-0 bg-linear-to-br from-white/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <h2 className="text-xl text-on-surface font-bold leading-tight">
        {application.title}
      </h2>
      <h3 className="text-on-surface-variant font-semibold text-sm">
        {application.company}
      </h3>
      {application.location &&
      <h4 className="w-fit px-2 py-1 rounded-md bg-surface-variant/50 text-on-surface-variant text-[11px]">
        {application.location}
      </h4>}
      <div className="flex items-center justify-between text-[10px] text-outline uppercase tracking-tight">
        <span>
          Applied: {months[applied.getMonth()]}{" "}
          {applied.getDate()}, {applied.getFullYear()}
        </span>
        <span>
          Last Update: {months[lastUpdate.getMonth()]}{" "}
          {lastUpdate.getDate()},{" "}
          {lastUpdate.getFullYear()}
        </span>
      </div>
    </div>
  );
}
