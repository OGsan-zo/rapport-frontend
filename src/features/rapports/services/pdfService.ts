export const pdfService = {
    async generatePdfBlob(element: HTMLElement, filename: string, isLandscape: boolean = false): Promise<Blob> {
        const html2pdf = (await import("html2pdf.js")).default;

        // On définit une largeur de travail fixe pour que le rendu soit prévisible
        // A4 Portrait ~ 800px | A4 Paysage ~ 1200px (plus large pour remplir la page)
        const workerWidth = isLandscape ? 1200 : 800;

        const opt = {
            margin: isLandscape ? 5 : 10,
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
                compress: true 
            },
            pagebreak: { mode: ['css', 'legacy'] } 
        } as const;

        return await html2pdf().set(opt).from(element).output('blob');
    }
};