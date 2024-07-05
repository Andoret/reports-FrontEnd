import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../components/Sidebar/sidebar";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, Divider } from "@mui/material";
import '../assets/styles/animaciones.css'; // Asegúrate de importar el archivo CSS

export default function Admin() {
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
            <Button variant="contained" color="error">
              <PowerSettingsNewIcon
                size="small"
                className="text-white fw-bold m-0 p-0 fs-5"
              />
            </Button>
          </div>
        </div>
        <div className="row p-3" style={{ minHeight: "calc(100vh - 150px)", display: "flex", alignItems: "center" }}>
          <div className="col-sm-12 col-md-4 col-lg-4 mb-4 d-flex justify-content-center AdminCard">
            <Card
              sx={{
                width: "50%",
                maxWidth: "50%",
                height: "50%",
                maxHeight: "50%",
                alignContent: "center",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "200px",
                }}
              >
                <FileUploadIcon fontSize="large" />
                <Divider sx={{ width: "100%", my: 1 }} />
                <Typography variant="h6" align="center">
                  Subir videos
                </Typography>
              </CardContent>
            </Card>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4 mb-4 d-flex justify-content-center AdminCard">
            <Card
              sx={{
                width: "50%",
                maxWidth: "50%",
                height: "50%",
                maxHeight: "50%",
                alignContent: "center",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "200px",
                }}
              >
                <DashboardIcon fontSize="large" />
                <Typography variant="h6" align="center">
                  Videos
                </Typography>
              </CardContent>
            </Card>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4 mb-4 d-flex justify-content-center AdminCard">
            <Card
              sx={{
                width: "50%",
                maxWidth: "50%",
                height: "50%",
                maxHeight: "50%",
                alignContent: "center",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  alignContent: "center",
                  height: "200px",
                }}
              >
                <AssessmentIcon fontSize="large" />
                <Typography variant="h6" align="center">
                  Reportes
                </Typography>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
