import { Application } from "@/lib/types";
import React, { useState, useMemo } from "react";

// ==========================================
// TYPES & INTERFACES
// ==========================================
export type ColorTheme = "indigo" | "emerald" | "offer" | "slate";
export type RowType = "main" | "sub";
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
  applications: Application[];
}

interface GridCoords {
  x: number;
  y: number;
}

type ActiveHover =
  | { type: "node"; id: string }
  | { type: "link"; source: string; target: string }
  | null;

// ==========================================
// CONSTANTS & CONFIGURATION
// ==========================================
const VB_WIDTH = 1000;
const VB_HEIGHT = 580;
const NODE_W = 140;
const NODE_H = 100;

const STAGE_CONFIG = [
  {
    id: "preregister",
    label: "Pre-register",
    column: 0,
    row: "main",
    color: "indigo" as const,
  },
  {
    id: "applied",
    label: "Applied",
    column: 1,
    row: "main",
    color: "emerald" as const,
  },
  {
    id: "assessment",
    label: "Assessment",
    column: 2,
    row: "main",
    color: "emerald" as const,
  },
  {
    id: "interview",
    label: "Interview",
    column: 3,
    row: "main",
    color: "emerald" as const,
  },
  {
    id: "offer",
    label: "Offer",
    column: 4,
    row: "main",
    color: "offer" as const,
  },
  {
    id: "rejected",
    label: "Rejected",
    column: 4,
    row: "sub",
    color: "slate" as const,
  },
] as const;

const STAGE_ALIASES: Record<string, string> = {
  preregister: "preregister",
  preregistered: "preregister",
  apply: "applied",
  applied: "applied",
  assessment: "assessment",
  interview: "interview",
  offer: "offer",
  offers: "offer",
  rejected: "rejected",
};

function normalizeStageName(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "").replace(/-/g, "");
}

function resolveStageId(value: string) {
  const normalized = normalizeStageName(value);
  return STAGE_ALIASES[normalized] ?? normalized;
}

function buildSankeyData(applications: Application[]): SankeyData {
  const nodeCounts = new Map<string, number>();
  const linkCounts = new Map<string, number>();

  applications.forEach((application) => {
    const stages = application.journey
      .split(",")
      .map(resolveStageId)
      .filter(Boolean);

    if (stages.length === 0) return;

    stages.forEach((stage) => {
      nodeCounts.set(stage, (nodeCounts.get(stage) ?? 0) + 1);
    });

    for (let index = 0; index < stages.length - 1; index += 1) {
      const source = stages[index];
      const target = stages[index + 1];
      const key = `${source}-${target}`;
      linkCounts.set(key, (linkCounts.get(key) ?? 0) + 1);
    }
  });

  const nodes: SankeyNode[] = [];
  STAGE_CONFIG.forEach((stage) => {
    const count = nodeCounts.get(stage.id) ?? 0;

    nodes.push({
      id: stage.id,
      label: stage.label,
      value: count,
      column: stage.column,
      row: stage.row,
      color: stage.color,
    });
  });

  const links: SankeyLink[] = [];
  linkCounts.forEach((strokeWidth, key) => {
    const [source, target] = key.split("-");
    links.push({
      source,
      target,
      strokeWidth: Math.max(6, strokeWidth * 8),
    });
  });

  return { nodes, links };
}

const LAYOUT_GRID: Record<ColumnIndex, Record<RowType, GridCoords>> = {
  0: { main: { x: 40, y: 240 }, sub: { x: 40, y: 240 } },
  1: { main: { x: 235, y: 160 }, sub: { x: 235, y: 420 } },
  2: { main: { x: 430, y: 120 }, sub: { x: 430, y: 440 } },
  3: { main: { x: 625, y: 90 }, sub: { x: 625, y: 455 } },
  4: { main: { x: 820, y: 50 }, sub: { x: 820, y: 470 } },
};

const THEME_MAP: Record<
  ColorTheme,
  { bg: string; link: string; activeLink: string; glow?: boolean }
> = {
  indigo: {
    bg: "bg-[#141822] border-slate-800 text-indigo-200",
    link: "stroke-[#2B2E3D]/60",
    activeLink: "stroke-indigo-500/80",
  },
  emerald: {
    bg: "bg-[#141822] border-slate-800 text-emerald-400/90",
    link: "stroke-[#2D3A39]/60",
    activeLink: "stroke-emerald-400/80",
  },
  offer: {
    bg: "bg-[#1B1F32] border-indigo-500/40 text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.15)]",
    link: "stroke-[#4C4F7A]/40",
    activeLink: "stroke-indigo-400",
    glow: true,
  },
  slate: {
    bg: "bg-[#11141B]/50 border-slate-900 text-slate-400 opacity-40",
    link: "stroke-[#1B1E26]/60",
    activeLink: "stroke-slate-500/70",
  },
};

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function InteractiveApplicationFlow({
  applications,
}: DynamicApplicationFlowProps) {
  // Track state of item currently under user cursor
  const [activeHover, setActiveHover] = useState<ActiveHover>(null);

  const sankeyData = useMemo(() => {
    return buildSankeyData(applications);
  }, [applications]);

  const nodesMap = useMemo(() => {
    const map = new Map<string, SankeyNode & GridCoords>();
    sankeyData.nodes.forEach((node) => {
      const coords = LAYOUT_GRID[node.column]?.[node.row] || { x: 0, y: 0 };
      map.set(node.id, { ...node, ...coords });
    });
    return map;
  }, [sankeyData.nodes]);

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

      <div
        className="relative w-full"
        style={{ aspectRatio: `${VB_WIDTH} / ${VB_HEIGHT}` }}
      >
        {sankeyData.nodes.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl border border-dashed border-slate-800/50 text-sm text-slate-500">
            No journey data for the selected period.
          </div>
        ) : null}

        {/* SVG Dynamic Flow Links */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${VB_WIDTH} ${VB_HEIGHT}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {sankeyData.links.map((link, idx) => {
            const sourceNode = nodesMap.get(link.source);
            const targetNode = nodesMap.get(link.target);

            if (!sourceNode || !targetNode) return null;

            const startX = sourceNode.x + NODE_W;
            const startY = sourceNode.y + NODE_H / 2;
            const endX = targetNode.x;
            const endY = targetNode.y + NODE_H / 2;

            const controlOffset = (endX - startX) * 0.45;
            const pathData = `M ${startX} ${startY} C ${startX + controlOffset} ${startY}, ${endX - controlOffset} ${endY}, ${endX} ${endY}`;

            const theme = THEME_MAP[targetNode.color] || THEME_MAP.slate;

            // Compute isolation opacity rules based on active user context
            let isHighlighted = false;
            let isDimmed = false;

            if (activeHover) {
              if (activeHover.type === "node") {
                isHighlighted =
                  link.source === activeHover.id ||
                  link.target === activeHover.id;
                isDimmed = !isHighlighted;
              } else if (activeHover.type === "link") {
                isHighlighted =
                  link.source === activeHover.source &&
                  link.target === activeHover.target;
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
                onMouseEnter={() =>
                  setActiveHover({
                    type: "link",
                    source: link.source,
                    target: link.target,
                  })
                }
                onMouseLeave={() => setActiveHover(null)}
                filter={
                  isHighlighted &&
                  (theme.glow || link.glow || activeHover?.type === "link")
                    ? "drop-shadow(0px 0px 12px rgba(99,102,241,0.6))"
                    : undefined
                }
              />
            );
          })}
        </svg>

        {/* Coordinated UI Nodes */}
        {sankeyData.nodes.map((node) => {
          const coords = nodesMap.get(node.id);
          if (!coords) return null;

          const theme = THEME_MAP[node.color] || THEME_MAP.slate;

          // Compute isolation state for boxes
          let isHighlighted = false;
          let isDimmed = false;

          if (activeHover) {
            if (activeHover.type === "node") {
              isHighlighted = node.id === activeHover.id;
              isDimmed = !isHighlighted;
            } else if (activeHover.type === "link") {
              isHighlighted =
                node.id === activeHover.source ||
                node.id === activeHover.target;
              isDimmed = !isHighlighted;
            }
          }

          const style: React.CSSProperties = {
            left: `${(coords.x / VB_WIDTH) * 100}%`,
            top: `${(coords.y / VB_HEIGHT) * 100}%`,
            width: `${(NODE_W / VB_WIDTH) * 100}%`,
            height: `${(NODE_H / VB_HEIGHT) * 100}%`,
            opacity: isDimmed ? 0.25 : 1,
            transform: isHighlighted ? "scale(1.04)" : "scale(1)",
            zIndex: isHighlighted ? 20 : 10,
          };

          return (
            <div
              key={node.id}
              className={`absolute flex flex-col justify-center items-center border rounded-xl text-center cursor-pointer transition-all duration-300 backdrop-blur-sm ${
                theme.bg
              } ${isHighlighted ? "border-indigo-400/60 shadow-lg" : ""}`}
              style={style}
              onMouseEnter={() => setActiveHover({ type: "node", id: node.id })}
              onMouseLeave={() => setActiveHover(null)}
            >
              <span
                className={`font-semibold tracking-tight transition-transform ${node.row === "main" ? "text-3xl" : "text-xl"}`}
              >
                {node.value.toLocaleString()}
              </span>
              <span
                className={`font-medium mt-1 ${node.row === "main" ? "text-xs text-slate-400" : "text-[11px] text-slate-500"}`}
              >
                {node.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
