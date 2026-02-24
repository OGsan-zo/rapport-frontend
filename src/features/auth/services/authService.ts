import { LoginRequest, SignupRequest, AuthResponse, Entite } from "../types";

/**
 * Mock de réponse API réussie pour démonstration.
 */
export const MOCK_AUTH_SUCCESS: AuthResponse = {
    user: {
        id: "123",
        email: "zo-kely@example.com",
        nom: "Kely Zo",
        role: "ADMIN",
    },
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake_payload.fake_signature",
};

/**
 * Mock des entités pour le formulaire d'inscription.
 */
const MOCK_ENTITES: Entite[] = [
    { id: "1", nom: "Informatique" },
    { id: "2", nom: "Ressources Humaines" },
    { id: "3", nom: "Direction" },
    { id: "4", nom: "Communication" },
];

/**
 * Service pour la gestion de l'authentification et de l'inscription.
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
     */
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        console.log("%c Envoi de LoginRequest au backend :", "color: #3b82f6; font-weight: bold;");
        console.table(credentials);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return MOCK_AUTH_SUCCESS;
    },

    /**
     * Simule un appel API d'inscription.
     * @param data Données d'inscription (SignupRequest).
     */
    signup: async (data: SignupRequest): Promise<AuthResponse> => {
        console.log("%c Envoi de SignupRequest au backend :", "color: #10b981; font-weight: bold;");
        console.table(data);

        // Simulation d'un délai réseau
        await new Promise((resolve) => setTimeout(resolve, 1200));

        // On renvoie un mock de succès après création
        return {
            ...MOCK_AUTH_SUCCESS,
            user: {
                ...MOCK_AUTH_SUCCESS.user,
                email: data.email,
                nom: data.nom,
            }
        };
    },

    /**
     * Simule une déconnexion.
     */
    logout: async (): Promise<void> => {
        await new Promise((resolve) => setTimeout(resolve, 500));
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
    },
};
