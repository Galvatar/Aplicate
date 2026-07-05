interface StatCardProps {
    title: string
    icon: React.ReactNode
    stat: string
    change: number
}

export default function StatCard({ title, icon, stat, change }: StatCardProps) {
    return (
        <div className="flex flex-col w-full bg-surface-container/40 rounded-2xl p-6 border border-outline-variant/10 shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] ">
            {/** Title */}
            <div className="flex justify-between items-start mb-4">
                <h2 className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider">
                    {title}
                </h2>
                {icon}
            </div>
            {/** Stat */}
            <h2 className="font-bold text-4xl text-on-surface">
                {stat}
            </h2>
            {change > 0 && 
            <h2 className="flex text-sm text-secondary mt-2 items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z"/>
                </svg>
                +{change}% vs last period
            </h2>}
            {change < 0 &&
            <h2 className="flex text-sm text-error mt-2 items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M640-240v-80h104L536-526 376-366 80-664l56-56 240 240 160-160 264 264v-104h80v240H640Z"/>
                </svg>
                {change}% vs last period
            </h2>}
            {change == 0 &&
            <h2 className="flex text-sm text-on-surface mt-2 items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M160-440v-80h640v80H160Z"/>
                </svg>
                Steady
            </h2>}
        </div>
    )
}