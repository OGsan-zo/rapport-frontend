"use client";

import DashboardPage from "@/features/dashboard/DashboardPage";


export default function Dashboard() {
    return (
            <div className="space-y-6">
                {/* <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Nouveau Rapport</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Saisissez les activités, effets et impacts de la semaine.
                    </p>
                </div> */}
                <DashboardPage />
            </div>
        );
}