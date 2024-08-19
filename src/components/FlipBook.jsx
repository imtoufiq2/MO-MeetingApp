import { Page } from "@react-pdf/renderer";
import { Viewer } from "@react-pdf/viewer";
import PropTypes from "prop-types";
import { useState } from "react";

const FlipBook = ({ url }) => {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <Viewer
      fileUrl={url}
      onLoadSuccess={onDocumentLoadSuccess}
      // Additional props for customization
    >
      {Array.from(new Array(numPages), (el, index) => (
        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
      ))}
    </Viewer>
  );
};

FlipBook.propTypes = {
  url: PropTypes.string.isRequired,
};

export default FlipBook;
