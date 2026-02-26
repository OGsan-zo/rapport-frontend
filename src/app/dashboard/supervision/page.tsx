"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SupervisionView } from "@/features/rapports/components/SupervisionView";
import { User } from "@/features/auth/types";

import { authService } from "@/features/auth/services/authService";
/**
 * Page Supervision — accessible uniquement aux ADMIN et MANAGER.
 * Redirige les utilisateurs standards vers /dashboard/nouveau.
 */
export default function SupervisionPage() {
    const [user, setUser] = useState<User | null>(null)
    const router = useRouter();
    const [loading, setLoading] = useState(true)
    const login= process.env.NEXT_PUBLIC_LOGIN_URL || '/login';
    useEffect(() => {
        checkAuth()
    },[]);

    const checkAuth = async () => {
      try {
        const user = await authService.checkAuth();
        setUser(user);
        if (user.role !== "Admin") {
        authService.logout();
          router.push(login);
        }
      } catch (err) {
        authService.logout();
        router.push(login);
      }
      finally{
        setLoading(false);
      }
      // Note: setLoading(false) est géré dans le finally de fetchEvents pour ne pas masquer le contenu
    };

    // Pendant le chargement, on n'affiche rien pour éviter le flash
    if (loading) {
        return (
        <header className="h-16 border-b border-border bg-card flex items-center justify-end px-6">
            <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
        </header>
        )
    }

    return (
        <div className="space-y-6">
            {/* <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Supervision</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Visualisez l'ensemble des rapports soumis par toutes les entités.
                </p>
            </div> */}
            <SupervisionView />
        </div>
    );
}
