"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserContextType } from "@/features/auth/types";
import { authService } from "@/features/auth/services/authService";

// 1. Déclaration du contexte
const UserContext = createContext<User | null>(null);
// const UserContext = createContext<UserContextType | undefined>(undefined);

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

    const fetchUser = async () => {
        try {
            const userData = await authService.checkAuth();
            setUser(userData);
        } catch (error) {
            setUser(null);
        }
    };

    // On garde le useEffect pour le chargement initial
    useEffect(() => {
        fetchUser();
    }, []);

    // ÉTAPE D (LA PLUS IMPORTANTE) : L'affectation au Context !
    // On passe la variable "user" dans la propriété "value" du Provider.
    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
    // return (
    //     <UserContext.Provider value={{ user, refreshUser: fetchUser }}>
    //         {children}
    //     </UserContext.Provider>
    // );
};