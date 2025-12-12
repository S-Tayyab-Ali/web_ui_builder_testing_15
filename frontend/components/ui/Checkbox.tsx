"use client";

import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, onCheckedChange, ...props }, ref) => {
    return (
      <div className="relative flex items-center justify-center w-6 h-6">
        <input
          type="checkbox"
          ref={ref}
          checked={checked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          className="peer h-6 w-6 cursor-pointer appearance-none rounded-full border-2 border-white/20 bg-white/5 transition-all duration-200 checked:border-blue-500 checked:bg-blue-500 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          {...props}
        />
        <Check 
          className={cn(
            "pointer-events-none absolute text-white transition-all duration-200",
            checked ? "opacity-100 scale-100" : "opacity-0 scale-50"
          )} 
          size={14}
          strokeWidth={3}
        />
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
