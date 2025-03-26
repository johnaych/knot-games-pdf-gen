/**
 * Utility function to generate PDFs from HTML content
 * @param {string} htmlContent - The HTML content to convert to PDF
 * @param {string} apiUrl - The URL of the PDF generation service
 * @returns {Promise<Blob>} - Returns a Blob containing the PDF
 */
async function generatePDF(htmlContent, apiUrl = 'http://localhost:3001/api/generate-pdf') {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ htmlContent }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate PDF');
    }

    return await response.blob();
  } catch (error) {
    console.error('PDF Generation Error:', error.message);
    throw error;
  }
}

/**
 * Example usage with download functionality
 * @param {string} htmlContent - The HTML content to convert
 * @param {string} fileName - The name for the downloaded file
 */
async function generateAndDownloadPDF(htmlContent, fileName = 'document.pdf') {
  try {
    const pdfBlob = await generatePDF(htmlContent);
    
    // Create download link
    const url = window.URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Download Error:', error.message);
    throw error;
  }
}

// Example usage:
/*
const htmlContent = `
  <html>
    <body>
      <h1>Hello PDF!</h1>
      <p>This is a test document.</p>
    </body>
  </html>
`;

// Generate and download PDF
generateAndDownloadPDF(htmlContent, 'example.pdf')
  .then(() => console.log('PDF generated and downloaded successfully'))
  .catch(error => console.error('Error:', error));
*/

export { generatePDF, generateAndDownloadPDF };
