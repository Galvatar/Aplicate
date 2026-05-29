import React, { useState, useMemo } from 'react';

// ==========================================
// TYPES & INTERFACES
// ==========================================
export type ColorTheme = 'indigo' | 'emerald' | 'offer' | 'slate';
export type RowType = 'main' | 'sub';
export type ColumnIndex = 0 | 1 | 2 | 3 | 4;

export interface SankeyNode {
  id: string;
  label: string;
  value: number;
  column: ColumnIndex;
  row: RowType;
  color: ColorTheme;
}

export interface SankeyLink {
  source: string;
  target: string;
  strokeWidth: number;
  color?: string;
  glow?: boolean;
}

export interface SankeyData {
  nodes: SankeyNode[];
  links: SankeyLink[];
}

interface DynamicApplicationFlowProps {
  data?: SankeyData;
}

interface GridCoords {
  x: number;
  y: number;
}

type ActiveHover = 
  | { type: 'node'; id: string }
  | { type: 'link'; source: string; target: string }
  | null;

// ==========================================
// CONSTANTS & CONFIGURATION
// ==========================================
const VB_WIDTH = 1000;
const VB_HEIGHT = 580;
const NODE_W = 140;
const NODE_H = 100;

const LAYOUT_GRID: Record<ColumnIndex, Record<RowType, GridCoords>> = {
  0: { main: { x: 40,  y: 240 }, sub: { x: 40,  y: 240 } }, 
  1: { main: { x: 235, y: 160 }, sub: { x: 235, y: 420 } },
  2: { main: { x: 430, y: 120 }, sub: { x: 430, y: 440 } },
  3: { main: { x: 625, y: 90 },  sub: { x: 625, y: 455 } },
  4: { main: { x: 820, y: 50 },  sub: { x: 820, y: 470 } },
};

const THEME_MAP: Record<ColorTheme, { bg: string; link: string; activeLink: string; glow?: boolean }> = {
  indigo: {
    bg: 'bg-[#141822] border-slate-800 text-indigo-200',
    link: 'stroke-[#2B2E3D]/60',
    activeLink: 'stroke-indigo-500/80'
  },
  emerald: {
    bg: 'bg-[#141822] border-slate-800 text-emerald-400/90',
    link: 'stroke-[#2D3A39]/60',
    activeLink: 'stroke-emerald-400/80'
  },
  offer: {
    bg: 'bg-[#1B1F32] border-indigo-500/40 text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.15)]',
    link: 'stroke-[#4C4F7A]/40',
    activeLink: 'stroke-indigo-400',
    glow: true
  },
  slate: {
    bg: 'bg-[#11141B]/50 border-slate-900 text-slate-400 opacity-40',
    link: 'stroke-[#1B1E26]/60',
    activeLink: 'stroke-slate-500/70'
  }
};

const defaultSankeyData: SankeyData = {
  nodes: [
    { id: 'preregister', label: 'Pre-register', value: 540, column: 0, row: 'main', color: 'indigo' },
    { id: 'applied', label: 'Applied', value: 320, column: 1, row: 'main', color: 'emerald' },
    { id: 'dropped_pr', label: 'Dropped', value: 220, column: 1, row: 'sub', color: 'slate' },
    { id: 'assessment', label: 'Assessment', value: 190, column: 2, row: 'main', color: 'emerald' },
    { id: 'dropped_app', label: 'Dropped', value: 130, column: 2, row: 'sub', color: 'slate' },
    { id: 'interview', label: 'Interview', value: 110, column: 3, row: 'main', color: 'emerald' },
    { id: 'dropped_ast', label: 'Dropped', value: 80, column: 3, row: 'sub', color: 'slate' },
    { id: 'offers', label: 'Offers', value: 15, column: 4, row: 'main', color: 'offer' },
    { id: 'rejected', label: 'Rejected', value: 95, column: 4, row: 'sub', color: 'slate' },
  ],
  links: [
    { source: 'preregister', target: 'applied', strokeWidth: 46 },
    { source: 'preregister', target: 'dropped_pr', strokeWidth: 32 },
    { source: 'applied', target: 'assessment', strokeWidth: 34 },
    { source: 'applied', target: 'dropped_app', strokeWidth: 24 },
    { source: 'assessment', target: 'interview', strokeWidth: 26 },
    { source: 'assessment', target: 'dropped_ast', strokeWidth: 18 },
    { source: 'interview', target: 'offers', strokeWidth: 8 },
    { source: 'interview', target: 'rejected', strokeWidth: 22 },
  ]
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function InteractiveApplicationFlow({ 
  data = defaultSankeyData 
}: DynamicApplicationFlowProps) {
  
  // Track state of item currently under user cursor
  const [activeHover, setActiveHover] = useState<ActiveHover>(null);
  
  const nodesMap = useMemo(() => {
    const map = new Map<string, SankeyNode & GridCoords>();
    data.nodes.forEach(node => {
      const coords = LAYOUT_GRID[node.column]?.[node.row] || { x: 0, y: 0 };
      map.set(node.id, { ...node, ...coords });
    });
    return map;
  }, [data.nodes]);

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-[#090D14] rounded-2xl border border-slate-800/40 shadow-2xl relative font-sans select-none">
      <div className="flex items-center justify-between mb-6 px-2">
        <h2 className="text-xl font-semibold text-slate-200">
          Application Flow
        </h2>
        <span className="text-xs text-slate-500 animate-pulse">
          Hover over nodes or paths to inspect connections
        </span>
      </div>

      <div className="relative w-full" style={{ aspectRatio: `${VB_WIDTH} / ${VB_HEIGHT}` }}>
        
        {/* SVG Dynamic Flow Links */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${VB_WIDTH} ${VB_HEIGHT}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {data.links.map((link, idx) => {
            const sourceNode = nodesMap.get(link.source);
            const targetNode = nodesMap.get(link.target);

            if (!sourceNode || !targetNode) return null;

            const startX = sourceNode.x + NODE_W;
            const startY = sourceNode.y + (NODE_H / 2);
            const endX = targetNode.x;
            const endY = targetNode.y + (NODE_H / 2);

            const controlOffset = (endX - startX) * 0.45;
            const pathData = `M ${startX} ${startY} C ${startX + controlOffset} ${startY}, ${endX - controlOffset} ${endY}, ${endX} ${endY}`;

            const theme = THEME_MAP[targetNode.color] || THEME_MAP.slate;

            // Compute isolation opacity rules based on active user context
            let isHighlighted = false;
            let isDimmed = false;

            if (activeHover) {
              if (activeHover.type === 'node') {
                isHighlighted = link.source === activeHover.id || link.target === activeHover.id;
                isDimmed = !isHighlighted;
              } else if (activeHover.type === 'link') {
                isHighlighted = link.source === activeHover.source && link.target === activeHover.target;
                isDimmed = !isHighlighted;
              }
            }

            return (
              <path
                key={`${link.source}-${link.target}-${idx}`}
                d={pathData}
                strokeWidth={link.strokeWidth}
                className={`transition-all duration-300 cursor-pointer pointer-events-auto ${
                  isHighlighted ? theme.activeLink : theme.link
                }`}
                style={{
                  opacity: isDimmed ? 0.08 : isHighlighted ? 1 : 0.75,
                }}
                strokeLinecap="round"
                onMouseEnter={() => setActiveHover({ type: 'link', source: link.source, target: link.target })}
                onMouseLeave={() => setActiveHover(null)}
                filter={
                  isHighlighted && (theme.glow || link.glow || activeHover?.type === 'link')
                    ? "drop-shadow(0px 0px 12px rgba(99,102,241,0.6))" 
                    : undefined
                }
              />
            );
          })}
        </svg>

        {/* Coordinated UI Nodes */}
        {data.nodes.map((node) => {
          const coords = nodesMap.get(node.id);
          if (!coords) return null;
          
          const theme = THEME_MAP[node.color] || THEME_MAP.slate;

          // Compute isolation state for boxes
          let isHighlighted = false;
          let isDimmed = false;

          if (activeHover) {
            if (activeHover.type === 'node') {
              isHighlighted = node.id === activeHover.id;
              isDimmed = !isHighlighted;
            } else if (activeHover.type === 'link') {
              isHighlighted = node.id === activeHover.source || node.id === activeHover.target;
              isDimmed = !isHighlighted;
            }
          }

          const style: React.CSSProperties = {
            left: `${(coords.x / VB_WIDTH) * 100}%`,
            top: `${(coords.y / VB_HEIGHT) * 100}%`,
            width: `${(NODE_W / VB_WIDTH) * 100}%`,
            height: `${(NODE_H / VB_HEIGHT) * 100}%`,
            opacity: isDimmed ? 0.25 : 1,
            transform: isHighlighted ? 'scale(1.04)' : 'scale(1)',
            zIndex: isHighlighted ? 20 : 10
          };

          return (
            <div
              key={node.id}
              className={`absolute flex flex-col justify-center items-center border rounded-xl text-center cursor-pointer transition-all duration-300 backdrop-blur-sm ${
                theme.bg
              } ${isHighlighted ? 'border-indigo-400/60 shadow-lg' : ''}`}
              style={style}
              onMouseEnter={() => setActiveHover({ type: 'node', id: node.id })}
              onMouseLeave={() => setActiveHover(null)}
            >
              <span className={`font-semibold tracking-tight transition-transform ${node.row === 'main' ? 'text-3xl' : 'text-xl'}`}>
                {node.value.toLocaleString()}
              </span>
              <span className={`font-medium mt-1 ${node.row === 'main' ? 'text-xs text-slate-400' : 'text-[11px] text-slate-500'}`}>
                {node.label}
              </span>
            </div>
          );
        })}

      </div>
    </div>
  );
}