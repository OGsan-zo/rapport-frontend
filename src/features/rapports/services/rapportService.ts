import { ApiRapport, RapportConsolide } from "../types";

/**
 * Données mock adaptées au nouveau format imbriqué (JSON)
 */
let MOCK_RAPPORTS: ApiRapport[] = [
    {
            // dateValidation: null,
            id: 26,
            user: {
                email: "admin@gmail.com",
                entite: "Admin",
                role: "Admin"
            },
            calendrier: {
                dateDebut: "2026-01-01",
                dateFin: "2026-01-31",
                typeCalendrier: {
                    name: "Hebdomadaire"
                }
            },
            activites: [
                {
                    activite: {
                        name: "Reboisement communautaire",
                        id: 30
                    },
                    impacts: [
                        {
                            name: "Augmentation de la biodiversité",
                            id: 7
                        },
                        {
                            name: "Sensibilisation environnementale de la population",
                            id: 8
                        }
                    ],
                    effects: [
                        {
                            name: "Amélioration de la qualité de l'air",
                            id: 9
                        },
                        {
                            name: "Réduction de l'érosion des sols",
                            id: 10
                        }
                    ]
                },
                {
                    activite: {
                        name: "Campagne de sensibilisation environnementale",
                        id: 31
                    },
                    impacts: [
                        {
                            "name": "Amélioration de la propreté urbaine",
                            "id": 11
                        },
                        {
                            "name": "Diminution de la pollution",
                            id: 12
                        }
                    ],
                    effects: [
                        {
                            name: "Augmentation de la sensibilisation",
                            id: 13
                        },
                        {
                            name: "Changement de comportement des citoyens",
                            id: 14
                        },
                        {
                            name: "Réduction des déchets plastiques",
                            id: 15
                        }
                    ]
                },
                {
                    activite: {
                        name: "Atelier de formation en gestion des déchets",
                        id: 32
                    },
                    impacts: [
                        {
                            name: "Meilleure gestion des ressources locales",
                            id: 16
                        },
                        {
                            name: "Réduction de la pollution environnementale",
                            id: 17
                        }
                    ],
                    effects: [
                        {
                            name: "Acquisition de bonnes pratiques",
                            id: 18
                        },
                        {
                            name: "Réduction des déchets industriels",
                            id: 19
                        }
                    ]
                }
            ]
        }
];

export const rapportService = {
    /**
     * Récupère les rapports de l'utilisateur connecté.
     */
    getRapports: async (): Promise<ApiRapport[]> => {
        try {
            // L'appel se fait sur la route interne de Next.js
            const response = await fetch("/api/rapports", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                // Désactiver le cache si vous voulez des données en temps réel
                cache: "no-store" 
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Erreur serveur: ${response.status}`);
            }
            const responseData = await response.json();
            const data: ApiRapport[] = responseData.data;

            // Tri par date de début décroissante (les plus récents en premier)
            return data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Récupère tous les rapports avec les nouveaux chemins d'accès.
     */
    getAllRapports: async (idCalendrier?: number): Promise<ApiRapport[]> => {
        try {
            // L'appel se fait sur la route interne de Next.js
            const response = await fetch(`/api/rapports/calendrier?idCalendrier=${encodeURIComponent(idCalendrier || 0)}`);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Erreur serveur: ${response.status}`);
            }
            const responseData = await response.json();
            const data: ApiRapport[] = responseData.data;

            // Tri par date de début décroissante (les plus récents en premier)
            return data;
        } catch (error) {
            throw error;
        }
    },

        /**
         * Récupère un rapport par son identifiant (attention: id est number).
         */
        getRapportById: async (id: number): Promise<ApiRapport | undefined> => {
        await new Promise((resolve) => setTimeout(resolve, 400));
        return MOCK_RAPPORTS.find((r) => r.id === id);
    },

    /**
     * Enregistre un nouveau rapport avec la structure ApiRapport.
     */
    saveRapport: async (rapport: ApiRapport): Promise<ApiRapport> => {
        try {
            // L'appel se fait sur la route interne de Next.js
            const response = await fetch("/api/rapports", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(rapport),
                // Désactiver le cache si vous voulez des données en temps réel
                cache: "no-store" 
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Erreur serveur: ${response.status}`);
            }
            const responseData = await response.json();
            const data: ApiRapport = responseData.data;

            // Tri par date de début décroissante (les plus récents en premier)
            return data;
        } catch (error) {
            throw error;
        }
    },
    updateRapport: async (idCalendrier: number, rapport: ApiRapport): Promise<ApiRapport> => {
        try {
            // L'appel se fait sur la route interne de Next.js
            const response = await fetch(`/api/rapports/${idCalendrier}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(rapport),
                cache: "no-store" // désactiver le cache si nécessaire
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `Erreur serveur: ${response.status}`);
            }

            const responseData = await response.json();
            const data: ApiRapport = responseData.data;

            // Ici on peut trier ou traiter les données si nécessaire
            return data;
        } catch (error) {
            throw error;
        }
    },
};