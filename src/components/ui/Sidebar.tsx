"use client";

import React from "react";
import Link from "next/link";
import { IMAGES } from "@/features/common/constants";
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
            {/* Header avec Logos Institutionnels */}
            <div className="px-8 py-8 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <img src={IMAGES.LOGO_REPOBLIKA} alt="Logo" className="h-8 w-auto mix-blend-multiply" />
                    <div className="h-6 w-[1px] bg-slate-200" />
                    <img src={IMAGES.LOGO_MESUPRES} alt="Logo" className="h-8 w-auto mix-blend-multiply" />
                </div>
                <div>
                    <h1 className="text-[11px] font-bold text-slate-900 tracking-[0.2em] uppercase leading-tight">
                        Rapport d&apos;Activités
                    </h1>
                    <p className="text-[9px] font-medium text-slate-400 uppercase tracking-widest mt-1">
                        ESPA / DSINT
                    </p>
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
                        {user?.role === "ADMIN" && (
                            <Link href="/admin/utilisateurs" className={linkClass("/admin/utilisateurs")}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                Utilisateurs
                            </Link>
                        )}
                    </div>
                )}
            </nav>
        </aside>
    );
};
