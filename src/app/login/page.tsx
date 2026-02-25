import React from "react";
import { LoginForm } from "@/features/auth/components/LoginForm";

/**
 * Page de connexion.
 */
export default function LoginPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <div className="w-full px-4 flex flex-col items-center gap-6">
                <div className="text-center">
                    <h2 className="text-xs font-bold uppercase text-gray-500 tracking-widest">
                        MESUPRES — Rapports Hebdomadaires
                    </h2>
                </div>

                <LoginForm />

                <p className="text-xs text-gray-400">
                    © 2026 - DSINT - MESUPRES
                </p>
            </div>
        </main>
    );
}
