"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../services/authService";
import { LoginRequest } from "../types";
import { useUser } from "../contexts/UserContext";

/**
 * Hook de connexion avec redirection basée sur le rôle.
 */
export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { setUser } = useUser();
    const router = useRouter();

    const login = async (credentials: LoginRequest) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await authService.login(credentials);

            // Mise à jour de l'état global pour déclencher la réactivité (Sidebar, etc.)
            setUser(response.user);

            // Redirection selon le rôle après un court délai
            setTimeout(() => {
                const role = response.user.role;
                if (role === "Admin") {
                    router.push("/admin/supervision");
                } else {
                    router.push("/dashboard/nouveau");
                }
            }, 1000);

            return response.user;
        } catch (err: any) {
            setError(err.message || "Une erreur est survenue lors de la connexion.");
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    return { login, isLoading, error };
};
