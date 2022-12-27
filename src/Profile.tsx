import { PDFExport } from "@progress/kendo-react-pdf";
import { PROFILE_PDF_NAME } from "./common/constants";
import { HamBurgerMenu } from "./components/HamBurgerMenu";
import MenuBar from "./components/MenuBar";
import ProfileSections from "./components/ProfileSections";
import { AppProvider } from "./context";
import { IProfileData } from "./store/types";
import styled from "styled-components";

interface ProfileProps {
  profileData: IProfileData;
  homeRef: React.MutableRefObject<any>;
  skillsRef: React.MutableRefObject<any>;
  experienceRef: React.MutableRefObject<any>;
  educationRef: React.MutableRefObject<any>;
  contactRef: React.MutableRefObject<any>;
  orgRef: React.MutableRefObject<any>;
  isDownloading: boolean;
  isMobile: boolean;
  isHamburgerMenuOpen: boolean;
  setIsDownloading: (isDownloading: boolean) => void;
  setIsHamburgerMenuOpen: (isHamburgerMenuOpen: boolean) => void;
}

export const Profile = (props: ProfileProps) => {
  const {
    profileData,
    homeRef,
    skillsRef,
    experienceRef,
    educationRef,
    contactRef,
    orgRef,
    isDownloading,
    isMobile,
    isHamburgerMenuOpen,
    setIsDownloading,
    setIsHamburgerMenuOpen,
  } = props;
  let pdfExportComponent: PDFExport;
  return (
    <>
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
    </>
  );
};

const Swipe = styled.div`
  height: 100%;
  width: 60px;
  position: fixed;
`;
