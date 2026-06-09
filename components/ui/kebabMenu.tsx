"use client"

import { useState } from "react";
import { useModal } from "./modal";
import { Application } from "@/lib/types";
import EditApplication from "../layout/components/editApplication";

interface KebabMenuProps {
    application: Application,
}

export default function KebabMenu({ application }: KebabMenuProps) {
    const [open, setOpen] = useState(false);
    const modal = useModal();

    return (
        <div 
            onClick={() => setOpen(!open)}
            className="group relative flex hover:text-on-surface-variant text-on-surface transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/>
            </svg>
            {open &&
                <>
                    <div className="absolute z-5 w-screen h-screen -top-22 -right-20" />
                    <div className="flex flex-col items-start absolute top-8 -right-2 z-10 px-4 py-3 bg-surface-container-high gap-2 rounded-lg border border-surface-container-highest">
                        <button
                            onClick={(e) => {
                                modal.show(<EditApplication app={application} />)
                            }}
                            className="flex w-full text-on-surface items-center gap-1 hover:bg-surface-container-low px-2 py-1 rounded transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="currentColor"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                            </svg>
                            Edit
                        </button>
                        <button
                            onClick={(e) => {
                            }}
                            className="flex text-red-600 items-center gap-1 hover:bg-surface-container-low px-2 py-1 rounded transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                            </svg>
                            Delete
                        </button>
                    </div>
                </>
            }
        </div>
    )
}