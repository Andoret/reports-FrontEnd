import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../components/Sidebar/sidebar";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { Button } from "@mui/material";
import VideoList from "../components/Videolist/videoList";
import axios from "axios";
import '../assets/styles/dashboard.css';
import { UserContext } from "../context/UserContext";

export default function Dashboard() {
  const { clientId } = useContext(UserContext);
  const urlVideos = `http://localhost:3000/video/clienteid/${clientId}`;
  const [videos, setVideos] = useState([]);
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    try {
      const response = await axios.get(urlVideos);
      const updatedVideos = response.data.results.map(video => ({
        ...video,
        src: `/videos/${clientId}/${video.name_video}.mp4`
      }));
      setVideos(updatedVideos);
      console.log({videos});
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
        <div className="row p-3 video-list-container">
          <VideoList videos={videos} />
        </div>
      </section>
    </div>
  );
}
