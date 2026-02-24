"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../services/authService";
import { LoginRequest, User } from "../types";

/**
 * Hook personnalisé pour gérer la logique de connexion.
 */
export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const login = async (credentials: LoginRequest) => {
        setIsLoading(true);
        setError(null);
        setUser(null);

        try {
            const response = await authService.login(credentials);

            // Stockage local
            localStorage.setItem("auth_token", response.token);
            localStorage.setItem("user", JSON.stringify(response.user));

            // Mise à jour de l'état pour feedback UI
            setUser(response.user);

            // Délai court avant redirection pour laisser le temps de voir le message de succès
            setTimeout(() => {
                router.push("/dashboard");
            }, 2000);

            return response.user;
        } catch (err: any) {
            setError(err.message || "Une erreur est survenue lors de la connexion");
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        login,
        isLoading,
        error,
        user,
    };
};
