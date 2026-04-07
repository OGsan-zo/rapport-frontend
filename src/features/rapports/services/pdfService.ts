export const pdfService = {
    async generatePdfBlob(element: HTMLElement, filename: string, isLandscape: boolean = false): Promise<Blob> {
        const html2pdf = (await import("html2pdf.js")).default;

        // On définit une largeur de travail fixe pour que le rendu soit prévisible
        // A4 Portrait ~ 800px | A4 Paysage ~ 1400px (largeur maximale pour remplir la page)
        const workerWidth = isLandscape ? 800 : 800;

        const opt = {
            margin: [10, 10] as [number, number],// Marges [haut/bas, gauche/droite]
            filename: filename,
            image: { type: 'jpeg', quality: 0.98 }, // JPEG est souvent mieux pour les grands tableaux
            html2canvas: { 
                scale: 2, 
                useCORS: true, 
                backgroundColor: "#ffffff",
                windowWidth: workerWidth, 
                // On retire 'width' ici pour laisser le moteur prendre toute la hauteur réelle
            },
            jsPDF: { 
                unit: 'mm', 
                format: 'a4', 
                orientation: isLandscape ? 'landscape' : 'portrait',
                compress: true,
            },
            // Le mode 'avoid-all' est le plus puissant pour forcer la pagination des tableaux
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] } 
        } as const;

        return await html2pdf().set(opt).from(element).output('blob');
    }
};