// import { useFetchAuth } from "@/hooks/useFetchAuth";
import { LogiqueIntervention } from "@/features/admin/type/logiqueIntervention/logiqueInterventionSchema";

// TODO: Décommenter quand l'API backend sera disponible
// const fetchAuth = useFetchAuth();

export const logiqueInterventionService = {

    getAll: async (): Promise<LogiqueIntervention[]> => {
        // const response = await fetchAuth("/api/logique-intervention", {
        //     method: "GET",
        //     headers: { "Content-Type": "application/json" },
        //     cache: "no-store",
        // });
        // if (!response.ok) {
        //     const err = await response.json().catch(() => ({}));
        //     throw new Error(err.message || err.error || `Erreur serveur: ${response.status}`);
        // }
        // const data = await response.json();
        // return data.data || data;
        return [];
    },

    create: async (nom: string): Promise<LogiqueIntervention> => {
        // const response = await fetchAuth("/api/logique-intervention", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ nom }),
        // });
        // if (!response.ok) {
        //     const err = await response.json().catch(() => ({}));
        //     throw new Error(err.message || err.error || `Erreur serveur: ${response.status}`);
        // }
        // const data = await response.json();
        // return data.data || data;
        return { id: 0, nom };
    },

    update: async (id: number, nom: string): Promise<LogiqueIntervention> => {
        // const response = await fetchAuth(`/api/logique-intervention?id=${id}`, {
        //     method: "PUT",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({ nom }),
        // });
        // if (!response.ok) {
        //     const err = await response.json().catch(() => ({}));
        //     throw new Error(err.message || err.error || `Erreur serveur: ${response.status}`);
        // }
        // const data = await response.json();
        // return data.data || data;
        return { id, nom };
    },

    delete: async (_id: number): Promise<void> => {
        // const response = await fetchAuth(`/api/logique-intervention?id=${_id}`, {
        //     method: "DELETE",
        //     headers: { "Content-Type": "application/json" },
        // });
        // if (!response.ok) {
        //     const err = await response.json().catch(() => ({}));
        //     throw new Error(err.message || err.error || `Erreur serveur: ${response.status}`);
        // }
    },
};
