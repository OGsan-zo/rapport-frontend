import * as z from "zod";

export const objectifSpecifiqueSchema = z.object({
    name: z.string().min(1, "Le name est requis"),
    li: z.string().min(1, "La logique d'intervention est requise"),
    activitePta: z.string().optional(),
    produit: z.string().optional(),
    cible: z.string().optional(),
});

export type ObjectifSpecifiqueFormValues = z.infer<typeof objectifSpecifiqueSchema>;

export interface ObjectifSpecifique {
    id: number;
    name: string;
    li: string;
    activitePta?: string;
    produit?: string;
    cible?: string;
    dateValidation?: string;
}
