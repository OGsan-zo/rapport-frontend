"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../services/authService";
import { LoginRequest, User } from "../types";

/**
 * Hook de connexion avec redirection basée sur le rôle.
 * - USER → /dashboard/nouveau (formulaire de saisie)
 * - ADMIN / MANAGER → /dashboard/supervision
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

            // Mise à jour de l'état pour feedback UI
            setUser(response.user);

            // Redirection selon le rôle après un court délai (affichage du message de succès)
            setTimeout(() => {
                const role = response.user.role;
                if (role === "Admin") {
                    router.push("/dashboard/supervision");
                } else {
                    router.push("/dashboard/nouveau");
                }
            }, 1500);

            return response.user;
        } catch (err: any) {
            setError(err.message || "Une erreur est survenue lors de la connexion.");
            // throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { login, isLoading, error, user };
};
