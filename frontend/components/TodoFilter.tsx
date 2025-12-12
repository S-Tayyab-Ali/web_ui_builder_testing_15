"use client";

import React from 'react';
import { FilterType } from '@/types/todo';
import { cn } from '@/lib/utils';

interface TodoFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeCount: number;
  onClearCompleted: () => void;
  hasCompleted: boolean;
}

export function TodoFilter({ 
  currentFilter, 
  onFilterChange, 
  activeCount, 
  onClearCompleted,
  hasCompleted 
}: TodoFilterProps) {
  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400 mt-6 pt-6 border-t border-white/10">
      <span className="order-2 sm:order-1">
        {activeCount} {activeCount === 1 ? 'item' : 'items'} left
      </span>

      <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl order-1 sm:order-2">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={cn(
              "px-3 py-1.5 rounded-lg transition-all duration-200 font-medium",
              currentFilter === filter.value
                ? "bg-white/10 text-white shadow-sm"
                : "hover:text-white hover:bg-white/5"
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <button
        onClick={onClearCompleted}
        disabled={!hasCompleted}
        className={cn(
          "order-3 transition-all duration-200 hover:text-white",
          !hasCompleted && "opacity-0 pointer-events-none"
        )}
      >
        Clear Completed
      </button>
    </div>
  );
}
