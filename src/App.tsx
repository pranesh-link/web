import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProfilePage } from "./pages/profile/ProfilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/profile" />} />
        <Route
          path="/profile"
          element={
            <>
              <ProfilePage />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
