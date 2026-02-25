"use client";

import React from "react";

/**
 * Footer institutionnel avec copyright dynamique.
 * L'année est toujours calculée en temps réel.
 */
export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-gray-200 bg-white mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-4 text-center">
                <p className="text-xs text-gray-500">
                    © {currentYear} - DSINT - MESUPRES
                </p>
            </div>
        </footer>
    );
};
