"use client";

import React from "react";

interface SelectOption {
    id: number | string;
    label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    options: SelectOption[];
    onValueChange: (value: string) => void;
    isLoading?: boolean;
}

export const Select: React.FC<SelectProps> = ({
    label,
    options,
    onValueChange,
    value,
    isLoading = false,
    className = "",
    ...props
}) => {
    if (isLoading) {
        return (
            <div className={`h-11 w-full bg-slate-50 animate-pulse rounded border border-slate-100 ${className}`} />
        );
    }

    return (
        <div className={`relative ${className}`}>
            <label className="absolute -top-2 left-3 px-1.5 bg-white text-[9px] font-bold text-slate-400/80 uppercase tracking-widest z-10 transition-colors">
                {label}
            </label>
            <select
                value={value}
                onChange={(e) => onValueChange(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-md px-4 py-2.5 text-xs font-medium text-slate-700 focus:border-blue-300 focus:ring-4 focus:ring-blue-50/50 outline-none cursor-pointer appearance-none hover:bg-slate-50/50 transition-all shadow-sm"
                style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23cbd5e1\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")',
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    backgroundSize: "1em",
                }}
                {...props}
            >
                {options.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
