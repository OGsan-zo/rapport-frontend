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
    getAllRapports: async (filters?: { semaine?: string; entite?: string }): Promise<ApiRapport[]> => {
        // Simulation du délai réseau
            await new Promise((resolve) => setTimeout(resolve, 600));
            
            // On part des données brutes (assurez-vous que MOCK_RAPPORTS est bien typé ApiRapport[])
            let result = [...MOCK_RAPPORTS];

            // 1. Filtrage par semaine (si une date est fournie)
            if (filters?.semaine) {
                result = result.filter((r) => 
                    r.calendrier.dateDebut <= filters.semaine! && 
                    r.calendrier.dateFin >= filters.semaine!
                );
            }

            // 2. Filtrage par entité (Accès via utilisateur.entite pour ApiRapport)
            if (filters?.entite) {
                result = result.filter((r) => 
                    r.user?.entite === filters.entite
                );
            }

            // 3. Tri par date de début décroissante (les plus récents en premier)
            return result.sort((a, b) => 
                (b.calendrier?.dateDebut || "").localeCompare(a.calendrier?.dateDebut || "")
            );
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
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mise à jour locale du mock (attention à déclarer MOCK_RAPPORTS avec 'let')
        MOCK_RAPPORTS = [rapport, ...MOCK_RAPPORTS];
        
        return rapport;
    },
};