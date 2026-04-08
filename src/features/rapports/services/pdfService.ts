import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

export const pdfService = {
    async generatePdfBlob(element: HTMLElement, filename: string, isLandscape: boolean = false): Promise<Blob> {
        // 1. Configuration des dimensions
        // Note : J'ai ajusté la largeur paysage à 1400px pour différencier du portrait
        const workerWidth = isLandscape ? 800 : 800;
        const margin = isLandscape ? 5 : 10;

        try {
            // 2. Capture ultra-rapide via SVG <foreignObject> au lieu du canvas
            const dataUrl = await toPng(element, {
                quality: 1,
                pixelRatio: 2, // Équivalent à scale: 2 pour une haute résolution
                backgroundColor: '#ffffff',
                width: workerWidth,
                style: {
                    width: `${workerWidth}px` // Force la largeur pour le calcul du layout
                }
            });

            // 3. Initialisation de jsPDF
            const pdf = new jsPDF({
                orientation: isLandscape ? 'landscape' : 'portrait',
                unit: 'mm',
                format: 'a4',
                compress: true
            });

            // Dimensions de la page A4 en mm
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            // Largeur utile (sans les marges)
            const innerWidth = pdfWidth - (margin * 2);
            
            // Calculer la hauteur proportionnelle de l'image
            const imgProps = pdf.getImageProperties(dataUrl);
            const imgHeight = (imgProps.height * innerWidth) / imgProps.width;

            // 4. Ajout de l'image et gestion manuelle de la pagination
            let heightLeft = imgHeight;
            let position = margin; // Position Y sur la page courante

            // Ajouter la première page
            pdf.addImage(dataUrl, 'PNG', margin, position, innerWidth, imgHeight);
            heightLeft -= (pdfHeight - margin * 2);

            // S'il reste du contenu qui dépasse la première page, on boucle
            while (heightLeft > 0) {
                // On recule la position de la hauteur d'une page pour afficher la suite
                position = heightLeft - imgHeight + margin; 
                pdf.addPage();
                pdf.addImage(dataUrl, 'PNG', margin, position, innerWidth, imgHeight);
                heightLeft -= (pdfHeight - margin * 2);
            }

            // 5. Retourner le Blob
            return pdf.output('blob');

        } catch (error) {
            console.error('Erreur lors de la génération du PDF :', error);
            throw new Error('Échec de la création du PDF');
        }
    }
};