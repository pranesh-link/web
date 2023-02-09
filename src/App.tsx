import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProfilePage } from "./pages/profile/ProfilePage";
import { useEffect, useState } from "react";
import { getJsonResponse, getProfileJsonResponse } from "./common/Utils";
import { MaintenancePage } from "./pages/maintenance/MaintenancePage";
import { DEFAULT_CONTEXT, DEFAULT_MAINTENANCE_DATA } from "./common/constants";

function App() {
  const queryParams = new URLSearchParams(window.location.search);
  const isAdmin = queryParams.get("admin");
  const [maintenance, setMaintenance] = useState(DEFAULT_MAINTENANCE_DATA);
  const [links, setLinks] = useState(DEFAULT_CONTEXT.data.sections.links);
  const [pwa, setPwa] = useState(DEFAULT_CONTEXT.pwa);

  useEffect(() => {
    (async () => {
      const maintenanceInfo = await getJsonResponse("maintenance");
      const linksInfo = await getProfileJsonResponse("links", links);
      const pwaInfo = await getJsonResponse("pwa");
      setMaintenance(maintenanceInfo.data);
      setLinks(linksInfo.data);
      setPwa(pwaInfo.data);
    })();
  }, [links]);

  return (
    <BrowserRouter>
      <Routes>
        {maintenance.isUnderMaintenance && !isAdmin ? (
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
                  <ProfilePage pwa={pwa} />
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
