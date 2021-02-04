import { PDFExport } from "@progress/kendo-react-pdf";
import React, { useRef } from "react";
import styled from "styled-components";
import { HamBurgerMenu } from "./components/HamBurgerMenu";
import MenuBar from "./components/MenuBar";
import ProfileSections from "./components/ProfileSections";
import { AppProvider } from "./context";
import { ProfileData } from "./store/ProfileData";

function App() {
  const homeRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const educationRef = useRef(null);
  const contactRef = useRef(null);
  let pdfExportComponent: { save: () => void } = { save: () => {} };
  return (
    <Wrapper>
      <AppProvider
        value={{
          data: ProfileData,
          refs: { homeRef, skillsRef, experienceRef, educationRef, contactRef },
        }}
      >
        {false && (
          <button
            onClick={() => {
              console.log("pdf");
              if (pdfExportComponent) {
                pdfExportComponent.save();
              }
            }}
          >
            Download profile
          </button>
        )}
        <HamBurgerMenu />
        <MenuBar />
        <ProfileSections />
      </AppProvider>
      <AppProvider
        value={{
          data: ProfileData,
          refs: { homeRef, skillsRef, experienceRef, educationRef, contactRef },
          isExport: true,
          exportRef: pdfExportComponent,
        }}
      >
        <div className="export-wrapper">
          <PDFExport
            scale={0.65}
            paperSize="A4"
            margin="0cm"
            fileName="Pranesh_Profile"
            ref={(component: any) => (pdfExportComponent = component)}
          >
            <HamBurgerMenu />
            <MenuBar />
            <ProfileSections />
          </PDFExport>
        </div>
      </AppProvider>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.section`
  .export-wrapper {
    position: absolute;
    left: -3000px;
    top: 0;
  }
`;
