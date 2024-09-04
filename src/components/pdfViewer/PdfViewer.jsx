// import "./pdf-viewer-styles.css";
// import React, { useState } from "react";
import PropTypes from "prop-types";
// import HTMLFlipBook from "react-pageflip";
// import { pdfjs, Document, Page as ReactPdfPage } from "react-pdf";

// // Ensure to set up the PDF.js worker
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// const width = 700;
// const height = 824;

// const Page = React.forwardRef(({ pageNumber }, ref) => (
//   <div ref={ref}>
//     <ReactPdfPage pageNumber={pageNumber} width={width} />
//   </div>
// ));

// Page.propTypes = {
//   pageNumber: PropTypes.number.isRequired,
// };

// Page.displayName = "Page";

// function PdfViewer({ pdfUrl }) {
//   const [numPages, setNumPages] = useState(null);
//   // alert("pdfUrl", pdfUrl);
//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   return (
//     <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
//       <HTMLFlipBook
//         // usePortrait={true}
//         // size={"stretch"}
//         width={width}
//         height={height}
//       >
//         {Array.from(new Array(numPages), (el, index) => (
//           <Page key={index} pageNumber={index + 1} />
//         ))}
//       </HTMLFlipBook>
//     </Document>
//   );
// }

// PdfViewer.propTypes = {
//   pdfUrl: PropTypes.string.isRequired,
// };

// export default PdfViewer;
import { Worker } from "@react-pdf-viewer/core";
// Import the main component
import { Viewer } from "@react-pdf-viewer/core";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";

const PdfViewer = ({ pdfUrl }) => {
  return (
    <div>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer fileUrl={pdfUrl} />;
      </Worker>
    </div>
  );
};
PdfViewer.propTypes = {
  pdfUrl: PropTypes.string.isRequired,
};
export default PdfViewer;
