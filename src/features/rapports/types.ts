/**
 * Interface pour une ligne cohérente d'un rapport.
 * Supporte désormais plusieurs puces par cellule.
 */
// export interface RapportLigne {
//     activites: string[];
//     effets: string[];
//     impacts: string[];
// }

import { User } from "../auth/types";

// /**
//  * Interface pour un rapport consolidé hebdomadaire.
//  */
// export interface RapportConsolide {
//     id: string;
//     dateDebut: string;
//     dateFin: string;
//     dateCreation: string;
//     entiteId: string;
//     entiteNom: string;
//     lignes: RapportLigne[];
//     status: "BROUILLON" | "VALIDE" | "TRANSMIS";
// }

/**
 * Interface pour la requête d'enregistrement d'un rapport.
 */
// export interface SaveRapportRequest {
//     dateDebut: string;
//     dateFin: string;
//     lignes: RapportLigne[];
// }

/**
 * Détail d'un effet et de son impact lié à une activité
 */
export interface EffectImpact {
    id: number;
    effect: string;
    impact: string;
}

/**
 * Structure de l'activité elle-même
 */
export interface ActiviteDetail {
    id: number;
    name: string;
}

/**
 * Ligne de rapport contenant une activité et ses impacts
 */
export interface RapportActivite {
    activite: ActiviteDetail;
    effectsImpacts: EffectImpact[];
}



/**
 * Détails du calendrier
 */
export interface Calendrier {
    dateDebut: string;
    dateFin: string;
    typeCalendrier: {
        name: string;
    };
}

/**
 * Interface principale correspondant à un élément du tableau "data"
 */
export interface RapportConsolide {
    id: number;
    user: User;
    calendrier: Calendrier;
    activites: RapportActivite[];
}
