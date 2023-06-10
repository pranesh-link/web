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
  PAGE_TITLES,
} from "../../common/constants";
import {
  getLocalStorage,
  setLocalStorage,
  getProfileJsonResponse,
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

interface ProfilePageProps {
  pwa: IPWA;
  hasError: boolean;
  isExport: boolean;
  isMobile: boolean;
}

const ProfilePage = (props: ProfilePageProps) => {
  const homeRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const educationRef = useRef(null);
  const contactRef = useRef(null);

  const { pwa, hasError, isExport, isMobile } = props;
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
    const { COMBINED, SKILLS, EXPERIENCE, LINKS, DOWNLOAD } = SECTIONS;

    const DEFAULT_SECTIONS_DETAILS = DEFAULT_CONTEXT.data.sections.details;

    const sectionsToFetch = [COMBINED, SKILLS, EXPERIENCE, LINKS];

    const fetchInfo = async (
      jsonToFetch: string,
      data: ISectionInfo | IHeader | DownloadType
    ) => {
      const response = await getProfileJsonResponse(jsonToFetch, data);
      setHasErrorInProfile(response.hasError);
      return response.data;
    };

    (async () => {
      const [download, profileSectionsInfo, skills, experiences, links] =
        await Promise.all([
          fetchInfo(DOWNLOAD, DEFAULT_CONTEXT.data.download),
          ...sectionsToFetch.map((section) =>
            fetchInfo(section, DEFAULT_SECTIONS_DETAILS)
          ),
        ]);

      const { header, aboutMe, details, education } = profileSectionsInfo;

      const sections = {
        aboutMe,
        details,
        education,
        skills,
        experiences,
        links,
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
    <LoaderImg isMobile={isMobile} src={LoaderIcon} />
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
          isExport={isExport}
          profileData={profileData}
          refs={{ homeRef, skillsRef, experienceRef, educationRef, contactRef }}
          isDownloading={isDownloading}
          isMobile={isMobile}
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
          onInstallPWA={onClickInstall}
        />
      )}
      {!hasErrorInProfile && !isExport && (
        <PWABanner
          pwa={pwa}
          isMobile={isMobile}
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
