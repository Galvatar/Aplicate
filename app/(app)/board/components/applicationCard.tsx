import { useState } from "react";
import { Application } from "@/lib/types";
import { useRouter } from "next/navigation";

interface ApplicationCardProps {
  application: Application;
  onDragStart?: (e: React.DragEvent) => void;
  onDragEnd?: (e: React.DragEvent) => void;
  isGhost?: boolean;
}

export default function ApplicationCard({
  application,
  onDragStart,
  onDragEnd,
  isGhost = false,
}: ApplicationCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const router = useRouter();

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const applied = new Date(application.applied);
  const lastUpdate = new Date(application.lastUpdate);

  const handleDragStart = (e: React.DragEvent) => {
    onDragStart?.(e);
    
    // CRUCIAL: Defer the dragging state update to the next event loop tick.
    // This allows the browser to capture the fully-visible card snapshot 
    // for the drag image before we apply opacity classes.
    setTimeout(() => {
      setIsDragging(true);
    }, 0);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    setIsDragging(false);
    onDragEnd?.(e);
  };

  return (
    <div
      draggable={!isGhost}
      onClick={() => !isGhost && router.push(`/job/${application.id!}?origin=board`)}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`bg-surface-container-low transition-all duration-200 rounded-xl p-4 flex flex-col gap-3 group relative overflow-hidden ${
        isGhost 
          ? "opacity-40 border-2 border-dashed border-primary/40 pointer-events-none shadow-none scale-[0.98]"
          : isDragging 
            ? "opacity-15 border-2 border-dashed border-outline-variant/40 shadow-none pointer-events-none select-none" 
            : "hover:bg-surface-container-highest border border-outline-variant/10 cursor-move hover:shadow-lg"
      }`}
    >
      <div className="absolute inset-0 bg-linear-to-br from-white/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <h2 className="flex items-center gap-2 text-xl text-on-surface font-bold leading-tight">
        {application.autoUpdated && <div className="w-3 h-3 aspect-square bg-primary rounded-full" />} 
        <p className="block line-clamp-1 truncate">
          {application.title}
        </p>
      </h2>
      <h3 className="block items-center gap-2 text-on-surface-variant font-semibold text-sm line-clamp-1 truncate">
        {application.company}
      </h3>
      {application.location && (
        <h4 className="block px-2 py-1 rounded-md bg-surface-variant/50 text-on-surface-variant text-[11px] line-clamp-1 truncate">
          {application.location}
        </h4>
      )}
      <div className="flex items-center justify-between text-[10px] text-outline uppercase tracking-tight">
        <span>
          Applied: {months[applied.getMonth()]} {applied.getDate()}, {applied.getFullYear()}
        </span>
        <span>
          Last Update: {months[lastUpdate.getMonth()]} {lastUpdate.getDate()}, {lastUpdate.getFullYear()}
        </span>
      </div>
    </div>
  );
}