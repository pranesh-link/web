import { PDFExport } from "@progress/kendo-react-pdf";
import { PROFILE_PDF_NAME } from "../../common/constants";
import { HamBurgerMenu } from "./HamBurgerMenu";
import MenuBar from "./MenuBar";
import ProfileSections from "./ProfileSections";
import { AppProvider } from "../../store/profile/context";
import { IProfileData } from "../../store/profile/types";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Overlay } from "../../common/Elements";

interface ProfileProps {
  profileData: IProfileData;
  refs: {
    homeRef: React.MutableRefObject<any>;
    skillsRef: React.MutableRefObject<any>;
    experienceRef: React.MutableRefObject<any>;
    educationRef: React.MutableRefObject<any>;
    contactRef: React.MutableRefObject<any>;
  };
  isDownloading: boolean;
  isMobile: boolean;
  isHamburgerMenuOpen: boolean;
  isInstallBannerOpen: boolean;
  isExport: boolean;
  hasPWAInstalled: boolean;
  setIsDownloading: (isDownloading: boolean) => void;
  setIsHamburgerMenuOpen: (isHamburgerMenuOpen: boolean) => void;
  onInstallPWA: () => void;
}

export const Profile = (props: ProfileProps) => {
  const {
    profileData,
    refs: { homeRef, skillsRef, experienceRef, educationRef, contactRef },
    isDownloading,
    isMobile,
    isHamburgerMenuOpen,
    isInstallBannerOpen,
    isExport,
    hasPWAInstalled,
    setIsDownloading,
    setIsHamburgerMenuOpen,
    onInstallPWA,
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
          },
          currentSection,
          isExport,
          isDownloading,
          isMobile,
          isInstallBannerOpen,
          hasDownloadedProfile,
        }}
      >
        <HamBurgerMenu
          isOpen={isHamburgerMenuOpen}
          hasPWAInstalled={hasPWAInstalled}
          setIsOpen={(isOpen) => setIsHamburgerMenuOpen(isOpen)}
          onMenuChange={(section) => setCurrentSection(section)}
          onInstallPWA={onInstallPWA}
        />
        {isMobile && <Swipe onTouchMove={() => setIsHamburgerMenuOpen(true)} />}
        <MenuBar onMenuChange={(section) => setCurrentSection(section)} />
        {!isHamburgerMenuOpen && (
          <>
            <Overlay
              background="#f0f0f0"
              height={15}
              bottom={isMobile ? "0" : "55"}
              opacity={0.9}
            />
            <Overlay
              background="#f0f0f0"
              height={15}
              bottom={isMobile ? "15" : "70"}
              opacity={0.6}
            />
          </>
        )}
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
          refs: {
            homeRef,
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
  right: 0;
  position: fixed;
`;
