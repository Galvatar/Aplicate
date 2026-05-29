'use client';

import { useState } from 'react';

interface DropdownProps<T> {
  options: T[];
  selected: T;
  onSelect: (option: T) => void;
  label?: string;
  icon?: React.ReactNode;
  displayValue?: (option: T) => string;
}

export default function Dropdown<T extends string | number>({
  options,
  selected,
  onSelect,
  label,
  icon,
  displayValue = (opt) => String(opt),
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full justify-between items-center gap-2 bg-surface-container-low px-4 py-2 rounded-lg border border-outline-variant/20 text-on-surface-variant text-sm hover:bg-surface-container transition-colors duration-300"
      >
        <div className='flex gap-2'>
            <div className='flex text-outline w-5 h-5 items-center justify-center'>
                {icon}
            </div>
            {label && <span className="text-outline">{label}:</span>}
            <span>{displayValue(selected)}</span>
        </div>
        <svg
          className={`text-outline transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="currentColor"
        >
          <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
        </svg>
      </button>

      {/* Always render, control with CSS */}
      <div
        className={`absolute top-full right-0 mt-2 bg-surface-container-low border border-outline-variant/20 rounded-lg shadow-lg z-10 overflow-hidden transition-all duration-300 origin-top ${
          isOpen
            ? 'opacity-100 scale-y-100 pointer-events-auto'
            : 'opacity-0 scale-y-95 pointer-events-none'
        }`}
      >
        {options.map((option) => (
          <button
            key={String(option)}
            onClick={() => {
              onSelect(option);
              setIsOpen(false);
            }}
            className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
              selected === option
                ? 'bg-surface-container-high text-on-surface'
                : 'text-on-surface-variant hover:bg-surface-container-lowest'
            }`}
          >
            {displayValue(option)}
          </button>
        ))}
      </div>
    </div>
  );
}