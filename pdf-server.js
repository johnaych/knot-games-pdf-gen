const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express();
const port = process.env.PORT || 3001;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.post('/api/generate-pdf', async (req, res) => {
  try {
    const { htmlContent } = req.body;
    if (!htmlContent) {
      return res.status(400).json({ error: 'No HTML content provided' });
    }

    // Initialize browser with security settings
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // Configure page settings for letter size
    await page.setViewport({
      width: 816,
      height: 1056,
      deviceScaleFactor: 1,
    });

    // Load content and wait for everything to render
    await page.setContent(htmlContent, {
      waitUntil: ['domcontentloaded', 'networkidle0'],
    });

    // Ensure fonts are loaded
    await page.evaluateHandle('document.fonts.ready');

    // Generate PDF with precise margins
    const pdf = await page.pdf({
      format: 'Letter',
      printBackground: true,
      margin: {
        top: '0.4in',
        right: '0.4in',
        bottom: '0.4in',
        left: '0.4in',
      },
    });

    await browser.close();

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=generated-pdf.pdf');
    res.send(pdf);

  } catch (error) {
    console.error('PDF Generation Error:', error.message);
    res.status(500).json({
      error: 'Failed to generate PDF',
      details: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`PDF Server running on port ${port}`);
});
