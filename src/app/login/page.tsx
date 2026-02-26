import React from "react";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { IMAGES } from "@/features/common/constants";
import Image from "next/image";

/**
 * Page de connexion moderne avec illustration.
 */
export default function LoginPage() {
    const currentYear = new Date().getFullYear();

    return (
        <main className="min-h-screen flex bg-white">
            {/* Côté gauche : Illustration (Visible uniquement sur les tablettes/PC) */}
            <div className="hidden lg:flex lg:w-1/2 bg-gray-50 flex-col items-center justify-center p-12 border-r border-gray-100">
                <div className="max-w-md w-full space-y-8 text-center">
                    <div className="relative w-full aspect-square max-w-[400px] mx-auto opacity-90 hover:opacity-100 transition-opacity">
                        <Image
                            src={IMAGES.ILLUSTRATION_LOGIN}
                            alt="Illustration"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                    <div className="space-y-3">
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                            Reporting Hebdomadaire
                        </h1>
                        <p className="text-gray-500 text-lg">
                            Générez et centralisez vos rapports administratifs en quelques clics.
                        </p>
                    </div>
                </div>
            </div>

            {/* Côté droit : Formulaire */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 bg-white">
                <div className="w-full max-w-[400px] space-y-8">
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10">
                                <Image
                                    src={IMAGES.LOGO_REPOBLIKA}
                                    alt="Logo Repoblika"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="h-8 w-[1px] bg-gray-300" />
                            <div className="relative w-10 h-10">
                                <Image
                                    src={IMAGES.LOGO_MESUPRES}
                                    alt="Logo MESUPRES"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        <h2 className="text-xs font-bold uppercase text-gray-400 tracking-[0.2em] mb-4">
                            Ministère de l&apos;Enseignement Supérieur
                        </h2>
                    </div>

                    <LoginForm />

                    <div className="text-center">
                        <p className="text-xs text-gray-400">
                            © {currentYear} - DSINT - MESUPRES
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
