import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";

import Survey from "./pages/survey";
import Video from "./pages/video";
import { UserProvider } from "./context/UserContext";
import Agradecimiento from "./pages/agradecimiento";
import Login from "./pages/login";
import Upload from "./pages/upload";
import Reports from "./pages/reports";
import Admin from "./pages/admin";
import Default from "./pages/default";
import ProtectedRoute from "./utils/protectedRoute";

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute redirectPath="/login" />}>
            <Route path="/admin" element={<Admin />} />

            <Route path="/reports" element={<Reports />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/" element={<Default />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/video/:id/:video" element={<Video />} />
          <Route path="/video/" element={<Video />} />
          <Route path="/agradecimiento" element={<Agradecimiento />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
