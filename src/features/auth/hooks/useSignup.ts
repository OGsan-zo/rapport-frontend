"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../services/authService";
import { SignupRequest, Entite, User } from "../types";

/**
 * Hook pour gérer la logique d'inscription (Signup).
 */
export const useSignup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [entities, setEntities] = useState<Entite[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    // Chargement des entités au montage du hook
    useEffect(() => {
        const fetchEntities = async () => {
            try {
                const data = await authService.getEntites();
                setEntities(data);
            } catch (err) {
                console.error("Erreur lors du chargement des entités", err);
            }
        };
        fetchEntities();
    }, []);

    const signup = async (data: SignupRequest) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await authService.signup(data);

            // Stockage local (optionnel selon le flow, ici on connecte l'utilisateur direct)
            localStorage.setItem("auth_token", response.token);
            localStorage.setItem("user", JSON.stringify(response.user));

            setUser(response.user);

            // Redirection après un court délai
            setTimeout(() => {
                router.push("/dashboard");
            }, 2000);

            return response.user;
        } catch (err: any) {
            setError(err.message || "Erreur lors de la création du compte");
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        signup,
        entities,
        isLoading,
        error,
        user,
    };
};
