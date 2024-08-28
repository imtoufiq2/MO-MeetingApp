import "./pdf-viewer-styles.css";
import React from "react";
import HTMLFlipBook from "react-pageflip";

// Define the Page component
const Page = React.forwardRef((props, ref) => {
  return (
    <div className="demoPage" ref={ref} style={{ border: "2px solid green" }}>
      {/* ref required */}
      <h1>Page Header</h1>
      <p>Page content</p>
      <p>Page number: {props.number}</p>
    </div>
  );
});

Page.displayName = "Page";

export default function PdfViewer() {
  return (
    <div className="App" style={{ border: "2px solid red" }}>
      <MyBook />
    </div>
  );
}

function MyBook() {
  return (
    <HTMLFlipBook
      drawShadow={true}
      width={300}
      height={300}
      style={{ border: "2px solid green" }}
    >
      <Page number="1">Page text</Page>
      <Page number="2">Page text</Page>
      <Page number="3">Page text</Page>
      <Page number="4">Page text</Page>
    </HTMLFlipBook>
  );
}
