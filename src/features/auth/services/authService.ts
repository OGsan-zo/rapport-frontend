
import { LoginRequest, AuthResponse, Entite, User } from "../types";

/**
 * Mock des entités disponibles.
 */
const MOCK_ENTITES: Entite[] = [
    { id: 1, nom: "DSINT" },
    { id: 2, nom: "Ressources Humaines" },
    { id: 3, nom: "Direction Générale" },
    { id: 4, nom: "Communication" },
    { id: 5, nom: "DAPS" },
];

/**
 * Mock — Compte supérieur (ADMIN)
 */
const MOCK_ADMIN: AuthResponse = {
    user: {
        id: 1,
        email: "admin@mesupres.gov.mg",
        entite: "Administrateur Système",
        role: "Admin",
    },
    token: "token_admin",
};

/**
 * Mock — Compte Directeur
 */
const MOCK_DIRECTEUR: AuthResponse = {
    user: {
        id: 3,
        email: "directeur@mesupres.gov.mg",
        entite: "Directeur Général",
        role: "Utilisateur",
    },
    token: "token_directeur",
};

/**
 * Mock — Compte utilisateur standard (USER)
 */
const MOCK_USER: AuthResponse = {
    user: {
        id: 2,
        email: "agent@mesupres.gov.mg",
        entite: "Agent DSINT",
        role: "Utilisateur",
    },
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.user_payload.fake_signature",
};
const API_URL = '/api/auth';
/**
 * Mock des utilisateurs pour la gestion admin.
 */
let MOCK_USERS: User[] = [
    { id: 1, email: "admin@mesupres.gov.mg", entite: "Administrateur Système", role: "Admin" },
    { id: 2, email: "agent@mesupres.gov.mg", entite: "Agent DSINT", role: "Utilisateur" },
    { id: 3, email: "directeur@mesupres.gov.mg", entite: "Directeur Général", role: "Utilisateur" },
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
    checkAuth: async (): Promise<User> => {

        const response = await fetch(`/api/auth/me`);
        const data = await response.json();
        const user = data.user;
        if (!response.ok) {
            // On extrait le message d'erreur du backend s'il existe
            throw new Error(data.message || data.error || 'Erreur lors de la connexion');
        }
        return user as User;
      
    },

    /**
     * Récupère la liste de tous les utilisateurs (ADMIN uniquement).
     */
    getUsers: async (): Promise<User[]> => {
        await new Promise((resolve) => setTimeout(resolve, 800));
        return MOCK_USERS;
    },

    createUser: async (data: any): Promise<User> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const newUser: User = {
            id: MOCK_USERS.length + 1,
            email: data.email,
            entite: data.nom,
            role: data.role,
        };
        MOCK_USERS = [newUser, ...MOCK_USERS];
        return newUser;
    },
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            // On extrait le message d'erreur du backend s'il existe
            throw new Error(data.message || data.error || 'Erreur lors de la connexion');
        }

        return data as AuthResponse;
    },

    logout: async (): Promise<void> => {
        await fetch(`${API_URL}/logout`, { method: 'POST' });
        await new Promise((resolve) => setTimeout(resolve, 300));
    },
};
