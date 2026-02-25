"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLogin } from "../hooks/useLogin";

const loginSchema = z.object({
    email: z.string().email({ message: "Adresse email invalide." }),
    password: z.string().min(6, { message: "Le mot de passe doit faire au moins 6 caractères." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

/**
 * Formulaire de connexion sobre et professionnel.
 */
export const LoginForm = () => {
    const { login, isLoading, error, user } = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginFormValues) => {
        login(data);
    };

    if (user) {
        return (
            <div className="w-full max-w-sm p-8 bg-white border border-gray-300 rounded-lg shadow-sm text-center space-y-4">
                <div className="flex justify-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
                <div>
                    <h2 className="text-lg font-bold text-gray-900">Bienvenue, {user.nom}</h2>
                    <p className="text-sm text-gray-500 mt-1">Connexion réussie. Redirection en cours…</p>
                </div>
                <p className="text-xs text-gray-400">
                    Rôle : <span className="font-semibold text-gray-600">{user.role}</span>
                </p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-sm p-8 bg-white border border-gray-300 rounded-lg shadow-sm space-y-6">
            <div className="space-y-1">
                <h1 className="text-xl font-bold text-gray-900">Connexion</h1>
                <p className="text-sm text-gray-500">
                    Entrez vos identifiants pour accéder à l'application.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-1">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700 block">
                        Adresse email
                    </label>
                    <input
                        {...register("email")}
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        className={`w-full px-3 py-2 border rounded text-sm text-gray-900 placeholder-gray-400 transition-colors outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-gray-400"
                            }`}
                        disabled={isLoading}
                    />
                    {errors.email && (
                        <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
                    )}
                </div>

                <div className="space-y-1">
                    <label htmlFor="password" className="text-sm font-medium text-gray-700 block">
                        Mot de passe
                    </label>
                    <input
                        {...register("password")}
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className={`w-full px-3 py-2 border rounded text-sm text-gray-900 placeholder-gray-400 transition-colors outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? "border-red-500" : "border-gray-400"
                            }`}
                        disabled={isLoading}
                    />
                    {errors.password && (
                        <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>
                    )}
                </div>

                {error && (
                    <div className="p-3 bg-red-50 border border-red-300 rounded">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 px-4 bg-gray-900 hover:bg-black text-white text-sm font-semibold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Connexion…
                        </>
                    ) : (
                        "Se connecter"
                    )}
                </button>
            </form>

            <div className="border-t border-gray-200 pt-4">
                <p className="text-xs text-gray-400 text-center">
                    Compte supérieur : utilisez un email contenant «&nbsp;admin&nbsp;»
                </p>
            </div>
        </div>
    );
};
