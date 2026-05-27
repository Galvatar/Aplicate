export default function Board() {
    return (
        <div className="flex flex-col w-full h-full font-jakarta py-20 px-15 gap-4 bg-background text-on-background">
            {/** Title */}
            <div className="flex justify-between items-end">
                <div className="flex flex-col">
                    <h1 className="text-4xl font-bold text-on-surface tracking-tight mb-2">
                        My Board
                    </h1>
                    <h2 className="text-on-surface-variant max-w-2xl">
                        A calm space to organise your career journey. Focus on the next step.
                    </h2>
                </div>
                <div className="flex relative gap-3">
                    <button
                        className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-lg border border-outline-variant/20 text-on-surface-variant font-bold text-sm hover:bg-surface-container transition-colors duration-300"
                    >
                        <svg className="text-outline" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z"/>
                        </svg>
                        Filter
                    </button>
                    <button
                        className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-lg border border-outline-variant/20 text-on-surface-variant font-bold text-sm hover:bg-surface-container transition-colors duration-300"
                    >
                        <svg className="text-outline" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M120-240v-80h240v80H120Zm0-200v-80h480v80H120Zm0-200v-80h720v80H120Z"/>
                        </svg>
                        Sort
                    </button>
                </div>
            </div>
        </div>
    )
}