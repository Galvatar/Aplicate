import React, { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

interface GenericTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  onRowClick?: (row: TData) => void;
  onActionClick?: (e: React.MouseEvent, row: TData) => void;
}

export function SortTable<TData>({
  data,
  columns,
  onRowClick,
  onActionClick,
}: GenericTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <table className="w-full text-left border-collapse">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="bg-surface-container-high/50">
            {headerGroup.headers.map((header) => {
              // Check if this is our custom action column to align it right
              const isAction = header.id === "actions";
              
              return (
                <th
                  key={header.id}
                  onClick={!isAction ? header.column.getToggleSortingHandler() : undefined}
                  className={`py-5 px-8 text-on-surface-variant uppercase tracking-widest text-sm ${
                    isAction ? "text-right" : "cursor-pointer user-select-none"
                  }`}
                >
                  {!isAction && (
                    <div className="flex items-center gap-1.5">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      <span>
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? " ↕️"}
                      </span>
                    </div>
                  )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody className="divide-y divide-outline-variant/50">
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            onClick={() => onRowClick?.(row.original)}
            className={`transition-colors group ${onRowClick ? "cursor-pointer hover:bg-surface-container/30" : ""}`}
          >
            {row.getVisibleCells().map((cell) => {
              const isAction = cell.column.id === "actions";
              
              return (
                <td
                  key={cell.id}
                  className={`px-8 py-6 ${isAction ? "text-right relative" : ""}`}
                >
                  {isAction ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents triggering row routing click
                        onActionClick?.(e, row.original);
                      }}
                      className="p-2 text-on-surface-variant hover:text-primary transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="currentColor"
                      >
                        <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
                      </svg>
                    </button>
                  ) : (
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}