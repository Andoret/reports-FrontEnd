import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../components/Sidebar/sidebar";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import "../assets/styles/admin.css";

export default function Admin() {
  const nav = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const toggleSidebar = (newOpen) => () => {
    setSidebarOpen(newOpen);
  };

  const navigateTo = (route) => {
    nav(route);
    setSidebarOpen(false);
  };

  const handleUploadClick = () => {
    setModalOpen(true);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleClose = () => {
    setModalOpen(false);
    setFile(null);
    setPreview("");
  };

  return (
    <div className="app indexBody p-3">
      <section>
        <div className="row d-flex align-items-center mb-3">
          <Sidebar
            open={sidebarOpen}
            toggleDrawer={toggleSidebar}
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
              onClick={handleUploadClick}
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
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalOpen}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={modalOpen}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Subir Video
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Selecciona un video para subir y ver la vista previa.
            </Typography>
            <input
              accept="video/*"
              style={{ display: "none" }}
              id="file-upload"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload">
              <Button
                component="file"
                variant="contained"
                color="secondary"
                startIcon={<CloudUploadIcon />}
                sx={{ mt: 2 }}
              >
                Seleccionar archivo
              </Button>
            </label>
            {file && (
              <div>
                <video
                  width="100%"
                  controls
                  src={preview}
                  style={{ marginTop: "10px" }}
                />
                <Button
                  component="label"
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    // Aquí puedes añadir la lógica para subir el archivo al servidor
                    alert("Archivo subido exitosamente!");
                  }}
                  sx={{ mt: 2 }}
                >
                  Subir Archivo
                </Button>
              </div>
            )}
            <Button
              component="label"
              variant="contained"
              color="secondary"
              onClick={handleClose}
              sx={{ mt: 2 }}
            >
              Cerrar
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
