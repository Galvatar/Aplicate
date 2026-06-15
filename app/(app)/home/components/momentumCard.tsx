import { useState } from "react";

interface MomentumCardProps {
    applications: number
    interviews: number
    offers: number
}

export default function MomentumCard({ applications, interviews, offers }: MomentumCardProps) {
    const [percentage, setPercentage] = useState(0);

    return (
        <div className="flex relative items-center w-full flex-col rounded-2xl p-12 border border-outline-variant/5 bg-surface-container-lowest gap-3">
            {/** Icons */}
            <div className="flex w-full justify-between px-1">
                <div className="group flex flex-col items-center">
                    <div 
                        className={`flex flex-col items-center w-12 h-12 rounded-full ${applications == 0 ? 'bg-surface-container-lowest' : 'bg-surface-container-low'} border-2 border-outline-variant/20 hover:shadow-[0_0_30px_rgba(191,194,255,0.2)] hover:border-primary/50 items-center justify-center text-outline hover:text-primary-fixed-dim transition-all duration-500`}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"/>
                        </svg>
                    </div>
                    <h1 className="group-hover:text-primary-fixed-dim mt-5 font-medium text-on-surface transition-colors duration-700">
                        Applied
                    </h1>
                    <h2 className="text-xs font-bold text-outline mt-1">
                        {applications == 0 ? 'Pending' : `${applications} Roles`}
                    </h2>
                </div>
                <div className="group flex flex-col items-center">
                    <div 
                        onMouseEnter={() => setPercentage(50)}
                        onMouseLeave={() => setPercentage(0)}
                        className={`flex w-12 h-12 rounded-full ${interviews == 0 ? 'bg-surface-container-lowest' : 'bg-surface-container-low'} border-2 border-outline-variant/20 hover:shadow-[0_0_30px_rgba(191,194,255,0.2)] hover:border-primary/50 items-center justify-center text-outline hover:text-primary-fixed-dim transition-all duration-500`}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M880-80 720-240H320q-33 0-56.5-23.5T240-320v-40h440q33 0 56.5-23.5T760-440v-280h40q33 0 56.5 23.5T880-640v560ZM160-473l47-47h393v-280H160v327ZM80-280v-520q0-33 23.5-56.5T160-880h440q33 0 56.5 23.5T680-800v280q0 33-23.5 56.5T600-440H240L80-280Zm80-240v-280 280Z"/>
                        </svg>
                    </div>
                    <h1 className="group-hover:text-primary-fixed-dim mt-5 font-medium text-on-surface transition-colors duration-700">
                        Interviewing
                    </h1>
                    <h2 className="text-xs font-bold text-outline mt-1">
                        {interviews == 0 ? 'Pending' : `${interviews} Roles`}
                    </h2>
                </div>
                <div className="group flex flex-col items-center">
                    <div 
                        onMouseEnter={() => setPercentage(100)}
                        onMouseLeave={() => setPercentage(0)}
                        className={`flex w-12 h-12 rounded-full ${offers == 0 ? 'bg-surface-container-lowest' : 'bg-surface-container-low'} border-2 border-outline-variant/20 hover:shadow-[0_0_30px_rgba(191,194,255,0.2)] hover:border-primary/50 items-center justify-center text-outline hover:text-primary-fixed-dim transition-all duration-500`}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M399-160q-134 0-227.5-93T78-480q0-134 93.5-227T399-800h161q134 0 227.5 93T881-480q0 134-93.5 227T560-160H399Zm1-80h159q100 0 171-70t71-170q0-100-71-170t-171-70H400q-100 0-171 70t-71 170q0 100 71 170t171 70Zm23-173-85-85q-11-12-27.5-12T282-498q-12 12-12 28.5t12 27.5l99 99q18 18 43 18t42-18l212-212q12-11 12-28t-12-28q-12-12-28.5-12T621-611L423-413Zm57-67Z"/>
                        </svg>
                    </div>
                    <h1 className="group-hover:text-primary-fixed-dim mt-5 font-medium text-on-surface transition-colors duration-700">
                        Offers
                    </h1>
                    <h2 className="text-xs font-bold text-outline mt-1">
                        {offers == 0 ? 'Pending' : `${offers} Roles`}
                    </h2>
                </div>
            </div>
            {/** Loading bar */}
            <div className="flex top-1/2 absolute w-full max-w-9/12 p-px rounded-full bg-surface-bright">
                <div className="absolute rounded-full bg-linear-90 from-surface-bright to-primary/50 p-px top-0 left-0 transition-all duration-700" style={{ width: `${percentage}%`, opacity: `${percentage == 0 ? 0 : 100}`}} />
            </div>
        </div>
    )
}