import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React, { Suspense, useEffect, useState } from "react";
import { getJsonResponse, getProfileJsonResponse } from "./common/Utils";
import {
  CONFIG_REF_INFO,
  CONFIG_TYPES,
  DEFAULT_APP_CONTEXT,
  ROUTES,
} from "./common/constants";
import { ISectionInfo } from "./store/profile/types";
import { LoaderImg } from "./common/Elements";
import LoaderIcon from "./assets/loader-icon.svg";
import { IConfigData, IConfigDataParams } from "./store/common/types";
import { HomePage } from "./pages/HomePage";
import { AppProvider } from "./store/app/context";
import { IAppConfigData } from "./store/app/types";
import {
  osName,
  browserName,
  isMobile as isMobileDevice,
} from "react-device-detect";

const DEFAULT_CONFIG_DATA: IConfigData = {
  jsonConfig: {
    defaultConfig: [
      {
        name: "maintenance",
        type: "",
        ref: "",
      },
    ],
    profileConfig: [
      {
        name: "profileSections",
        type: "",
        ref: "",
      },
    ],
  },
  appConfig: {
    homepage: {
      profileRedirectDelay: 2,
    },
    pwa: {
      browsers: [],
      os: [],
    },
  },
};

function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const isAdmin = queryParams.get("admin");
  const isExport = !!queryParams.get("export");
  const [isMobile, setIsMobile] = useState<boolean>(isMobileDevice);
  const [hasError, setHasError] = useState(false);
  const [retry, setRetry] = useState<boolean>(true);
  const [configData, setConfigData] =
    useState<IConfigData>(DEFAULT_CONFIG_DATA);
  const [basicConfigData, setBasicConfigData] = useState<IAppConfigData>(
    DEFAULT_APP_CONTEXT.data,
  );

  const fetchSections = async (
    jsonToFetch: string,
    data: ISectionInfo,
    name: string,
  ) => {
    const response = await getProfileJsonResponse(jsonToFetch, data);
    setHasError(response.hasError);
    return { name, data: response.data as ISectionInfo };
  };

  const fetchData = async (jsonToFetch: string, name: string) => {
    const response = await getJsonResponse(jsonToFetch);
    setHasError(response.hasError);
    return { name, data: response.data };
  };

  const setViewportProps = () => setIsMobile(window.innerWidth < 768);

  useEffect(() => {
    window.addEventListener("resize", setViewportProps);
    return () => window.removeEventListener("resize", setViewportProps);
  }, []);

  useEffect(() => {
    (async () => {
      if (retry) {
        const config = (
          (await fetchData(
            CONFIG_REF_INFO.ref,
            CONFIG_REF_INFO.name,
          )) as unknown as { data: IConfigData }
        ).data;
        setConfigData(config);
        const {
          jsonConfig: { defaultConfig },
          appConfig,
        } = config;
        const configData = await Promise.all(
          defaultConfig.map((data: IConfigDataParams) => {
            const { name, type, ref } = data;
            return type === CONFIG_TYPES.PROFILECONFIG
              ? fetchSections(ref, basicConfigData.links, name)
              : fetchData(ref, name);
          }),
        );
        setBasicConfigData({
          ...configData.reduce(
            (curr, prev) => ({ ...curr, [prev.name]: prev.data }),
            basicConfigData,
          ),
          appConfig,
        });

        setRetry(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retry]);

  const ProfilePageComponent = React.lazy(
    () => import("./pages/profile/ProfilePage"),
  );

  const MaintenancePageComponent = React.lazy(
    () => import("./pages/maintenance/MaintenancePage"),
  );

  return (
    <AppProvider
      value={{
        data: {
          ...basicConfigData,
          currentDevice: { osName, browserName, isMobile },
        },
      }}
    >
      <Suspense fallback={<LoaderImg isMobile={isMobile} src={LoaderIcon} />}>
        <BrowserRouter>
          <Routes>
            {!hasError &&
            !isAdmin &&
            basicConfigData.maintenance?.isUnderMaintenance ? (
              <>
                <Route
                  path="*"
                  element={<Navigate to={ROUTES.ROUTE_MAINTENANCE} />}
                />
                <Route
                  path={ROUTES.ROUTE_MAINTENANCE}
                  element={
                    <>
                      <MaintenancePageComponent
                        isMobile={isMobile}
                        maintenance={basicConfigData.maintenance}
                        links={basicConfigData.links}
                      />
                    </>
                  }
                />
              </>
            ) : (
              <>
                <Route
                  path="/"
                  element={
                    <>
                      <HomePage />
                    </>
                  }
                />
                <Route
                  path={ROUTES.ROUTE_PROFILE}
                  element={
                    <>
                      <ProfilePageComponent
                        isMobile={isMobile}
                        isExport={isExport}
                        hasError={hasError}
                        profileConfig={configData.jsonConfig.profileConfig}
                        pwa={basicConfigData.pwa}
                        retryBaseInfo={() => setRetry(true)}
                      />
                    </>
                  }
                />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </Suspense>
    </AppProvider>
  );
}

export default App;
