'use client'

import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'

interface PDFViewerProps {
  file: string;
}

export const PDFViewer: React.FC<PDFViewerProps> = ({ file }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    console.log("Loaded PDF with", numPages, "pages")
  }

  const [pdfData, setPdfData] = useState<ArrayBuffer | null>(null)

  useEffect(() => {
    console.log("Fetching PDF...")
    fetch(`http://localhost:3000/${file}`).then(res => res.arrayBuffer()).then(setPdfData)
  }, [file])        

  return (
    <div>
      <Document
        file={pdfData}
        onSourceError={(error) => console.error("Error loading PDF:", error)}
        onError={(error) => console.error("Error loading PDF:", error)}
        onWaiting={() => console.log("Waiting for PDF to load...")}
        onLoadError={(error) => console.error("Error loading PDF:", error)}
        onLoadProgress={(progress) => console.log("Loading PDF:", progress)}
        onLoadSuccess={onDocumentLoadSuccess}
        renderMode="canvas"
        loading={<div>Loading...</div>}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
};