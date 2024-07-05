import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../components/Sidebar/sidebar";
import { Button, Divider } from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";



export default function Reports() {
  const nav = useNavigate();

  const [open, setOpen] = useState(false);

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
        <div className="col">
          <Sidebar
            open={open}
            toggleDrawer={toggleDrawer}
            navigateTo={navigateTo}
          />
        </div>
        <div className="col d-flex align-items-center justify-content-end">
          <p className="fw-bold text-white pe-2 m-0 fs-5">
            Nombre del usuario
          </p>
          <Button
            variant="contained"
            color="error"
            onClick={() => navigateTo("/Login")}
          >
            <PowerSettingsNewIcon
              size="small"
              className="text-white fw-bold m-0 p-0 fs-5"
            />
          </Button>
        </div>
      </div>
      <div
        className="row p-3"
        style={{
          minHeight: "calc(100vh - 150px)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="col-sm-12 col-md-4 col-lg-4 mb-4 d-flex justify-content-center  ">
        
        </div>
      </div>
    </section>
  </div>
  );
}
