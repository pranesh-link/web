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
import { ICommonData } from "./store/common/types";

function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const isAdmin = queryParams.get("admin");
  const isExport = !!queryParams.get("export");
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 767);
  const [maintenance, setMaintenance] = useState(DEFAULT_MAINTENANCE_DATA);
  const [links, setLinks] = useState(DEFAULT_CONTEXT.data.sections.links);
  const [pwa, setPwa] = useState(DEFAULT_PWA);
  const [commonData, setCommonData] = useState<ICommonData>(
    DEFAULT_CONTEXT.commonData
  );
  const [hasError, setHasError] = useState(false);

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

  const setViewportProps = () => setIsMobile(window.innerWidth < 767);

  useEffect(() => {
    window.addEventListener("resize", setViewportProps);
    return () => window.removeEventListener("resize", setViewportProps);
  }, []);

  useEffect(() => {
    (async () => {
      const [maintenanceInfo, linksInfo, pwaInfo, commonData] =
        await Promise.all([
          fetchData("maintenance"),
          fetchSections("links", links),
          fetchData("pwa"),
          fetchData("common"),
        ]);
      setMaintenance(maintenanceInfo);
      setLinks(linksInfo);
      setPwa(pwaInfo);
      setCommonData(commonData);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                        commonData={commonData}
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
