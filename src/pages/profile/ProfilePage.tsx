import { useRef, useState, useMemo, useEffect } from "react";
import usePWA from "react-pwa-install-prompt";
import { toast, ToastContainer } from "react-toastify";
import { PWABanner } from "../../PWABanner";
import { Profile } from "../../components/profile/Profile";
import {
  DEFAULT_CONTEXT,
  TOAST_ERROR_MESSAGE,
  SECTIONS,
  TOAST_POSITION,
  IS_MOBILE,
  PAGE_TITLES,
} from "../../common/constants";
import {
  getLocalStorage,
  setLocalStorage,
  getProfileJsonResponse,
  getJsonResponse,
} from "../../common/Utils";
import {
  IProfileData,
  ISectionInfo,
  IHeader,
  DownloadType,
} from "../../store/profile/types";
import styled from "styled-components";
import { CloseButton } from "../../common/Elements";
import CloseIcon from "../../assets/close-icon.svg";
import LoaderIcon from "../../assets/loader-icon.svg";

interface ProfilePageProps {}
export const ProfilePage = (props: ProfilePageProps) => {
  const homeRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const educationRef = useRef(null);
  const contactRef = useRef(null);
  const orgRef = useRef(null);

  const [hasError, setHasError] = useState<boolean>(false);
  const { isInstallPromptSupported, promptInstall } = usePWA();

  const [isInstallBannerOpen, setIsInstallBannerOpen] = useState<
    boolean | null
  >(getLocalStorage("isInstallBannerOpen"));
  const [hasPWAInstalled, setHasPWAInstalled] = useState<boolean>(
    getLocalStorage("hasPWAInstalled") || false
  );
  const [profileData, setProfileData] = useState<IProfileData>(
    DEFAULT_CONTEXT.data
  );
  const [isFetchingData, setIsFetchingData] = useState<boolean>(true);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] =
    useState<boolean>(false);

  const ToastError = useMemo(
    () => (
      <ToastErrorWrapper>
        {TOAST_ERROR_MESSAGE.map((lineError: string, index: number) => (
          <p key={index}>{lineError}</p>
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
      setLocalStorage("isInstallBannerOpen", false);
      setHasPWAInstalled(true);
      setLocalStorage("hasPWAInstalled", true);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = PAGE_TITLES.profile;
    const {
      HEADER,
      ABOUT_ME,
      DETAILS,
      EDUCATION,
      ORGANIZATIONS,
      SKILLS,
      EXPERIENCE,
      LINKS,
      DOWNLOAD,
    } = SECTIONS;

    const fetchSections = async (jsonToFetch: string, data: ISectionInfo) => {
      const response = await getProfileJsonResponse(jsonToFetch, data);
      setHasError(response.hasError);
      return response.data as ISectionInfo;
    };

    const fetchHeader = async (jsonToFetch: string, data: IHeader) => {
      const response = await getProfileJsonResponse(jsonToFetch, data);
      setHasError(response.hasError);
      return response.data as IHeader;
    };

    const fetchDownloadInfo = async (
      jsonToFetch: string,
      data: DownloadType
    ) => {
      const response = await getJsonResponse(jsonToFetch, data);
      setHasError(response.hasError);
      return response.data as DownloadType;
    };

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
      const download = await fetchDownloadInfo(
        DOWNLOAD,
        DEFAULT_CONTEXT.data.download
      );

      const sections = {
        aboutMe,
        details,
        education,
        organizations,
        skills,
        experience,
        links,
      };
      setProfileData({ header, sections, download });
      setIsFetchingData(false);
    })();
  }, []);

  useEffect(() => {
    if (hasError) {
      toast.error(ToastError);
    }
  }, [hasError, ToastError]);
  return isFetchingData ? (
    <LoaderImg isMobile={IS_MOBILE} src={LoaderIcon} />
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
          isMobile={IS_MOBILE}
          isInstallBannerOpen={
            !hasPWAInstalled &&
            isInstallPromptSupported &&
            !!isInstallBannerOpen
          }
          isHamburgerMenuOpen={isHamburgerMenuOpen}
          setIsDownloading={(isDownloading: boolean) =>
            setIsDownloading(isDownloading)
          }
          setIsHamburgerMenuOpen={(isHamburgerMenuOpen: boolean) =>
            setIsHamburgerMenuOpen(isHamburgerMenuOpen)
          }
        />
      )}
      <PWABanner
        isMobile={IS_MOBILE}
        isInstallBannerOpen={!!isInstallBannerOpen}
        hasPWAInstalled={hasPWAInstalled}
        isInstallPromptSupported={isInstallPromptSupported}
        setIsInstallBannerOpen={(isInstallBannerOpen) =>
          setIsInstallBannerOpen(isInstallBannerOpen)
        }
        onClickInstall={onClickInstall}
      />
    </Wrapper>
  );
};

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

const LoaderImg = styled.img<{ isMobile: boolean }>`
  width: ${(props) => (props.isMobile ? "75px" : "100px")};
  position: absolute;
  top: 40%;
  left: ${(props) => (props.isMobile ? "40%" : "45%")};
  animation: loader-spin infinite 1s linear;

  @keyframes loader-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
