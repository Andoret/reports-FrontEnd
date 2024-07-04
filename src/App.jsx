import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Index from "./pages/index";
import Survey from "./pages/survey";
import Video from "./pages/video";
import { UserProvider } from "./context/UserContext";
import Agradecimiento from "./pages/agradecimiento";
import Login from "./pages/login";
import Upload from "./pages/upload";
import Reports from "./pages/reports";
import Admin from "./pages/admin";

export default function App() {
  return (
    <UserProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/survey" element={<Survey />} />
      <Route path="/video" element={<Video />} />
      <Route path="/agradecimiento" element={<Agradecimiento />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/upload" element={<Upload/>} />
      <Route path="/reports" element={<Reports/>} />
      <Route path="/admin" element={<Admin/>} />
    </Routes>
    </BrowserRouter>
    </UserProvider>
    )
}  
