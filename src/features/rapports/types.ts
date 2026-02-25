/**
 * Interface pour une ligne cohérente d'un rapport.
 * Supporte désormais plusieurs puces par cellule.
 */
export interface RapportLigne {
    activites: string[];
    effets: string[];
    impacts: string[];
}

/**
 * Interface pour un rapport consolidé hebdomadaire.
 */
export interface RapportConsolide {
    id: string;
    dateDebut: string;
    dateFin: string;
    dateCreation: string;
    entiteId: string;
    entiteNom: string;
    lignes: RapportLigne[];
    status: "BROUILLON" | "VALIDE" | "TRANSMIS";
}

/**
 * Interface pour la requête d'enregistrement d'un rapport.
 */
export interface SaveRapportRequest {
    dateDebut: string;
    dateFin: string;
    lignes: RapportLigne[];
}
