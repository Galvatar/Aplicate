import { useState } from "react";
import { columns } from "./columns";

interface TableDropdownProps {
    active: string[],
    onChange(newColumn: string): void
}

export default function TableDropdown({ active, onChange }: TableDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex relative flex-col w-fit">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 z-10 text-sm bg-surface-container font-semibold px-3 py-2 rounded-xl border border-surface-container-highest">
                Edit Columns
                <svg className={`-mr-1 ${isOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-300`} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
                </svg>
            </button>
            {isOpen &&
                <div onClick={() => setIsOpen(false)} className="fixed inset-0 z-5 w-screen h-screen" />
            }
            <div className={`
                    absolute top-full mt-2 flex z-10 flex-col w-fit gap-3 p-3 
                    bg-surface-container rounded-xl 
                    transition-all duration-300 ease-out origin-top
                    ${isOpen 
                        ? 'opacity-100 translate-y-0 scale-y-100 pointer-events-auto' 
                        : 'opacity-0 -translate-y-4 scale-y-95 pointer-events-none'
                    }
                `}
            >
                {columns.map((column) => {
                    if (column.active) return;
                    return (
                        <span 
                            key={column.key}
                            onClick={(e) => {
                                e.stopPropagation();
                                onChange(column.key)
                            }}
                            className="flex items-center text-nowrap gap-2 cursor-pointer">
                            <input
                                readOnly
                                type="checkbox"
                                checked={active.includes(column.key)}
                                className="w-5 h-5 rounded cursor-pointer appearance-none accent-primary border border-outline-variant checked:bg-secondary-fixed-dim transition-colors"
                            />
                            {column.label}
                        </span>
                    )})
                }
            </div>
        </div>
    )
}