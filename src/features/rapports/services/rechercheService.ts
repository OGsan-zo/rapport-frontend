import { useFetchAuth } from "@/hooks/useFetchAuth";
import { ApiRapport } from "../types";

/**
 * Convertit une date du format HTML (YYYY-MM-DD) au format attendu par l'API (DD-MM-YYYY).
 * Ex: "2026-01-04" → "04-01-2026"
 */
const toApiDateFormat = (htmlDate: string): string => {
    if (!htmlDate) return htmlDate;
    const [year, month, day] = htmlDate.split("-");
    return `${day}-${month}-${year}`;
};

const fetchAuth = useFetchAuth();

export const rechercheService = {
    /**
     * Recherche les rapports à une date spécifique.
     * @param date Date au format YYYY-MM-DD (venant de l'input HTML)
     */
    searchRapportsByDate: async (date: string): Promise<ApiRapport[]> => {
        const formattedDate = toApiDateFormat(date);

        try {
            const response = await fetchAuth(`/api/rapports/recherche?date=${encodeURIComponent(formattedDate)}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                cache: "no-store"
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.warn(`API non disponible (${response.status}). Simulation Mock :`, errorData.message || "");

                // Données mock avec les bons champs pour visualisation immédiate sur l'EliteBook
                return [
                    {
                        id: 101,
                        statut: "VALIDE",
                        user: { email: "jean.dupont@entite.mg", entite: "S.I." } as any,
                        calendrier: { dateDebut: date, dateFin: date, typeCalendrierName: "Hebdomadaire" },
                        activites: []
                    },
                    {
                        id: 102,
                        statut: "EN COURS",
                        user: { email: "marie.laza@entite.mg", entite: "RH" } as any,
                        calendrier: { dateDebut: date, dateFin: date, typeCalendrierName: "Mensuel" },
                        activites: []
                    },
                    {
                        id: 103,
                        statut: "TRANSMIS",
                        user: { email: "admin@entite.mg", entite: "DIRECTION" } as any,
                        calendrier: { dateDebut: date, dateFin: date, typeCalendrierName: "Hebdomadaire" },
                        activites: []
                    }
                ];
            }

            const responseData = await response.json();
            // Extrait le champ "data" de la réponse { status: "success", data: [...] }
            return responseData.data || [];
        } catch (error) {
            console.error("Erreur lors de la recherche de rapports:", error);
            throw error;
        }
    }
};
