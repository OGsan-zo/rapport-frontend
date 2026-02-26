import { ApiRapport, RapportConsolide } from "../types";

/**
 * Données mock adaptées au nouveau format imbriqué (JSON)
 */
let MOCK_RAPPORTS: ApiRapport[] = [
    {
        id: 17, // ID numérique comme dans le JSON
        user: {
            email: "admin@gmail.com",
            entite: "DSINT",
            role: "Admin"
        },
        calendrier: {
            dateDebut: "2026-02-09",
            dateFin: "2026-02-13",
            typeCalendrier: { name: "Hebdomadaire" }
        },
        activites: [
            {
                name: "Maintenance préventive des serveurs",
                effectsImpacts: [
                    { effect: "Disponibilité du service augmentée à 99.9%", impact: "Continuité de service garantie" },
                    { effect: "Réduction des temps d'arrêt non planifiés", impact: "Productivité accrue des agents" }
                ],
            },
            {
                name: "Optimisation des requêtes SQL",
                effectsImpacts: [
                    { effect: "Temps de réponse réduit de 40%", impact: "Meilleure expérience utilisateur" }
                ],
            }
        ]
    },
    {
        id: 18,
        user: {
            email: "user@gmail.com",
            entite: "Ressources Humaines",
            role: "Utilisateur"
        },
        calendrier: {
            dateDebut: "2026-02-16",
            dateFin: "2026-02-20",
            typeCalendrier: { name: "Hebdomadaire" }
        },
        activites: [
            {
                name: "Déploiement de la nouvelle application de rapports",
                effectsImpacts: [
                    { effect: "Réduction du temps de traitement de 60%", impact: "Dématérialisation complète du processus de rapport" }
                ],
            },
        ],
      
    },
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
    saveRapport: async (idCalendrier: number, activites: any[]): Promise<ApiRapport> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Simulation d'un nouvel objet respectant l'interface ApiRapport
        const newRapport: ApiRapport = {
            id: Math.floor(Math.random() * 10000), // L'API utilise souvent des IDs numériques
            
            // Structure imbriquée pour le calendrier
            calendrier: {
                id: idCalendrier,
                dateDebut: "2026-03-02", // Devrait normalement être récupéré via le calendrierId
                dateFin: "2026-03-08",
                typeCalendrier: { name: "Hebdomadaire" }
            },

            // Structure imbriquée pour l'utilisateur/entité
            user: {
                email: "contact@domaine.mg",
                entite: "DSINT", 
                role: "Utilisateur"
            },

            // Mapping des lignes 
            activites: activites
        };

        // Mise à jour locale du mock (attention à déclarer MOCK_RAPPORTS avec 'let')
        MOCK_RAPPORTS = [newRapport, ...MOCK_RAPPORTS];
        
        return newRapport;
    },
};