/**
 * Service pour la génération de PDF.
 * Note : L'import est dynamique pour éviter les erreurs de SSR (Server Side Rendering) dans Next.js.
 */
export const pdfService = {
    /**
     * Génère un PDF à partir d'un élément HTML avec support multi-pages intelligent.
     */
    async generatePdfBlob(element: HTMLElement, filename: string, isLandscape: boolean = false): Promise<Blob> {
        
        // 1. Import dynamique pour éviter l'erreur "self is not defined" au build Next.js
        const html2pdf = (await import("html2pdf.js")).default;

        // 2. Configuration avec "as const" pour satisfaire le typage strict de TypeScript
        const opt = {
            margin: isLandscape ? 5 : 10, // Marge réduite en paysage pour plus d'espace
            filename: filename,
            image: { type: 'png', quality: 1 },
            html2canvas: { 
                scale: 2.5, 
                useCORS: true, 
                logging: false,
                backgroundColor: "#ffffff",
                width: isLandscape ? 1200 : 800, // Largeur explicite pour éviter la coupure
                height: isLandscape ? 850 : 1200 // Hauteur explicite
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: isLandscape ? 'landscape' : 'portrait',
                compress: true // Compression pour réduire la taille
            },
            // Support du CSS "page-break-inside: avoid"
            pagebreak: { mode: ['css', 'legacy'] } 
        } as const;

        // 3. Exécution et retour du Blob
        // On utilise "await" car les méthodes de html2pdf retournent des Promises
        const pdfBlob = await html2pdf()
            .set(opt)
            .from(element)
            .output('blob');

        return pdfBlob;
    }
};