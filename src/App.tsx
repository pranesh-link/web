import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProfilePage } from "./pages/profile/ProfilePage";
import { useEffect, useState } from "react";
import { getJsonResponse, getProfileJsonResponse } from "./common/Utils";
import { MaintenancePage } from "./pages/maintenance/MaintenancePage";
import { DEFAULT_CONTEXT, DEFAULT_MAINTENANCE_DATA } from "./common/constants";
import { ISectionInfo } from "./store/profile/types";

function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const isAdmin = queryParams.get("admin");
  const [maintenance, setMaintenance] = useState(DEFAULT_MAINTENANCE_DATA);
  const [links, setLinks] = useState(DEFAULT_CONTEXT.data.sections.links);
  const [pwa, setPwa] = useState(DEFAULT_CONTEXT.pwa);
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
      const maintenanceInfo = await fetchData("maintenance");
      const linksInfo = await fetchSections("links", links);
      const pwaInfo = await fetchData("pwa");
      setMaintenance(maintenanceInfo);
      setLinks(linksInfo);
      setPwa(pwaInfo);
    })();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {!hasError && maintenance?.isUnderMaintenance && !isAdmin ? (
          <>
            <Route path="*" element={<Navigate to="/maintenance" />} />
            <Route
              path="/maintenance"
              element={
                <>
                  <MaintenancePage maintenance={maintenance} links={links} />
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
                  <ProfilePage hasError={hasError} pwa={pwa} />
                </>
              }
            />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
