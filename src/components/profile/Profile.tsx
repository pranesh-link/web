import { PDFExport } from "@progress/kendo-react-pdf";
import { PROFILE_PDF_NAME } from "../../common/constants";
import { HamBurgerMenu } from "./HamBurgerMenu";
import MenuBar from "./MenuBar";
import ProfileSections from "./ProfileSections";
import { AppProvider } from "../../store/profile/context";
import { IProfileData } from "../../store/profile/types";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { ICommonData } from "../../store/common/types";

interface ProfileProps {
  profileData: IProfileData;
  homeRef: React.MutableRefObject<any>;
  skillsRef: React.MutableRefObject<any>;
  experienceRef: React.MutableRefObject<any>;
  educationRef: React.MutableRefObject<any>;
  contactRef: React.MutableRefObject<any>;
  orgRef: React.MutableRefObject<any>;
  commonData: ICommonData;
  isDownloading: boolean;
  isMobile: boolean;
  isHamburgerMenuOpen: boolean;
  isInstallBannerOpen: boolean;
  isExport: boolean;
  setIsDownloading: (isDownloading: boolean) => void;
  setIsHamburgerMenuOpen: (isHamburgerMenuOpen: boolean) => void;
}

export const Profile = (props: ProfileProps) => {
  const {
    profileData,
    commonData,
    homeRef,
    skillsRef,
    experienceRef,
    educationRef,
    contactRef,
    orgRef,
    isDownloading,
    isMobile,
    isHamburgerMenuOpen,
    isInstallBannerOpen,
    isExport,
    setIsDownloading,
    setIsHamburgerMenuOpen,
  } = props;
  const [hasDownloadedProfile, setHasDownloadedProfile] =
    useState<boolean>(false);
  const [currentSection, setCurrentSection] = useState<string>("aboutMe");
  let timer: NodeJS.Timeout;
  useEffect(() => {
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
          currentSection,
          commonData,
          isExport,
          isDownloading,
          isMobile,
          isInstallBannerOpen,
          hasDownloadedProfile,
        }}
      >
        <HamBurgerMenu
          isOpen={isHamburgerMenuOpen}
          setIsOpen={(isOpen) => setIsHamburgerMenuOpen(isOpen)}
          onMenuChange={(section) => setCurrentSection(section)}
        />
        {isMobile && <Swipe onTouchMove={() => setIsHamburgerMenuOpen(true)} />}
        <MenuBar onMenuChange={(section) => setCurrentSection(section)} />
        <ProfileSections
          exportProfile={() => {
            setIsDownloading(true);
            pdfExportComponent.save(() => {
              setIsDownloading(false);
              setHasDownloadedProfile(true);
              timer = setTimeout(() => setHasDownloadedProfile(false), 5000);
            });
          }}
        />
      </AppProvider>
      <AppProvider
        value={{
          data: profileData,
          commonData,
          refs: {
            homeRef,
            orgRef,
            skillsRef,
            experienceRef,
            educationRef,
            contactRef,
          },
          currentSection,
          isExport: true,
          isMobile,
          isInstallBannerOpen,
        }}
      >
        <div className="export-wrapper">
          <PDFExport
            scale={0.65}
            paperSize="A4"
            creator="Pranesh"
            author="Pranesh"
            title="Pranesh_Profile"
            margin={{ top: "20mm", bottom: "25mm" }}
            forcePageBreak=".page-break"
            keepTogether=".keep-together"
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
