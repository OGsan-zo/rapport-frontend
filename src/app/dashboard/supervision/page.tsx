"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SupervisionView } from "@/features/rapports/components/SupervisionView";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";

/**
 * Page Supervision — accessible uniquement aux ADMIN et MANAGER.
 * Redirige les utilisateurs standards vers /dashboard/nouveau.
 */
export default function SupervisionPage() {
    const user = useCurrentUser();
    const router = useRouter();

    useEffect(() => {
        // Une fois le user chargé depuis localStorage, on vérifie le rôle
        if (user !== null && user.role !== "ADMIN" && user.role !== "MANAGER") {
            router.replace("/dashboard/nouveau");
        }
    }, [user, router]);

    // Pendant le chargement, on n'affiche rien pour éviter le flash
    if (user === null) {
        return (
            <div className="flex items-center justify-center py-24">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
            </div>
        );
    }

    // Si rôle insuffisant, le useEffect redirige — on n'affiche rien en attendant
    if (user.role !== "ADMIN" && user.role !== "MANAGER") {
        return null;
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
