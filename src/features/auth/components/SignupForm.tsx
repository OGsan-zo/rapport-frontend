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
            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-green-100 text-center space-y-4">
                <div className="flex justify-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
                <h2 className="text-2xl font-bold">Compte créé !</h2>
                <p className="text-gray-500">
                    Bienvenue <strong>{user.nom}</strong>. <br />
                    Votre compte a été enregistré avec succès. Redirection...
                </p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-gray-100">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-gray-900">Inscription</h1>
                <p className="text-gray-500">Créez votre compte collaborateur</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Nom */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Nom complet</label>
                    <input
                        {...register("nom")}
                        type="text"
                        placeholder="Jean Dupont"
                        className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.nom ? "border-red-500" : "border-gray-200"
                            }`}
                    />
                    {errors.nom && <p className="text-xs text-red-500">{errors.nom.message}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <input
                        {...register("email")}
                        type="email"
                        placeholder="jean.dupont@entreprise.com"
                        className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.email ? "border-red-500" : "border-gray-200"
                            }`}
                    />
                    {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                </div>

                {/* Mot de passe */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Mot de passe</label>
                    <input
                        {...register("password")}
                        type="password"
                        placeholder="••••••••"
                        className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.password ? "border-red-500" : "border-gray-200"
                            }`}
                    />
                    {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
                </div>

                {/* Entité (Select) */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Entité / Département</label>
                    <select
                        {...register("entiteId")}
                        className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none transition-all bg-white ${errors.entiteId ? "border-red-500" : "border-gray-200"
                            }`}
                    >
                        <option value="">Sélectionnez une entité</option>
                        {entities.map((entite) => (
                            <option key={entite.id} value={entite.id}>
                                {entite.nom}
                            </option>
                        ))}
                    </select>
                    {errors.entiteId && <p className="text-xs text-red-500">{errors.entiteId.message}</p>}
                </div>

                {error && (
                    <div className="bg-red-50 p-3 rounded-lg border border-red-100 text-center">
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-lg active:transform active:scale-95 transition-all disabled:opacity-50"
                >
                    {isLoading ? "Création en cours..." : "S'inscrire"}
                </button>
            </form>

            <div className="text-center">
                <p className="text-sm text-gray-500">
                    Déjà un compte ?{" "}
                    <Link href="/login" className="text-blue-600 hover:underline">
                        Se connecter
                    </Link>
                </p>
            </div>
        </div>
    );
};
