import * as z from "zod";

export const rapportSchema = z.object({
  idCalendrier: z.number(),
  dateDebut: z.string().optional(),
  dateFin: z.string().optional(),
  lignes: z.array(
    z.object({
      titre: z.string().min(1, "Le titre est requis"),
      effects: z.array(z.object({ value: z.string() })).min(1, "Au moins un effet est requis"),
      impacts: z.array(z.object({ value: z.string() })).min(1, "Au moins un impact est requis"),
      statut: z.string()
    })
  ).min(1),
});

export type RapportFormValues = z.infer<typeof rapportSchema>;