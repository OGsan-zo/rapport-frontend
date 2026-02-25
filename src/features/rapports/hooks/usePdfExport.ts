"use client";

import { useState } from "react";
import { pdfService } from "../services/pdfService";

export const usePdfExport = () => {
    const [isGenerating, setIsGenerating] = useState(false);

    /**
     * Capture un élément HTML et l'ouvre dans un nouvel onglet en tant que PDF.
     */
    const exportToPdf = async (elementId: string, filename: string = "Rapport_MESUPRES.pdf") => {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error(`Élément avec l'ID "${elementId}" non trouvé.`);
            return;
        }

        setIsGenerating(true);
        try {
            const blob = await pdfService.generatePdfBlob(element, filename);
            const url = URL.createObjectURL(blob);

            // Ouvrir dans un nouvel onglet
            const newWindow = window.open(url, "_blank");

            // Si le bloqueur de fenêtres surgissantes est actif
            if (!newWindow) {
                alert("Veuillez autoriser les fenêtres surgissantes pour visualiser le PDF.");
            }

            // Nettoyage de l'URL après un délai (pour laisser le temps au navigateur de charger)
            setTimeout(() => URL.revokeObjectURL(url), 10000);

        } catch (error) {
            console.error("Erreur lors de la génération du PDF:", error);
        } finally {
            setIsGenerating(false);
        }
    };

    return {
        exportToPdf,
        isGenerating,
    };
};
