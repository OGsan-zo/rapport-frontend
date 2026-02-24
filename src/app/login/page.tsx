import React from "react";
import { LoginForm } from "@/features/auth/components/LoginForm";

/**
 * Page de connexion.
 * Centre le LoginForm sur la page avec un arrière-plan premium.
 */
export default function LoginPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
            {/* Éléments décoratifs en arrière-plan */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-1/2 -right-24 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-24 left-1/2 w-80 h-80 bg-teal-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <div className="z-10 w-full px-4 flex flex-col items-center">
                <LoginForm />

                <p className="mt-8 text-sm text-gray-500">
                    © {new Date().getFullYear()} Rapport Hebdomadaire. Tous droits réservés.
                </p>
            </div>
        </main>
    );
}
