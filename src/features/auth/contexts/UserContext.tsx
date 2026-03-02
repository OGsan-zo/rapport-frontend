"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/features/auth/types";
import { authService } from "@/features/auth/services/authService";

// 1. Déclaration du contexte
const UserContext = createContext<User | null>(null);

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser doit être utilisé à l'intérieur d'un UserProvider");
    }
    return context;
};

// 2. Le Composant Provider qui gère l'affectation
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    // ÉTAPE A : Création de la variable qui va stocker la donnée
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // ÉTAPE B : On récupère la donnée de l'API
        const fetchUser = async () => {
            try {
                const userData = await authService.checkAuth();
                // ÉTAPE C : On affecte la donnée à notre variable locale
                setUser(userData); 
            } catch (error) {
                setUser(null);
            }
        };
        fetchUser();
    }, []);

    // ÉTAPE D (LA PLUS IMPORTANTE) : L'affectation au Context !
    // On passe la variable "user" dans la propriété "value" du Provider.
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};