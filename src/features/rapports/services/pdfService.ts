export const pdfService = {
    async generatePdfBlob(element: HTMLElement, filename: string, isLandscape: boolean = false): Promise<Blob> {
        const html2pdf = (await import("html2pdf.js")).default;

        // On définit une largeur de travail fixe pour que le rendu soit prévisible
        // A4 Portrait ~ 800px | A4 Paysage ~ 1400px (largeur maximale pour remplir la page)
        const workerWidth = isLandscape ? 1600 : 800;

        const opt = {
            margin: isLandscape ? 3 : 10, // Marges très réduites en paysage pour plus d'espace
            filename: filename,
            image: { type: 'png', quality: 1 },
            html2canvas: { 
                scale: 2, 
                useCORS: true, 
                backgroundColor: "#ffffff",
                width: workerWidth, // Capture cette largeur précise
                windowWidth: workerWidth, // Simule cette largeur de fenêtre
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: isLandscape ? 'landscape' : 'portrait',
                compress: true,
                align: 'center' // Centrer tout le contenu
            },
            pagebreak: { mode: ['css', 'legacy'] } 
        } as const;

        return await html2pdf().set(opt).from(element).output('blob');
    }
};