import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Exports a DOM element to a high-fidelity PDF.
 * @param elementId The ID of the HTML element to capture.
 * @param filename The name of the resulting PDF file.
 */
export const exportToPdf = async (elementId: string, filename: string) => {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with ID ${elementId} not found.`);
        return;
    }

    try {
        const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: "#ffffff",
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
        });

        // Utilise ceci pour garantir des valeurs numériques valides
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const imgHeightInPdf = (imgProps.height * pdfWidth) / imgProps.width;

        // Rendu sécurisé
        pdf.addImage(
            imgData,
            "PNG",
            0,
            0,
            Number(pdfWidth) || 0,
            Number(imgHeightInPdf) || 0,
            undefined,
            "FAST"
        );

        pdf.save(filename);
    } catch (error) {
        console.error("Error generating PDF:", error);
    }
};
/**
 * Exports a DOM element to a high-fidelity Word document (.doc).
 * @param elementId The ID of the HTML element to capture.
 * @param filename The name of the resulting Word file.
 */
export const exportToWord = (elementId: string, filename: string) => {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error(`Element with ID ${elementId} not found.`);
        return;
    }

    // 1. Get the HTML content
    const htmlContent = element.innerHTML;

    // 2. Prepare the Word-compatible HTML wrapper
    // We include Office namespaces and specific styles to ensure fidelity.
    const fileContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' 
              xmlns:w='urn:schemas-microsoft-com:office:word' 
              xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
            <meta charset='utf-8'>
            <title>Export Rapport Word</title>
            <style>
                /* Force standard Word table behaviors */
                table { border-collapse: collapse; width: 100%; border: 1px solid black; }
                th, td { border: 1px solid black; padding: 10px; vertical-align: top; }
                
                /* Mapping for our specific colors */
                .entity-header { background-color: #D1E7B9 !important; mso-shading: #D1E7B9; }
                .period-header { background-color: #E2D1F9 !important; mso-shading: #E2D1F9; }
                
                body { font-family: 'Times New Roman', serif; font-size: 11pt; }
            </style>
        </head>
        <body>
            ${htmlContent}
        </body>
        </html>
    `;

    // 3. Create a Blob and trigger download
    // '\ufeff' (BOM) helps Word identify the UTF-8 encoding
    const blob = new Blob(['\ufeff', fileContent], {
        type: 'application/msword'
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;

    const finalFilename = filename.toLowerCase().endsWith('.doc') ? filename : `${filename}.doc`;
    link.download = finalFilename;

    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};
