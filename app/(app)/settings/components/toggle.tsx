import { useState } from "react"

interface ToggleButtonProps {
    disabled: boolean,
    status: boolean,
    onChange(newVal: boolean): void
}

export default function ToggleButton({ disabled, status, onChange }: ToggleButtonProps) {
    return (
        <div 
            onClick={() => {
                if (disabled) return;
                onChange(!status)
            }}
            className={`flex w-12 h-6 rounded-full p-0.5 ${!status ? 'bg-surface-container-highest' : 'bg-secondary-container'} ${disabled ? 'opacity-50' : 'opacity-100'} transition-colors`}>
            <span className={`aspect-square h-full rounded-full ${!status ? 'translate-x-0 bg-surface-container-lowest' : 'translate-x-6 bg-secondary'} duration-300 transition-all`} />
        </div>
    )
}