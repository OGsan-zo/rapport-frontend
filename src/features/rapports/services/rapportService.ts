import { RapportConsolide } from "../types";

/**
 * Données mock enrichies avec plusieurs entités pour le filtre Supervision.
 */
let MOCK_RAPPORTS: RapportConsolide[] = [
    {
        id: "1",
        dateDebut: "2026-02-09",
        dateFin: "2026-02-13",
        dateCreation: "2026-02-14",
        entiteId: "1",
        entiteNom: "DSINT",
        lignes: [
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
        ],
        status: "VALIDE",
    },
    {
        id: "2",
        dateDebut: "2026-02-16",
        dateFin: "2026-02-20",
        dateCreation: "2026-02-21",
        entiteId: "1",
        entiteNom: "DSINT",
        lignes: [
            {
                name: "Déploiement de la nouvelle application de rapports",
                effectsImpacts: [
                    { effect: "Réduction du temps de traitement de 60%", impact: "Dématérialisation complète du processus de rapport" }
                ],
            },
        ],
        status: "VALIDE",
    },
    {
        id: "3",
        dateDebut: "2026-02-09",
        dateFin: "2026-02-13",
        dateCreation: "2026-02-14",
        entiteId: "2",
        entiteNom: "Ressources Humaines",
        lignes: [
            {
                name: "Traitement des dossiers de recrutement",
                effectsImpacts: [
                    { effect: "12 nouveaux agents recrutés", impact: "Renforcement des capacités institutionnelles" }
                ],
            },
            {
                name: "Organisation de formations internes",
                effectsImpacts: [
                    { effect: "80% du personnel formé", impact: "Amélioration des compétences" }
                ],
            }
        ],
        status: "TRANSMIS",
    },
];

export const rapportService = {
    /**
     * Récupère les rapports de l'utilisateur connecté.
     */
    getRapports: async (): Promise<RapportConsolide[]> => {
        await new Promise((resolve) => setTimeout(resolve, 600));
        return [...MOCK_RAPPORTS].sort((a, b) => b.dateDebut.localeCompare(a.dateDebut));
    },

    /**
     * Récupère tous les rapports (pour la Supervision), avec filtres optionnels.
     */
    getAllRapports: async (filters?: { semaine?: string; entiteId?: string }): Promise<RapportConsolide[]> => {
        await new Promise((resolve) => setTimeout(resolve, 600));
        let result = [...MOCK_RAPPORTS];

        if (filters?.semaine) {
            result = result.filter(
                (r) => r.dateDebut <= filters.semaine! && r.dateFin >= filters.semaine!
            );
        }

        if (filters?.entiteId) {
            result = result.filter((r) => r.entiteId === filters.entiteId);
        }

        return result.sort((a, b) => b.dateDebut.localeCompare(a.dateDebut));
    },

    /**
     * Récupère un rapport par son identifiant.
     */
    getRapportById: async (id: string): Promise<RapportConsolide | undefined> => {
        await new Promise((resolve) => setTimeout(resolve, 400));
        return MOCK_RAPPORTS.find((r) => r.id === id);
    },

    /**
     * Enregistre un nouveau rapport.
     */
    saveRapport: async (idCalendrier: number, activites: any[]): Promise<RapportConsolide> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Note: Dans un environnement réel, on ferait un fetch POST avec { idCalendrier, activites }
        const newRapport: RapportConsolide = {
            id: Math.random().toString(36).substr(2, 9),
            dateDebut: "2026-03-02", // Simulé
            dateFin: "2026-03-06",   // Simulé
            dateCreation: new Date().toISOString().split("T")[0],
            entiteId: "1",
            entiteNom: "DSINT",
            lignes: activites.map(a => ({
                name: a.entite, // Mapping bizarre de l'API : entite -> name
                effectsImpacts: a.effectsImpacts
            })),
            status: "VALIDE",
        };

        MOCK_RAPPORTS = [newRapport, ...MOCK_RAPPORTS];
        return newRapport;
    },

    /**
     * Retourne la liste unique d'entités présentes dans les rapports.
     */
    getEntitesFromRapports: (): { id: string; nom: string }[] => {
        const map = new Map<string, string>();
        MOCK_RAPPORTS.forEach((r) => map.set(r.entiteId, r.entiteNom));
        return Array.from(map.entries()).map(([id, nom]) => ({ id, nom }));
    },
};
