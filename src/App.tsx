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
  const orgRef = useRef(null);

  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState<boolean>(
    false
  );

  const isMobile = window.innerWidth < 768;

  let pdfExportComponent: PDFExport;

  return (
    <Wrapper>
      <AppProvider
        value={{
          data: ProfileData,
          refs: {
            homeRef,
            skillsRef,
            experienceRef,
            educationRef,
            contactRef,
            orgRef,
          },
          isDownloading,
          isMobile,
        }}
      >
        <HamBurgerMenu
          isOpen={isHamburgerMenuOpen}
          setIsOpen={(isOpen) => setIsHamburgerMenuOpen(isOpen)}
        />
        {isMobile && <Swipe onTouchMove={() => setIsHamburgerMenuOpen(true)} />}
        <MenuBar />
        <ProfileSections
          exportProfile={() => {
            setIsDownloading(true);
            pdfExportComponent.save(() => setIsDownloading(false));
          }}
        />
      </AppProvider>
      <AppProvider
        value={{
          data: ProfileData,
          refs: {
            homeRef,
            orgRef,
            skillsRef,
            experienceRef,
            educationRef,
            contactRef,
          },
          isExport: true,
          isMobile,
        }}
      >
        <div className="export-wrapper">
          <PDFExport
            scale={0.65}
            paperSize="A4"
            margin="0cm"
            fileName="Pranesh_Profile"
            ref={(component: PDFExport) => (pdfExportComponent = component)}
          >
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

const Swipe = styled.div`
  height: 100%;
  width: 20px;
  position: fixed;
`;
