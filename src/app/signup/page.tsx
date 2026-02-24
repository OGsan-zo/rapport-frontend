import React from "react";
import { SignupForm } from "@/features/auth/components/SignupForm";

/**
 * Page d'inscription.
 */
export default function SignupPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
            {/* Background decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-1/2 -left-24 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            </div>

            <div className="z-10 w-full px-4 flex flex-col items-center">
                <SignupForm />

                <p className="mt-8 text-sm text-gray-500">
                    © {new Date().getFullYear()} Rapport Hebdomadaire. Tous droits réservés.
                </p>
            </div>
        </main>
    );
}
