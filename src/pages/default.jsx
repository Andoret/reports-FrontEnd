import { Box } from "@mui/material";
import React from "react";
import logo from "../assets/images/logo-mentor.png";
export default function Default() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    border: "none",
    p: 4,
    borderRadius: "5px",
  };

  return (
    <div className="app indexBody d-flex align-items-center justify-content-center">
      <Box sx={style}>
        <div className="text-center">
          <div className="col mt-2">
            <img alt="MentoryPro logo" src={logo} className="logoError" />
          </div>
          <div className="col w-100 mb-4 justify-content-center">
            <h1>Oops, página no encontrada</h1>
            <p className="text-white fs-4">
              La página que estás buscando no existe. <br></br> Por favor, contacta con nosotros.
            </p>
          </div>
        </div>
      </Box>
    </div>
  );
}
