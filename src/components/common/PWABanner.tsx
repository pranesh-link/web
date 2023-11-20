import styled from "styled-components";
import { FlexBox, MobilePWAWrapper, PWAWrapper } from "../../common/Elements";
import {
  getLocalStorage,
  getWebUrl,
  isBannerHidden,
  isSupportedBrowserAndOS,
  setLocalStorage,
} from "../../common/Utils";
import { useContext, useEffect, useMemo } from "react";
import { IPWA } from "../../store/profile/types";
import { AppContext } from "../../store/app/context";

interface PWABannerProps {
  pwa: IPWA;
  isMobile: boolean;
  hasPWAInstalled: boolean;
  isInstallPromptSupported: boolean;
  isInstallBannerOpen: boolean;
  isStandalone: boolean;
  setIsInstallBannerOpen: (display: boolean) => void;
  onClickInstall: Function;
}
export const PWABanner = (props: PWABannerProps) => {
  const {
    isMobile,
    hasPWAInstalled,
    onClickInstall,
    isInstallPromptSupported,
    isInstallBannerOpen,
    setIsInstallBannerOpen,
    isStandalone,
    pwa: { messages, bannerExpiryTime },
  } = props;

  const {
    data: {
      appConfig: {
        pwa: { browsers, os },
      },
      currentDevice: { osName, browserName },
    },
  } = useContext(AppContext);

  const closeInstallBanner = () => {
    const expiry = new Date().getTime() + bannerExpiryTime * 1000;
    setIsInstallBannerOpen(false);
    setLocalStorage("isInstallBannerOpen", false);
    setLocalStorage("pwaBannerHideTime", expiry);
  };

  const NotNowButton = (
    <button className="not-now" onClick={closeInstallBanner}>
      {messages.no}
    </button>
  );

  const isWebWithPWA = useMemo(
    () => !isStandalone && hasPWAInstalled,

    [isStandalone, hasPWAInstalled],
  );

  const PWAInstallMessage = (
    <p>{isWebWithPWA ? messages.relatedApp : messages.install}</p>
  );

  const InstallButton = (
    <button
      className="install"
      onClick={async () => {
        if (!isWebWithPWA) {
          await onClickInstall();
        }
      }}
    >
      {isWebWithPWA ? (
        <a href={getWebUrl()} target="_blank" rel="noreferrer">
          {messages.open}
        </a>
      ) : (
        messages.yes
      )}
    </button>
  );

  const hasPWASupport = useMemo(
    () => isSupportedBrowserAndOS(browsers, os, browserName, osName),
    [browsers, os, browserName, osName],
  );

  useEffect(() => {
    // Set install banner based on local storage key availability
    const openBanner =
      getLocalStorage("isInstallBannerOpen") === null
        ? isInstallPromptSupported
        : (isInstallPromptSupported &&
            isInstallBannerOpen &&
            !hasPWAInstalled) ||
          !isBannerHidden(getLocalStorage("pwaBannerHideTime") || 0);
    setLocalStorage("isInstallBannerOpen", openBanner);
    setIsInstallBannerOpen(openBanner);
  }, [
    hasPWAInstalled,
    isInstallBannerOpen,
    isInstallPromptSupported,
    setIsInstallBannerOpen,
  ]);

  return !isStandalone && isInstallPromptSupported && isInstallBannerOpen ? (
    <>
      {isMobile && hasPWASupport && (
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
      )}
      {!isMobile && (
        <PWAWrapper top="0" alignItems="center" justifyContent="space-between">
          {NotNowButton}
          {PWAInstallMessage}
          {InstallButton}
        </PWAWrapper>
      )}
    </>
  ) : null;
};

const MobilePWAControls = styled(FlexBox)`
  margin-top: 10px;
  width: 100%;
  margin-right: 50px;
`;
