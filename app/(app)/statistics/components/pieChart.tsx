import { useState } from "react";

const colors = [
    { color: "text-blue-400", hover: "text-blue-600 "},
    { color: "text-red-400", hover: "text-red-600 "},
    { color: "text-green-400", hover: "text-green-600"},
    { color: "text-yellow-400", hover: "text-yellow-600"},
    { color: "text-purple-400", hover: "text-purple-600"},
    { color: "text-orange-400", hover: "text-orange-600"},
    { color: "text-pink-400", hover: "text-pink-600"},
];

export interface PieSlice {
    name: string;
    percentage: number;
}

interface PieChartProps {
    slices: PieSlice[];
}

export default function PieChart({ slices }: PieChartProps) {
  const size = 450;
  const cx = size / 2;
  const cy = size / 2;
  const radius = size / 2; // We can use the full radius now!
  const [selected, setSelected] = useState(-1);

  function capitalize(word: string): string {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-surface-container-low rounded-2xl border border-outline-variant/40 shadow-xl relative font-sans select-none transition-colors duration-300">
        <h2 className="text-xl font-semibold text-on-surface">
          Applications Source
        </h2>
        <div className="relative w-full h-full flex justify-center items-center gap-10">
            <svg 
                width={size} 
                height={size} 
                className="transform -rotate-90 overflow-visible" 
            >
                {slices.map((slice, idx) => {
                    // 1. Calculate where this slice starts and ends
                    const startPercent = slices.slice(0, idx).reduce((sum, s) => sum + s.percentage, 0);
                    const endPercent = startPercent + slice.percentage;

                    // Failsafe: If a slice is exactly 100%, draw a full circle instead of a wedge
                    if (slice.percentage === 100) {
                        return (
                            <circle 
                                key={idx}
                                cx={cx} cy={cy} r={radius}
                                className={`${colors[idx % colors.length].color} fill-current transition-all duration-300`}
                            />
                        );
                    }

                    // 2. Trigonometry to find the X and Y coordinates on the circle's edge
                    const startX = cx + radius * Math.cos(2 * Math.PI * (startPercent / 100));
                    const startY = cy + radius * Math.sin(2 * Math.PI * (startPercent / 100));
                    const endX = cx + radius * Math.cos(2 * Math.PI * (endPercent / 100));
                    const endY = cy + radius * Math.sin(2 * Math.PI * (endPercent / 100));

                    // SVG arc flag: if the slice is larger than 50%, we must draw the "long way" around
                    const largeArcFlag = slice.percentage > 50 ? 1 : 0;

                    // 3. Draw the exact pie wedge path
                    const pathData = `
                        M ${cx} ${cy} 
                        L ${startX} ${startY} 
                        A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} 
                        Z
                    `;

                    return (
                        <path
                            key={`slice-${idx}`}
                            d={pathData}
                            className={`fill-current ${colors[idx % colors.length].color} ${selected === idx ? `${colors[idx % colors.length].hover} scale-105` : 'scale-100'} cursor-pointer transition-all duration-300 origin-center`}

                            stroke="var(--md-surface-container-low)" 
                            strokeWidth="5" 
                            strokeLinejoin="round"
                            
                            onMouseEnter={() => setSelected(idx)}
                            onMouseLeave={() => setSelected(-1)}
                        />
                    )})
                }
            </svg>

            <div className="flex flex-col gap-3">
                {slices.map((slice, idx) => (
                    <div 
                        key={`legend-${idx}`} 
                        className="flex gap-3 items-center h-fit cursor-pointer"
                        onMouseEnter={() => setSelected(idx)}
                        onMouseLeave={() => setSelected(-1)}
                    >
                        {/* Use the exact color from the array for the dot too! */}
                        <span className={`w-2.5 aspect-square ${colors[idx % colors.length].color} ${selected === idx ? `${colors[idx % colors.length].hover}` : ''} bg-current rounded-full`} />
                        <h4 className={`flex justify-center items-center gap-1 ${colors[idx % colors.length].color} ${selected === idx ? `${colors[idx % colors.length].hover} font-bold text-xl` : ''} transition-all duration-300`}>
                            {capitalize(slice.name)} ({Math.round(slice.percentage*10)/10}%)
                        </h4>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}