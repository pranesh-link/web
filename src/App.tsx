import { PDFExport } from "@progress/kendo-react-pdf";
import React, { useRef, useState } from "react";
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
  let pdfExportComponent: { save: () => void };
  return (
    <Wrapper>
      <AppProvider
        value={{
          data: ProfileData,
          refs: { homeRef, skillsRef, experienceRef, educationRef, contactRef },
          isExport: false,
        }}
      >
        <button
          className="k-button"
          onClick={() => {
            pdfExportComponent.save();
          }}
        >
          Export PDF
        </button>
        <HamBurgerMenu />
        <MenuBar />
        <ProfileSections />
      </AppProvider>
      <AppProvider
        value={{
          data: ProfileData,
          refs: { homeRef, skillsRef, experienceRef, educationRef, contactRef },
          isExport: true,
        }}
      >
        <div className="export">
          <PDFExport
            scale={0.65}
            paperSize="A3"
            margin="0cm"
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
  .export {
    position: absolute;
    left: -3000px;
    top: 0;
  }
`;
