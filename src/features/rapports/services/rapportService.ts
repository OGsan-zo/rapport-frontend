import { RapportConsolide, SaveRapportRequest } from "../types";

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
                activites: ["Maintenance préventive des serveurs", "Optimisation des requêtes SQL"],
                effets: ["Disponibilité du service augmentée à 99.9%", "Temps de réponse réduit de 40%"],
                impacts: ["Continuité de service garantie", "Meilleure expérience utilisateur"],
            },
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
                activites: ["Déploiement de la nouvelle application de rapports"],
                effets: ["Réduction du temps de traitement de 60%"],
                impacts: ["Dématérialisation complète du processus de rapport"],
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
                activites: ["Traitement des dossiers de recrutement", "Organisation de formations internes"],
                effets: ["12 nouveaux agents recrutés", "80% du personnel formé"],
                impacts: ["Renforcement des capacités institutionnelles"],
            },
        ],
        status: "TRANSMIS",
    },
    {
        id: "4",
        dateDebut: "2026-02-16",
        dateFin: "2026-02-20",
        dateCreation: "2026-02-22",
        entiteId: "3",
        entiteNom: "Direction Générale",
        lignes: [
            {
                activites: ["Réunion de coordination ministerielle", "Révision du plan stratégique 2026"],
                effets: ["Alignement des objectifs entre les directions"],
                impacts: ["Cohérence renforcée de la politique ministérielle"],
            },
        ],
        status: "BROUILLON",
    },
    {
        id: "5",
        dateDebut: "2026-02-16",
        dateFin: "2026-02-20",
        dateCreation: "2026-02-21",
        entiteId: "5",
        entiteNom: "DAPS",
        lignes: [
            {
                activites: ["Contrôle de conformité des dossiers académiques"],
                effets: ["350 dossiers vérifiés et validés"],
                impacts: ["Fiabilité accrue des données académiques nationales"],
            },
        ],
        status: "VALIDE",
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
    saveRapport: async (data: SaveRapportRequest): Promise<RapportConsolide> => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newRapport: RapportConsolide = {
            id: Math.random().toString(36).substr(2, 9),
            dateDebut: data.dateDebut,
            dateFin: data.dateFin,
            dateCreation: new Date().toISOString().split("T")[0],
            entiteId: "1",
            entiteNom: "DSINT",
            lignes: data.lignes,
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
