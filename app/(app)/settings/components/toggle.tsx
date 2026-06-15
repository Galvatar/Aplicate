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
            className={`flex items-center w-12 h-6 rounded-full p-0.5 ${!status ? 'bg-surface-container-highest' : 'bg-green-500'} ${disabled ? 'opacity-50' : 'opacity-100'} transition-colors`}>
            <span className={`aspect-square h-4.5 rounded-full ${!status ? 'translate-x-0 bg-surface-container-lowest' : 'translate-x-6.5 bg-secondary-container'} duration-300 transition-all`} />
        </div>
    )
}