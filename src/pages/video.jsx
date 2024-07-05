import React, { useState, useRef,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/video.css";
import videoSrc from "../assets/videos/Demo-Flujos-Bancolombia-Creacion-SVE.mp4";

export default function Video() {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const message = "¿Seguro que quieres cerrar esta página?";
      event.returnValue = message; // Estándar
      return message; // Para navegadores antiguos
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  const nav = useNavigate();
  const videoRef = useRef(null);
  const [videoEnded, setVideoEnded] = useState(false);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };

  const handlePlay = () => {
    setVideoEnded(false);
  };

  return (
    <div className="app indexBody d-flex align-items-center justify-content-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 video-field d-flex flex-column justify-content-center">
            <div className="ratio ratio-16x9">
              <video
                ref={videoRef}
                className="embed-responsive-item"
                src={videoSrc}
                controls
                allowFullScreen
                controlsList="nodownload"
                onEnded={handleVideoEnd}
                onPlay={handlePlay}
              />
            </div>
            <button
              className={`btn-continue fw-bold ${videoEnded ? "active" : ""}`}
              disabled={!videoEnded}
              onClick={() => videoEnded && nav("/survey")}
            >
              <span>Continuar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
