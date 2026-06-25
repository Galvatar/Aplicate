import { useState } from "react";
import { Application, Status } from "@/lib/types";
import ApplicationCard from "./applicationCard";

interface ListCardProps {
  title: string;
  applications: Application[];
  draggedApplication: Application | null;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent, targetIndex: number) => void;
  onCardDragStart?: (appId: string) => (e: React.DragEvent) => void;
}

export default function ListCard({
  title,
  applications,
  draggedApplication,
  onDragOver,
  onDrop,
  onCardDragStart,
}: ListCardProps) {
  const [ghostIndex, setGhostIndex] = useState<number | null>(null);

  // Check if the item currently being dragged originated from this specific list
  const ownCardIndex = applications.findIndex((app) => app.id === draggedApplication?.id);

  const handleContainerDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    onDragOver?.(e);

    if (e.target === e.currentTarget && draggedApplication) {
      // If dragging below all cards, target the very end of the list
      if (ownCardIndex !== -1) {
        setGhostIndex(applications.length - 1);
      } else {
        setGhostIndex(applications.length);
      }
    }
  };

  const handleCardDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();

    if (!draggedApplication) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;
    
    // Top half of card = insert before it. Bottom half = insert after it.
    const targetIndex = relativeY < rect.height / 2 ? index : index + 1;

    // OPTIMIZATION: If hovering directly over its own slot or its boundaries, 
    // let the faded original card act as the preview instead of making a duplicate layout expand.
    if (ownCardIndex !== -1 && (targetIndex === ownCardIndex || targetIndex === ownCardIndex + 1)) {
      setGhostIndex(null);
    } else {
      setGhostIndex(targetIndex);
    }
  };

  const handleContainerDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    if (
      e.clientX < rect.left ||
      e.clientX >= rect.right ||
      e.clientY < rect.top ||
      e.clientY >= rect.bottom
    ) {
      setGhostIndex(null);
    }
  };

  const handleLocalDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    let finalIndex = ghostIndex ?? applications.length;
    
    // If sorting within the same list downwards, adjust index for the pulled slot offset
    if (ownCardIndex !== -1 && finalIndex > ownCardIndex) {
      finalIndex -= 1;
    }
    
    setGhostIndex(null);
    onDrop?.(e, finalIndex);
  };

  return (
    <div
      className={`flex flex-col w-full bg-surface-container-lowest backdrop-blur-sm rounded-2xl p-4 gap-4 border transition-colors ${
        ghostIndex !== null ? "border-primary/10" : "border-outline-variant/5"
      }`}
      onDragOver={handleContainerDragOver}
      onDragLeave={handleContainerDragLeave}
      onDrop={handleLocalDrop}
    >
      <div className="flex items-center justify-between px-2 py-1">
        <div className={`w-2 h-2 rounded-full transition-colors ${ghostIndex !== null ? "bg-primary" : "bg-outline"}`} />
        <div className="flex gap-2 text-sm font-bold">
          <h1 className="text-on-surface-variant uppercase tracking-wider">
            {title === Status.PreRegister ? (
              <p>{title.slice(0, 3)}-{title.slice(3)}</p>
            ) : (
              <p>{title}</p>
            )}
          </h1>
          <h2 className="bg-surface-container px-2 py-0.5 rounded-full text-outline">
            {applications.length}
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-3 h-full justify-start">
        {applications.length === 0 && ghostIndex === null && (
          <div className="flex p-5 items-center justify-center text-center h-20 border border-on-surface-variant/20 rounded-xl border-dashed">
            <h1 className="text-xs font-bold text-outline">
              Nothing yet, drag applications to add.
            </h1>
          </div>
        )}

        {(() => {
          const listElements = [];

          applications.forEach((application, index) => {
            // Render inline ghost copy if targeted
            if (ghostIndex === index && draggedApplication) {
              listElements.push(
                <ApplicationCard
                  key={`ghost-preview-${draggedApplication.id}`}
                  application={draggedApplication}
                  isGhost={true}
                />
              );
            }

            listElements.push(
              <div
                key={application.id}
                onDragOver={(e) => handleCardDragOver(e, index)}
                className="transition-all duration-200"
              >
                <ApplicationCard
                  application={application}
                  onDragStart={onCardDragStart?.(application.id!)}
                  onDragEnd={() => setGhostIndex(null)}
                />
              </div>
            );
          });

          // Append ghost preview to the very bottom if index points to the end
          if (ghostIndex === applications.length && draggedApplication) {
            listElements.push(
              <ApplicationCard
                key={`ghost-preview-end-${draggedApplication.id}`}
                application={draggedApplication}
                isGhost={true}
              />
            );
          }

          return listElements;
        })()}
      </div>
    </div>
  );
}