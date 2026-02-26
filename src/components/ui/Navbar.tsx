"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { authService } from "@/features/auth/services/authService";
import { User } from "@/features/auth/types";

/**
 * Barre de navigation épurée.
 * - "Nouveau Rapport" et "Mes Rapports" : visibles par tous.
 * - "Supervision" : uniquement ADMIN et MANAGER.
 */
export const Navbar: React.FC = () => {
    const [user, setUser] = useState<User | null>(null)
    const pathname = usePathname();
    const router = useRouter();
      const [loading, setLoading] = useState(true)

    
  const login= process.env.NEXT_PUBLIC_LOGIN_URL || '/login';   
    const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

    
  useEffect(() => {
    checkAuth()
  }, [])
    const navLinkClass = (href: string) =>
        `text-sm font-medium px-3 py-1.5 rounded transition-colors ${isActive(href)
            ? "bg-gray-100 text-gray-900 font-semibold"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
        }`;

    const handleLogout = async () => {
        await authService.logout();
        router.push("/login");
    };
    const checkAuth = async () => {
      try {
        const response = await fetch(`/api/auth/me`);
        if (!response.ok) {
          router.push(login)
          return;
        }
        const data = await response.json();
        setUser(data.user);
      } catch (err) {
        router.push(login)
      }
      finally{
        setLoading(false)
      }
      // Note: setLoading(false) est géré dans le finally de fetchEvents pour ne pas masquer le contenu
    };

    const isSuperior = user && (user.role === "Admin");
    if (loading) {
        return (
        <header className="h-16 border-b border-border bg-card flex items-center justify-end px-6">
            <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
        </header>
        )
    }
    return (
        <header className="bg-white border-b border-gray-300 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
                {/* Logo / Titre */}
                <Link href="/dashboard" className="flex items-center gap-2">
                    <span className="text-base font-bold text-gray-900 tracking-tight uppercase">
                        Rapports
                    </span>
                    <span className="text-xs text-gray-400 font-normal hidden sm:inline">— MESUPRES</span>
                </Link>

                {/* Navigation */}
                <nav className="flex items-center gap-1">
                    <Link href="/dashboard/nouveau" className={navLinkClass("/dashboard/nouveau")}>
                        Nouveau Rapport
                    </Link>
                    <Link href="/dashboard" className={navLinkClass("/dashboard")}>
                        Mes Rapports
                    </Link>
                    {isSuperior && (
                        <Link href="/dashboard/supervision" className={navLinkClass("/dashboard/supervision")}>
                            Supervision
                        </Link>
                    )}
                </nav>

                {/* Profil + Déconnexion */}
                <div className="flex items-center gap-3">
                    {user && (
                        <span className="text-xs text-gray-500 hidden sm:inline">
                            {user.entite}
                            <span className="ml-1 text-gray-400">({user.role})</span>
                        </span>
                    )}
                    <button
                        onClick={handleLogout}
                        className="text-xs font-medium text-gray-500 hover:text-gray-900 border border-gray-300 px-3 py-1.5 rounded hover:bg-gray-50 transition-colors"
                    >
                        Déconnexion
                    </button>
                </div>
            </div>
        </header>
    );
};
