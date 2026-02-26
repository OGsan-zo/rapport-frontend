"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSignup } from "../hooks/useSignup";
import Link from "next/link";

// Schéma de validation
const signupSchema = z.object({
    nom: z.string().min(2, { message: "Le nom doit faire au moins 2 caractères" }),
    email: z.string().email({ message: "Email invalide" }),
    password: z
        .string()
        .min(6, { message: "Le mot de passe doit faire au moins 6 caractères" }),
    entiteId: z.string().min(1, { message: "Veuillez sélectionner une entité" }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

/**
 * Composant de formulaire d'inscription.
 */
export const SignupForm = () => {
    const { signup, entities, isLoading, error, user } = useSignup();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = (data: SignupFormValues) => {
        signup(data);
    };

    // État de succès
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
                    <h2 className="text-lg font-bold text-gray-900">Compte créé !</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Bienvenue <strong>{user.nom}</strong>. <br />
                        Redirection en cours…
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-sm p-8 bg-white border border-slate-100 rounded-lg shadow-sm space-y-6">
            <div className="space-y-1">
                <h1 className="text-xl font-bold text-gray-900">Inscription</h1>
                <p className="text-sm text-gray-500">Créez votre compte collaborateur</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Nom */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 block">Nom complet</label>
                    <input
                        {...register("nom")}
                        type="text"
                        placeholder="Jean Dupont"
                        className={`w-full px-3 py-2 border rounded text-sm text-gray-900 placeholder-gray-400 transition-colors outline-none focus:ring-2 focus:ring-blue-500 ${errors.nom ? "border-red-500" : "border-slate-200"
                            }`}
                    />
                    {errors.nom && <p className="text-xs text-red-600 mt-1">{errors.nom.message}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 block">Adresse email</label>
                    <input
                        {...register("email")}
                        type="email"
                        placeholder="jean.dupont@mesupres.gov.mg"
                        className={`w-full px-3 py-2 border rounded text-sm text-gray-900 placeholder-gray-400 transition-colors outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-slate-200"
                            }`}
                    />
                    {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
                </div>

                {/* Mot de passe */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 block">Mot de passe</label>
                    <input
                        {...register("password")}
                        type="password"
                        placeholder="••••••••"
                        className={`w-full px-3 py-2 border rounded text-sm text-gray-900 placeholder-gray-400 transition-colors outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? "border-red-500" : "border-slate-200"
                            }`}
                    />
                    {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>}
                </div>

                {/* Entité (Select) */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 block">Entité / Département</label>
                    <select
                        {...register("entiteId")}
                        className={`w-full px-3 py-2 border rounded text-sm text-gray-900 transition-colors outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none ${errors.entiteId ? "border-red-500" : "border-slate-200"
                            }`}
                        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2394a3b8\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\' /%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1em' }}
                    >
                        <option value="">Sélectionnez une entité</option>
                        {entities.map((entite) => (
                            <option key={entite.id} value={entite.id}>
                                {entite.nom}
                            </option>
                        ))}
                    </select>
                    {errors.entiteId && <p className="text-xs text-red-600 mt-1">{errors.entiteId.message}</p>}
                </div>

                {error && (
                    <div className="p-3 bg-red-50 border border-red-300 rounded text-center">
                        <p className="text-sm text-red-700">{error}</p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 px-4 bg-gray-900 hover:bg-black text-white text-sm font-semibold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
                >
                    {isLoading ? "Création en cours..." : "S'inscrire"}
                </button>
            </form>

            <div className="text-center pt-2">
                <p className="text-xs text-gray-400">
                    Déjà un compte ?{" "}
                    <Link href="/login" className="text-blue-600 font-semibold hover:underline">
                        Se connecter
                    </Link>
                </p>
            </div>
        </div>
    );
};
