import { useState } from "react";

const colors = [
    { color: "text-blue-400", hover: "text-blue-600 "},
    { color: "text-red-400", hover: "text-red-600 "},
    { color: "text-green-400", hover: "text-green-600"},
    { color: "text-yellow-400", hover: "text-yellow-600"},
    { color: "text-purple-400", hover: "text-purple-600"},
    { color: "text-green-400", hover: "text-green-600"},
    { color: "text-orange-400", hover: "text-orange-600"},
    { color: "text-pink-400", hover: "text-pink-600"},
]

export interface PieSlice {
    name: string,
    percentage: number
}

interface PieChartProps {
    slices: PieSlice[]
}

export default function PieChart({ slices }: PieChartProps) {
  const size = 450;
  const radius = size / 4; 
  const strokeWidth = size / 2; 
  const circumference = 2 * Math.PI * radius; // ~235.6
  const [selected, setSelected] = useState(-1);

  function capitalize(word: string): string {
    const firstLetter = word.substring(0, 1).toUpperCase();
    const lastLetters = word.substring(1, word.length);
    return firstLetter.concat(lastLetters);
  }

  return (
    <div className="relative w-150 h-150 flex items-center gap-10">
      <svg 
        width={size} 
        height={size} 
        className="transform -rotate-90 overflow-visible" 
      >
        {slices.map((slice, idx) => {
            const length = (slice.percentage/100) * circumference;
            const offset = idx == 0 ? 0 : -((slices[idx-1].percentage / 100) * circumference)
            return (
                <circle
                    className={`${colors[idx%colors.length].color} ${selected == idx ? colors[idx%colors.length].hover : ''} cursor-pointer transition-all duration-300 origin-center hover:scale-105`}
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    onMouseEnter={() => setSelected(idx)}
                    onMouseLeave={() => setSelected(-1)}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${length} ${circumference}`}
                    strokeDashoffset={offset}
                />
            )})
        }
      </svg>
      <div className="flex flex-col gap-3">
        {slices.map((slice, idx) => {
            return (
                <h4 key={idx} className={`flex justify-center items-center gap-1 ${colors[idx%colors.length].color} ${selected == idx ? `${colors[idx%colors.length].hover} font-bold text-xl` : ''} transition-all`}>
                    <b className="text-3xl">•</b> {capitalize(slice.name)}
                </h4>
            )
        })}
      </div>
    </div>
  );
}