const fs = require('fs');
const path = require('path');
const PDFParser = require('pdf2json');

const pdfDir = 'c:/Users/ajayg/College/Learning/Nasscom/Introduction on Generative AI – Artificial intelligence and Machine Learning';
const outputDir = 'c:/Users/ajayg/College/Learning/Nasscom/pdf_analysis';

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

async function extractText(fileName) {
    return new Promise((resolve, reject) => {
        const filePath = path.join(pdfDir, fileName);
        const pdfParser = new PDFParser(null, 1); // 1 = text only

        pdfParser.on("pdfParser_dataError", errData => {
            console.error(`Error extracting ${fileName}:`, errData.parserError);
            resolve(); // Resolve to continue with next file
        });

        pdfParser.on("pdfParser_dataReady", pdfData => {
            const rawText = pdfParser.getRawTextContent();
            const outputFilePath = path.join(outputDir, fileName.replace('.pdf', '.txt'));
            fs.writeFileSync(outputFilePath, rawText);
            console.log(`Successfully extracted: ${fileName}`);
            resolve();
        });

        pdfParser.loadPDF(filePath);
    });
}

const files = [
    'Convolutional Neural Network & Deep Learning.pdf',
    'Generative AI.pdf',
    'Introduction to AI-ML & Gen- AI.pdf',
    'Large Language Models ( LLMs).pdf',
    'Natural Language Processing.pdf',
    'Prompt Engineering.pdf'
];

async function run() {
    for (const file of files) {
        await extractText(file);
    }
}

run();
