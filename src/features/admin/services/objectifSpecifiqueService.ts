// import { useFetchAuth } from "@/hooks/useFetchAuth";
import { ObjectifSpecifique } from "@/features/admin/type/objectifSpecifique/objectifSpecifiqueSchema";

// TODO: Décommenter quand l'API backend sera disponible
// const fetchAuth = useFetchAuth();

export const objectifSpecifiqueService = {

    getAll: async (): Promise<ObjectifSpecifique[]> => {
        // const response = await fetchAuth("/api/objectifs-specifiques", {
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

    create: async (nom: string): Promise<ObjectifSpecifique> => {
        // const response = await fetchAuth("/api/objectifs-specifiques", {
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

    update: async (id: number, nom: string): Promise<ObjectifSpecifique> => {
        // const response = await fetchAuth(`/api/objectifs-specifiques?id=${id}`, {
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
        // const response = await fetchAuth(`/api/objectifs-specifiques?id=${_id}`, {
        //     method: "DELETE",
        //     headers: { "Content-Type": "application/json" },
        // });
        // if (!response.ok) {
        //     const err = await response.json().catch(() => ({}));
        //     throw new Error(err.message || err.error || `Erreur serveur: ${response.status}`);
        // }
    },
};
