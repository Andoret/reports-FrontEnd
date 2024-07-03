import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Index from "./pages/index";
import Survey from "./pages/survey";
import Video from "./pages/video";

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
     <Route path="/" element={<Index />} />
     <Route path="/dashboard" element={<Dashboard />} />
     <Route path="/survey" element={<Survey />} />
     <Route path="/survey" element={<Video />} />

    </Routes>
    </BrowserRouter>
    )
}
