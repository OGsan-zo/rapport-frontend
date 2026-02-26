import { LoginRequest, SignupRequest, AuthResponse, Entite } from "../types";

/**
 * Mock des entités disponibles.
 */
const MOCK_ENTITES: Entite[] = [
    { id: "1", nom: "DSINT" },
    { id: "2", nom: "Ressources Humaines" },
    { id: "3", nom: "Direction Générale" },
    { id: "4", nom: "Communication" },
    { id: "5", nom: "DAPS" },
];

/**
 * Mock — Compte supérieur (ADMIN)
 */
const MOCK_ADMIN: AuthResponse = {
    user: {
        id: "001",
        email: "admin@mesupres.gov.mg",
        nom: "Administrateur Système",
        role: "ADMIN",
    },
    token: "token_admin",
};

/**
 * Mock — Compte Directeur
 */
const MOCK_DIRECTEUR: AuthResponse = {
    user: {
        id: "003",
        email: "directeur@mesupres.gov.mg",
        nom: "Directeur Général",
        role: "DIRECTEUR",
    },
    token: "token_directeur",
};

/**
 * Mock — Compte utilisateur standard (USER)
 */
const MOCK_USER: AuthResponse = {
    user: {
        id: "002",
        email: "agent@mesupres.gov.mg",
        nom: "Agent DSINT",
        role: "USER",
    },
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.user_payload.fake_signature",
};

/**
 * Service d'authentification (mock statique).
 */
export const authService = {
    /**
     * Récupère la liste des entités disponibles (simulé).
     */
    getEntites: async (): Promise<Entite[]> => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return MOCK_ENTITES;
    },

    /**
     * Simule un appel API de connexion.
     * - email contenant "admin" → rôle ADMIN (supérieur)
     * - sinon → rôle USER (agent standard)
     */
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (credentials.email.toLowerCase().includes("admin")) {
            return MOCK_ADMIN;
        }
        if (credentials.email.toLowerCase().includes("direct@")) {
            return MOCK_DIRECTEUR;
        }
        return MOCK_USER;
    },

    /**
     * Simule un appel API d'inscription.
     */
    signup: async (data: SignupRequest): Promise<AuthResponse> => {
        await new Promise((resolve) => setTimeout(resolve, 1200));
        return {
            ...MOCK_USER,
            user: {
                ...MOCK_USER.user,
                email: data.email,
                nom: data.nom,
            },
        };
    },

    /**
     * Déconnexion.
     */
    logout: async (): Promise<void> => {
        await new Promise((resolve) => setTimeout(resolve, 300));
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
    },
};
