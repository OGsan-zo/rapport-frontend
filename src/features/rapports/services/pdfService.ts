import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const pdfService = {
    /**
     * Génère un PDF à partir d'un élément HTML avec support multi-pages.
     */
    async generatePdfBlob(element: HTMLElement, filename: string, isLandscape: boolean = false): Promise<Blob> {
        // Récupérer tous les rapports/sections du tableau
        const reportSections = element.querySelectorAll('[data-report-section]');
        const sections: HTMLElement[] = [];
        
        if (reportSections.length === 0) {
            // Fallback : utiliser l'élément complet si pas de sections
            sections.push(element);
        } else {
            // Convertir NodeList en tableau d'HTMLElement
            reportSections.forEach(section => {
                if (section instanceof HTMLElement) {
                    sections.push(section);
                }
            });
        }

        // Dimensions A4 : portrait = 210×297, paysage = 297×210
        const pdfWidth = isLandscape ? 297 : 210;
        const pdfHeight = isLandscape ? 210 : 297;

        const pdf = new jsPDF({
            orientation: isLandscape ? "landscape" : "portrait",
            unit: "mm",
            format: "a4",
            putOnlyUsedFonts: true,
        });

        // Traiter chaque section individuellement
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            
            // Configuration de la capture pour cette section
            const canvas = await html2canvas(section, {
                scale: 2.5,
                useCORS: true,
                logging: false,
                backgroundColor: "#ffffff",
            });

            const imgData = canvas.toDataURL("image/png");

            // Validation signature
            if (!imgData.startsWith("data:image/png")) {
                throw new Error("Format d'image non supporté (PNG attendu)");
            }

            // Calcul du ratio pour cette section
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const imgHeightInPdf = (canvasHeight * pdfWidth) / canvasWidth;

            // Ajouter une nouvelle page si ce n'est pas la première section
            if (i > 0) {
                pdf.addPage();
            }

            // Ajouter l'image de la section
            pdf.addImage(
                imgData,
                "PNG",
                0,
                10, // Marge en haut
                pdfWidth - 20, // Largeur avec marges
                imgHeightInPdf * (pdfWidth - 20) / pdfWidth, // Hauteur proportionnelle
                undefined,
                "FAST"
            );

            // Ajouter footer si nécessaire
            const footerText = ``;
            this.addFooter(pdf, footerText, pdfWidth, pdfHeight);
        }

        // Définir les propriétés du document
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
        pdf.setFontSize(8);
        pdf.setTextColor(100);
        pdf.text(text, width / 2, height - 7, { align: "center" });
    }
};
