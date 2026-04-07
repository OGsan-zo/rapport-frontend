import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const pdfService = {
    /**
     * Génère un PDF à partir d'un élément HTML avec une hauteur dynamique 
     * qui s'adapte parfaitement au contenu.
     */
    async generatePdfBlob(element: HTMLElement, filename: string, isLandscape: boolean = false): Promise<Blob> {
        // Configuration de la capture pour une netteté maximale
        const canvas = await html2canvas(element, {
            scale: 2.5, // Équilibre entre netteté et poids du fichier
            useCORS: true,
            logging: false,
            backgroundColor: "#ffffff",
        });

        const imgData = canvas.toDataURL("image/png");

        // --- VALIDATION SIGNATURE (Anti-Crash) ---
        if (!imgData.startsWith("data:image/png")) {
            throw new Error("Format d'image non supporté (PNG attendu)");
        }

        // On garde la largeur standard A4 pour la lisibilité (portrait = 210, paysage = 297)
        const pdfWidth = isLandscape ? 297 : 210;

        // Calcul dynamique de la HAUTEUR du PDF selon le ratio de l'image
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const pdfHeight = (canvasHeight * pdfWidth) / canvasWidth;

        // Création du PDF avec des dimensions personnalisées [largeur, hauteur]
        const pdf = new jsPDF({
            orientation: isLandscape ? "landscape" : "portrait",
            unit: "mm",
            format: [pdfWidth, pdfHeight], // <-- C'est ici que la magie opère
            putOnlyUsedFonts: true,
        });

        // Ajout de l'image qui remplira exactement l'unique page générée
        pdf.addImage(
            imgData,
            "PNG",
            0,
            0,
            pdfWidth,
            pdfHeight,
            undefined,
            "FAST"
        );

        // Ajout du footer en bas de cette page dynamique
        const footerText = ``;
        this.addFooter(pdf, footerText, pdfWidth, pdfHeight);

        // Définir le titre du document pour les navigateurs
        pdf.setProperties({
            title: filename,
            subject: "Rapport d'Activités",
            author: "Systeme de Rapportage",
        });

        return pdf.output("blob");
    },

    /**
     * Ajoute le pied de page copyright sur une page PDF.
     */
    addFooter(pdf: jsPDF, text: string, width: number, height: number) {
        if (!text) return; // Évite d'ajouter du texte vide inutilement
        pdf.setFontSize(8);
        pdf.setTextColor(100);
        // Positionne le texte à 7mm du bas de la page, quelle que soit sa hauteur
        pdf.text(text, width / 2, height - 7, { align: "center" });
    }
};