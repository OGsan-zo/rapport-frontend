"use client";

import { useState, useEffect } from "react";
import { User } from "../types";

/**
 * Hook utilitaire pour lire l'utilisateur connecté depuis le localStorage.
 * Permet à la Navbar et aux pages de connaître le rôle courant.
 */
export const useCurrentUser = (): User | null => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) {
            try {
                setUser(JSON.parse(stored) as User);
            } catch {
                setUser(null);
            }
        }
    }, []);

    return user;
};
