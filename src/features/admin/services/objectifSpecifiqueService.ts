import { useFetchAuth } from "@/hooks/useFetchAuth";
import { ObjectifSpecifique, ObjectifSpecifiqueFormValues } from "@/features/admin/type/objectifSpecifique/objectifSpecifiqueSchema";

const fetchAuth = useFetchAuth();

export const objectifSpecifiqueService = {

    getAll: async (): Promise<ObjectifSpecifique[]> => {
        const response = await fetchAuth("/api/rapports/OS", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
        });
        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.message || err.error || `Erreur serveur: ${response.status}`);
        }
        const data = await response.json();
        const items = (data.data || data) as ObjectifSpecifique[];
        // L'API retourne { name, id }, on mappe vers { nom, id }
        return items.map((item: { id: number; name: string; li?: string; activitePta?: string; produit?: string; cible?: string; dateValidation?: string }) => ({ 
            id: item.id, 
            name: item.name,
            li: item.li || "",
            activitePta: item.activitePta,
            produit: item.produit,
            cible: item.cible,
            dateValidation: item.dateValidation
        }));
    },

    create: async (data: ObjectifSpecifiqueFormValues): Promise<ObjectifSpecifique> => {
        const response = await fetchAuth("/api/rapports/OS", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                name: data.name,
                li: data.li,
                activitePta: data.activitePta,
                produit: data.produit,
                cible: data.cible
            }),
        });
        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.message || err.error || `Erreur serveur: ${response.status}`);
        }
        const result = await response.json();
        const item = result.data || result;
        return { 
            id: item.id, 
            name: item.name,
            li: item.li || "",
            activitePta: item.activitePta,
            produit: item.produit,
            cible: item.cible,
            dateValidation: item.dateValidation || null
        };
    },

    update: async (id: number, data: ObjectifSpecifiqueFormValues): Promise<ObjectifSpecifique> => {
        const response = await fetchAuth(`/api/rapports/OS/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                name: data.name,
                li: data.li,
                activitePta: data.activitePta,
                produit: data.produit,
                cible: data.cible
            }),
        });
        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.message || err.error || `Erreur serveur: ${response.status}`);
        }
        const result = await response.json();
        const item = result.data || result;
        return { 
            id: item.id, 
            name: item.name,
            li: item.li || "",
            activitePta: item.activitePta,
            produit: item.produit,
            cible: item.cible,
            dateValidation: item.dateValidation || null
        };
    },

    // Pas d'endpoint DELETE dans l'API pour l'instant
    delete: async (_id: number): Promise<void> => {
        await fetchAuth(`/api/rapports/OS/${_id}`, {
            method: "DELETE",
        });
        
    },
    validate: async (id: number): Promise<ObjectifSpecifique> => {
        const response = await fetchAuth(`/api/rapports/OS/${id}/validate`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                name: ""
            }),
        });
        const result = await response.json();
        const item = result.data.data;
        return { 
            id: item.id, 
            name: item.name,
            li: item.li || "",
            activitePta: item.activitePta,
            produit: item.produit,
            cible: item.cible,
            dateValidation: item.dateValidation || null
        };
    }
};
