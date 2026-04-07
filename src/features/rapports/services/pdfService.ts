import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const pdfService = {
    /**
     * Génère un PDF à partir d'un élément HTML avec support multi-pages.
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

        // Dimensions A4 : portrait = 210×297, paysage = 297×210
        const pdfWidth = isLandscape ? 297 : 210;
        const pdfHeight = isLandscape ? 210 : 297;

        // Calcul du ratio pour l'image
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const imgHeightInPdf = (canvasHeight * pdfWidth) / canvasWidth;

        // Calcul dynamique de la marge selon la taille du contenu
        const dynamicMargin = Math.min(imgHeightInPdf * 0.05, 20); // 5% du contenu max 20mm
        const footerSpace = 10; // Espace fixe pour le footer
        const singlePageThreshold = pdfHeight - dynamicMargin - footerSpace;
        const fitsOnSinglePage = imgHeightInPdf <= singlePageThreshold;

        const pdf = new jsPDF({
            orientation: isLandscape ? "landscape" : "portrait",
            unit: "mm",
            format: "a4",
            putOnlyUsedFonts: true,
        });

        let heightLeft = imgHeightInPdf;
        let position = 0;
        const footerHeight = 10; // Espace pour le copyright
        const year = new Date().getFullYear();
        const footerText = ``;

        // Ajout de la première page
        pdf.addImage(
            imgData,
            "PNG",
            0,
            Number(position) || 0,
            Number(pdfWidth) || 0,
            Number(imgHeightInPdf) || 0,
            undefined,
            "FAST"
        );
        this.addFooter(pdf, footerText, pdfWidth, pdfHeight);

        heightLeft -= pdfHeight;

        // Pages supplémentaires si nécessaire (boucle pour toutes les pages)
        // Marge dynamique pour éviter les pages presque vides
        const minContentHeight = Math.max(pdfHeight * 0.1, 15); // 10% de la page min 15mm
        while (!fitsOnSinglePage && heightLeft > minContentHeight) {
            position = heightLeft - imgHeightInPdf;
            pdf.addPage();
            pdf.addImage(
                imgData,
                "PNG",
                0,
                Number(position) || 0,
                Number(pdfWidth) || 0,
                Number(imgHeightInPdf) || 0,
                undefined,
                "FAST"
            );
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
