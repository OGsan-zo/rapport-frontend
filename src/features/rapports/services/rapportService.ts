import { RapportConsolide } from "../types";

/**
 * Données mock adaptées au nouveau format imbriqué (JSON)
 */
let MOCK_RAPPORTS: RapportConsolide[] = [
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
                activite: { id: 101, name: "Maintenance serveurs" },
                effectsImpacts: [
                    { 
                        id: 1, 
                        effect: "Disponibilité augmentée à 99.9%", 
                        impact: "Continuité de service garantie" 
                    }
                ]
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
                activite: { id: 102, name: "Recrutement" },
                effectsImpacts: [
                    { 
                        id: 3, 
                        effect: "12 nouveaux agents", 
                        impact: "Renforcement des capacités" 
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
    getRapports: async (): Promise<RapportConsolide[]> => {
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
            const data: RapportConsolide[] = responseData.data;

            // Tri par date de début décroissante (les plus récents en premier)
            return data;
        } catch (error) {
            throw error;
        }
    },

    /**
     * Récupère tous les rapports avec les nouveaux chemins d'accès.
     */
    getAllRapports: async (filters?: { semaine?: string; entite?: string }): Promise<RapportConsolide[]> => {
        await new Promise((resolve) => setTimeout(resolve, 600));
        let result = [...MOCK_RAPPORTS];

        if (filters?.semaine) {
            result = result.filter(
                (r) => r.calendrier.dateDebut <= filters.semaine! && r.calendrier.dateFin >= filters.semaine!
            );
        }

        if (filters?.entite) {
            result = result.filter((r) => r.user.entite === filters.entite);
        }

        return result.sort((a, b) => b.calendrier.dateDebut.localeCompare(a.calendrier.dateDebut));
    },

    /**
     * Récupère un rapport par son identifiant (attention: id est number).
     */
    getRapportById: async (id: number): Promise<RapportConsolide | undefined> => {
        await new Promise((resolve) => setTimeout(resolve, 400));
        return MOCK_RAPPORTS.find((r) => r.id === id);
    },

    /**
     * Retourne la liste unique d'entités (extraite de l'objet utilisateur).
     */
    getEntitesFromRapports: (): string[] => {
        const set = new Set<string>();
        MOCK_RAPPORTS.forEach((r) => set.add(r.user.entite));
        return Array.from(set);
    },
};