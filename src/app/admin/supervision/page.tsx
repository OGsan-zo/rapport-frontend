"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SupervisionView } from "@/features/rapports/components/vision/SupervisionView";
import { User } from "@/features/auth/types";

import { authService } from "@/features/auth/services/authService";
/**
 * Page Supervision — accessible uniquement aux ADMIN et MANAGER.
 * Redirige les utilisateurs standards vers /dashboard/nouveau.
 */
export default function SupervisionPage() {
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
