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
import "../assets/styles/admin.css";

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
          }}
        >
          <div className="col-sm-12 col-md-4 col-lg-4 mb-4 d-flex justify-content-center AdminCard">
            <Card
              sx={{
                width: "60%",
                maxWidth: "70%",
                alignContent: "center",
                backgroundColor: "rgb(19, 20, 20)",
                boxShadow: "rgba(5, 5, 5, 0.80) 0px 5px 15px",
              }}
              className="Cards"
              onClick={() => navigateTo("/upload")}
            >
              <CardContent>
                <FileUploadIcon fontSize="large" />
                <Divider sx={{ width: "100%", my: 1 }} />
                <Typography variant="h4" align="center">
                  Subir videos
                </Typography>
              </CardContent>
            </Card>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4 mb-4 d-flex justify-content-center AdminCard">
            <Card
              sx={{
                width: "60%",
                maxWidth: "70%",
                alignContent: "center",
                backgroundColor: "rgb(19, 20, 20)",
                boxShadow: "rgba(5, 5, 5, 0.80) 0px 5px 15px",
              }}
              className="Cards"
              onClick={() => navigateTo("/dashboard")}
            >
              <CardContent>
                <DashboardIcon fontSize="large" />
                <Typography variant="h4" align="center">
                  Videos
                </Typography>
              </CardContent>
            </Card>
          </div>
          <div className="col-sm-12 col-md-4 col-lg-4 border-light mb-4 d-flex justify-content-center AdminCard">
            <Card
              sx={{
                width: "60%",
                maxWidth: "70%",
                alignContent: "center",
                backgroundColor: "rgb(19, 20, 20)",
                boxShadow: "rgba(5, 5, 5, 0.80) 0px 5px 15px",
              }}
              className="Cards"
              onClick={() => navigateTo("/reports")}
            >
              <CardContent>
                <AssessmentIcon fontSize="large" />
                <Typography variant="h4" align="center">
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
