import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React, { Suspense, useEffect, useState } from "react";
import { getJsonResponse, getProfileJsonResponse } from "./common/Utils";
import {
  DEFAULT_CONTEXT,
  DEFAULT_MAINTENANCE_DATA,
  DEFAULT_PWA,
  IS_MOBILE,
} from "./common/constants";
import { ISectionInfo } from "./store/profile/types";
import { LoaderImg } from "./common/Elements";
import LoaderIcon from "./assets/loader-icon.svg";
import { CommonDataType } from "./store/common/types";

function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const isAdmin = queryParams.get("admin");
  const isExport = !!queryParams.get("export");
  const [maintenance, setMaintenance] = useState(DEFAULT_MAINTENANCE_DATA);
  const [links, setLinks] = useState(DEFAULT_CONTEXT.data.sections.links);
  const [pwa, setPwa] = useState(DEFAULT_PWA);
  const [commonData, setCommonData] = useState<CommonDataType>({});
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
      <Suspense fallback={<LoaderImg isMobile={IS_MOBILE} src={LoaderIcon} />}>
        <BrowserRouter>
          <Routes>
            {!hasError && maintenance?.isUnderMaintenance && !isAdmin ? (
              <>
                <Route path="*" element={<Navigate to="/maintenance" />} />
                <Route
                  path="/maintenance"
                  element={
                    <>
                      <MaintenancePageComponent
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
