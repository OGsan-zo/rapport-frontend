import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const pdfService = {
    /**
     * Génère un PDF à partir d'un élément HTML avec capture individuelle par rapport.
     */
    async generatePdfBlob(element: HTMLElement, filename: string, isLandscape: boolean = false): Promise<Blob> {
        // Dimensions A4 : portrait = 210×297, paysage = 297×210
        const pdfWidth = isLandscape ? 297 : 210;
        const pdfHeight = isLandscape ? 210 : 297;

        const pdf = new jsPDF({
            orientation: isLandscape ? "landscape" : "portrait",
            unit: "mm",
            format: "a4",
            putOnlyUsedFonts: true,
        });

        // Trouver le conteneur principal des rapports
        const rapportContainer = element.querySelector('#unified-report-content');
        
        if (rapportContainer) {
            // Trouver tous les tableaux de rapports individuellement
            const rapportTables = rapportContainer.querySelectorAll('table');
            
            if (rapportTables.length > 1) {
                // Capturer chaque tableau individuellement
                for (let i = 0; i < rapportTables.length; i++) {
                    const table = rapportTables[i] as HTMLElement;
                    
                    // Créer un conteneur temporaire pour chaque tableau
                    const tempContainer = document.createElement('div');
                    tempContainer.style.position = 'absolute';
                    tempContainer.style.left = '-9999px';
                    tempContainer.style.top = '0';
                    tempContainer.style.backgroundColor = '#ffffff';
                    tempContainer.style.padding = '20px';
                    
                    // Cloner le tableau et l'ajouter au conteneur temporaire
                    const clonedTable = table.cloneNode(true) as HTMLElement;
                    tempContainer.appendChild(clonedTable);
                    document.body.appendChild(tempContainer);
                    
                    try {
                        // Capture individuelle du tableau
                        const canvas = await html2canvas(tempContainer, {
                            scale: 2.5,
                            useCORS: true,
                            logging: false,
                            backgroundColor: "#ffffff",
                            windowHeight: tempContainer.scrollHeight,
                            scrollY: 0
                        });

                        const imgData = canvas.toDataURL("image/png");
                        
                        // Validation
                        if (!imgData.startsWith("data:image/png")) {
                            throw new Error("Format d'image non supporté (PNG attendu)");
                        }

                        // Calcul pour adapter l'image à la page
                        const canvasWidth = canvas.width;
                        const canvasHeight = canvas.height;
                        const imgHeightInPdf = (canvasHeight * pdfWidth) / canvasWidth;
                        
                        // Ajouter une nouvelle page si ce n'est pas le premier tableau
                        if (i > 0) {
                            pdf.addPage();
                        }

                        // Ajouter l'image du tableau
                        pdf.addImage(
                            imgData,
                            "PNG",
                            0,
                            0,
                            pdfWidth,
                            imgHeightInPdf,
                            undefined,
                            "FAST"
                        );

                        // Ajouter le pied de page
                        this.addFooter(pdf, "", pdfWidth, pdfHeight);
                    } finally {
                        // Nettoyer le conteneur temporaire
                        document.body.removeChild(tempContainer);
                    }
                }
                
                // Définir les propriétés du document
                pdf.setProperties({
                    title: filename,
                    subject: "Rapport d'Activités",
                    author: "Systeme de Rapportage",
                });

                return pdf.output("blob");
            }
        }

        // Fallback : si pas de tableaux multiples ou si la méthode échoue, utiliser l'ancienne méthode
        return this.generatePdfBlobOld(element, filename, isLandscape);
    },

    /**
     * Ancienne méthode (fallback) - Génère un PDF à partir d'un élément HTML avec support multi-pages.
     */
    async generatePdfBlobOld(element: HTMLElement, filename: string, isLandscape: boolean = false): Promise<Blob> {
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

        // Vérifier si le contenu tient sur une seule page (avec marge de sécurité)
        const singlePageThreshold = pdfHeight - 15; // 15mm de marge pour le footer
        const fitsOnSinglePage = imgHeightInPdf <= singlePageThreshold;

        const pdf = new jsPDF({
            orientation: isLandscape ? "landscape" : "portrait",
            unit: "mm",
            format: "a4",
            putOnlyUsedFonts: true,
        });

        let heightLeft = imgHeightInPdf;
        let position = 0;
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
        while (!fitsOnSinglePage && heightLeft > 5) { // Ajouter une marge de 5mm pour éviter les pages presque vides
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
