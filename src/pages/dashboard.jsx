import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../components/Sidebar/sidebar";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { Button } from "@mui/material";
import VideoList from "../components/Videolist/videoList";
import axios from "axios";

export default function Dashboard() {
  const urlVideos = "http://localhost:3000/video/all";
  const [videos, setVideos] = useState([]);
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    try {
      const response = await axios.get(urlVideos);
      setVideos(response.data.response); // Ajusta para acceder a response.data.response
      console.log(response.data.response); // Ajusta para acceder a response.data.response
      videos.forEach(video => {
        video.src = `../assets/videos/${video.name_video}.mp4`; // Asegura que la ruta sea ../assets/videos/
      });
    } catch (error) {
      console.error("Error al obtener los videos:", error.message);
      // Manejo de errores: muestra un mensaje al usuario o redirige a una página de error
    }
  };

  
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const navigateTo = (route) => {
    nav(route);
    setOpen(false);
  };

  return (
    <div className="app indexBody p-3"> 
      <section>
        <div className="row d-flex align-items-center mb-3">
            <Sidebar
              open={open}
              toggleDrawer={toggleDrawer}
              navigateTo={navigateTo}
            />
        </div>
        <div
          className="row p-3"
          style={{
            minHeight: "calc(100vh - 150px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflowY: "auto"
          }}
        >
          <VideoList videos={videos} />
        </div>
      </section>
    </div>
  );
}
