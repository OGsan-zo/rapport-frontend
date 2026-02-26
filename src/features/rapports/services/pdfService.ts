import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const pdfService = {
    /**
     * Génère un PDF à partir d'un élément HTML avec support multi-pages.
     */
    async generatePdfBlob(element: HTMLElement, filename: string): Promise<Blob> {
        // Configuration de la capture pour une netteté maximale
        const canvas = await html2canvas(element, {
            scale: 2.5, // Équilibre entre netteté et poids du fichier
            useCORS: true,
            logging: false,
            backgroundColor: "#ffffff",
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.95);

        // Dimensions A4 en mm
        const pdfWidth = 210;
        const pdfHeight = 297;

        // Calcul du ratio pour l'image
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgHeightInPdf = (canvasHeight * pdfWidth) / canvasWidth;

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
            putOnlyUsedFonts: true,
        });

        let heightLeft = imgHeightInPdf;
        let position = 0;
        const footerHeight = 10; // Espace pour le copyright
        const year = new Date().getFullYear();
        const footerText = `© ${year} - DSINT - MESUPRES`;

        // Ajout de la première page
        pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, imgHeightInPdf, undefined, "FAST");
        this.addFooter(pdf, footerText, pdfWidth, pdfHeight);

        heightLeft -= pdfHeight;

        // Pages supplémentaires si nécessaire
        while (heightLeft > 0) {
            position = heightLeft - imgHeightInPdf;
            pdf.addPage();
            pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, imgHeightInPdf, undefined, "FAST");
            this.addFooter(pdf, footerText, pdfWidth, pdfHeight);
            heightLeft -= pdfHeight;
        }

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
        pdf.setFontSize(8);
        pdf.setTextColor(100);
        pdf.text(text, width / 2, height - 7, { align: "center" });
    }
};
