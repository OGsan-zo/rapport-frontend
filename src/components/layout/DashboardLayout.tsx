"use client";

import React from "react";
import { Sidebar } from "../ui/Sidebar";
import { Navbar } from "../ui/Navbar";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen bg-white font-sans selection:bg-black selection:text-white">
            {/* Sidebar fixe */}
            <div className="hidden lg:block w-[260px] flex-shrink-0">
                <Sidebar />
            </div>

            {/* Main Area */}
            <div className="flex-1 flex flex-col min-w-0">
                <Navbar />

                <div className="flex-1 relative flex flex-col">
                    <main className="flex-1 p-6 lg:p-10 w-full max-w-7xl mx-auto">
                        {children}
                    </main>

                    {/* Footer Centralisé */}
                    <footer className="py-10 px-10 border-t border-slate-50 mt-16">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto w-full">
                            <p className="text-[9px] text-slate-300 font-medium uppercase tracking-[0.2em]">
                                © 2026 — <span className="text-slate-400">DSINT</span> — MESUPRES
                            </p>
                            <div className="flex items-center gap-6">
                                <span className="text-[9px] text-slate-200 font-medium uppercase tracking-widest whitespace-nowrap italic">
                                    Direction des Systèmes d'Information et du Numérique Technologique
                                </span>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
};
