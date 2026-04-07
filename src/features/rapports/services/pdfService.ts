export const pdfService = {
    async generatePdfBlob(element: HTMLElement, filename: string, isLandscape: boolean = false): Promise<Blob> {
        
        const html2pdf = (await import("html2pdf.js")).default;

        const opt = {
            margin: isLandscape ? 5 : 10,
            filename: filename,
            image: { type: 'png', quality: 1 },
            html2canvas: { 
                scale: 2, // 2.5 peut parfois être trop lourd, 2 suffit souvent pour une bonne qualité
                useCORS: true, 
                logging: false,
                backgroundColor: "#ffffff",
                // SUPPRIMER width et height ici pour laisser l'auto-calcul fonctionner
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: isLandscape ? 'landscape' : 'portrait',
                compress: true 
            },
            // Mode 'avoid-all' ou 'css' pour une meilleure gestion des coupures
            pagebreak: { mode: ['css', 'legacy'] } 
        } as const;

        const pdfBlob = await html2pdf()
            .set(opt)
            .from(element)
            .output('blob');

        return pdfBlob;
    }
};