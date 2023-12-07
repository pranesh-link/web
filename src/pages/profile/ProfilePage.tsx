import React, { useRef, useState, useEffect, useContext } from "react";
import usePWA from "react-pwa-install-prompt";
import styled from "styled-components";
import LoaderIcon from "../../assets/loader-icon.svg";
import { IConfigDataParams } from "../../store/common/types";
import {
  PWABanner,
  Profile,
  Elements,
  Constants,
  Utils,
  IProfileData,
  ISectionInfo,
  IHeader,
  DownloadType,
  IPWA,
  IExperienceJsonInfo,
} from "react-profile-component";
import { AppContext } from "../../store/app/context";
import { ENVIRONMENT } from "../../common/constants";

const { ActionBtn, FlexBoxSection, LoaderImg } = Elements;
const {
  getLocalStorage,
  setLocalStorage,
  clearLocalStorage,
  getProfileJsonResponse,
} = Utils;

const {
  DEFAULT_PROFILE_CONTEXT,
  PAGE_TITLES,
  MESSAGES,
  LABEL_TEXT,
  DEFAULT_PROFILE_CONFIG_DATA,
} = Constants;

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
  const {
    data: {
      appConfig: { pwa: pwaConfig },
      currentDevice: { browserName, osName },
      version,
      preloadedAssets,
      preloadedFiles,
      preloadSrcList,
    },
  } = useContext(AppContext);
  const { browsers, os } = pwaConfig;
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
    DEFAULT_PROFILE_CONTEXT.data,
  );
  const [isFetchingData, setIsFetchingData] = useState<boolean>(true);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] =
    useState<boolean>(false);
  const [isStandalone, setIsStandalone] = useState(
    window.matchMedia("(display-mode: standalone)").matches,
  );

  const onClickInstall = async () => {
    setIsInstallBannerOpen(false);
    setLocalStorage("isInstallBannerOpen", false);
    await promptInstall();
  };

  useEffect(() => {
    if (retry) {
      window.scrollTo(0, 0);
      document.title = PAGE_TITLES.profile;

      const DEFAULT_SECTIONS_DETAILS =
        DEFAULT_PROFILE_CONTEXT.data.sections.details;

      const fetchInfo = async (
        jsonToFetch: string,
        data: ISectionInfo | IHeader | DownloadType,
        name: string,
      ) => {
        const response = await getProfileJsonResponse(
          ENVIRONMENT,
          jsonToFetch,
          data,
        );
        setHasErrorInProfile(response.hasError);
        return { name, data: response.data };
      };

      (async () => {
        const { profileSections, links, skills, download, contactForm } = (
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
        setProfileData({ header, sections, download, forms: { contactForm } });
        setIsFetchingData(false);
        setRetry(false);
      })();
    }
  }, [retry, profileConfig]);

  useEffect(() => {
    window
      .matchMedia("(display-mode: standalone)")
      .addEventListener("change", ({ matches }) => {
        setIsStandalone(matches);
      });

    return () =>
      window
        .matchMedia("(display-mode: standalone)")
        .removeEventListener("change", ({ matches }) => {
          setIsStandalone(matches);
        });
  }, []);

  useEffect(() => {
    window.addEventListener("appinstalled", e => {
      setHasPWAInstalled(true);
      setLocalStorage("hasPWAInstalled", true);
      setIsInstallBannerOpen(true);
      setLocalStorage("isInstallBannerOpen", true);
    });
    window.addEventListener("beforeinstallprompt", function (e) {
      clearLocalStorage("hasPWAInstalled");
    });

    return () => {
      window.removeEventListener("appinstalled", e => {});
      window.removeEventListener("beforeinstallprompt", function (e) {
        clearLocalStorage("hasPWAInstalled");
      });
    };
  }, []);

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
              !isStandalone &&
              (isInstallPromptSupported || !!isInstallBannerOpen)
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
            environment={ENVIRONMENT}
            appVersion={version}
            deviceConfig={{ os, osName, browserName, browsers }}
            preloadSrcList={preloadSrcList}
            preloadedAssets={preloadedAssets}
            preloadedFiles={preloadedFiles}
          />
          <PWABanner
            pwa={pwa}
            environment={ENVIRONMENT}
            config={{ ...pwaConfig, browserName, osName }}
            isMobile={isMobile}
            isStandalone={isStandalone}
            isInstallBannerOpen={!!isInstallBannerOpen}
            isWebWithPWA={!isStandalone && hasPWAInstalled}
            hasPWAInstalled={hasPWAInstalled}
            isInstallPromptSupported={isInstallPromptSupported}
            setIsInstallBannerOpen={(isInstallBannerOpen: boolean) =>
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
