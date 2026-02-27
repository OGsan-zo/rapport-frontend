"use client";

import React from "react";
import { Select } from "@/components/ui/select";
import { usePeriodes } from "../hooks/usePeriodes";

interface PeriodeSelectProps {
    value?: string | number;
    onValueChange: (value: string) => void;
    typeCalendrierId?: string | number;
    label?: string;
    className?: string;
    isInsert?: boolean;
}

export const PeriodeSelect: React.FC<PeriodeSelectProps> = ({
    value,
    onValueChange,
    typeCalendrierId,
    label = "Sélectionner une période",
    className = "",
    isInsert = false
}) => {
    const { data, isLoading, error } = usePeriodes(typeCalendrierId, isInsert);

    const formatDate = (dateStr: string) => {
        try {
            // Gère le format "YYYY-MM-DD HH:mm:ss" ou "YYYY-MM-DD"
            const date = new Date(dateStr.replace(' ', 'T'));
            return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
        } catch (e) {
            return dateStr;
        }
    };

    const options = [
        { id: "", label: "Choisir une période..." },
        ...data.map((p) => ({
            id: p.id,
            label: `Du ${formatDate(p.dateDebut)} au ${formatDate(p.dateFin)}`,
        }))
    ];

    if (error) {
        return (
            <div className={`text-xs text-red-500 p-2 border border-red-100 rounded bg-red-50 ${className}`}>
                Erreur: {error}
            </div>
        );
    }

    return (
        <Select
            label={label}
            options={options}
            value={value}
            onValueChange={onValueChange}
            isLoading={isLoading}
            className={className}
        />
    );
};
