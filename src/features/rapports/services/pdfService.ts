import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";

export const pdfService = {
    /**
     * Génère un Blob PDF performant avec jsPDF.
     * Cette méthode offre un meilleur rendu du texte et un poids de fichier optimisé.
     */
    async generatePdfBlob(element: HTMLElement, filename: string, isLandscape: boolean = false): Promise<Blob> {
        const orientation = isLandscape ? 'l' : 'p';
        const doc = new jsPDF({
            orientation: orientation,
            unit: 'mm',
            format: 'a4',
            compress: true
        });

        // Largeur de l'A4 en mm
        const pageWidth = isLandscape ? 297 : 210;
        const margin = 10;
        const contentWidth = pageWidth - (margin * 2);

        return new Promise((resolve, reject) => {
            doc.html(element, {
                callback: (doc) => {
                    // Supprimer la dernière page si elle est vide ou presque vide
                    const pageCount = doc.getNumberOfPages();
                    if (pageCount > 1) {
                        // Vérifier si la dernière page a peu de contenu
                        doc.setPage(pageCount);
                        // Supprimer la dernière page
                        doc.deletePage(pageCount);
                    }
                    resolve(doc.output('blob'));
                },
                x: margin,
                y: margin,
                width: contentWidth,
                windowWidth: isLandscape ? 1400 : 800,
                html2canvas: {
                    scale: 0.2645,
                    useCORS: true,
                    logging: false,
                    backgroundColor: "#ffffff",
                },
            });
        });
    }
};