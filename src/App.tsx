import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React, { Suspense, useEffect, useState } from "react";
import { getJsonResponse, getProfileJsonResponse } from "./common/Utils";
import {
  DEFAULT_CONTEXT,
  DEFAULT_MAINTENANCE_DATA,
  DEFAULT_PWA,
} from "./common/constants";
import { ISectionInfo } from "./store/profile/types";
import { LoaderImg } from "./common/Elements";
import LoaderIcon from "./assets/loader-icon.svg";

function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const isAdmin = queryParams.get("admin");
  const isExport = !!queryParams.get("export");
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 767);
  const [maintenance, setMaintenance] = useState(DEFAULT_MAINTENANCE_DATA);
  const [links, setLinks] = useState(DEFAULT_CONTEXT.data.sections.links);
  const [pwa, setPwa] = useState(DEFAULT_PWA);
  const [hasError, setHasError] = useState(false);
  const [retry, setRetry] = useState<boolean>(true);

  const fetchSections = async (jsonToFetch: string, data: ISectionInfo) => {
    const response = await getProfileJsonResponse(jsonToFetch, data);
    setHasError(response.hasError);
    return response.data as ISectionInfo;
  };

  const fetchData = async (jsonToFetch: string) => {
    const response = await getJsonResponse(jsonToFetch);
    setHasError(response.hasError);
    return response.data;
  };

  const setViewportProps = () => setIsMobile(window.innerWidth < 768);

  useEffect(() => {
    window.addEventListener("resize", setViewportProps);
    return () => window.removeEventListener("resize", setViewportProps);
  }, []);

  useEffect(() => {
    (async () => {
      if (retry) {
        const [maintenanceInfo, linksInfo, pwaInfo] = await Promise.all([
          fetchData("maintenance"),
          fetchSections("links", links),
          fetchData("pwa"),
        ]);
        setMaintenance(maintenanceInfo);
        setLinks(linksInfo);
        setPwa(pwaInfo);
        setRetry(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retry]);

  const ProfilePageComponent = React.lazy(
    () => import("./pages/profile/ProfilePage")
  );

  const MaintenancePageComponent = React.lazy(
    () => import("./pages/maintenance/MaintenancePage")
  );

  return (
    <div>
      <Suspense fallback={<LoaderImg isMobile={isMobile} src={LoaderIcon} />}>
        <BrowserRouter>
          <Routes>
            {!hasError && !isAdmin && maintenance?.isUnderMaintenance ? (
              <>
                <Route path="*" element={<Navigate to="/maintenance" />} />
                <Route
                  path="/maintenance"
                  element={
                    <>
                      <MaintenancePageComponent
                        isMobile={isMobile}
                        maintenance={maintenance}
                        links={links}
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
                        pwa={pwa}
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
