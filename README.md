# knot-games-pdf-gen
# Knot Games PDF Gen (Pixel-Perfect PDF Generator)

A Node.js service that generates high-quality PDFs from HTML content using Puppeteer with precise control over formatting and styling.

## Technical Overview

This service uses:
- Express.js for the API server
- Puppeteer for HTML to PDF conversion
- Next.js integration for serving the web application

### Key Features

- Precise viewport control (Letter size - 816x1056)
- Custom margin handling (0.4in on all sides)
- Font loading guarantee
- Background rendering support
- Robust error handling

## How It Works

1. **API Endpoint**: The service exposes a `/api/generate-pdf` POST endpoint that accepts HTML content.

2. **Browser Initialization**: 
   - Launches Puppeteer in headless mode
   - Configures security settings with `--no-sandbox` and `--disable-setuid-sandbox`

3. **Page Configuration**:
   ```javascript
   // Viewport settings match Letter size dimensions
   width: 816,
   height: 1056,
   deviceScaleFactor: 1
   ```

4. **Content Processing**:
   - Loads HTML content with wait conditions
   - Ensures all fonts are properly loaded using `document.fonts.ready`

5. **PDF Generation**:
   ```javascript
   // PDF configuration
   format: "Letter",
   printBackground: true,
   margin: {
     top: "0.4in",
     right: "0.4in",
     bottom: "0.4in",
     left: "0.4in"
   }
   ```

## Error Handling

The service implements comprehensive error handling:
- Browser launch failures
- Page creation issues
- Content loading problems
- PDF generation errors
- Font loading issues

## API Response

- Returns PDF with appropriate headers for download
- Includes CORS configuration for cross-origin requests
- Provides detailed error information in case of failures

## Integration with Next.js

The service seamlessly integrates with Next.js applications, handling both PDF generation and web application routing through a unified server.

## Getting Started

1. Install dependencies:
   ```bash
   npm install express cors puppeteer next
   ```

2. Start the server:
   ```bash
   node server.js
   ```

3. Make a POST request to `/api/generate-pdf` with your HTML content:
   ```javascript
   {
     "htmlContent": "<your-html-content>"
   }
   ```

## Best Practices

- Always ensure your HTML content is well-formed
- Consider font loading times in your implementation
- Test with various content lengths and complexities
- Monitor memory usage when handling large documents

## License

This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0).
