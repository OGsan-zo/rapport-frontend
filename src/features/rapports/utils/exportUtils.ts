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
