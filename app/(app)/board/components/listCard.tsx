import { Application } from "@/lib/types";
import ApplicationCard from "./applicationCard";

interface ListCardProps {
  title: string;
  applications: Application[];
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  onCardDragStart?: (appId: string) => (e: React.DragEvent) => void;
}

export default function ListCard({
  title,
  applications,
  onDragOver,
  onDrop,
  onCardDragStart,
}: ListCardProps) {
  return (
    <div
      className="flex flex-col w-full bg-neutral-950 backdrop-blur-sm rounded-2xl p-4 gap-4 border border-outline-variant/5"
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="flex items-center justify-between px-2 py-1">
        <div className="w-2 h-2 rounded-full bg-outline" />
        <div className="flex gap-2 text-sm font-bold">
          <h1 className="text-on-surface-variant uppercase tracking-wider">
            {title}
          </h1>
          <h2 className="bg-surface-container px-2 py-0.5 rounded-full text-outline">
            {applications.length}
          </h2>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {applications.length == 0 && 
            <div className="flex p-5 items-center justify-center text-center h-20 border border-on-surface-variant/20 rounded-xl border-dashed">
                <h1 className="text-xs font-bold text-outline">
                    Nothing yet, drag applications to add.
                </h1>
            </div>
        }
        {applications.map((application) => (
          <ApplicationCard
            key={application.id}
            application={application}
            onDragStart={onCardDragStart?.(application.id)}
          />
        ))}
      </div>
    </div>
  );
}
