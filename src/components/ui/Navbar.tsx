"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { authService } from "@/features/auth/services/authService";

/**
 * Barre de navigation épurée.
 * - "Nouveau Rapport" et "Mes Rapports" : visibles par tous.
 * - "Supervision" : uniquement ADMIN et MANAGER.
 */
export const Navbar: React.FC = () => {
    const user = useCurrentUser();
    const pathname = usePathname();
    const router = useRouter();

    const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

    const navLinkClass = (href: string) =>
        `text-sm font-medium px-3 py-1.5 rounded transition-colors ${isActive(href)
            ? "bg-gray-100 text-gray-900 font-semibold"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        }`;

    const handleLogout = async () => {
        await authService.logout();
        router.push("/login");
    };

    const isSuperior = user && (user.role === "ADMIN" || user.role === "MANAGER" || user.role === "DIRECTEUR");
    const isAdminOrDirector = user && (user.role === "ADMIN" || user.role === "DIRECTEUR");

    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-40 transition-all">
            <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
                {/* Logo / Titre - Clean */}
                <Link href="/dashboard" className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-900 tracking-tight uppercase">Rapports de Service</span>
                    <div className="h-3 w-[1px] bg-slate-200"></div>
                    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">M.E.S.P.R.E.S</span>
                </Link>

                {/* Profile + Logout - Simple */}
                <div className="flex items-center gap-6">
                    {user && (
                        <div className="hidden sm:flex flex-col items-end">
                            <span className="text-[11px] font-bold text-slate-900 uppercase leading-none">{user.nom}</span>
                            <span className="text-[9px] font-medium text-slate-400 uppercase tracking-wider mt-1">Antananarivo / ESPA</span>
                        </div>
                    )}
                    <button
                        onClick={handleLogout}
                        className="text-[10px] font-bold text-slate-400 hover:text-red-500 uppercase tracking-widest transition-colors py-1.5 px-3 border border-slate-100 rounded-lg hover:border-red-100 hover:bg-red-50"
                    >
                        Quitter
                    </button>
                </div>
            </div>
        </header>
    );
};
