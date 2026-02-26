"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";

export const Sidebar: React.FC = () => {
    const user = useCurrentUser();
    const pathname = usePathname();

    const isSuperior = user && (user.role === "ADMIN" || user.role === "MANAGER" || user.role === "DIRECTEUR");
    const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

    const linkClass = (href: string) =>
        `flex items-center gap-3 px-8 py-2.5 text-[11px] font-medium uppercase tracking-widest transition-all ${isActive(href)
            ? "text-blue-600 bg-blue-50/50 border-r-2 border-blue-500"
            : "text-slate-500 hover:text-slate-900 border-r-2 border-transparent hover:bg-slate-50"
        }`;

    const isAdminOrDirector = user && (user.role === "ADMIN" || user.role === "DIRECTEUR");

    return (
        <aside className="w-[240px] h-screen bg-white border-r border-slate-100 flex flex-col sticky top-0 z-50 transition-all">
            {/* Logo Section - Clean & Minimal */}
            <div className="p-8 pb-10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center shadow-sm">
                        <span className="text-white font-bold text-sm">R</span>
                    </div>
                    <div>
                        <h2 className="text-xs font-bold text-slate-900 tracking-tight leading-none uppercase">Rapport</h2>
                        <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-1">E.S.P.A</span>
                    </div>
                </div>
            </div>

            <nav className="flex-1 space-y-1">
                <div className="mb-6">
                    <div className="px-8 mb-3">
                        <span className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.2em]">Navigation</span>
                    </div>
                    <Link href="/dashboard" className={linkClass("/dashboard")}>
                        Dashboard
                    </Link>
                    <Link href="/dashboard/nouveau" className={linkClass("/dashboard/nouveau")}>
                        Nouveau
                    </Link>
                </div>

                {isSuperior && (
                    <div className="mt-8">
                        <div className="px-8 mb-3">
                            <span className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.2em]">Pilotage</span>
                        </div>
                        <Link href="/dashboard/supervision" className={linkClass("/dashboard/supervision")}>
                            Supervision
                        </Link>
                    </div>
                )}

                {isAdminOrDirector && (
                    <div className="mt-8">
                        <div className="px-8 mb-3">
                            <span className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.2em]">Administration</span>
                        </div>
                        <Link href="/admin/dashboard" className={linkClass("/admin/dashboard")}>
                            Stats
                        </Link>
                        <Link href="/admin/periodes" className={linkClass("/admin/periodes")}>
                            Périodes
                        </Link>
                    </div>
                )}
            </nav>
        </aside>
    );
};
