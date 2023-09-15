import styled from "styled-components";
import { FlexBox, MobilePWAWrapper, PWAWrapper } from "./common/Elements";
import {
  getLocalStorage,
  isBannerHidden,
  isSupportedBrowserAndOS,
  setLocalStorage,
} from "./common/Utils";
import { useContext, useEffect, useMemo } from "react";
import { IPWA } from "./store/profile/types";
import { AppContext } from "./store/app/context";

interface PWABannerProps {
  pwa: IPWA;
  isMobile: boolean;
  isInstallBannerOpen: boolean;
  hasPWAInstalled: boolean;
  isInstallPromptSupported: boolean;
  setIsInstallBannerOpen: (isInstallBannerOpen: boolean) => void;
  onClickInstall: Function;
}
export const PWABanner = (props: PWABannerProps) => {
  const {
    isMobile,
    hasPWAInstalled,
    isInstallBannerOpen,
    setIsInstallBannerOpen,
    onClickInstall,
    isInstallPromptSupported,
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

  const PWAInstallMessage = <p>{messages.install}</p>;

  const InstallButton = (
    <button className="install" onClick={async () => await onClickInstall()}>
      {messages.yes}
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
  console.log("isMobile && hasPWASupport", isMobile && hasPWASupport);
  return !hasPWAInstalled && isInstallPromptSupported && isInstallBannerOpen ? (
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
  width: 100%;
  margin-right: 50px;
`;
