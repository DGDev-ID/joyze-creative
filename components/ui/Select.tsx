"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string | undefined;
  children?: React.ReactNode;
};

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, className = "", children, disabled, ...props },
  ref,
) {
  return (
    <div>
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          ref={ref}
          className={`w-full bg-white border rounded-md transition-shadow duration-150 focus:outline-none border-gray-200 focus:ring-2 focus:ring-(--bg-primary)/30 px-3 py-2 h-11 appearance-none ${className}`}
          disabled={disabled}
          {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
        >
          {children}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
      </div>

      {error && <p className="mt-2 text-xs text-(--bg-danger)">{error}</p>}
    </div>
  );
});

export default Select;
