"use client";

import React, { useState } from "react";
import { UserList } from "@/features/admin/components/UserList";
import { UserAdminForm } from "@/features/admin/components/UserAdminForm";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { useRouter } from "next/navigation";

export default function AdminUsersPage() {
    const user = useCurrentUser();
    const router = useRouter();
    const [showForm, setShowForm] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    // Guard express : Seul l'ADMIN peut voir cette page
    if (user && user.role !== "ADMIN") {
        router.push("/dashboard");
        return null;
    }

    if (!user) return null;

    const handleSuccess = () => {
        setShowForm(false);
        setRefreshKey(prev => prev + 1);
    };

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-10 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-100">
                <div className="space-y-1">
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.3em]">Administration</span>
                    <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Gestion des Utilisateurs</h1>
                </div>
            </div>

            {showForm ? (
                <div className="flex justify-center py-10">
                    <UserAdminForm
                        onSuccess={handleSuccess}
                        onCancel={() => setShowForm(false)}
                    />
                </div>
            ) : (
                <UserList refreshKey={refreshKey} onAddUser={() => setShowForm(true)} />
            )}
        </div>
    );
}
