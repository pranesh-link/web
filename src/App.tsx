import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { IHeader, IProfileData, ISectionInfo } from "./store/types";
import {
  CORS_MODE,
  DEFAULT_CONTEXT,
  DEV_JSON_BASE_URL,
  PROD_JSON_BASE_URL,
  PWA_INSTALL,
  PWA_INSTALL_MESSAGE,
  PWA_NOT_NOW,
  SECTIONS,
  TOAST_ERROR_MESSAGE,
  TOAST_POSITION,
} from "./common/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColorRing } from "react-loader-spinner";
import { Profile } from "./Profile";
import {
  CloseButton,
  FlexBox,
  MobilePWAWrapper,
  PWAWrapper,
} from "./common/Elements";
import usePWA from "react-pwa-install-prompt";
import CloseIcon from "./assets/close-icon.svg";

function App() {
  const homeRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const educationRef = useRef(null);
  const contactRef = useRef(null);
  const orgRef = useRef(null);

  const { isInstallPromptSupported, promptInstall } = usePWA();

  const [hasError, setHasError] = useState<boolean>(false);
  const [isInstallBannerOpen, setIsInstallBannerOpen] =
    useState<boolean>(false);
  const [profileData, setProfileData] = useState<IProfileData>(
    DEFAULT_CONTEXT.data
  );
  const [isFetchingData, setIsFetchingData] = useState<boolean>(true);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] =
    useState<boolean>(false);

  const JSON_BASE_URL =
    process.env.NODE_ENV === "development"
      ? DEV_JSON_BASE_URL
      : PROD_JSON_BASE_URL;

  const ToastError = useMemo(
    () => (
      <ToastErrorWrapper>
        {TOAST_ERROR_MESSAGE.map((lineError: string) => (
          <p>{lineError}</p>
        ))}
      </ToastErrorWrapper>
    ),
    []
  );

  const closeToast = () => window.location.reload();

  const onClickInstall = async () => {
    const didInstall = await promptInstall();
    if (didInstall) {
      setIsInstallBannerOpen(false);
    }
  };

  const closeInstallBanner = () => setIsInstallBannerOpen(false);

  const NotNowButton = (
    <button className="not-now" onClick={closeInstallBanner}>
      {PWA_NOT_NOW}
    </button>
  );

  const PWAInstallMessage = <p>{PWA_INSTALL_MESSAGE}</p>;

  const InstallButton = (
    <button className="install" onClick={onClickInstall}>
      {PWA_INSTALL}
    </button>
  );

  const renderInstallButton = () => {
    if (isInstallPromptSupported) {
      if (isMobile) {
        return (
          <MobilePWAWrapper
            bottom="0"
            direction="column"
            alignItems="center"
            justifyContent="space-between"
          >
            {PWAInstallMessage}
            <MobilePWAControls justifyContent="flex-end">
              {NotNowButton}
              {InstallButton}
            </MobilePWAControls>
          </MobilePWAWrapper>
        );
      } else {
        return (
          <PWAWrapper
            top="0"
            alignItems="center"
            justifyContent="space-between"
          >
            {NotNowButton}
            {PWAInstallMessage}
            {InstallButton}
          </PWAWrapper>
        );
      }
    }
    return null;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
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

    const getJsonResponse = async (
      jsonToFetch: string,
      data: IHeader | ISectionInfo
    ) => {
      try {
        const url = `${JSON_BASE_URL}/${jsonToFetch}.json`;
        const response = await fetch(url, {
          mode: CORS_MODE,
        });
        data = await response.json();
      } catch (e) {
        setHasError(true);
      }
      return data;
    };

    const fetchSections = async (jsonToFetch: string, data: ISectionInfo) =>
      (await getJsonResponse(jsonToFetch, data)) as ISectionInfo;

    const fetchHeader = async (jsonToFetch: string, data: IHeader) =>
      (await getJsonResponse(jsonToFetch, data)) as IHeader;

    const DEFAULT_SECTIONS_DETAILS = DEFAULT_CONTEXT.data.sections.details;

    (async () => {
      const header = await fetchHeader(HEADER, DEFAULT_CONTEXT.data.header);
      const aboutMe = await fetchSections(ABOUT_ME, DEFAULT_SECTIONS_DETAILS);
      const details = await fetchSections(DETAILS, DEFAULT_SECTIONS_DETAILS);
      const education = await fetchSections(
        EDUCATION,
        DEFAULT_SECTIONS_DETAILS
      );
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
    })();
    setIsInstallBannerOpen(isInstallPromptSupported);
  }, [JSON_BASE_URL, isInstallPromptSupported]);

  useEffect(() => {
    if (hasError) {
      toast.error(ToastError);
    }
  }, [hasError, ToastError]);

  const isMobile = window.innerWidth < 768;

  return isFetchingData ? (
    <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="blocks-loading"
      wrapperStyle={{ position: "fixed", top: "45%", left: "47%" }}
      wrapperClass="blocks-wrapper"
      colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
    />
  ) : (
    <Wrapper>
      <ToastContainer
        autoClose={false}
        position={TOAST_POSITION}
        closeButton={
          <CloseButton width="20px" icon={CloseIcon} onClose={closeToast} />
        }
        limit={1}
      />
      {!hasError && (
        <Profile
          profileData={profileData}
          homeRef={homeRef}
          skillsRef={skillsRef}
          experienceRef={experienceRef}
          educationRef={educationRef}
          contactRef={contactRef}
          orgRef={orgRef}
          isDownloading={isDownloading}
          isMobile={isMobile}
          isInstallBannerOpen={isInstallBannerOpen}
          isHamburgerMenuOpen={isHamburgerMenuOpen}
          setIsDownloading={(isDownloading: boolean) =>
            setIsDownloading(isDownloading)
          }
          setIsHamburgerMenuOpen={(isHamburgerMenuOpen: boolean) =>
            setIsHamburgerMenuOpen(isHamburgerMenuOpen)
          }
        />
      )}
      {renderInstallButton()}
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

const ToastErrorWrapper = styled.div`
  p {
    &:first-child {
      margin-bottom: 3px;
    }
  }
`;

const MobilePWAControls = styled(FlexBox)`
  width: 100%;
  margin-right: 50px;
`;
