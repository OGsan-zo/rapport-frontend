/**
 * Structure pour le couple Effet / Impact dans l'API réelle.
 */
import { User } from "../auth/types";
export interface EffectImpact {
    effect: string;
    impact: string;
}

/**
 * Structure d'une activité dans l'API réelle.
 */
export interface ApiActivite {
    name?: string;     // Utilisé dans le GET
    entite?: string;   // Utilisé dans le POST de soumission
    effectsImpacts: EffectImpact[];
}

/**
 * Structure du rapport renvoyé par l'API (GET data[0]).
 */
export interface ApiRapport {
    id?: number;
    user: User;
    calendrier: {
        id?: number;
        dateDebut: string;
        dateFin: string;
        typeCalendrier: {
            name: string;
        };
    };
    activites: ApiActivite[];
}

/**
 * Interface pour la requête d'enregistrement (POST).
 */
export interface CreateRapportRequest {
    idCalendrier: number;
    activites: ApiActivite[];
}

/**
 * Version "aplatie" utilisée par l'UI interne (Compatibilité).
 */
export interface RapportConsolide {
    id: string;
    dateDebut: string;
    dateFin: string;
    dateCreation: string;
    entiteId: string;
    entiteNom: string;
    lignes: ApiActivite[]; // On utilise désormais la structure imbriquée
    status: "BROUILLON" | "VALIDE" | "TRANSMIS";
}
