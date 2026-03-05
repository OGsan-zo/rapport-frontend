"use client";

"use client";

import React from "react";
import { APP_CONSTANTS } from "@/config/constants";

/**
 * Footer institutionnel avec copyright dynamique.
 * L'année est toujours calculée en temps réel.
 */
export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    const { startYear, owner } = APP_CONSTANTS.copyright;

    return (
        <footer className="border-t border-gray-200 bg-white mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-4 text-center">
                <p className="text-xs text-gray-500">
                    © {startYear} - {currentYear} {owner}
                </p>
            </div>
        </footer>
    );
};
