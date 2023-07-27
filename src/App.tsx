import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React, { Suspense, useEffect, useState } from "react";
import { getJsonResponse, getProfileJsonResponse } from "./common/Utils";
import {
  CONFIG_REF_INFO,
  DEFAULT_CONTEXT,
  DEFAULT_MAINTENANCE_DATA,
  DEFAULT_PWA,
} from "./common/constants";
import { IPWA, ISectionInfo } from "./store/profile/types";
import { LoaderImg } from "./common/Elements";
import LoaderIcon from "./assets/loader-icon.svg";
import {
  IConfigData,
  IConfigDataParams,
  IMaintenance,
} from "./store/common/types";

interface IBasicConfigData {
  pwa: IPWA;
  maintenance: IMaintenance;
  links: ISectionInfo;
}

const DEFAULT_CONFIG_DATA = {
  basic: [
    {
      name: "maintenance",
      type: "",
      ref: "",
    },
  ],
  profile: [
    {
      name: "profileSections",
      type: "",
      ref: "",
    },
  ],
};

const DEFAULT_BASIC_CONFIG_DATA = {
  pwa: DEFAULT_PWA,
  maintenance: DEFAULT_MAINTENANCE_DATA,
  links: DEFAULT_CONTEXT.data.sections.links,
};

function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const isAdmin = queryParams.get("admin");
  const isExport = !!queryParams.get("export");
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const [hasError, setHasError] = useState(false);
  const [retry, setRetry] = useState<boolean>(true);
  const [configData, setConfigData] =
    useState<IConfigData>(DEFAULT_CONFIG_DATA);
  const [basicConfigData, setBasicConfigData] = useState<IBasicConfigData>(
    DEFAULT_BASIC_CONFIG_DATA,
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
          await fetchData(CONFIG_REF_INFO.ref, CONFIG_REF_INFO.name)
        ).data;
        setConfigData(config);
        const { basic } = config;
        const configData = await Promise.all(
          basic.map((data: IConfigDataParams) => {
            const { name, type, ref } = data;
            return type === "profileConfig"
              ? fetchSections(ref, basicConfigData.links, name)
              : fetchData(ref, name);
          }),
        );
        setBasicConfigData(
          configData.reduce(
            (curr, prev) => ({ ...curr, [prev.name]: prev.data }),
            basicConfigData,
          ),
        );

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
    <div>
      <Suspense fallback={<LoaderImg isMobile={isMobile} src={LoaderIcon} />}>
        <BrowserRouter>
          <Routes>
            {!hasError &&
            !isAdmin &&
            basicConfigData.maintenance?.isUnderMaintenance ? (
              <>
                <Route path="*" element={<Navigate to="/maintenance" />} />
                <Route
                  path="/maintenance"
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
                <Route path="*" element={<Navigate to="/profile" />} />
                <Route
                  path="/profile"
                  element={
                    <>
                      <ProfilePageComponent
                        isMobile={isMobile}
                        isExport={isExport}
                        hasError={hasError}
                        profileConfig={configData.profile}
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
    </div>
  );
}

export default App;
