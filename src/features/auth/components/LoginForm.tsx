"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLogin } from "../hooks/useLogin";

// Schéma de validation avec Zod
const loginSchema = z.object({
    email: z.string().email({ message: "Email invalide" }),
    password: z
        .string()
        .min(6, { message: "Le mot de passe doit faire au moins 6 caractères" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

/**
 * Composant de formulaire de connexion raffiné.
 * Affiche un feedback clair sur le contrat d'API et le succès.
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

    // Si l'utilisateur est connecté (simulé), on affiche le message de succès
    if (user) {
        return (
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-green-100 text-center animate-in fade-in zoom-in duration-300">
                <div className="flex justify-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                        <svg
                            className="w-10 h-10 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            ></path>
                        </svg>
                    </div>
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-gray-900">Bienvenue, {user.nom} !</h2>
                    <p className="text-gray-500">
                        Connexion réussie. Redirection vers votre tableau de bord...
                    </p>
                </div>
                <div className="flex justify-center">
                    <div className="w-12 h-1 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <p className="text-xs text-gray-400 italic">
                    Rôle détecté : {user.role}
                </p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-gray-100">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-gray-900">Connexion</h1>
                <p className="text-gray-500">
                    Entrez vos identifiants pour tester le contrat API
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <label
                        htmlFor="email"
                        className="text-sm font-medium text-gray-700 block"
                    >
                        Email (LoginRequest.email)
                    </label>
                    <input
                        {...register("email")}
                        id="email"
                        type="email"
                        placeholder="votre@email.com"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-200"
                            } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none`}
                        disabled={isLoading}
                    />
                    {errors.email && (
                        <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label
                        htmlFor="password"
                        className="text-sm font-medium text-gray-700 block"
                    >
                        Mot de passe (LoginRequest.password)
                    </label>
                    <input
                        {...register("password")}
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.password ? "border-red-500" : "border-gray-200"
                            } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none`}
                        disabled={isLoading}
                    />
                    {errors.password && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-600 text-center">{error}</p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isLoading ? (
                        <>
                            <svg
                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                            Envoi de la requête...
                        </>
                    ) : (
                        "Tester le Login"
                    )}
                </button>
            </form>

            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <p className="text-[10px] text-slate-500 uppercase font-bold mb-1 tracking-wider">
                    Contrat API attendu (AuthResponse)
                </p>
                <pre className="text-[10px] text-slate-600 overflow-x-auto">
                    {`{
  "user": { "id": "123", "nom": "...", "role": "..." },
  "token": "JWT..."
}`}
                </pre>
            </div>

            <div className="text-center pt-2">
                <p className="text-xs text-slate-400">
                    Ouvrez la console pour voir le console.table()
                </p>
            </div>
        </div>
    );
};
