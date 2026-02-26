import { LoginRequest, SignupRequest, AuthResponse, Entite, User } from "../types";

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
 * Mock des utilisateurs pour la gestion admin.
 */
let MOCK_USERS: User[] = [
    { id: "001", email: "admin@mesupres.gov.mg", nom: "Administrateur Système", role: "ADMIN" },
    { id: "002", email: "agent@mesupres.gov.mg", nom: "Agent DSINT", role: "USER" },
    { id: "003", email: "directeur@mesupres.gov.mg", nom: "Directeur Général", role: "DIRECTEUR" },
];

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
     * Récupère la liste de tous les utilisateurs (ADMIN uniquement).
     */
    getUsers: async (): Promise<User[]> => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        return MOCK_USERS;
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
     * Permet à un administrateur de créer un utilisateur.
     */
    createUser: async (data: any): Promise<User> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const newUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            email: data.email,
            nom: data.nom,
            role: data.role,
        };
        MOCK_USERS = [newUser, ...MOCK_USERS];
        return newUser;
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
