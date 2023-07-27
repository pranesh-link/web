import { useRef, useState, useEffect } from "react";
import usePWA from "react-pwa-install-prompt";
import { PWABanner } from "../../PWABanner";
import { Profile } from "../../components/profile/Profile";
import {
  DEFAULT_CONTEXT,
  PAGE_TITLES,
  MESSAGES,
  LABEL_TEXT,
  DEFAULT_PROFILE_CONFIG_DATA,
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
  IExperienceJsonInfo,
} from "../../store/profile/types";
import styled from "styled-components";
import { ActionBtn, FlexBoxSection, LoaderImg } from "../../common/Elements";
import LoaderIcon from "../../assets/loader-icon.svg";
import { IConfigDataParams } from "../../store/common/types";

interface ProfilePageProps {
  pwa: IPWA;
  hasError: boolean;
  isExport: boolean;
  isMobile: boolean;
  profileConfig: IConfigDataParams[];
  retryBaseInfo: () => void;
}

const ProfilePage = (props: ProfilePageProps) => {
  const homeRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const educationRef = useRef(null);
  const contactRef = useRef(null);

  const { pwa, hasError, isExport, isMobile, profileConfig, retryBaseInfo } =
    props;
  const [retry, setRetry] = useState<boolean>(true);
  const [hasErrorInProfile, setHasErrorInProfile] = useState<boolean>(hasError);
  const { isInstallPromptSupported, promptInstall } = usePWA();

  const [isInstallBannerOpen, setIsInstallBannerOpen] = useState<
    boolean | null
  >(getLocalStorage("isInstallBannerOpen"));
  const [hasPWAInstalled, setHasPWAInstalled] = useState<boolean>(
    getLocalStorage("hasPWAInstalled") || false,
  );
  const [profileData, setProfileData] = useState<IProfileData>(
    DEFAULT_CONTEXT.data,
  );
  const [isFetchingData, setIsFetchingData] = useState<boolean>(true);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] =
    useState<boolean>(false);

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
    if (retry) {
      window.scrollTo(0, 0);
      document.title = PAGE_TITLES.profile;

      const DEFAULT_SECTIONS_DETAILS = DEFAULT_CONTEXT.data.sections.details;

      const fetchInfo = async (
        jsonToFetch: string,
        data: ISectionInfo | IHeader | DownloadType,
        name: string,
      ) => {
        const response = await getProfileJsonResponse(jsonToFetch, data);
        setHasErrorInProfile(response.hasError);
        return { name, data: response.data };
      };

      (async () => {
        const { profileSections, links, skills, download } = (
          await Promise.all(
            profileConfig.map((data: IConfigDataParams) =>
              fetchInfo(data.ref, DEFAULT_SECTIONS_DETAILS, data.name),
            ),
          )
        ).reduce(
          (curr, prev) => ({ ...curr, [prev.name]: prev.data }),
          DEFAULT_PROFILE_CONFIG_DATA,
        );

        const { header, experiences } = profileSections;

        const experienceData = (
          await Promise.all(
            (experiences.info as any[]).map((data: IExperienceJsonInfo) =>
              fetchInfo(data.ref, DEFAULT_SECTIONS_DETAILS, data.name),
            ),
          )
        ).map(data => data.data);

        const sections = {
          ...profileSections,
          skills,
          experiences: { ...experiences, info: experienceData },
          links,
        };
        setProfileData({ header, sections, download });
        setIsFetchingData(false);
        setRetry(false);
      })();
    }
  }, [retry, profileConfig]);

  return isFetchingData ? (
    <LoaderImg isMobile={isMobile} src={LoaderIcon} />
  ) : (
    <>
      {hasErrorInProfile ? (
        <ErrorWrapper
          direction="column"
          justifyContent={isMobile ? "center" : "flex-start"}
          alignItems="center"
        >
          <h2>{MESSAGES.genericError}</h2>
          <ActionBtn
            className="retry"
            onClick={() => {
              setRetry(true);
              retryBaseInfo();
            }}
          >
            {LABEL_TEXT.retry}
          </ActionBtn>
        </ErrorWrapper>
      ) : (
        <Wrapper>
          <Profile
            isExport={isExport}
            profileData={profileData}
            refs={{
              homeRef,
              skillsRef,
              experienceRef,
              educationRef,
              contactRef,
            }}
            isDownloading={isDownloading}
            isMobile={isMobile}
            isInstallBannerOpen={
              !hasPWAInstalled &&
              isInstallPromptSupported &&
              !!isInstallBannerOpen
            }
            hasPWAInstalled={hasPWAInstalled}
            isHamburgerMenuOpen={isHamburgerMenuOpen}
            setIsDownloading={(isDownloading: boolean) =>
              setIsDownloading(isDownloading)
            }
            setIsHamburgerMenuOpen={(isHamburgerMenuOpen: boolean) =>
              setIsHamburgerMenuOpen(isHamburgerMenuOpen)
            }
            onInstallPWA={onClickInstall}
          />
          <PWABanner
            pwa={pwa}
            isMobile={isMobile}
            isInstallBannerOpen={!!isInstallBannerOpen}
            hasPWAInstalled={hasPWAInstalled}
            isInstallPromptSupported={isInstallPromptSupported}
            setIsInstallBannerOpen={isInstallBannerOpen =>
              setIsInstallBannerOpen(isInstallBannerOpen)
            }
            onClickInstall={onClickInstall}
          />
        </Wrapper>
      )}
    </>
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

const ErrorWrapper = styled(FlexBoxSection)`
  background: #b21807;
  color: #f0f0f0;
  height: 100vh;
  text-align: center;
  h2 {
    font-size: 32px;
    padding-top: 10%;
    margin-block: 0;
    transition: opacity 1000ms ease-in-out 1000ms;
  }
  .retry {
    margin-top: 20px;
    text-transform: uppercase;
    padding: 7px 15px;
    background: #3498db;
    border-radius: 20px;
    color: #f0f0f0;
    &:hover {
      background: #3fc935;
    }
  }
`;
