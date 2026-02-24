import { LoginRequest, AuthResponse } from "../types";

/**
 * Mock de réponse API réussie pour démonstration.
 * Utile pour montrer le contrat attendu au développeur backend.
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
 * Service pour la gestion de l'authentification.
 */
export const authService = {
    /**
     * Simule un appel API de connexion.
     * @param credentials Email et mot de passe de l'utilisateur (LoginRequest).
     * @returns Une Promise résolvant avec MOCK_AUTH_SUCCESS.
     */
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        // Affichage des données prêtes à être envoyées (pour le feedback dev)
        console.log("%c Envoi de LoginRequest au backend :", "color: #3b82f6; font-weight: bold;");
        console.table(credentials);

        // Simulation d'un délai réseau de 1 seconde
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Pour la démo, on renvoie toujours le mock de succès
        return MOCK_AUTH_SUCCESS;
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
