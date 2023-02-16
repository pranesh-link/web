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
  IPWA,
} from "../../store/profile/types";
import styled from "styled-components";
import { CloseButton, LoaderImg } from "../../common/Elements";
import CloseIcon from "../../assets/close-icon.svg";
import LoaderIcon from "../../assets/loader-icon.svg";
import "react-toastify/dist/ReactToastify.css";
import { CommonDataType } from "../../store/common/types";

interface ProfilePageProps {
  pwa: IPWA;
  hasError: boolean;
  isExport: boolean;
  commonData: CommonDataType;
}

const ProfilePage = (props: ProfilePageProps) => {
  const homeRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const educationRef = useRef(null);
  const contactRef = useRef(null);
  const orgRef = useRef(null);

  const { pwa, hasError, isExport, commonData } = props;
  const [hasErrorInProfile, setHasErrorInProfile] = useState<boolean>(hasError);
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
      RESUME_EXPERIENCES,
    } = SECTIONS;

    const fetchSections = async (jsonToFetch: string, data: ISectionInfo) => {
      const response = await getProfileJsonResponse(jsonToFetch, data);
      setHasErrorInProfile(response.hasError);
      return response.data as ISectionInfo;
    };

    const fetchHeader = async (jsonToFetch: string, data: IHeader) => {
      const response = await getProfileJsonResponse(jsonToFetch, data);
      setHasErrorInProfile(response.hasError);
      return response.data as IHeader;
    };

    const fetchDownloadInfo = async (
      jsonToFetch: string,
      data: DownloadType
    ) => {
      const response = await getJsonResponse(jsonToFetch, data);
      setHasErrorInProfile(response.hasError);
      return response.data as DownloadType;
    };

    const DEFAULT_SECTIONS_DETAILS = DEFAULT_CONTEXT.data.sections.details;

    (async () => {
      const [
        header,
        aboutMe,
        details,
        education,
        organizations,
        skills,
        experience,
        links,
        download,
        resumeExperiences,
      ] = await Promise.all([
        fetchHeader(HEADER, DEFAULT_CONTEXT.data.header),
        fetchSections(ABOUT_ME, DEFAULT_SECTIONS_DETAILS),
        fetchSections(DETAILS, DEFAULT_SECTIONS_DETAILS),
        fetchSections(EDUCATION, DEFAULT_SECTIONS_DETAILS),
        fetchSections(ORGANIZATIONS, DEFAULT_SECTIONS_DETAILS),
        fetchSections(SKILLS, DEFAULT_SECTIONS_DETAILS),
        fetchSections(EXPERIENCE, DEFAULT_SECTIONS_DETAILS),
        fetchSections(LINKS, DEFAULT_SECTIONS_DETAILS),
        fetchDownloadInfo(DOWNLOAD, DEFAULT_CONTEXT.data.download),
        fetchSections(RESUME_EXPERIENCES, DEFAULT_SECTIONS_DETAILS),
      ]);

      const sections = {
        aboutMe,
        details,
        education,
        organizations,
        skills,
        experience,
        links,
        resumeExperiences,
      };
      setProfileData({ header, sections, download });
      setIsFetchingData(false);
    })();
  }, []);

  useEffect(() => {
    if (hasErrorInProfile) {
      toast.error(ToastError);
    }
  }, [hasErrorInProfile, ToastError]);
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
      {!hasErrorInProfile && (
        <Profile
          commonData={commonData}
          isExport={isExport}
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
      {!hasErrorInProfile && !isExport && (
        <PWABanner
          pwa={pwa}
          isMobile={IS_MOBILE}
          isInstallBannerOpen={!!isInstallBannerOpen}
          hasPWAInstalled={hasPWAInstalled}
          isInstallPromptSupported={isInstallPromptSupported}
          setIsInstallBannerOpen={(isInstallBannerOpen) =>
            setIsInstallBannerOpen(isInstallBannerOpen)
          }
          onClickInstall={onClickInstall}
        />
      )}
    </Wrapper>
  );
};

export default ProfilePage;

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
