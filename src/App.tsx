import { PDFExport } from "@progress/kendo-react-pdf";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { HamBurgerMenu } from "./components/HamBurgerMenu";
import MenuBar from "./components/MenuBar";
import ProfileSections from "./components/ProfileSections";
import { AppProvider } from "./context";
import { IHeader, IProfileData, ISectionInfo } from "./store/types";
import {
  CORS_MODE,
  DEFAULT_CONTEXT,
  HTTP_INCLUDE_CREDENTIALS,
  PROFILE_PDF_NAME,
  SECTIONS,
} from "./common/constants";

function App() {
  const homeRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const educationRef = useRef(null);
  const contactRef = useRef(null);
  const orgRef = useRef(null);
  const [profileData, setProfileData] = useState<IProfileData>(
    DEFAULT_CONTEXT.data
  );
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] =
    useState<boolean>(false);

  const getJsonResponse = async (jsonToFetch: string) => {
    const url = `/${jsonToFetch}.json`;
    const response = await fetch(url, {
      mode: CORS_MODE,
      credentials: HTTP_INCLUDE_CREDENTIALS,
    });
    return response.json();
  };

  const fetchSections = async (jsonToFetch: string, data: ISectionInfo) => {
    try {
      data = await getJsonResponse(jsonToFetch);
    } catch (err) {
      console.log(err);
    }
    return data;
  };

  const fetchHeader = async (jsonToFetch: string, data: IHeader) => {
    try {
      data = await getJsonResponse(jsonToFetch);
    } catch (err) {
      console.log(err);
    }
    return data;
  };

  const DEFAULT_SECTIONS_DETAILS = DEFAULT_CONTEXT.data.sections.details;
  const {
    HEADER,
    ABOUT_ME,
    DETAILS,
    EDUCATION,
    ORGANIZATIONS,
    SKILLS,
    EXPERIENCE,
    LINKS,
  } = SECTIONS;

  const fetchProfileData = async () => {
    const header = await fetchHeader(HEADER, DEFAULT_CONTEXT.data.header);
    const aboutMe = await fetchSections(ABOUT_ME, DEFAULT_SECTIONS_DETAILS);
    const details = await fetchSections(DETAILS, DEFAULT_SECTIONS_DETAILS);
    const education = await fetchSections(EDUCATION, DEFAULT_SECTIONS_DETAILS);
    const organizations = await fetchSections(
      ORGANIZATIONS,
      DEFAULT_SECTIONS_DETAILS
    );
    const skills = await fetchSections(SKILLS, DEFAULT_SECTIONS_DETAILS);
    const experience = await fetchSections(
      EXPERIENCE,
      DEFAULT_SECTIONS_DETAILS
    );
    const links = await fetchSections(LINKS, DEFAULT_SECTIONS_DETAILS);

    const sections = {
      aboutMe,
      details,
      education,
      organizations,
      skills,
      experience,
      links,
    };
    setProfileData({ header, sections });
    setIsFetchingData(false);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProfileData();
  }, []);

  const isMobile = window.innerWidth < 768;

  let pdfExportComponent: PDFExport;

  return isFetchingData ? null : (
    <Wrapper>
      <AppProvider
        value={{
          data: profileData,
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
          data: profileData,
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
            fileName={PROFILE_PDF_NAME}
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
  width: 60px;
  position: fixed;
`;
