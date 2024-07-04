import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import TextField from '@mui/material/TextField';
import "../assets/styles/video.css";
import videoSrc from "../assets/videos/Demo-Flujos-Bancolombia-Creacion-SVE.mp4";

export default function Dashboard() {
  const nav = useNavigate();
  
  return (
    <div className="app indexBody d-flex align-items-center justify-content-center">
      <div className="container">
            <TextField id="filled-basic" label="Filled" variant="filled" />
        <div className="row justify-content-center">
          <div className="col-md-8 d-flex flex-column justify-content-center">
            <div className="ratio ratio-16x9">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
